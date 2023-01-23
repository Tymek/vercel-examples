import Cookies from 'js-cookie'
import { Layout, Text, Page, Link, Button } from '@vercel/examples-ui'
import {
  UNLEASH_API_PROXY_FRONTEND,
  UNLEASH_COOKIE_NAME,
  type PageType,
} from '../utils'

const onRemoveCookie = () => {
  Cookies.remove(UNLEASH_COOKIE_NAME)
}

const Home: PageType = () => (
  <Page className="flex flex-col gap-12">
    <section className="flex flex-col gap-6">
      <Text variant="h1">Feature flags with Unleash</Text>
      <Text>
        Scaling Unleash Proxy on Vercel Edge Functions. Decreasing latency and
        traffic volume to Unleash instance by putting feature toggle definitions
        close to the user. Stickiness is achieved by setting a cookie.
      </Text>
      <div>
        <Button variant="secondary" className="mr-2.5" onClick={onRemoveCookie}>
          Reset session cookie
        </Button>
      </div>
    </section>

    <section className="flex flex-col gap-3">
      <Text variant="h2">A/B testing with Next.js Middleware</Text>
      <Text>
        Visit{' '}
        <Link href="/ab">
          <code>/ab</code> page
        </Link>
        . You will be redirected in the middleware to a variant based on a
        feature flag.
      </Text>
    </section>
    <section className="flex flex-col gap-3">
      <Text variant="h2">Frontend API</Text>
      <Text>
        See{' '}
        <code>
          <Link href="/rehydration">/rehydration</Link>
        </code>
        . With frontend API made available on{' '}
        <code>
          <Link href={UNLEASH_API_PROXY_FRONTEND}>
            {UNLEASH_API_PROXY_FRONTEND}
          </Link>
        </code>{' '}
        it is possible to get feature flags client-side, after initial state is
        evaluated fully server-side.
      </Text>
    </section>
  </Page>
)

Home.Layout = Layout

export default Home
