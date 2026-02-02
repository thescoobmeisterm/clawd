import './globals.css'

export const metadata = {
  title: 'Clawd Status',
  description: 'A visual dashboard showing Clawd\'s mood, thoughts, and tasks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
