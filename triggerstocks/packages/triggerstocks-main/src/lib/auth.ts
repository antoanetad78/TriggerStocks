import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

/** Returns the current session. Redirects to /login if unauthenticated. */
export function useRequireAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace(`/login`)
    }
  }, [status, router])

  return { session, status }
}

/** Like useRequireAuth but also enforces admin role. */
export function useRequireAdmin() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login')
    } else if (status === 'authenticated' && (session?.user as any)?.role !== 'admin') {
      router.replace('/')
    }
  }, [status, session, router])

  return { session, status }
}
