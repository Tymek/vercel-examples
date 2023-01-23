import { GetServerSideProps, NextPage } from 'next'
import { addBasePath } from 'next/dist/client/add-base-path'
import { FlagProvider, evaluateFlags, type IToggle } from '@unleash/nextjs'
import { SimplePage } from '../components/SimplePage'
import {
  UNLEASH_API_PROXY_DEFINITIONS,
  UNLEASH_API_PROXY_FRONTEND,
} from '../utils'

type Props = {
  unleash: {
    url: string
    toggles: IToggle[]
  }
}

const Page: NextPage<Props> = ({ unleash }) => (
  <FlagProvider
    config={{
      bootstrap: unleash.toggles,
      url: unleash.url,
    }}
  >
    <SimplePage />
  </FlagProvider>
)

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { req } = ctx

  const apiUrl = `http${req?.url?.startsWith('https') ? 's' : ''}://${
    req?.headers?.host || 'localhost:3000'
  }${addBasePath('')}`

  const context = {} // you can populate it from user cookie etc.

  // grab definitions from cache endpoint
  const definitions = await fetch(
    `${apiUrl}${UNLEASH_API_PROXY_DEFINITIONS}?token=${process.env.UNLEASH_SERVER_KEY}`
  ).then((res) => res.json())

  return {
    props: {
      unleash: {
        ...evaluateFlags(definitions, context),
        url: `${apiUrl}${UNLEASH_API_PROXY_FRONTEND}`, // provide the url to revalidate flags on client
      },
    },
  }
}

export default Page
