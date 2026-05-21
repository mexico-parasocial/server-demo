import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useEffect } from 'react'
import { Home } from './Home.tsx.js'
import * as lexicons from './lexicons.ts'
import { AuthenticationProvider } from './providers/AuthenticationProvider.tsx.js'
import {
  BskyClientProvider,
  useBskyClient,
} from './providers/BskyClientProvider.tsx.js'

const queryClient = new QueryClient()

export function App() {
  return (
    <AuthenticationProvider>
      <BskyClientProvider>
        <QueryClientProvider client={queryClient}>
          <DevTools>
            <Home />
          </DevTools>
        </QueryClientProvider>
      </BskyClientProvider>
    </AuthenticationProvider>
  )
}

export function DevTools({ children }: { children?: ReactNode }) {
  const client = useBskyClient()

  useEffect(() => {
    const global = window as { bskyClient?: typeof client } & Partial<
      typeof lexicons
    >
    global.bskyClient = client
    Object.assign(window, lexicons)
    return () => {
      delete global.bskyClient
    }
  }, [client])

  return <>{children}</>
}
