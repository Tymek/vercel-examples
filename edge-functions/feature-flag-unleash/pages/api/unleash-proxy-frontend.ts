import { addBasePath } from 'next/dist/client/add-base-path'
import type { NextRequest } from 'next/server'
import { type Context, randomSessionId, evaluateFlags } from '@unleash/nextjs'
import { UNLEASH_COOKIE_NAME, UNLEASH_API_PROXY_DEFINITIONS } from '../../utils'

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(req: NextRequest) {
  try {
    const sessionId =
      req.nextUrl.searchParams.get('sessionId') ||
      req.cookies.get(UNLEASH_COOKIE_NAME)?.value ||
      randomSessionId()
    const remoteAddress =
      req.nextUrl.searchParams.get('remoteAddress') ||
      req.headers.get('x-forwarded-for') ||
      req.ip

    const context: Context = {
      userId: req.nextUrl.searchParams.get('userId') || undefined,
      sessionId,
      remoteAddress,
    }

    // FIXME: context properties

    // Use another API endpoint as source - cache
    const protocol = req.url.startsWith('https') ? 'https://' : 'http://'
    const host = req.headers.get('host')
    const endpoint = addBasePath(UNLEASH_API_PROXY_DEFINITIONS)
    const token = process.env.UNLEASH_PROXY_SECRET || ''
    const definitionsUrl = `${protocol}${host}${endpoint}?token=${token}`

    const definitions = await fetch(definitionsUrl).then((res) => res.json())
    const evaluated = await evaluateFlags(definitions, context)

    return new Response(JSON.stringify(evaluated), {
      status: 200,
      headers: {
        'no-cache': 'no-cache',
        'content-type': 'application/json',
        'set-cookie': `${UNLEASH_COOKIE_NAME}=${sessionId}; path=/;`,
      },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: 'Internal Server Error',
        message: (error as Error)?.message || undefined,
      }),
      {
        status: 500,
        headers: { 'content-type': 'application/json' },
      }
    )
  }
}
