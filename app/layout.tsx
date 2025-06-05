import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { RootClientLayout } from "./root-client-layout";
import Script from "next/script";
import {DefaultSEO} from "@/components/SEO";


export const metadata = DefaultSEO()

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });




export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      {/* Move the Script component outside of Head */}
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8295063989085416`}
        crossOrigin="anonymous"
      />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RootClientLayout>{children}</RootClientLayout>
      </body>
    </html>
  );
}