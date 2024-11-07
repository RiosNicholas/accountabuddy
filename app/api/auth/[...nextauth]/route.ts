import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import InstagramProvider from "next-auth/providers/instagram";
import { cookies } from "next/headers"; 
import { createClient } from '@supabase/supabase-js';
import { compare } from 'bcrypt';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);


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
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { data: user, error } = await supabase
          .from('Users')
          .select('*')
          .eq('email', credentials.email)
          .single();

        if (error || !user) {
          console.error("User not found or error:", error);
          return null;
        }

        const passwordCorrect = await compare(credentials.password, user.password);

        if (passwordCorrect) {
          return {
            id: user.id,
            email: user.email,
          };
        }

        console.log("Invalid credentials", credentials);
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