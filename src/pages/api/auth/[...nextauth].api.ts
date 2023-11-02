import { PrismaAdapter } from "@/lib/auth/prisma-adapter";
import { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";

export function buildNextAuthOptions(
  req: NextApiRequest | NextPageContext["req"],
  res: NextApiResponse | NextPageContext["res"]
): NextAuthOptions {
  return {
    adapter: PrismaAdapter(req, res),

    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
            scope:
              "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
          },
        },
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            avatar_url: profile.picture,
          };
        },
      }),
      GithubProvider({
        clientId: process.env.GITHUB_ID ?? "",
        clientSecret: process.env.GITHUB_SECRET ?? "",
        profile(profile: GithubProfile) {
          return {
            id: profile.id.toString(),
            name: profile.name ?? profile.login,
            email: profile.email!,
            avatar_url: profile.picture,
          };
        },
      }),
    ],
    callbacks: {
      async session({ session, user }) {
        // return {
        //   ...session,
        //   user,
        // }
        session.user.id = user.id;

        return session;
      },
    },
  };
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, buildNextAuthOptions(req, res));
}
