import React, { useEffect, useState, useMemo } from "react";
import { ModifiedDetectionData } from "../../../types/apiResponse/apis";
import PaginationCard from "../paginationCard";
import Link from "next/link";
const paginationConstant = 5;
type Props = {
  detectionDataForSelectedDate: ModifiedDetectionData[];
  dateInput: string;
};
function DetectionTableUi({ dateInput, detectionDataForSelectedDate }: Props) {
  const [page, setPage] = useState<number>(0);
  const [searchOrg, setSearchOrg] = useState<string>("");
  const pagination: number[] = useMemo(() => {
    const totalOrgsForSelectedDate = detectionDataForSelectedDate?.length || 0;

    return Array(Math.ceil(totalOrgsForSelectedDate / paginationConstant))
      .fill(0)
      .map((_, i) => i + 1);
  }, [detectionDataForSelectedDate]);
  useEffect(() => {
    setPage(0);
  }, [dateInput]);
  return (
    <div className="p-3 border rounded-2xl shadow-lg shadow-blue-200/60  mt-7">
      <h4 className="p-1 font-medium">
        Search by Organization
      </h4>
      <div className="p-1 flex flex-row justify-between">
        <input
          value={searchOrg}
          onChange={(e) => {
            setPage(0);
            setSearchOrg(e.target.value);
          }}
          type="text"
          placeholder="search by Organization"
          className="border-none rounded-lg bg-gray-100 text-base  w-full"
        />
      </div>

      <div className="relative overflow-x-auto rounded-2xl mt-5 border shadow">
        <table className="w-full overflow-hidden  text-sm text-left text-gray-500 dark:text-gray-400  justify-around	 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          </thead>
          <tbody>
            {detectionDataForSelectedDate &&
              detectionDataForSelectedDate
                .filter((org) => {
                  return searchOrg === ""
                    ? org
                    : org.orgName
                      .toLowerCase()
                      .includes(searchOrg.toLowerCase());
                })
                .slice(
                  page * paginationConstant,
                  page * paginationConstant + paginationConstant
                )
                .map((org, i) => (
                  <tr
                    key={org.orgId}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-2 py-4 w-full font-normal text-xs text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                    >
                      <Link
                        href={`/detection/${org.orgId}?date=${dateInput}`}
                      >
                        <div className="font-semibold">

                          Org Id : {''}
                          {org.orgName}

                        </div>
                      </Link>
                      <div className="flex flex-row justify-between">
                        <div className=" ">
                          <td className="pt-4 text-xs">Uploads : {org.false ? org.false.Sum : "--"}</td>
                        </div>
                        <div className="">

                          <td className="pt-4 text-xs text-left">Detections  : {org.true ? org.true.Sum : "--"}</td>
                        </div>
                        <div className="">

                          <td className="pt-4 text-xs font-semibold text-left">{org.true && org.false ? Math.round((org.true.Sum / (org.false.Sum * 4) * 100)) + '%' : "--"} </td>
                        </div>
                      </div>
                    </th>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {pagination.length > 1 && (
        <PaginationCard pagination={pagination} page={page} setPage={setPage} />
      )}
    </div>
  )
}


export default DetectionTableUi;