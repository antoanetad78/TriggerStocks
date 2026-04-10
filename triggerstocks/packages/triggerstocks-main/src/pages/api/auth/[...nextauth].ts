import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { STUB_USERS } from '../../../lib/stubUsers'
import { checkRateLimit, resetRateLimit } from '../../../lib/rateLimiter'

declare module 'next-auth' {
  interface User {
    role?: 'user' | 'admin'
  }
  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      role?: 'user' | 'admin'
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'user' | 'admin'
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),

    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: process.env.APPLE_SECRET!,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      id: 'credentials',
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null

        // Normalise and validate format before any DB/store lookup
        const email = credentials.email.trim().toLowerCase()
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null
        if (credentials.password.length < 6 || credentials.password.length > 128) return null

        // Rate-limit by IP
        const ip =
          (req.headers?.['x-forwarded-for'] as string)?.split(',')[0].trim() ??
          req.headers?.['x-real-ip'] ??
          '0.0.0.0'
        const { allowed } = checkRateLimit(ip)
        if (!allowed) throw new Error('TooManyRequests')

        const user = STUB_USERS.find(u => u.email === email)
        if (!user) {
          // Perform a dummy comparison to prevent timing attacks that reveal
          // whether an account exists
          await bcrypt.compare(credentials.password, '$2a$12$dummyhashfortimingequalisation00000')
          return null
        }

        const valid = await bcrypt.compare(credentials.password, user.passwordHash)
        if (!valid) return null

        // Successful login — clear rate-limit counter for this IP
        resetRateLimit(ip)

        return { id: user.id, email: user.email, name: user.name, role: user.role }
      },
    }),
  ],

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60,   // refresh token daily
  },

  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === 'production'
          ? '__Secure-next-auth.session-token'
          : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  callbacks: {
    async jwt({ token, user }) {
      // Persist role into the JWT on first sign-in
      if (user?.role) token.role = user.role
      return token
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role
      return session
    },
  },

  // CSRF protection and signed/encrypted JWTs are on by default.
  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === 'development',
}

export default NextAuth(authOptions)
