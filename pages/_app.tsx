/* eslint-disable react/jsx-props-no-spreading */
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppProps } from 'next/app'
import React from 'react'
import '@/styles/main.scss'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={(pageProps as any).session} refetchInterval={0}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  )
}
