import Head from "next/head";
import React, { useState } from "react";
import Router from "next/router";
import { getServerSession } from "next-auth";
import { getDeviceDetails, getPairLogs } from "../../utils/package/serverSideApiCalls";
import { RecordsPageProps } from "../../types/pageProps/pageProps";
import Link from 'next/link';
import { parseCookie } from "@/utils/Auth";
// import refdc from '../records/trends'
export async function getServerSideProps<GetServerSideProps>(context: any) {
  const { AccessToken } = parseCookie(context.req.headers.cookie);
  let data = null;
  let pairLogsDetails = null;
  if (context.query.prefix && context.query.number) {
    try {
      const response = await getDeviceDetails(
        context.query.prefix,
        context.query.number,
        AccessToken
      );
      data = response.data;
      const pairLogs = await getPairLogs(
        context.query.prefix,
        context.query.number,
        context.query.time,
        AccessToken
      );
      pairLogsDetails = pairLogs.data;
    } catch {
      console.log("there was an error");
    }
  }
  return {
    props: {
      data,
      pairLogsDetails,
    },
  };
}


function Index({ data }: RecordsPageProps) {
  const [devicePrefix, setDevicePrefix] = useState("DP");
  const [deviceNumber, setDeviceNumber] = useState("");
  const [dateInput, setDateInput] = useState(
    new Date().toLocaleDateString("fr-CA")
  ); const [page, setPage] = useState(0);

  function handelDeviceSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    Router.push({
      pathname: `/records`,
      query: {
        prefix: devicePrefix,
        number: deviceNumber,
      },
    });
  }
  const pushToTrends = () => {
    Router.push({
      pathname: "../records/trends",
      query: {

      }
    })
  }
  return (
    <>
      <Head>
        <title>Records</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-[896px]">
        {/* <button className="bg-red-500"
        onClick={() =>pushToTrends()}>  Trends
        </button> */}
        <div className="p-4 max-w-[1800px] m-auto flex flex-col  overflow-hidden">
          <form onSubmit={handelDeviceSearch}>
            <div className="flex flex-row pb-5">
              <input
                type="date"
                value={dateInput}
                onChange={(e) => {
                  setPage(0);
                  setDateInput(e.target.value);
                }}
                className="border-none rounded-lg bg-gray-100 "
              />
            </div>
            <div className="p-3 border rounded-2xl shadow-lg shadow-blue-200/60 flex overflow-hidden">
              <div>
                <h4 className="p-1 font-medium">
                  Search with Dozee number
                </h4>
                <div className="p-1 flex flex-row justify-between overflow-hidden flex-wrap">

                  <div className="p-1 flex rounded-lg bg-gray-100 w-8/12 ">
                    <select
                      value={devicePrefix}
                      onChange={(e) => setDevicePrefix(e.target.value)}
                      name="devicePrefix"
                      className="border-none bg-gray-100 focus:ring-0"
                    >
                      <option value="DP">DP</option>
                      <option value="DOZ">DOZ</option>
                      <option value="DZ">DZ</option>
                    </select>

                    <input
                      value={deviceNumber}
                      onChange={(e) => setDeviceNumber(e.target.value)}
                      type="text"
                      placeholder="Device no"
                      className="border-none rounded-lg bg-gray-100 text-base  overflow-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-theme p-1  rounded-lg w-3/12 text-white right tracking-wide overflow-hidden"
                  >
                    <h5>Search</h5>
                  </button>
                  {/* </div> */}
                </div>
                {/* </div> */}

              </div>
            </div>
          </form>
          {data && (
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
                              <td className="px-6 py-4 text-center">
                                {d.DeviceId}
                              </td>
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
                              <td className="px-6 py-4 text-center">
                                {d.Sequence}
                              </td>
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
          )}
        </div>
      </main>
    </>
  );
}

export default Index;
//