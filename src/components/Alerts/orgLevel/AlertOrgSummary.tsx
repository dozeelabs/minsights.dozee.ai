import React, { SetStateAction } from "react";
import { AlertSummary } from "../../../../types/apiResponse/apis";

type Props = {
  dateInput: string;
  setDateInput: React.Dispatch<SetStateAction<string>>;
  alertDataForSelectedDate: AlertSummary[];
  orgName: string;
};

function AlertOrgSummary({
  dateInput,
  setDateInput,
  orgName,
  alertDataForSelectedDate,
}: Props) {
  return (
          <div className="p-3 border rounded-2xl shadow-lg shadow-blue-200/60 flex flex-col ">
            <div>
              <div>
                {" "}
                <h3 className="p-1 font-medium">Alerts Summary</h3>
                <h6 className="p-1 text-sm">({orgName})</h6>
              </div>
              <div className="flex justify-between">


                <div className="flex flex-1 justify-between">
                  <span>
                    {" "}
                    <h4 className="font-medium p-1">
                      Total Users: {alertDataForSelectedDate[0]?.Users.length}
                                         </h4>{" "}
                   </span>
                   <span>
                     {" "}
                    <h4 className="font-medium p-1">
                      Total Alerts:{alertDataForSelectedDate[0]?.Sum}
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

export default AlertOrgSummary;
