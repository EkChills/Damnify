"use client"

import {useState} from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2, Send } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Message } from "@prisma/client";

export default function ChatInputExisting({chatId}:{chatId:string}) {
  const [prompt, setPrompt] = useState('')
  const queryClient = useQueryClient()
  const router = useRouter()

//   useMutation({
//   mutationFn: updateTodo,
//   // When mutate is called:
//   onMutate: async (newTodo) => {
//     // Cancel any outgoing refetches
//     // (so they don't overwrite our optimistic update)
//     await queryClient.cancelQueries({ queryKey: ['todos'] })

//     // Snapshot the previous value
//     const previousTodos = queryClient.getQueryData(['todos'])

//     // Optimistically update to the new value
//     queryClient.setQueryData(['todos'], (old) => [...old, newTodo])

//     // Return a context object with the snapshotted value
//     return { previousTodos }
//   },
//   // If the mutation fails,
//   // use the context returned from onMutate to roll back
//   onError: (err, newTodo, context) => {
//     queryClient.setQueryData(['todos'], context.previousTodos)
//   },
//   // Always refetch after error or success:
//   onSettled: () => {
//     queryClient.invalidateQueries({ queryKey: ['todos'] })
//   },
// })
  const {mutate:sendChat, isPending} = useMutation({
    mutationFn:async() => {
      const res = await axios.post('/api/sendchat', {prompt:prompt, chatId:chatId})
      const data = await res.data
      return data
    },
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['messages'] })
  
      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(['messages'])
  
      // Optimistically update to the new value
      queryClient.setQueryData(['messages'], (old:Message[]) => [...old, {id:'test', role:'user', content:prompt, chatId}])
  
      // Return a context object with the snapshotted value
      return { previousTodos }
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['messages'], context?.previousTodos)
    },
    // Always refetch after error or success:
    onSettled: () => {
      setPrompt('')
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    },
    onSuccess:(data:{pushTo:string}) => {
      console.log('success');
      
      queryClient.invalidateQueries({queryKey:['messages']})
    }
  })
  return (
    <div className="fixed z-[100] inset-x-4 lg:left-[26.375rem] lg:right-[10rem]  rounded-s-full flex gap-4 items-center bottom-[2rem]">
      <Textarea
        rows={1}
        className="m-0 w-full resize-none  py-[10px] pr-10  md:py-4 md:pr-12  pl-3 md:pl-4 overflow-y-hidden "
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isPending}
        autoFocus
        onKeyDown={(e) => {
          if(e.key === 'Enter') {
            sendChat()
            
          }
        }}
      />
      <Button aria-label="send message" onClick={() => sendChat()}>
        {isPending ? <Loader2 className="animate-spin" /> : <Send className="h-4 w-4" />}
      </Button>
    </div>
  );
}
