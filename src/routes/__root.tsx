import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/tanstack-react-start'
import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary.js'
import { createServerFn } from '@tanstack/react-start'
import { NotFound } from '~/components/NotFound.js'
import { getUser } from '~/lib/utils.js'
import * as React from 'react'

import cssUrl from '~/styles.css?url'

const fetchClerkAuth = createServerFn({ method: 'GET' }).handler(getUser)

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    links: [
      { rel: 'stylesheet', href: cssUrl },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  beforeLoad: async () => {
    const { userId } = await fetchClerkAuth()

    return { userId }
  },
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <ClerkProvider>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ClerkProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link to="/" activeProps={{ className: 'font-bold' }} activeOptions={{ exact: true }}>Home</Link>{' '}
          <Link to="/posts" activeProps={{ className: 'font-bold' }}>Posts</Link>
          <div className="ml-auto">
            <SignedIn> <UserButton /> </SignedIn>
            <SignedOut> <SignInButton mode="modal" /> </SignedOut>
          </div>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
