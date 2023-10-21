"use client"

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import React from 'react'

export const queryClient = new QueryClient()
export default function ReactQueryProvider({children}:React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
