"use client"

import { Message } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'

interface MessageProps {
  chatId:string
  imageUrl?: string
}

export default function Messages({chatId, imageUrl}:MessageProps) {
  const {data:messages} = useQuery({
    queryKey:['messages'],
    queryFn:async() => {
      const res = await axios(`/api/messages/${chatId}`)
      const data = await res.data
      return data as Message[]
    }
  })

  // const messages = [
  //   {
  //     id:'refer',
  //     role:"user",
  //     content:"how are you"
  //   },
  //   {
  //     id:'rfefre',
  //     role:"assistant",
  //     content:"I'm well thanks"
  //   }
  // ]
  return (
    <div className='flex flex-col gap-4 mt-4'>
      {messages?.map((message) => {
        if(message.role === 'user') {
          return <div key={message.id} className='flex items-start justify-start gap-4'>
            <Image src={imageUrl || ''} className='rounded-full' alt='' width={40} height={40} />
            <p className='max-w-2xl text-base'>{message.content}</p>
          </div>
        }
        return <div key={message.id} className='flex items-start justify-start gap-4 bg-[#FFFFFF] rounded-3xl pt-8 pb-4 px-4'>
        <div className='bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] min-w-[1rem] min-h-[1rem]  rounded-md ' />
        <p className='max-w-4xl text-base'>{message.content}</p>
      </div>
      })} 
    </div>
  )
}
