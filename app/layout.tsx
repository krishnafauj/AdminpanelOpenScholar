import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import Sidebar from "@/components/Sidebar/Sidebar"
import { TopNav } from "@/components/Nav/TopNav"
import { PlayerProvider } from "@/context/PlayerContext"
import { UIProvider } from "@/context/UiContext"

import ReduxProvider from "./redux-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Soundverse DNA",
  description: "Assignment",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-zinc-900 bg-white`}>
        <ReduxProvider>
          <PlayerProvider>
            <UIProvider>
              <div className="flex flex-col h-[100dvh] w-full overflow-hidden">
                
                {/* 🌐 UNIVERSAL TOP NAV */}
                <TopNav />

                {/* 🧱 APP SHELL */}
                <div className="flex flex-1 overflow-hidden relative">
                  <Sidebar />

                  <main className="flex-1 h-full overflow-hidden border-l border-zinc-200 bg-white">
                    {children}
                  </main>

                
                </div>

              </div>
            </UIProvider>
          </PlayerProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
