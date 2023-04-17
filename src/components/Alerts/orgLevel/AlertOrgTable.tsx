import React, { useMemo, useState, useEffect } from "react";
import { AlertSummary } from "../../../../types/apiResponse/apis";
import PaginationCard from "@/components/paginationCard";
const paginationConstant = 15;
type Props = {
  alertDataForSelectedDate: AlertSummary[];
  dateInput: string;
};

function AlertOrgTable({ alertDataForSelectedDate, dateInput }: Props) {
  const [filterById, setFilterById] = useState("");

  const [page, setPage] = useState(0);
  const pagination = useMemo(() => {
    return Array(
      Math.ceil(
        alertDataForSelectedDate[0]
          ? alertDataForSelectedDate[0].Users.length / paginationConstant
          : 1 / paginationConstant
      )
    )
      .fill(0)
      .map((_, i) => i + 1);
  }, [alertDataForSelectedDate]);
  useEffect(() => {
    setPage(0);
  }, [dateInput]);
  return (
    <div className="p-3 border rounded-2xl shadow-lg shadow-blue-200/60  mt-7">
      <div>
        <h4 className="p-1 font-medium">Search by UserId</h4>
        <div className="p-1">
          <input
            value={filterById}
            onChange={(e) => {
              if (e.target.value != "") {
                setPage(0);
              }
              setFilterById(e.target.value);
            }}
            type="text"
            placeholder="search by UserId"
            className="border-none rounded-lg bg-gray-100 w-full"
          />
        </div>

      </div>

      {
        alertDataForSelectedDate[0] ? (
          <div className="relative overflow-x-auto rounded-2xl mt-8 border shadow">
            <table className="w-full overflow-hidden text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              </thead>
              <tbody>
                {alertDataForSelectedDate[0]?.Users.filter((id, i) => {
                  return filterById.toLowerCase() === ""
                    ? id
                    : id.toLowerCase().includes(filterById.toLowerCase());
                })
                  .slice(
                    page * paginationConstant,
                    page * paginationConstant + paginationConstant
                  )
                  .map((user, i) => (
                    <tr
                      key={user + i}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-2 py-1 font-normal text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <td className="pt-1 text-xs font-semibold"> User : {user}</td>

                          <td className="pt-1 text-xs">Device : {alertDataForSelectedDate[0].Devices[alertDataForSelectedDate[0].Users.indexOf(user)]}</td>
                          <td className="pt-1 text-xs">Alerts :  {alertDataForSelectedDate[0].Counts[alertDataForSelectedDate[0].Users.indexOf(user)]}</td>
                        </div>

                      </th>

                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-3">
            <h4 className="p-1 text-center">
              No Alerts for selecetd date please change the date
            </h4>
          </div>
        )
      }
      {
        !filterById && pagination.length > 1 && (
          <PaginationCard page={page} setPage={setPage} pagination={pagination} />
        )
      }
    </div>
  );
}

export default AlertOrgTable;
