"use client"

import { Chat } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2, MessageSquare, Trash, Trash2 } from 'lucide-react'
import React from 'react'
import { Button, buttonVariants } from './ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

export default function Chats() {
  const router = useRouter()
  const pathname = usePathname()
  const queryClient = useQueryClient()
  const {data, isLoading} = useQuery({
    queryKey:['get-chats'],
    queryFn:async() => {
      const res = await axios('/api/chats')
      const data = await res.data
      return data as Chat[]
    }
  })

  const {mutate:deleteChat, isPending} = useMutation({
    mutationFn:async(chatId:string) => {
      const res = await axios.post('/api/deletechat', {chatId: chatId})
      const data = await res.data
      return data
    },
    onSuccess:(data) => {
      queryClient.invalidateQueries({queryKey:['get-chats']})
      // console.log(data.id);
      if(data.length <= 0){
        return router.push('/chat')
      }
      router.push(data[0].id)
    }
  })
  
  return (
<div className='flex flex-col overflow-y-scroll pb-4 scrollbar scrollbar-thumb-gray-900 scrollbar-none scrollbar-track-gray-100'>
      {isLoading ? <Loader2 className='animate-spin mt-6' /> : 
      data?.sort((a,b) => new Date(b.createdAt).getDate() - new Date(a.createdAt).getDate()).map((chat) => {
        console.log(chat.id);
        
        return (
        <Link href={`/chat/${chat.id}`} key={chat.id} className={cn(buttonVariants({variant:'ghost'}), `flex items-center  pl-0 justify-start gap-4 mt-6 w-full rounded-full ${pathname === `/chat/${chat.id}` ? 'bg-[#CEEDD3]' : ''}`)}>
          <Button variant={'ghost'} className='bg-[#F1F1F1] p-2' size={'icon'}>
          <MessageSquare />
          </Button>
          <div className='flex items-center justify-between w-full'>
          <span className='text-base truncate max-w-[11rem]'>{chat.title}</span>
            {pathname === `/chat/${chat.id}`&& 
            <Dialog>
            <DialogTrigger asChild>
            <Button variant={'ghost'} onClick={() => console.log('hello')
            }>
              <Trash2 className='text-zinc-500 w-5 h-5' />
            </Button>
            </DialogTrigger>
            <DialogContent className='z-[200]'>
              <DialogHeader>
                <DialogTitle className='lg:text-[1.6rem]'>Delete Chat?</DialogTitle>
                <DialogDescription className='lg:text-base'>
                You&apos;ll no longer see this chat here. This will also delete related activity like prompts, responses, and feedback from your Damnify Activity. 
                </DialogDescription>
              </DialogHeader>
              <div className='flex justify-center lg:justify-end gap-4 '>
                <DialogClose asChild>
                <Button className='lg:text-base'>Cancel</Button>

                </DialogClose>
                <Button className='lg:text-base' onClick={() => deleteChat(chat.id)}>{isPending ? <Loader2 className='animate-spin' /> : 'Delete'}</Button>
              </div>
            </DialogContent>
          </Dialog>
          
            }
          
          </div>
        </Link>)
      })
      }    
    </div>
  )
}
