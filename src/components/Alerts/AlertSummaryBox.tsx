import React, { SetStateAction } from "react";
type Props = {
  totalOrgs: number;
  totalAlertsInaDay: number;
  date: string;
  setDate: React.Dispatch<SetStateAction<string>>;
};
function AlertSummaryBox({
  totalOrgs,
  totalAlertsInaDay,
  date,
  setDate,
}: Props) {
  return (
    <div className="p-3 border rounded-2xl shadow-lg shadow-blue-200/60 flex flex-col ">
      <div>
        <div>
          {" "}
          <h3 className="p-1 font-medium">Alerts Summary</h3>
        </div>
        <div className="flex justify-between">

          <div className="flex flex-1 justify-between">
            <span>
              {" "}
              <h4 className="font-medium p-1">
                Total orgs: {totalOrgs}
              </h4>{" "}
            </span>
            <span>
              {" "}
              <h4 className="font-medium p-1">
                Total Alerts: {totalAlertsInaDay}
              </h4>
            </span>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}
export default AlertSummaryBox;
