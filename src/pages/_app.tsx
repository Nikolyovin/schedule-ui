import '@/styles/globals.css'
// import '../../node_modules/antd/dist/antd'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
