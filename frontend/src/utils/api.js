import axios from "axios";

// IMPORTANT: use your ngrok backend URL here
const API_BASE = "https://anastasia-untenuous-geraldine.ngrok-free.dev";

export const api = {
  
  // 1) Get leave balance
  getLeaveBalance: (params) => axios.get(`${API_BASE}/employee/leave-balance`, params),

  getFaqs: (params) => axios.get(`${API_BASE}/faqs`, params),

  // 3) Submit leave request
  submitLeave: (data) => axios.post(`${API_BASE}/leave/request`, data),

  // 4) Approve leave
  approveLeave: (data) => axios.post(`${API_BASE}/leave/approve`, data),

  // 5) Get pending leave requests
  getPendingLeaves: () => axios.get(`${API_BASE}/leave/pending`),

  // 6) Onboarding steps
  getOnboardingSteps: () => axios.get(`${API_BASE}/onboarding/steps`),

  // 7) Dashboard logs
  getLogs: () => axios.get(`${API_BASE}/logs/queries`)
};
