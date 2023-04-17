import React, { SetStateAction, useMemo } from "react";
import {
  DetectionStatsForSelectedDate,
  ModifiedDetectionData,
} from "../../../types/apiResponse/apis";
type props = {
  detectionDataForSelectedDate: ModifiedDetectionData[];
  dateInput: string;
  setDateInput: React.Dispatch<SetStateAction<string>>;
};

function DetectionSummaryBox({
  detectionDataForSelectedDate,
  dateInput,
  setDateInput,
}: props) {
  const detectionStatsForSelectedDate: DetectionStatsForSelectedDate =
    useMemo(() => {
      return detectionDataForSelectedDate?.reduce(
        (sum, i) => {
          sum.detections = sum.detections + i.true?.Sum || sum.uploads;
          sum.uploads =  sum.uploads + i.false?.Sum || sum.uploads;
          return sum;
        },
        { uploads: 0, detections: 0 }
      );
    }, [detectionDataForSelectedDate]);
  return (
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
                Total orgs: {detectionDataForSelectedDate?.length}
              </h4>{" "}
              <h4 className="font-medium  p-1">
                Detection :  {Math.round((detectionStatsForSelectedDate.detections / (detectionStatsForSelectedDate?.uploads * 4) * 100))}%
              </h4>
            </span>
            <span>
            </span>
            <div className="flex flex-row justify-between">
              {" "}
              <h4 className="font-medium  p-1">
                Uploads : {detectionStatsForSelectedDate?.uploads}
              </h4>
              <h4 className="font-medium  p-1">
                Detections : {detectionStatsForSelectedDate?.detections}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}

export default DetectionSummaryBox;
