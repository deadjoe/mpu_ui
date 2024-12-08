import type { Metadata } from 'next'
import { GeistSans } from 'geist/font'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/ibm-plex-sans/700.css'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import cn from 'classnames'

export const metadata: Metadata = {
  title: 'MPU Management Platform',
  description: 'Management Platform for System Administration',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <body className={cn('min-h-screen bg-background font-sans antialiased', GeistSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
