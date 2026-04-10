import React, { useState } from 'react'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { User, Mail, Phone, MapPin, Camera, Check } from 'lucide-react'
import { useRequireAuth } from '../../lib/auth'

export default function EditProfilePage() {
  const { status } = useRequireAuth()
  const { data: session } = useSession()

  const [formData, setFormData] = useState({
    name: session?.user?.name ?? '',
    email: session?.user?.email ?? '',
    phone: '',
    location: '',
    bio: '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    }, 1000)
  }

  if (status === 'loading') {
    return <div className="flex items-center justify-center h-64 text-[#EAF2F7]/30 text-sm">Loading…</div>
  }

  return (
    <>
      <Head><title>Edit Profile — Trigger Stocks</title></Head>

      <div className="flex-1 p-6 pb-32">
        <div className="flex flex-col items-center mb-10">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#38AECC] to-[#0090C1] p-1 shadow-[0_0_30px_rgba(56,174,204,0.2)]">
              <div className="w-full h-full rounded-full bg-[#022F40] flex items-center justify-center border border-white/10 overflow-hidden">
                {session?.user?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={session.user.image} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-white/20" />
                )}
              </div>
            </div>
            <button className="absolute bottom-0 right-0 bg-[#38AECC] text-[#022F40] p-2 rounded-full border-4 border-[#022F40] shadow-lg active:scale-90 transition-transform">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-4 text-[10px] font-bold text-[#38AECC] uppercase tracking-widest">Change Photo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: 'Full Name', key: 'name', type: 'text', icon: User, placeholder: 'Your name' },
            { label: 'Email Address', key: 'email', type: 'email', icon: Mail, placeholder: 'name@example.com' },
            { label: 'Phone Number', key: 'phone', type: 'tel', icon: Phone, placeholder: '+1 (555) 000-0000' },
            { label: 'Location', key: 'location', type: 'text', icon: MapPin, placeholder: 'City, Country' },
          ].map(({ label, key, type, icon: Icon, placeholder }) => (
            <div key={key} className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EAF2F7]/30 ml-1">{label}</label>
              <div className="relative">
                <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EAF2F7]/20" />
                <input
                  type={type}
                  placeholder={placeholder}
                  value={formData[key as keyof typeof formData]}
                  onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                  className="w-full bg-[#183446] border border-[#046E8F]/20 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#38AECC] transition-all"
                />
              </div>
            </div>
          ))}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EAF2F7]/30 ml-1">Bio</label>
            <textarea
              rows={4}
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-[#183446] border border-[#046E8F]/20 rounded-2xl py-4 px-5 text-sm text-[#EAF2F7]/80 focus:outline-none focus:border-[#38AECC] transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className={`w-full h-16 rounded-2xl font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-2xl ${
              isSaved
                ? 'bg-green-500 text-white shadow-green-900/40'
                : isSaving
                  ? 'bg-[#183446] text-[#EAF2F7]/20 cursor-wait'
                  : 'bg-[#38AECC] text-[#022F40] shadow-cyan-950/40 hover:opacity-90'
            }`}
          >
            {isSaved ? (
              <><Check className="w-5 h-5" />Profile Updated</>
            ) : isSaving ? (
              <div className="w-5 h-5 border-2 border-[#EAF2F7]/20 border-t-[#EAF2F7] rounded-full animate-spin" />
            ) : (
              'Save Changes'
            )}
          </button>
        </form>
      </div>
    </>
  )
}
