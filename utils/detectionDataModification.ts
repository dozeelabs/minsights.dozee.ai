import { DetectionSummaryResponse } from "@/types/apiRespnse/apis";

export default function Fulldata(data: DetectionSummaryResponse[]) {
  let map: any = {};

  for (let i = 0; i < data.length; i++) {
    if (!map[data[i].Date]) {
      map[data[i].Date] = {
        true: [],
        false: {},
      };
    }
    if (data[i].Detected) {
      map[data[i].Date].true.push(data[i]);
    } else {
      map[data[i].Date].false[data[i].OrganizationId] = data[i];
    }
  }
  let finalData: any = {};
  for (const key in map) {
    if (!finalData[key]) {
      finalData[key] = [];
    }
    map[key].true.sort(
      (a: DetectionSummaryResponse, b: DetectionSummaryResponse) => {
        return a.Sum < b.Sum ? 1 : -1;
      }
    );

    map[key].true.forEach((element: DetectionSummaryResponse) => {
      const temp = {
        orgId: element.OrganizationId,
        orgName: element.OrganizationName,
        true: { ...element },
        false: map[key].false[element.OrganizationId],
      };
      finalData[key].push(temp);
    });
  }
  return finalData;
}

export function detectionDataModificationOrgLevel(
  data: DetectionSummaryResponse[]
) {
  const map: any = {};
  data.forEach((d) => {
    if (!map[d.Date]) {
      map[d.Date] = {
        true: {},
        false: {},
      };
    }
    if (d.Detected) {
      map[d.Date].true = d;
    } else {
      map[d.Date].false = d;
    }
  });

  let finalData: any = {};

  for (const key in map) {
    const temp: any = {};
    map[key].true.UserIds?.forEach((id: string, i: number) => {
      if (!temp[id]) {
        temp[id] = {
          userId: id,
          data: {},
        };
      }
      if (!temp[id].data[map[key].true.DeviceIds[i]]) {
        temp[id].data[map[key].true.DeviceIds[i]] = {
          id: map[key].true.DeviceIds[i],
          true: map[key].true.Counts[i],
          false: null,
        };
      }
    });
    map[key].false.UserIds?.forEach((id: string, i: number) => {
      if (!temp[id]) {
        temp[id] = {
          userId: id,
          data: {},
        };
      }

      if (!temp[id].data[map[key].false.DeviceIds[i]]) {
        temp[id].data[map[key].false.DeviceIds[i]] = {
          id: map[key].false.DeviceIds[i],
          false: map[key].false.Counts[i],
          true: null,
        };
      } else {
        temp[id].data[map[key].false.DeviceIds[i]].false =
          map[key].false.Counts[i];
      }
    });

    finalData[key] = temp;
  }
  // let finalData2: any = {};

  for (const key in finalData) {
    let arr = [];

    for (const i in finalData[key]) {
      const temp = {
        userId: i,
        data: [],
      };
      let temparr: any = [];
      for (const j in finalData[key][i].data) {
        // temp.data.push(finalData[key].i.data[j]);
        temparr.push(finalData[key][i].data[j]);
      }
      temp.data = temparr;
      arr.push(temp);
    }
    finalData[key] = arr;
  }

  return finalData;
}
