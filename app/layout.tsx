import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Flagstar Bank",
  description: "Secure online banking with Flagstar Bank",
  generator: "Flagstar Bank",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <title>Flagstar Bank</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
