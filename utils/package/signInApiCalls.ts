import axios from "axios";
const BASE_URL = "https://console.gateway.senslabs.io";

export function requestOTP(medium: string, mediumValue: string) {
  return axios({
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/api/otp/request`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      Medium: medium,
      MediumValue: mediumValue,
    },
  });
}

export function verifyOtpApiCall(
  sessionId: string,
  medium: string,
  mediumValue: string,
  otp: string
) {
  return axios({
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/api/otp/verify?category=USER`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      SessionId: sessionId,
      Medium: medium,
      MediumValue: mediumValue,
      Otp: otp,
    },
  });
}

export function getAccessAndRefershToken(AuthToken: string) {
  return axios({
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/api/tokens/request`,
    headers: {
      Authorization: `Bearer ${AuthToken}`,
    },
  });
}
