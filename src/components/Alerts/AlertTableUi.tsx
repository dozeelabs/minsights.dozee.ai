import React, { useState, useMemo, useEffect } from "react";
import PaginationCard from "../paginationCard";
import { AlertSummary } from "../../types/apiResponse/apis";
import Link from "next/link";
const NoOfOrgPerPage = 5;

type Props = {
  alertDataForSelectedDate: AlertSummary[];
  date: string;
};

function AlertTableUi({ alertDataForSelectedDate, date }: Props) {
  const [page, setPage] = useState(0);
  const [searchOrg, setSearchOrg] = useState<string>("");
  const pagination = useMemo(() => {
    const length = alertDataForSelectedDate?.length || 0;
    return Array(Math.ceil(length / NoOfOrgPerPage))
      .fill(0)
      .map((_, i) => i + 1);
  }, [date]);
  useEffect(() => {
    setPage(0);
  }, [date]);

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
          className="border-none rounded-lg bg-gray-100 text-base w-full"
        />
      </div>
      <div className="relative overflow-x-auto rounded-2xl mt-5 border shadow">
        <table className="w-full overflow-hidden  text-sm text-left text-gray-500 dark:text-gray-400  justify-around  ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          </thead>
          <tbody>
            {alertDataForSelectedDate
              .filter((org) => {
                return searchOrg === ""
                  ? org
                  : org.OrganizationName?.toLowerCase().includes(
                    searchOrg.toLowerCase()
                  );
              })
              .slice(
                page * NoOfOrgPerPage,
                page * NoOfOrgPerPage + NoOfOrgPerPage
              )
              .map((org, i) => (
                <tr
                  key={org.OrganizationId + i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-2 py-4 w-full font-normal text-xs text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                  >
                    {/* <div className="bg-red-500 	 flex-row justify-center justify-items-center	 justify-self-center	content-center	 items-center	 self-center	place-content-center	place-items-center	place-self-center		"> */}
                    <Link
                      href={`/alert?orgId=${org.OrganizationId}&date=${date}`}
                    >
                      <div className="font-semibold">

                        Org Id :
                        {" "}
                        {org.OrganizationName}

                      </div>
                    </Link>
                    <div className="flex justify-between">
                      <td className="pt-4">Alerts : {org.Sum}</td>
                      <td className="pt-4">Devices : {org.Devices.length}</td>
                      <td className="pt-4">Patients : {org.Users.length}</td>
                    </div>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {
        pagination.length > 1 && (
          <PaginationCard page={page} setPage={setPage} pagination={pagination} />
        )
      }
    </div >
  );
}
export default AlertTableUi;


