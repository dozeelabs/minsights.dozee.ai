import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwtDecode from "jwt-decode";

export function middleware(request: NextRequest) {
  const AccessToken = request.cookies.get("AccessToken");
  const orgId = request.cookies.get("selectedOrgId");
  try {
    if (!AccessToken || !orgId) {
      throw new Error("invaild credentials");
    }
    const decoded: any = jwtDecode(AccessToken.value);

    if (decoded.exp < Date.now() / 1000) {
      throw new Error("AccessToken expired");
    }
  } catch {
    return NextResponse.redirect(
      new URL(
        `https://auth.dozee.ai?redirect=${
          process.env.HOST + request.nextUrl.pathname
        }`
      )
    );
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
