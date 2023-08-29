import { OrgNamesApiResponse } from "../types/apiResponse/apis"
import { getDetectionSummary, getOrgName } from "./package/serverSideApiCalls";

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
  ProcessableEpochs?: number;
  _id: id;
};
type Stats = {
  Epochs: number;
  hr: number;
  hrcc: number;
  br: number;
  brcc: number;
  ProcessableEpochs?: number;
};
export async function fetchAllDetectionData(AccessToken: string, date: string) {
  let resultArr: any[] = [];

  async function helper(pageNumber: number) {
    console.log("detection data page started", pageNumber);
    const response = await getDetectionSummary(AccessToken, pageNumber, date);

    resultArr = [...resultArr, ...response.data["documents"]];
    console.log("data fetched", pageNumber);
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
      ProcessableEpochs: curr?.ProcessableEpochs || null,
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
          sum.ProcessableEpochs += i.ProcessableEpochs;
          return sum;
        },
        {
          Epochs: 0,
          hr: 0,
          hrcc: 0,
          br: 0,
          brcc: 0,
          ProcessableEpochs: 0,
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
            sum.ProcessableEpochs += i.stats.ProcessableEpochs || 0;
            return sum;
          },
          {
            Epochs: 0,
            hr: 0,
            hrcc: 0,
            br: 0,
            brcc: 0,
            ProcessableEpochs: 0,
          }
        );
        finalData[date].stats = stats;
      }
      finalData[date].data.push(temp);
    }
  }

  return finalData;
}
