import React, { useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Hero } from '../components/Hero'
import { TriggerFeed } from '../components/TriggerFeed'
import { MOCK_TRIGGERS } from '../lib/mockData'

export default function HomePage() {
  const router = useRouter()
  const feedRef = useRef<HTMLDivElement>(null)

  function scrollToFeed() {
    feedRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Head>
        <title>Trigger Stocks — Track Catalysts Early</title>
      </Head>

      <Hero
        onLearnMore={() => router.push('/why-trigger-stocks')}
        onSeeDetails={() => router.push('/what-is-a-trigger')}
        onFindTriggers={scrollToFeed}
      />

      <div id="feed" ref={feedRef} className="px-4 py-8">
        <TriggerFeed triggers={MOCK_TRIGGERS} />
      </div>

      <footer className="px-4 py-8 border-t border-[#183446]">
        <p className="text-xs text-center text-[#EAF2F7]/40 leading-relaxed px-4">
          Disclaimer: Information provided is for informational purposes only and does not constitute financial advice.
        </p>
      </footer>
    </>
  )
}
