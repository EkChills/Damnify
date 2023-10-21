"use client"

import {useState} from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2, Send } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ChatInput() {
  const [prompt, setPrompt] = useState('')
  const queryClient = useQueryClient()
  const router = useRouter()
  const {mutate:sendChat, isPending} = useMutation({
    mutationFn:async() => {
      const res = await axios.post('/api/sendchat', {prompt:prompt, chatId:undefined})
      const data = await res.data
      return data
    },
    onSuccess:(data:{pushTo:string}) => {
      router.push(`/chat/${data.pushTo}`)
      queryClient.invalidateQueries({queryKey:['get-chats']})
    }
  })
  return (
    <div className="fixed z-[100] inset-x-4 lg:left-[26.375rem] lg:right-[10rem]  rounded-s-full flex gap-4 items-center bottom-[2rem]">
      <Textarea
        rows={1}
        className="m-0 w-full resize-none  py-[10px] pr-10  md:py-4 md:pr-12  pl-3 md:pl-4 overflow-y-hidden "
        onChange={(e) => setPrompt(e.target.value)}
        autoFocus
        onKeyDown={(e) => {
          if(e.key === 'Enter') {
            sendChat()
          }
        }}
      />
      <Button aria-label="send message">
        {isPending ? <Loader2 className="animate-spin" /> : <Send className="h-4 w-4" />}
      </Button>
    </div>
  );
}
