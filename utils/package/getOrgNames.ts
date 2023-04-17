import axios from "axios";

type Data = {
  OrganizationId: string;
};

// export async function getOrgName(data: Data[]) {
//   let set = new Set();
//   data.forEach((org) => {
//     set.add(org.OrganizationId);
//   });
//   let url = "";
//   for (let org of set) {
//     url = url + "," + org;
//   }
//   const names = await axios({
//     method: "get",
//     maxBodyLength: Infinity,
//     url: `https://console.senslabs.io/api/organizations/info/get?organizationId=${url.slice(
//       1
//     )}`,
//   });
//   let i = 0;
//   let map = new Map();
//   for (let org of set) {
//     map.set(org, names.data[i].OrganizationName);
//     i++;
//   }
//   return map;
// }
