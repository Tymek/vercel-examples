import { GetServerSideProps } from 'next'
import { addBasePath } from 'next/dist/client/add-base-path'
import { Layout, Page } from '@vercel/examples-ui'
import { FlagProvider, evaluateFlags, randomSessionId } from '@unleash/nextjs'
import { SimplePage } from '../components/SimplePage'
import {
  UNLEASH_API_PROXY_DEFINITIONS,
  UNLEASH_API_PROXY_FRONTEND,
  UNLEASH_COOKIE_NAME,
  type PageType,
} from '../utils'

type Props = {
  unleash: {
    url: string
    toggles: string
    sessionId: string
  }
}

const RehydratedPage: PageType<Props> = ({ unleash }) => (
  <Page className="flex flex-col gap-12">
    <FlagProvider
      config={{
        bootstrap: JSON.parse(unleash.toggles),
        url: unleash.url,
        context: { sessionId: unleash.sessionId },
      }}
    >
      <SimplePage>
        In this example your feature flags are pre-filled server-side and
        refreshed periodically client-side.
      </SimplePage>
    </FlagProvider>
  </Page>
)

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { req } = ctx
  const sessionId = req.cookies[UNLEASH_COOKIE_NAME] || randomSessionId()
  const context = { sessionId } // you can populate it from user cookie etc.

  const apiUrl = `http${req?.url?.startsWith('https') ? 's' : ''}://${
    req?.headers?.host || 'localhost:3000'
  }${addBasePath('')}`

  // grab definitions from cache endpoint
  const definitions = await fetch(
    `${apiUrl}${UNLEASH_API_PROXY_DEFINITIONS}?token=${process.env.UNLEASH_PROXY_SECRET}`
  )
    .then((res) => res.json())
    .catch(() => ({ features: [] }))
  const { toggles } = evaluateFlags(definitions, context)

  return {
    props: {
      unleash: {
        toggles: JSON.stringify(toggles),
        url: `${apiUrl}${UNLEASH_API_PROXY_FRONTEND}`, // provide the url to revalidate flags on client
        sessionId,
      },
    },
  }
}

RehydratedPage.Layout = Layout

export default RehydratedPage
