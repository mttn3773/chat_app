const baseUrl = `${window.location.protocol}//${window.location.host}/`;

const ENDPOINTS = {
  login: baseUrl + "api/auth/login",
  register: baseUrl + "api/users",
  me: baseUrl + "api/auth/me",
  verify: (token: string) => `${baseUrl}api/users/verify/${token}`,
  sendNewVerificationLink: baseUrl + "/api/users/verify/new",
  sendForgotPasswordEmail: baseUrl + "/api/users/forgot-password",
};

export const config = {
  endpoints: ENDPOINTS,
};
