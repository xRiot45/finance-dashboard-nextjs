import type { Metadata } from "next"
import { Geist, Merriweather, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/shared/providers/theme-provider"
import "./globals.css"

const fontSans = Geist({
    subsets: ["latin"],
    variable: "--font-sans",
})

const fontSerif = Merriweather({
    subsets: ["latin"],
    variable: "--font-serif",
    weight: ["400", "700"],
})

const fontMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
})

export const metadata: Metadata = {
    title: "Finance Dashboard NextJS",
    description: "A modern, enterprise-ready finance dashboard foundation built with Next.js.",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`}
            suppressHydrationWarning
        >
            <body className="antialiased">
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    )
}
