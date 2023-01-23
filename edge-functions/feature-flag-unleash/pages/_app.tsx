import type { AppProps } from 'next/app'
import type { LayoutProps } from '@vercel/examples-ui/layout'

import { getLayout, Layout as DefaultLayout } from '@vercel/examples-ui'

import '@vercel/examples-ui/globals.css'

function App({ Component, pageProps }: AppProps) {
  const Layout = getLayout<LayoutProps>(Component)

  return (
    <Layout
      title="feature-flag-unleash"
      path="edge-functions/feature-flag-unleash"
      description="feature-flag-unleash"
    >
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
