import { OrgNamesApiResponse } from "../types/apiResponse/apis"
import { getDetectionSummary, getOrgName } from "./package/serverSideApiCalls";

// export default function detectionDataModification(
//   data: DetectionSummaryResponse[]
// ) {
//   let map: any = {};

//   for (let i = 0; i < data?.length; i++) {
//     if (!map[data[i].Date]) {
//       map[data[i].Date] = {
//         true: [],
//         false: {},
//       };
//     }
//     if (data[i].Detected) {
//       map[data[i].Date].true.push(data[i]);
//     } else {
//       map[data[i].Date].false[data[i].OrganizationId] = data[i];
//     }
//   }
//   let finalData: any = {};
//   for (const key in map) {
//     if (!finalData[key]) {
//       finalData[key] = [];
//     }
//     map[key].true.sort(
//       (a: DetectionSummaryResponse, b: DetectionSummaryResponse) => {
//         return a.Sum < b.Sum ? 1 : -1;
//       }
//     );

//     map[key].true.forEach((element: DetectionSummaryResponse) => {
//       const temp = {
//         orgId: element.OrganizationId,
//         orgName: element.OrganizationName,
//         true: { ...element },
//         false: map[key].false[element.OrganizationId],
//       };
//       finalData[key].push(temp);
//     });
//   }
//   return finalData;
// }

// export function detectionDataModificationOrgLevel(
//   data: DetectionSummaryResponse[]
// ) {
//   const map: any = {};
//   data.forEach((d) => {
//     if (!map[d.Date]) {
//       map[d.Date] = {
//         true: {},
//         false: {},
//       };
//     }
//     if (d.Detected) {
//       map[d.Date].true = d;
//     } else {
//       map[d.Date].false = d;
//     }
//   });

//   let finalData: any = {};

//   for (const key in map) {
//     const temp: any = {};
//     map[key].true.UserIds?.forEach((id: string, i: number) => {
//       if (!temp[id]) {
//         temp[id] = {
//           userId: id,
//           data: {},
//         };
//       }
//       if (!temp[id].data[map[key].true.DeviceIds[i]]) {
//         temp[id].data[map[key].true.DeviceIds[i]] = {
//           id: map[key].true.DeviceIds[i],
//           true: map[key].true.Counts[i],
//           false: null,
//         };
//       }
//     });
//     map[key].false.UserIds?.forEach((id: string, i: number) => {
//       if (!temp[id]) {
//         temp[id] = {
//           userId: id,
//           data: {},
//         };
//       }

//       if (!temp[id].data[map[key].false.DeviceIds[i]]) {
//         temp[id].data[map[key].false.DeviceIds[i]] = {
//           id: map[key].false.DeviceIds[i],
//           false: map[key].false.Counts[i],
//           true: null,
//         };
//       } else {
//         temp[id].data[map[key].false.DeviceIds[i]].false =
//           map[key].false.Counts[i];
//       }
//     });

//     finalData[key] = temp;
//   }

//   for (const key in finalData) {
//     let arr = [];

//     for (const i in finalData[key]) {
//       const temp = {
//         userId: i,
//         data: [],
//       };
//       let temparr: any = [];
//       for (const j in finalData[key][i].data) {
//         temparr.push(finalData[key][i].data[j]);
//       }
//       temp.data = temparr;
//       arr.push(temp);
//     }
//     finalData[key] = arr;
//   }

//   return finalData;
// }

type id = {
  Date: string;
  DeviceId: string;
  OrganizationId: string;
  Source: number;
};
type detection = {
  BreathRates?: number;
  BreathRatesWithConfidence?: number;
  Epochs?: number;
  HeartRates?: number;
  HeartRatesWithConfidence?: number;
  _id: id;
};
type Stats = {
  Epochs: number;
  hr: number;
  hrcc: number;
  br: number;
  brcc: number;
};
export async function fetchAllDetectionData(AccessToken: string) {
  let resultArr: any[] = [];

  async function helper(pageNumber: number) {
    const response = await getDetectionSummary(AccessToken, pageNumber);

    resultArr = [...resultArr, ...response.data["documents"]];

    if (response.data["documents"].length === 1000) {
      await helper(pageNumber + 1);
    }
  }

  await helper(1);

  const res = await modification(resultArr);
  return res;
}

export async function modification(inputArr: detection[]) {
  let map: any = {};
  for (let i = 0; i < inputArr.length; i++) {
    const curr = inputArr[i];
    const tempobj = {
      Epochs: curr.Epochs,
      orgId: curr._id.OrganizationId,
      DeviceId: curr._id.DeviceId,
      source: curr._id.Source,
      hr: curr.HeartRates || null,
      br: curr.BreathRates || null,
      hrcc: curr.HeartRatesWithConfidence || null,
      brcc: curr.BreathRatesWithConfidence || null,
    };
    if (!curr.Epochs) {
      continue;
    }
    if (!map[curr._id.Date]) {
      map[curr._id.Date] = {};
    }
    if (!map[curr._id.Date][curr._id.OrganizationId]) {
      map[curr._id.Date][curr._id.OrganizationId] = [];
    }
    map[curr._id.Date][curr._id.OrganizationId].push(tempobj);
  }

  const orgIdSet = new Set<string>();

  for (let date in map) {
    for (let org in map[date]) {
      orgIdSet.add(org);
    }
  }
  let url = "";
  orgIdSet.forEach((i) => {
    url += i + ",";
  });
  const orgNames = await getOrgName(url.slice(0, -1));
  const names: OrgNamesApiResponse[] = orgNames.data;
  let namesMap: any = {};
  names.forEach((name) => {
    namesMap[name.OrganizationId] = name.OrganizationName;
  });
  let finalData: any = {};
  for (let date in map) {
    if (!finalData[date]) {
      finalData[date] = { stats: {}, data: [] };
    }
    for (let org in map[date]) {
      const count = map[date][org].reduce(
        (sum: Stats, i: any) => {
          sum["Epochs"] += i.Epochs || 0;
          sum["hr"] += i.hr || 0;
          sum["hrcc"] += i.hrcc || 0;
          sum["br"] += i.br || 0;
          sum["brcc"] += i.brcc || 0;
          return sum;
        },
        {
          Epochs: 0,
          hr: 0,
          hrcc: 0,
          br: 0,
          brcc: 0,
        }
      );
      const temp = {
        orgId: org,
        orgName: namesMap[org],
        data: map[date][org],
        stats: count,
      };
      for (let date in finalData) {
        const stats = finalData[date].data.reduce(
          (sum: Stats, i: any) => {
            sum["Epochs"] += i.stats.Epochs || 0;
            sum["hr"] += i.stats.hr || 0;
            sum["hrcc"] += i.stats.hrcc || 0;
            sum["br"] += i.stats.br || 0;
            sum["brcc"] += i.stats.brcc || 0;
            return sum;
          },
          {
            Epochs: 0,
            hr: 0,
            hrcc: 0,
            br: 0,
            brcc: 0,
          }
        );
        finalData[date].stats = stats;
      }
      finalData[date].data.push(temp);
    }
  }

  return finalData;
}
