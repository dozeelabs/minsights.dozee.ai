import React, { SetStateAction, useMemo } from "react";
import { DetectionSummaryResponse } from "../../../../types/apiResponse/apis";

type Props = {
  totaluser: number;
  orgName: string;
  dateInput: string;
  setDateInput: React.Dispatch<SetStateAction<string>>;
  setPage: React.Dispatch<SetStateAction<number>>;
  data: DetectionSummaryResponse[];
};

function SummaryBox({
  orgName,
  dateInput,
  setDateInput,
  setPage,
  data,
  totaluser,
}: Props) {
  const statusForSelectedDate = useMemo(() => {
    return data
      ?.filter((i) => {
        return i.Date === dateInput;
      })
      .reduce(
        (sum, i) => {
          if (i.Detected) {
            sum.detections = i.Sum;
          } else {
            sum.uploads = i.Sum;
          }
          return sum;
        },
        { uploads: 0, detections: 0 }
      );
  }, [dateInput]);

  return (
    <div className="p-4 max-w-[1800px] m-auto flex flex-col  overflow-hidden">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row-reverse pb-5">
          <input
            type="date"
            value={dateInput}
            onChange={(e) => {
              setPage(0);
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
          </div>
          <div className="flex justify-between">

          <div className="flex flex-col flex-1 justify-between">
          <span className="flex flex-row justify-between">
                {" "}
                <h4 className="font-medium p-1">
                  Total Users: {totaluser}
                </h4>{" "}
                <h4 className="font-medium  p-1">
                      Detection :  {Math.round((statusForSelectedDate.detections / (statusForSelectedDate?.uploads * 4) * 100))}%
                    </h4>
              </span>
              <span>
              </span>
              <div className="flex flex-row justify-between">
                {" "}
                <h4 className="font-medium  p-1">
                  Uploads : {statusForSelectedDate.uploads}
                </h4>
                <h4 className="font-medium  p-1">
                  Detections : {statusForSelectedDate.detections}
                </h4>
              </div>
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
