import { FC, ReactNode } from 'react'
import { Link, Page, Text } from '@vercel/examples-ui'
import { useFlag, useVariant } from '@unleash/nextjs'
import { Toggle } from './Toggle'

export const SimplePage: FC<{ children?: ReactNode }> = ({ children }) => {
  const poc = useFlag('nextjs-poc')
  const pocVariant = useVariant('nextjs-poc')
  const demoApp_step1 = useFlag('demoApp.step1')
  const demoApp_step2 = useFlag('demoApp.step2')
  const demoApp_step3 = useFlag('demoApp.step3')
  const demoApp_step4 = useFlag('demoApp.step4')

  return (
    <Page>
      <Text className="mb-8">
        Flag <code className="font-mono">`nextjs-poc`</code> is{' '}
        <Toggle enabled={poc} />.
        {poc && pocVariant && (
          <>
            {' '}
            Variant:{' '}
            <span className="font-bold text-xl">{pocVariant.name}</span>
          </>
        )}
      </Text>
      {[demoApp_step1, demoApp_step2, demoApp_step3, demoApp_step4].map(
        (enabled, i) => (
          <Text key={i} className="mb-8">
            <code className="font-mono">demoApp.step{i + 1}</code> is{' '}
            <Toggle enabled={enabled} />.
          </Text>
        )
      )}
      {children}
      <div className="pt-8">
        <Link href="/">Go back</Link>
      </div>
    </Page>
  )
}
