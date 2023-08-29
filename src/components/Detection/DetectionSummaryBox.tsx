import React, { SetStateAction, useMemo } from "react";
import MIN_DATE from "@/utils/minDate";
import {
  ModifiedDetectionDataForSelectedDate,
  ModifiedDetectionData,
} from "@/types/apiResponse/apis";
type props = {
  detectionDataForSelectedDate: ModifiedDetectionDataForSelectedDate;
  dateInput: string;
};

function DetectionSummaryBox({
  detectionDataForSelectedDate,
  dateInput,
}: props) {
  return (
    <div className="p-3 border rounded-2xl shadow-lg shadow-blue-200/60 flex flex-col ">
      <div>
        <div>
          {" "}
          <h3 className="p-1 font-medium">Detection Summary</h3>
        </div>
        {detectionDataForSelectedDate && (
          <div className="flex justify-between">

            <div className="flex flex-col flex-1 justify-between">
              <span className="flex flex-row justify-between">
                <h4 className="font-medium p-1">
                  Total orgs: {detectionDataForSelectedDate.data.length}
                </h4>{" "}
                <h4 className="font-medium p-1">
                  ProcessableEpochs: {detectionDataForSelectedDate.stats.Epochs}
                </h4>{" "}
              </span>
              <span className="flex flex-row justify-between">
                <h4 className="font-medium p-1">
                  HR: {" "}
                  {Math.round(
                    (detectionDataForSelectedDate.stats.hr /
                      detectionDataForSelectedDate.stats.Epochs) *
                    100
                  )}
                  %
                </h4>{" "}
                <h4 className="font-medium p-1">
                  RR: {" "}
                  {Math.round(
                    (detectionDataForSelectedDate.stats.br /
                      detectionDataForSelectedDate.stats.Epochs) *
                    100
                  )}
                  %
                </h4>{" "}
              </span>
              <span className="flex flex-row justify-between">
                <h4 className="font-medium p-1">
                  HRC: {" "}
                  {Math.round(
                    (detectionDataForSelectedDate.stats.hrcc /
                      detectionDataForSelectedDate.stats.Epochs) *
                    100
                  )}
                  %
                </h4>{" "}
                <h4 className="font-medium p-1">
                  RRC: {" "}
                  {Math.round(
                    (detectionDataForSelectedDate.stats.brcc /
                      detectionDataForSelectedDate.stats.Epochs) *
                    100
                  )}
                  %
                </h4>{" "}
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
        )}
      </div>
      <div>
      </div>
    </div>
  );
}

export default DetectionSummaryBox;
