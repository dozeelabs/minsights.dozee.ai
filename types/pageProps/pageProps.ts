import { AlertSummary } from "../apiRespnse/apis";
import {
  DetectionSummaryResponse,
  DeviceInformation,
} from "../apiRespnse/apis";

export interface AlertPageProps {
  alertData: AlertSummary[];
}
export interface AlertOrgPageProps {
  data: AlertSummary[];
  date: string;
  orgName: string;
}
export interface detectionPageProps {
  data: DetectionSummaryResponse[];
}
export interface RecordsPageProps {
  data: DeviceInformation[] | null;
}
