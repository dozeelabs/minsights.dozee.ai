import axios from "axios";

export function requestOtp(medium: string, mediumValue: string) {
  const data = JSON.stringify({
    Medium: medium,
    MediumValue: mediumValue,
  });
  return axios({
    method: "post",
    maxBodyLength: Infinity,
    url: "https://console.gateway.senslabs.io/api/otp/request",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
}
export function verifyOtp(
  medium: string,
  mediumValue: string,
  otp: string,
  sessionId: string
) {
  const data = JSON.stringify({
    SessionId: sessionId,
    Medium: medium,
    MediumValue: mediumValue,
    Otp: otp,
  });
  return axios({
    method: "post",
    maxBodyLength: Infinity,
    url: "https://console.gateway.senslabs.io/api/otp/verify?category=USER",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
}
export function getToken(authToken: string) {
  return axios({
    method: "get",
    maxBodyLength: Infinity,
    url: "https://console.gateway.senslabs.io/api/tokens/request",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}
