import React, { SetStateAction, useMemo } from "react";
import {
  DetectionStatsForSelectedDate,
  ModifiedDetectionData,
} from "../../types/apiResponse/apis";
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
              <h4 className="font-medium p-1">
                Total uploads:
              </h4>{" "}
              {/* <h4 className="font-medium  p-1">
                Detection :              {detectionStatsForSelectedDate
                  ? Math.round(
                    (detectionStatsForSelectedDate.detections /
                      (detectionStatsForSelectedDate.uploads * 4)) *
                    100
                  ) + "%"
                  : "--"}
              </h4> */}
            </span>
            <span>
            </span>
            {/* <div className="flex flex-row justify-between">
              {" "}
              <h4 className="font-medium  p-1">
                Uploads : {detectionStatsForSelectedDate?.uploads}
              </h4>
              <h4 className="font-medium  p-1">
                Detections : {detectionStatsForSelectedDate?.detections}
              </h4>
            </div> */}
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}

export default DetectionSummaryBox;
