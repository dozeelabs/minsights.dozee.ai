import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      Role: string;
      id: string;
      name: string;
      AccessToken: string;
      RefreshToken: string;
    };
  }
}