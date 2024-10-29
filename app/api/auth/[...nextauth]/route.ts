import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import InstagramProvider from "next-auth/providers/instagram";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "auth/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        return null;
      },
    }),
    // TODO: OAuth providers
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_SECRET_ID as string,
    // }),
    // InstagramProvider(({
    //   clientId: process.env.INSTAGRAM_CLIENT_ID as string,
    //   clientSecret: process.env.INSTAGRAM_SECRET_ID as string,
    // }))
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };