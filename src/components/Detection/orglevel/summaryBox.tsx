import React, { SetStateAction } from "react";
import MIN_DATE from "@/utils/minDate";

type Props = {
  totalDevice: number;
  orgName: string;
  dateInput: string;
  setDateInput: React.Dispatch<SetStateAction<string>>;
  stats: {
    Epochs: number;
    hr: number;
    hrcc: number;
    br: number;
    brcc: number;
  };
};

function SummaryBox({
  orgName,
  dateInput,
  setDateInput,
  totalDevice,
  stats,
}: Props) {

  return (
    <div className="p-4 max-w-[1800px] m-auto flex flex-col  overflow-hidden">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row-reverse pb-5">
          <input
            min={MIN_DATE}
            max={new Date().toLocaleDateString("fr-CA")}
            type="date"
            value={dateInput}
            onChange={(e) => {
              setDateInput(e.target.value);
            }}
            className="border-none rounded-lg bg-gray-100 "
          />

        </div>
      </div>


      <div className="p-3 border rounded-2xl shadow-lg shadow-blue-200/60 flex flex-col ">
        <div>
          <div>
            {" "}
            <h3 className="p-1 font-medium">Detection Summary</h3>
            <h5 className="p-1 font-medium">{orgName}</h5>
          </div>
          <div className="flex justify-between">

            <div className="flex flex-col flex-1 justify-between">
              <span className="flex flex-row justify-between">
                {" "}
                <h4 className="font-medium p-1">
                  Total Devices: {totalDevice}
                </h4>{" "}
                <h4 className="font-medium p-1">
                  Total Epochs: {stats.Epochs}
                </h4>{" "}
              </span>
              <span className="flex flex-row justify-between">
                <h4 className="font-medium p-1">
                  HR : {Math.round((stats.hr / stats.Epochs) * 100)}%
                </h4>{" "}
                <h4 className="font-medium p-1">
                  RR : {Math.round((stats.br / stats.Epochs) * 100)}%
                </h4>{" "}
              </span>
              <span className="flex flex-row justify-between">
                <h4 className="font-medium p-1">
                  HRc : {Math.round((stats.hrcc / stats.Epochs) * 100)}%
                </h4>{" "}
                <h4 className="font-medium p-1">
                  RRc : {Math.round((stats.brcc / stats.Epochs) * 100)}%
                </h4>{" "}
              </span>
              <span>
              </span>
              <div className="flex flex-row justify-between">
                {" "}
                {/* <h4 className="font-medium  p-1">
                  Uploads : {statusForSelectedDate.uploads}
                </h4>
                <h4 className="font-medium  p-1">
                  Detections : {statusForSelectedDate.detections}
                </h4> */}
              </div>
              {/* <div className="p-2">
                <h4 className="p-1 font-medium">Select Date</h4>
                <input
                  min={MIN_DATE}
                  max={new Date().toLocaleDateString("fr-CA")}
                  type="date"
                  value={dateInput}
                  onChange={(e) => {
                    setDateInput(e.target.value);
                  }}
                  className="border-none rounded-lg bg-gray-100 "
                />
              </div> */}
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}

export default SummaryBox;
