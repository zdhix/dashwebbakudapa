// src/lib/auth.ts
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

export interface UserRole {
  pemda: string;
  role: 'admin' | 'user';
  allowedSheets: string[];
}

interface User {
  id: string;
  name: string;
  role: UserRole;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Replace this with your actual authentication logic
        if (credentials?.username === "KAB.MINAHASA" && credentials?.password === "yourpassword") {
          return {
            id: "1",
            name: "KAB.MINAHASA",
            role: {
              pemda: "KAB.MINAHASA",
              role: "user",
              allowedSheets: ["DAU_2024", "DAK_2024", "DANADESA_2024"]
            }
          } as User;
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT, user: User | null }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: JWT }) {
      session.user.role = token.role;
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  }
};

export default NextAuth(authOptions);