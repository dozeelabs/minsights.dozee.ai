import React, { useState } from "react";
import Router from "next/router";
function RecordsSearchBox() {
  const [devicePrefix, setDevicePrefix] = useState("DP");
  const [deviceNumber, setDeviceNumber] = useState("");

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
  return (
    <form onSubmit={handelDeviceSearch}>
      <div className="p-3 border rounded-2xl shadow-lg shadow-blue-200/60 flex gap-4 justify-center">
        <div>
          <h4 className="p-1 font-medium">
            Which Device are you looking for ?
          </h4>
          <div className="p-1 flex rounded-lg bg-gray-100">
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
              placeholder="Enter the device number"
              className="border-none bg-gray-100  focus:ring-0 "
            />
          </div>
        </div>

        <div className="flex flex-col-reverse p-2">
          <div className="p-1">
            <button
              type="submit"
              className="bg-blue-theme p-1 text-lg rounded-lg px-4 text-white  tracking-wide"
            >
              <h5>Search</h5>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default RecordsSearchBox;
