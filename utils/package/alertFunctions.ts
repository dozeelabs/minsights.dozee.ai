import { AlertSummary } from "../../types/apiRespnse/apis";

export const sortAlertSummary = (data: AlertSummary[]) => {
  data.sort(function (a, b) {
    return b.Sum > a.Sum;
  });
  return data;
};
