import React, { useEffect, useState, useMemo } from "react";
import { ModifiedDetectionDataForSelectedDate } from "@/types/apiResponse/apis";
import PaginationCard from "../paginationCard";
import Link from "next/link";
const paginationConstant = 10;

type Props = {
  detectionDataForSelectedDate: ModifiedDetectionDataForSelectedDate;
  dateInput: string;
};
function DetectionTableUi({ dateInput, detectionDataForSelectedDate }: Props) {
  const [page, setPage] = useState<number>(0);
  const [searchOrg, setSearchOrg] = useState<string>("");
  const pagination: number[] = useMemo(() => {
    const totalOrgsForSelectedDate =
      detectionDataForSelectedDate?.data.length || 0;

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
        {detectionDataForSelectedDate ? (
          <table className="w-full overflow-hidden  text-sm text-left text-gray-500 dark:text-gray-400  justify-around	 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            </thead>
            <tbody>
              {detectionDataForSelectedDate &&
                detectionDataForSelectedDate.data
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
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 truncate overflow-hidden"
                    >
                      <th
                        scope="row"
                        className="px-2 py-4 w-full font-normal text-xs text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                      >
                        <Link
                          href={`/detection/${org.orgId}?date=${dateInput}`}
                        >
                          <td className="font-semibold truncate overflow-hidden">

                            Org Id : {''}
                            {org.orgName}

                          </td>
                        </Link>
                        <td className="flex flex-row justify-between overflow-hidden">
                          <td className="pt-4 text-xs">Devices : {org.data.length}</td>
                          <td className="pt-4 text-xs text-left">ProcessableEpochs : {org.stats.Epochs}</td>
                        </td>
                        <td className="flex flex-row justify-between overflow-hidden">
                          <td className="pt-1 text-xs">HR% : {Math.round((org.stats.hr / org.stats.Epochs) * 100)}%</td>
                          <td className="pt-1 text-xs">RR% : {Math.round((org.stats.br / org.stats.Epochs) * 100)}%</td>
                        </td>
                        <td className="flex flex-row justify-between overflow-hidden">
                          <td className="pt-1 text-xs text-left">HRC% : {Math.round((org.stats.hrcc / org.stats.Epochs) * 100)}%</td>
                          <td className="pt-1 text-xs text-left">RRC% : {Math.round((org.stats.brcc / org.stats.Epochs) * 100)}%</td>
                        </td>
                      </th>
                    </tr>
                  ))}
            </tbody>
          </table>
        ) : (
          <h4 className="p-8">
            No data for selected date please change the date
          </h4>
        )}
      </div>
      {pagination.length > 1 && (
        <PaginationCard pagination={pagination} page={page} setPage={setPage} />
      )}
    </div>
  )
}


export default DetectionTableUi;