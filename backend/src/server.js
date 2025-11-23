import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ---------------- Environment Variables ----------------
const API_KEY = process.env.WATSON_API_KEY;
const INSTANCE_URL = process.env.WATSON_INSTANCE_URL; // must include instance ID
const AGENT_ID = process.env.DIGITAL_EMPLOYEE_ID;

// --- Critical check ---
if (!API_KEY || !INSTANCE_URL || !AGENT_ID) {
    console.error("FATAL ERROR: Missing environment variables.");
    process.exit(1);
}

// ---------------- Mock HR Data ----------------
const employees = [
  { name: "Alice", leaveBalance: 12 },
  { name: "John", leaveBalance: 5 },
  { name: "Sara", leaveBalance: 8 },
];
const leaveRequests = [];
const onboardingSteps = ["Welcome email", "Complete profile", "Attend orientation", "Meet team"];
const queryLogs = [];

// ---------------- JWT Token Management ----------------
let JWT_TOKEN = null;
let TOKEN_EXPIRATION = 0;

async function getJWTToken() {
  const now = Date.now();
  if (JWT_TOKEN && now < TOKEN_EXPIRATION) return JWT_TOKEN;

  const params = new URLSearchParams();
  params.append("grant_type", "urn:ibm:params:oauth:grant-type:apikey");
  params.append("apikey", API_KEY);

  const res = await axios.post(
    "https://iam.cloud.ibm.com/identity/token",
    params,
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  JWT_TOKEN = res.data.access_token;
  TOKEN_EXPIRATION = now + (res.data.expires_in - 60) * 1000;
  return JWT_TOKEN;
}

// ---------------- Session Management ----------------
const sessions = {}; // employee_name => session_id

async function getSession(employee = "guest") {
  if (sessions[employee]) return sessions[employee];

  const token = await getJWTToken();
  const res = await axios.post(
    `${INSTANCE_URL}/v2/agents/${AGENT_ID}/sessions`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const sessionId = res.data.session_id;
  sessions[employee] = sessionId;
  return sessionId;
}

// ---------------- Orchestrate Agent ----------------
async function askAgent(question, employee = "guest") {
  try {
    const token = await getJWTToken();
    const sessionId = await getSession(employee);

    const payload = {
      message: { role: "user", content: question },
      session: sessionId,
      input_variables: { employee }
    };

    const res = await axios.post(
      `${INSTANCE_URL}/v2/agents/${AGENT_ID}/runs`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );

    const outputMessages = res.data?.run?.output_messages || [];
    const assistantMessage = outputMessages.reverse().find(msg => msg.role === "assistant");
    return assistantMessage?.content || "No response from agent.";

  } catch (err) {
    console.error(
      "[DEBUG] Orchestrate error:",
      err.response?.status,
      err.response?.data || err.message
    );
    return "Error contacting agent or network issue.";
  }
}

// ---------------- Routes ----------------
app.get("/", (req, res) => res.send("Server is running!"));

// Leave balance
app.get("/employee/leave-balance", (req, res) => {
  const { employee } = req.query;
  const emp = employees.find(e => e.name.toLowerCase() === employee?.toLowerCase());
  if (!emp) return res.status(404).json({ error: "Employee not found" });
  res.json({ employee: emp.name, leaveBalance: emp.leaveBalance });
});

// FAQs -> Uses Orchestrate
app.get("/faqs", async (req, res) => {
  const { query, employee } = req.query;
  if (!query) return res.status(400).json({ error: "Query is required" });

  const empName = employee || "guest";
  const response = await askAgent(query, empName);
  queryLogs.push({ employee: empName, query, response });
  res.json({ response });
});

// Leave request
app.post("/leave/request", (req, res) => {
  const { employee, requestDays } = req.body;
  const emp = employees.find(e => e.name.toLowerCase() === employee?.toLowerCase());
  if (!emp) return res.status(404).json({ error: "Employee not found" });

  if (requestDays > emp.leaveBalance) {
    return res.json({ status: "Rejected", reason: "Insufficient leave balance" });
  }

  const leaveRequest = {
    id: leaveRequests.length + 1,
    employee: emp.name,
    requestDays,
    status: "Pending"
  };
  leaveRequests.push(leaveRequest);
  res.json({ status: "Leave request submitted", request: leaveRequest });
});

// Approve/reject leave
app.post("/leave/approve", (req, res) => {
  const { id, approve } = req.body;
  const leave = leaveRequests.find(l => l.id === id);
  if (!leave) return res.status(404).json({ error: "Leave request not found" });

  leave.status = approve ? "Approved" : "Rejected";
  if (approve) {
    const emp = employees.find(e => e.name === leave.employee);
    if (emp) emp.leaveBalance -= leave.requestDays;
  }

  res.json({ status: "Leave approval updated", leave });
});

// Pending leave requests
app.get("/leave/pending", (req, res) =>
  res.json(leaveRequests.filter(l => l.status === "Pending"))
);

// Onboarding steps
app.get("/onboarding/steps", (req, res) => res.json(onboardingSteps));

// Query logs
app.get("/logs/queries", (req, res) => res.json(queryLogs));

// ---------------- Start Server ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
