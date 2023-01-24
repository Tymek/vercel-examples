import type { AppProps } from 'next/app'
import type { LayoutProps } from '@vercel/examples-ui/layout'
import { getLayout } from '@vercel/examples-ui'

import '@vercel/examples-ui/globals.css'

function App({ Component, pageProps }: AppProps) {
  const Layout = getLayout<LayoutProps>(Component)

  return (
    <Layout
      title="feature-flag-unleash"
      path="edge-functions/feature-flag-unleash"
      deployButton={{
        env: ['UNLEASH_PROXY_SECRET', 'UNLEASH_BASE_URL', 'UNLEASH_API_TOKEN'],
      }}
    >
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
