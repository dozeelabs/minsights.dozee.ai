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

export function getDetectionSummary(AccessToken: string) {
  return axios({
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}api/counters/detection/get?summary=true`,
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
