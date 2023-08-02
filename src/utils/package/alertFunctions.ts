import { AlertSummary } from "../../types/apiResponse/apis";

export const sortAlertSummary = (data: AlertSummary[]) => {
  data.sort(function (a, b) {
    if (b.Sum > a.Sum) return -1;
    return 1;
  });
  return data;
};
