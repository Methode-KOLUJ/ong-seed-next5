'use client'

import { useEffect, ReactNode } from 'react'

type GoogleAdProps = {
  adSlot: string
  format?: string
  responsive?: boolean
  children?: ReactNode
}

export default function GoogleAd({
  adSlot,
  format = 'auto',
  responsive = true,
  children,
}: GoogleAdProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
       // @ts-expect-error: 'adsbygoogle' est injecté dynamiquement par le script AdSense
(window.adsbygoogle = window.adsbygoogle || []).push({})

      }
    } catch (e) {
      console.error('AdSense error:', e)
    }
  }, [])

  return (
    <div>
      {children}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4867090224776887"
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}
