/**
 * NextAuth.js Configuration for IronWorks Gym Member & Admin Sessions
 * SPManchester Private Limited · https://www.spmanchester.com
 */

import NextAuth, { type DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      memberRef: string;
      isAdmin: boolean;
      token: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    memberRef: string;
    isAdmin: boolean;
    token: string;
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/v1';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'IronWorks Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();
          if (!res.ok || !data.data) {
            return null;
          }

          const { member, accessToken } = data.data;

          return {
            id: member.id,
            name: `${member.firstName} ${member.lastName}`,
            email: member.email,
            memberRef: member.memberRef,
            isAdmin: Boolean(member.isAdmin),
            token: accessToken,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.memberRef = (user as any).memberRef;
        token.isAdmin = (user as any).isAdmin;
        token.accessToken = (user as any).token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.memberRef = token.memberRef as string;
        session.user.isAdmin = Boolean(token.isAdmin);
        session.user.token = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'ironworks-nextauth-super-secret-key-change-in-production',
});
