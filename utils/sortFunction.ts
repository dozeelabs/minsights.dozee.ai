import { DetectionSummaryResponse } from "../types/apiResponse/apis";

export function sortObjects(arr: DetectionSummaryResponse[]) {
  const sortedTrue = arr
    .filter((obj) => obj.Detected === true)
    .sort((a, b) => {
      if (a.Date === b.Date) {
        return b.Sum - a.Sum;
      } else {
        return a.Date.localeCompare(b.Date);
      }
    });
  const idsTrue = new Set(
    sortedTrue.map((obj) => obj.OrganizationId + obj.OrganizationId)
  );
  const result = [];

  for (const obj of sortedTrue) {
    result.push(obj);
    idsTrue.delete(obj.OrganizationId + obj.Date);
    const falseObj = arr.find(
      (o) =>
        o.OrganizationId === obj.OrganizationId &&
        o.OrganizationId === obj.Date &&
        o.Detected === false &&
        !idsTrue.has(o.OrganizationId + o.Date)
    );
    if (falseObj) {
      result.push(falseObj);
    }
  }

  const remaining = arr.filter(
    (obj) =>
      obj.Detected === false || !idsTrue.has(obj.OrganizationId + obj.Date)
  );
  result.push(...remaining);

  return result;
}
