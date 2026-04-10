import { useState, FormEvent } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Mail, Lock, Eye, EyeOff, ArrowRight, UserPlus, AlertCircle } from 'lucide-react'
import { RocketIcon } from '../components/RocketIcon'

type Mode = 'login' | 'signup' | 'forgot'

const PROVIDERS = [
  {
    id: 'google',
    label: 'Google',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
  },
  {
    id: 'apple',
    label: 'Apple',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.702z" />
      </svg>
    ),
  },
  {
    id: 'facebook',
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
]

export default function LoginPage({ callbackUrl }: { callbackUrl: string }) {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [forgotSent, setForgotSent] = useState(false)

  const destination = callbackUrl || '/'

  async function handleOAuth(providerId: string) {
    setOauthLoading(providerId)
    setError(null)
    await signIn(providerId, { callbackUrl: destination })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (mode === 'forgot') {
      // Password reset — wire up to a real email service later
      setForgotSent(true)
      return
    }

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setError('Passwords do not match.')
        return
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters.')
        return
      }
    }

    setLoading(true)
    const result = await signIn('credentials', {
      redirect: false,
      email: email.trim().toLowerCase(),
      password,
    })
    setLoading(false)

    if (result?.error) {
      if (result.error === 'TooManyRequests') {
        setError('Too many attempts. Please wait 15 minutes before trying again.')
      } else {
        setError('Invalid email or password.')
      }
      return
    }

    router.replace(destination)
  }

  return (
    <>
      <Head>
        <title>Sign In — Trigger Stocks</title>
      </Head>

      <div className="min-h-screen bg-[#022F40] flex flex-col max-w-lg mx-auto overflow-x-hidden">
        <div className="flex-1 px-8 pt-12 pb-24 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-[#0090C1] flex items-center justify-center mb-6 shadow-xl shadow-cyan-900/20 p-3">
            <RocketIcon className="w-full h-full" />
          </div>

          <h1 className="text-3xl font-bold mb-2 tracking-tight text-white">
            {mode === 'login' && 'Welcome Back'}
            {mode === 'signup' && 'Create Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h1>
          <p className="text-[#EAF2F7]/50 text-sm mb-10 text-center max-w-[240px]">
            {mode === 'login' && 'Sign in to follow companies and track triggers.'}
            {mode === 'signup' && 'Join traders tracking stock catalysts early.'}
            {mode === 'forgot' && 'Enter your email to receive a recovery link.'}
          </p>

          {/* OAuth buttons */}
          {mode !== 'forgot' && (
            <>
              <div className="w-full grid grid-cols-3 gap-3 mb-8">
                {PROVIDERS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleOAuth(p.id)}
                    disabled={!!oauthLoading}
                    aria-label={`Sign in with ${p.label}`}
                    className="flex items-center justify-center h-14 bg-[#183446] border border-[#046E8F]/20 rounded-xl hover:bg-[#1c3d52] transition-colors active:scale-[0.95] disabled:opacity-50"
                  >
                    {oauthLoading === p.id ? (
                      <div className="w-4 h-4 border-2 border-[#EAF2F7]/20 border-t-[#EAF2F7] rounded-full animate-spin" />
                    ) : (
                      p.icon
                    )}
                  </button>
                ))}
              </div>

              <div className="w-full flex items-center gap-4 mb-8">
                <div className="h-[1px] flex-1 bg-[#183446]" />
                <span className="text-[10px] font-bold text-[#EAF2F7]/20 uppercase tracking-[0.2em]">Or email</span>
                <div className="h-[1px] flex-1 bg-[#183446]" />
              </div>
            </>
          )}

          {/* Error banner */}
          {error && (
            <div className="w-full flex items-center gap-3 px-4 py-3 mb-6 bg-red-400/10 border border-red-400/20 rounded-xl">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-xs text-red-400 font-bold">{error}</p>
            </div>
          )}

          {/* Forgot-sent confirmation */}
          {forgotSent ? (
            <div className="w-full text-center space-y-4">
              <div className="px-6 py-8 bg-green-400/10 border border-green-400/20 rounded-2xl">
                <p className="text-green-400 font-bold text-sm">
                  If an account exists for <span className="text-white">{email}</span>, a recovery link has been sent.
                </p>
              </div>
              <button
                onClick={() => { setForgotSent(false); setMode('login') }}
                className="text-sm text-[#38AECC] font-bold"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full space-y-4" noValidate>
              {/* Email */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#EAF2F7]/40 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EAF2F7]/30" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#183446] border border-[#046E8F]/20 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#38AECC] transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              {mode !== 'forgot' && (
                <div className="space-y-1">
                  <div className="flex justify-between items-end pr-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#EAF2F7]/40 ml-1">
                      Password
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => { setMode('forgot'); setError(null) }}
                        className="text-[10px] font-bold uppercase tracking-widest text-[#38AECC]"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EAF2F7]/30" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                      minLength={mode === 'signup' ? 8 : 1}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#183446] border border-[#046E8F]/20 rounded-xl py-4 pl-12 pr-12 text-sm text-white focus:outline-none focus:border-[#38AECC] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#EAF2F7]/30 hover:text-[#EAF2F7]/60 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Confirm password */}
              {mode === 'signup' && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#EAF2F7]/40 ml-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EAF2F7]/30" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#183446] border border-[#046E8F]/20 rounded-xl py-4 pl-12 pr-12 text-sm text-white focus:outline-none focus:border-[#38AECC] transition-all"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#38AECC] to-[#0090C1] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs mt-4 shadow-[0_10px_30px_rgba(0,144,193,0.3)] flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:opacity-90 disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {mode === 'login' && 'Sign In'}
                    {mode === 'signup' && 'Get Started'}
                    {mode === 'forgot' && 'Send Reset Link'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Mode switcher */}
          {!forgotSent && (
            <div className="mt-12 w-full">
              {mode === 'login' && (
                <div className="flex flex-col items-center gap-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EAF2F7]/20">
                    New to Trigger Stocks?
                  </p>
                  <button
                    onClick={() => { setMode('signup'); setError(null) }}
                    className="w-full flex items-center justify-center gap-2 py-4 border border-[#38AECC]/30 rounded-xl text-[#38AECC] font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#38AECC]/5 active:scale-[0.98] transition-all"
                  >
                    <UserPlus className="w-4 h-4" />
                    Create New Account
                  </button>
                </div>
              )}
              {mode === 'signup' && (
                <div className="flex flex-col items-center gap-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EAF2F7]/20">
                    Already have an account?
                  </p>
                  <button
                    onClick={() => { setMode('login'); setError(null) }}
                    className="w-full flex items-center justify-center gap-2 py-4 border border-[#EAF2F7]/10 rounded-xl text-[#EAF2F7]/60 font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/5 active:scale-[0.98] transition-all"
                  >
                    Sign In to Dashboard
                  </button>
                </div>
              )}
              {mode === 'forgot' && !forgotSent && (
                <button
                  onClick={() => { setMode('login'); setError(null) }}
                  className="w-full text-center text-sm text-[#38AECC] font-bold"
                >
                  Back to Sign In
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context)

  // Already logged in — redirect away from login page
  if (session) {
    const callbackUrl = (context.query.callbackUrl as string) || '/'
    return { redirect: { destination: callbackUrl, permanent: false } }
  }

  return {
    props: {
      callbackUrl: (context.query.callbackUrl as string) || '/',
    },
  }
}
