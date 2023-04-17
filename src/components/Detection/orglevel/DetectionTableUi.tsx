import React, { useMemo, useState } from "react";
import PaginationCard from "@/components/paginationCard";
const paginationConstant = 10;

type Props = {
  dataForSelecetdDate: OrgLevelData[];
};
interface OrgLevelData {
  userId: string;
  data: DectectionDeviceData[];
}
interface DectectionDeviceData {
  id: string;
  true: number | null;
  false: number | null;
}

function DetectionTableUi({ dataForSelecetdDate }: Props) {
  const [filterById, setFilterById] = useState("");
  const [page, setPage] = useState(0);

  const pagination = useMemo(() => {
    const length = dataForSelecetdDate.length || 0;
    return Array(Math.ceil(length / 10))
      .fill(0)
      .map((_, i) => i + 1);
  }, [dataForSelecetdDate]);
  return (
    <div className="p-4 max-w-[1800px] m-auto flex flex-col  overflow-hidden">
      <div className="p-3 border rounded-2xl shadow-lg shadow-blue-200/60 flex flex-col ">
        <div>
        <input
          value={filterById}
          onChange={(e) => {
            if (e.target.value != "") {
              // setPage(0);
            }
            setFilterById(e.target.value);
          }}
          type="text"
          placeholder={`Search for userId`}
          className="border-none rounded-lg bg-gray-100 w-full	 "
        />
      </div>
      <div className="flex flex-col gap-8 p-1 mt-3">
        {dataForSelecetdDate
          ?.filter((item: OrgLevelData) => {
            return filterById === ""
              ? item
              : item.userId.toLowerCase().includes(filterById.toLowerCase());
          })
          .slice(
            page * paginationConstant,
            page * paginationConstant + paginationConstant
          )
          .map((d: OrgLevelData, i: number) => (
            <div key={i} className="flex gap-2 border rounded-lg p-2">
              <div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                  <tbody>
                    {d.data.map((m: DectectionDeviceData, j: number) => (
                      <tr
                        key={j + i}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                            <th
                              scope="row"
                              className="px-2 py-1 font-normal text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                            >
                        </th>

                        <div className="flex flex-col">
                                <td className="pt-1 text-xs font-semibold"> User : {d.userId}</td>
                                <td className="pt-1 text-xs font-semibold"> Device : {m.id}</td>
                                <td className="pt-1 text-xs font-semibold">Detection Percentage : {m.true && m.false ? Math.round((m.true/(m.false*4)*100)) +'%' : "--"}</td>
                                <div className="flex flex-row justify-between">
                                <td className="pt-1 text-xs">Uploads :  {m.false ? m.false : "--"}</td>
                                <td className="pt-1 text-xs">Detections : {m.true ? m.true : "--"}</td>
                                </div>

                              </div>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        {dataForSelecetdDate.length < 1 && <h3>No data for selecetd date</h3>}
        {pagination.length > 1 && (
          <PaginationCard
            setPage={setPage}
            page={page}
            pagination={pagination}
          />
        )}
      </div>
      </div>
    </div>
  );
}

export default DetectionTableUi;
