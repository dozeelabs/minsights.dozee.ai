import React from "react";
import { DeviceInformation } from "../../../types/apiResponse/apis";

type Props = {
  data: DeviceInformation[];
};

function TableUi({ data }: Props) {
  return (
    <div className="p-3 border rounded-2xl shadow-lg shadow-blue-200/60 mt-8">
      <h4 className="p-1 font-medium">Device Summary</h4>
      <div>
        {
          <div className="relative overflow-x-auto rounded-2xl mt-8 border shadow">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Scope
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Information
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((d) => (
                  <React.Fragment key={d.DeviceId}>
                    <tr
                      key={d.DeviceId}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                      >
                        DeviceId
                      </th>
                      <td className="px-6 py-4 text-center">{d.DeviceId}</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                      >
                        Prefix
                      </th>
                      <td className="px-6 py-4 text-center">{d.Prefix}</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                      >
                        Sequence
                      </th>
                      <td className="px-6 py-4 text-center">{d.Sequence}</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                      >
                        OrganizationId
                      </th>
                      <td className="px-6 py-4 text-center">
                        {d.OrganizationId}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                      >
                        UserId
                      </th>
                      <td className="px-6 py-4 text-center">
                        {d.UserId ? d.UserId : "-"}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                      >
                        PairedAt
                      </th>
                      <td className="px-6 py-4 text-center">
                        {d.PingedAt ? d.PairedAt : "-"}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                      >
                        UnpairedAt
                      </th>
                      <td className="px-6 py-4 text-center">
                        {d.UnpairedAt ? d.UnpairedAt : "-"}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                      >
                        RecordedAt
                      </th>
                      <td className="px-6 py-4 text-center">
                        {d.RecordedAt ? d.RecordedAt : "-"}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                      >
                        UploadedAt
                      </th>
                      <td className="px-6 py-4 text-center">
                        {d.UploadedAt ? d.UploadedAt : "-"}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                      >
                        PingedAt
                      </th>
                      <td className="px-6 py-4 text-center">
                        {d.PingedAt ? d.PairedAt : "-"}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                      >
                        OnlineStatus
                      </th>
                      <td className="px-6 py-4 text-center">
                        {d.OnlineStatus ? d.OnlineStatus : "null"}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                      >
                        ActivationStatus
                      </th>
                      <td className="px-6 py-4 text-center">
                        {d.ActivationStatus ? d.ActivationStatus : "-"}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                      >
                        RowNumber
                      </th>
                      <td className="px-6 py-4 text-center">
                        {d.RowNumber ? d.RowNumber : "-"}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                      >
                        LicenceType
                      </th>
                      <td className="px-6 py-4 text-center">
                        {d.LicenceType ? d.LicenceType : "-"}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                      >
                        Ward
                      </th>
                      <td className="px-6 py-4 text-center">
                        {d.Ward ? d.Ward : "-"}
                        {d.Properties.WardNumber &&
                          ` (${d.Properties.WardNumber})`}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                      >
                        FirmWare Current
                      </th>
                      <td className="px-6 py-4 text-center">
                        {d.Properties.Firmware?.Current
                          ? d.Properties.Firmware.Current
                          : "-"}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                      >
                        FirmWare Latest
                      </th>
                      <td className="px-6 py-4 text-center">
                        {d.Properties.Firmware?.Latest
                          ? d.Properties.Firmware.Latest
                          : "-"}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                      >
                        HardWareAddress
                      </th>
                      <td className="px-6 py-4 text-center">
                        {d.HardWareAddress ? d.HardWareAddress : "-"}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                      >
                        LastUploadedFile
                      </th>
                      <td className="px-6 py-4 text-center">
                        {d.LastUploadedFile ? d.LastUploadedFile : "-"}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
}

export default TableUi;
