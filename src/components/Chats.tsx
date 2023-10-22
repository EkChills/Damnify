"use client"

import { Chat } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2, MessageSquare } from 'lucide-react'
import React from 'react'
import { Button, buttonVariants } from './ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export default function Chats() {
  const pathname = usePathname()
  const {data, isLoading} = useQuery({
    queryKey:['get-chats'],
    queryFn:async() => {
      const res = await axios('/api/chats')
      const data = await res.data
      return data as Chat[]
    }
  })
  console.log(pathname);
  
  return (
    <div className='flex flex-col overflow-y-scroll pb-4 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100'>
      {isLoading ? <Loader2 className='animate-spin mt-6' /> : 
      data?.sort((a,b) => new Date(b.createdAt).getDate() - new Date(a.createdAt).getDate()).map((chat) => {
        console.log(chat.id);
        
        return <Link href={`/chat/${chat.id}`} key={chat.id} className={cn(buttonVariants({variant:'ghost'}), `flex items-center pl-0 justify-start gap-4 mt-6 w-full rounded-full ${pathname === `/chat/${chat.id}` ? 'bg-[#CEEDD3]' : ''}`)}>
          <Button variant={'ghost'} className='bg-[#F1F1F1] p-2' size={'icon'}>
          <MessageSquare />
          </Button>
          <span className='text-base truncate'>{chat.title}</span>
        </Link>
      })
      }
    </div>
  )
}
