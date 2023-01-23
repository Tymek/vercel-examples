import { Page, Text } from '@vercel/examples-ui'
import { NextPage } from 'next'

const MiddlewarePage: NextPage = () => (
  <Page>
    <Text>
      Middleware redirected you to variant:{' '}
      <span className="font-bold text-xl">B</span>
    </Text>
  </Page>
)

export default MiddlewarePage
