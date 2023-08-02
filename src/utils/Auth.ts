export function parseCookie(cookie: string) {
    return cookie
      .split(";")
      .map((i) => {
        return i.split("=");
      })
      .reduce((sum: any, i) => {
        if (!sum[`${i[0].trim()}`]) {
          sum[`${i[0].trim()}`] = i[1];
        }
  
        return sum;
      }, {});
  }
  function deleteCookie(cookieName: string) {
    document.cookie =
      cookieName +
      "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" +
      ".dozee.ai" +
      "; path=/;";
  }
  
  export function Logout() {
    deleteCookie("AccessToken");
    deleteCookie("selectedOrgId");
    window.location.reload();
  }
  