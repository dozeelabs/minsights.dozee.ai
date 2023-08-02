import React from "react";
import { DeviceInformation } from "../../types/apiResponse/apis";
import Link from "next/link";
type Props = {
  data: DeviceInformation[];
};

function RecordersUserCards({ data }: Props) {
  return (
    <div className="mt-12 flex justify-center gap-2">
      {data[0].UserId ? (
        <Link href={`/records/${data[0].UserId}`}>
          <div className="p-2 px-4 border rounded-lg flex flex-col shadow-lg cursor-pointer">
            <label className="text-center font-semibold p-2">UserId</label>
            <span className="text-xs">{data[0].UserId}</span>
            <div className="flex justify-between text-sm p-2">
              <span>Ward: {data[0].Ward}</span>{" "}
              <span>BedNo: {data[0].Bed}</span>
            </div>
          </div>
        </Link>
      ) : (
        <span className="p-2 rounded-lg bg-red-300 border border-red-500 text-sm flex flex-col items-center">
          <svg
            className="h-8 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          Device not paired
        </span>
      )}
    </div>
  );
}

export default RecordersUserCards;
