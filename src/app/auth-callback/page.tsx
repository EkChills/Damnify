"use client"

import { Loader2 } from 'lucide-react'
import React from 'react'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'


export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')

  const {data, isSuccess, isLoading} = useQuery({
    queryKey:['auth-callback'],
    queryFn:async() => {
      const res = await axios.get('/api/auth-callback')
      const data = await res.data
      return data
    },
    retry:true,
    retryDelay:500,
    
  })
  if(!isLoading && isSuccess) {
    router.push(`${origin ? `/${origin}` : '/chat'}`)
  }
  if(!isLoading && !isSuccess) {
    router.push(`/`)
  }
  


  return (
    <div className='w-full mt-24 flex justify-center'>
    <div className='flex flex-col items-center gap-2'>
      <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
      <h3 className='font-semibold text-xl'>Setting up your account...</h3>
      <p>you will be redirected automatically.</p>
    </div>
  </div>
  )
}
