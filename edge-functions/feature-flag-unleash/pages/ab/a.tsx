import { Page, Text } from '@vercel/examples-ui'
import { NextPage } from 'next'

const MiddlewarePage: NextPage = () => (
  <Page>
    <Text>
      Middleware redirected you to variant:{' '}
      <span className="font-bold text-xl">A</span>
    </Text>
  </Page>
)

export default MiddlewarePage
