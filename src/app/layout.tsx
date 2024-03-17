import './css/style.css'
import AntDesignProvider, { notoSanJP } from '@/providers/AntDesignProvider'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const metadata = {
  title: 'HHLL',
  icons: {
    icon: '/Logo_vertical.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <body
        className={`${notoSanJP.className} font-inter antialiased bg-white text-gray-900 tracking-tight`}
      >
        <AntDesignProvider>
          <ReactQueryProvider>
            <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
              {children}
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
          </ReactQueryProvider>
        </AntDesignProvider>
      </body>
    </html>
  )
}
