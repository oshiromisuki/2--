import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BINGO クイズ',
  description: 'BINGO Game with Quiz',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="font-sans">
      <head>
        <style>
          {`
            html, body {
              font-family: "Meiryo UI", "メイリオ", Meiryo, sans-serif;
            }
          `}
        </style>
      </head>
      <body className="font-sans bg-black text-white">
        {children}
      </body>
    </html>
  )
}
