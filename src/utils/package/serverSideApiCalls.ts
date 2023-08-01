import axios from "axios";
const BASE_URL = process.env.HOST_URL;

export function getAlertSummary(AccessToken: string) {
  return axios({
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}api/counters/alerts/get?summary=true`,
    headers: {
      Authorization: `Bearer ${AccessToken}`,
    },
  });
}

export function getDetectionSummary(AccessToken: string, pageName: number) {
  const url = `https://insights.gateway.dozee.cloud/api/detection/find?page=${pageName}`;
  return axios({
    method: "get",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      Authorization: `Bearer ${AccessToken}`,
    },
  });
}

export function getDeviceDetails(
  prefix: string,
  Sequence: string,
  AccessToken: string
) {
  return axios({
    method: "get",
    maxBodyLength: Infinity,
    url: `https://xdevices.dozee.cloud/api/devices/get?filter=Prefix:${prefix}&filter=Sequence:${Sequence}&paired=ignore`,
    headers: {
      Authorization: `Bearer ${AccessToken}`,
    },
  });
}

export function getOrgName(orgID: string) {
  return axios({
    method: "get",
    maxBodyLength: Infinity,
    url: `https://console.senslabs.io/api/organizations/info/get?organizationId=${orgID}`,
  });
}

export function getPairLogs(
  Prefix: string,
  Sequence: string,
  Time: string,
  AccessToken: string
) {
  return axios({
    method: "get",
    url: `${BASE_URL}api/users/get`,
    params: {
      prefix: Prefix,
      sequence: Sequence,
      to: Time,
    },
    headers: {
      Authorization: `Bearer ${AccessToken}`,
    },
  });
}