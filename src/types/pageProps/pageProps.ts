import { AlertSummary, DevicePairLogsResponse } from "../apiResponse/apis";
import { DeviceInformation } from "../apiResponse/apis";

export interface AlertPageProps {
  alertData: AlertSummary[];
  userName: string;
}
export interface AlertOrgPageProps {
  data: AlertSummary[];
  date: string;
  orgName: string;
}
export interface detectionPageProps {
  data2: any;
}
export interface RecordsPageProps {
  data: DeviceInformation[] | null;
  pairLogsDetails: DevicePairLogsResponse[];
}
