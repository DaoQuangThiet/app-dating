import { AntdRegistry } from '@ant-design/nextjs-registry'
import { App, ConfigProvider } from 'antd'
import { Noto_Sans_JP } from 'next/font/google'

export const notoSanJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  preload: false,
  display: 'swap',
})

const theme = {
  token: {
    fontFamily: notoSanJP.style.fontFamily,
    colorLink: 'black',
  },
  components: {
    Input: {
      activeBorderColor: 'rgb(6, 199, 85)',
      addonBg: 'rgba(234, 17, 17, 0.02)',
      hoverBorderColor: 'rgb(6, 199, 85)',
      activeShadow: '#06c755',
    },
  },
}

export default function AntDesignProviders({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <AntdRegistry>
      <ConfigProvider theme={theme}>
        <App>{children}</App>
      </ConfigProvider>
    </AntdRegistry>
  )
}
