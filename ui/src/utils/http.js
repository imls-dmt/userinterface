// The one HTTP client for talking to the DMTC API.
//
// baseURL comes from VUE_APP_API_BASE (empty in production, where nginx and
// Caddy proxy /api/ on the same origin). Cookies are always sent so the
// Flask-Login session works, and a custom header marks requests as coming
// from this application (the API can require it on state-changing routes as
// a CSRF check once that is enabled server-side).
import axios from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE || "",
  withCredentials: true,
  headers: { "X-Requested-With": "DMTC-UI" },
  timeout: 30000,
});

export default http;
