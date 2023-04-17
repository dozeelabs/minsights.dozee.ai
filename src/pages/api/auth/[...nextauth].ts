import axios from "axios";
import { get } from "https";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt_decode from "jwt-decode";

export const authOptions: NextAuthOptions = {
  //setting up the auth
  providers: [
    CredentialsProvider({
      name: "Credential",
      type: "credentials",
      credentials: {},

      async authorize(credentials, req) {
        const user = credentials as {
          RefreshToken: string;
          AccessToken: string;
        };
        //every time signin function is called this is invoked along with all the credentials
        //decode the AcessToken in credentials
        let decode: any = jwt_decode(user.AccessToken);
        decode = JSON.parse(decode.sub);
        let authRole = decode.AuthRole;
        if (authRole === "") {
          //if auth role is support then sign in here have to add that split by |  and check the role now that logic is not there becase
          // none of us have that role lol 🥲
          const update = {
            name: decode.FirstName,
            id: decode.UserId,
            Role: "SUPPORT",
          };
          return {
            ...user,
            ...update,
          };
        }
        // if the user doesnt have role donot alow the access
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signInPage",
  },
  callbacks: {
    //in order to use the user object in client side we have to provode the callbacks to include the user object in jwt token
    // in order for this jwt token to work there should be a secret in .env file
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
};

export default NextAuth(authOptions);