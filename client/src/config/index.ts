const baseUrl = `${window.location.protocol}//${window.location.host}/`;

const ENDPOINTS = {
  login: baseUrl + "api/auth/login",
  register: baseUrl + "api/users",
  me: baseUrl + "api/auth/me",
  verify: baseUrl + "api/users/verify",
  reset_password: baseUrl + "api/users/reset-password",
  sendNewVerificationLink: baseUrl + "/api/users/verify/new",
  sendForgotPasswordEmail: baseUrl + "/api/users/forgot-password",
};

export const config = {
  endpoints: ENDPOINTS,
};
