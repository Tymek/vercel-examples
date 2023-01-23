import { Layout, Text, Page, Code, Link, List } from '@vercel/examples-ui'
import { UNLEASH_API_PROXY_FRONTEND } from '../utils'

function Home() {
  return (
    <Page className="flex flex-col gap-12">
      <section className="flex flex-col gap-6">
        <Text variant="h1">Feature flags with Unleash</Text>
        <Text>
          Scaling Unleash Proxy on Vercel Edge Functions. Decreasing latency and
          traffic volume to Unleash instance by putting feature toggle
          definitions close to the user.
        </Text>
      </section>

      <section className="flex flex-col gap-3">
        <Text variant="h2">A/B testing with Next.js Middleware</Text>
        <Text>
          Visit
          <Link href="/ab">
            <Code>/ab</Code> page
          </Link>
          . You will be redirected in the middleware to a variant based on a
          feature flag.
        </Text>
      </section>
      <section className="flex flex-col gap-3">
        <Text variant="h2">Frontend API</Text>
        <Text>
          <List>
            <li>
              <Link href={UNLEASH_API_PROXY_FRONTEND}>
                {UNLEASH_API_PROXY_FRONTEND}
              </Link>
            </li>
          </List>
        </Text>
      </section>
    </Page>
  )
}

Home.Layout = Layout

export default Home
