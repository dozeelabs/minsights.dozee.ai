export interface AlertSummary {
  OrganizationId: string;
  OrganizationName?: string;
  Date: string;
  Users: string[];
  Devices: string[];
  Counts: number[];
  Sum: number;
}
interface Firmware {
  Size: string;
  Latest: string;
  Current: String;
}
export interface DeviceInformation {
  DeviceId: string;
  Prefix: string;
  Sequence: number;
  OrganizationId: string;
  PairedAt: string | null;
  UnpairedAt: string | null;
  RecordedAt: string | null;
  UploadedAt: string | null;
  PingedAt: string | null;
  OnlineStatus: string | null;
  ActivationStatus: string | null;
  UserId: string | null;
  RowNumber: number;
  LicenceType: string | null;
  Bed: string | null;
  Ward: string | null;
  DeviceType: string | null;
  Properties: {
    Firmware: Firmware;
    BedNumber: string | null;
    WardNumber: string | null;
  };
  HardWareAddress: string | null;
  ProcessesAt: string | null;
  LastUploadedFile: string | null;
  ProcessingStatus: string | null;
  Route: string | null | number;
  UsageType: string | null;
}
export interface OrgNamesApiResponse {
  OrganizationId: string;
  OrganizationName: string;
}

export interface DevicePairLogsResponse {
  HostId: string;
  Operation: "PAIRED" | "UNPAIRED";
  Object: string;
  OldGuestId: string;
  NewGuestId: string;
  CreatedAt: string;
}
export interface detctionData {
  DeviceId: string;
  Epochs: number;
  br: number | null;
  brcc: number | null;
  hr: number | null;
  hrcc: number | null;
  orgId: string;
  source: number;
  ProcessableEpochs: number | null;
}

export interface ModifiedDetectionData {
  orgId: string;
  orgName: string;
  data: detctionData[];
  stats: {
    Epochs: number;
    hr: number;
    hrcc: number;
    br: number;
    brcc: number;
    ProcessableEpochs: number;
  };
}
export interface ModifiedDetectionDataForSelectedDate {
  stats: {
    Epochs: number;
    hr: number;
    hrcc: number;
    br: number;
    brcc: number;
    ProcessableEpochs: number;
  };
  data: ModifiedDetectionData[];
}

export interface DetectionStatsForSelectedDate {
  detections: number;
  uploads: number;
}