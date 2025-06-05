// types/global.d.ts

export {}

declare global {
  interface Window {
    adsbygoogle: {
      push: (args: Record<string, unknown>) => void
    }[]
  }
}
