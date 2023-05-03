import { store } from '@/store/store'
import '@/styles/globals.css'
// import '../../node_modules/antd/dist/antd'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
