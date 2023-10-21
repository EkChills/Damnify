"use client"

import React from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import {  useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function NewChatButton() {
const queryClient = useQueryClient()
const router = useRouter()
 const createChat = useMutation({
  mutationFn:async() => {
    const res = await axios.post('/api/createchat', {
      title:'New Chat'
    })
    const data = await res.data
    return data
  },
  onSuccess:(data) => {
    queryClient.invalidateQueries({queryKey:['get-chats']})
    router.push(`/chat/${data.id}`)
  }
 })
  return (
    <Button
    onClick={() => createChat.mutate()}
    className="flex items-center gap-4 rounded-full w-[10.5rem] bg-[#F9FBFC]"
    variant={"ghost"}
    size={"default"}
  >
    <Plus className="w-6 h-6 text-[#AFB1B3]" />
    <span className="text-base text-[#AFB1B3]">New chat</span>
  </Button>
  )
}
