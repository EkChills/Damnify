import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import React, { use } from 'react'
import { db } from '../../../../prisma/prismaclient'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ChatInput from '@/components/ChatInput'
import Messages from '@/components/Messages'
import ChatInputExisting from '@/components/ChatinputExisting'

export default async function page({params}:{params:{chatId:string}}) {
  const {getUser} = getKindeServerSession()
  const user = getUser()
  if(!user || !user.id) {
    redirect('/auth-callback?origin=chat')
  }

  const dbUser = await db.user.findFirst({
    where:{
      id:user.id
    }
  })
  if(!dbUser) redirect('/auth-callback?origin=chat')
  return (
    <MaxWidthWrapper className='w-full lg:w-[calc(100%-26.375rem)] ml-auto mr-[73px] p-0 pb-6 h-[calc(100vh-4rem)] py-4  '>
      <div className='w-full h-full pb-24 lg:pb-24 bg-[#F4F5FC] rounded-3xl p-6 relative overflow-y-scroll  scrollbar-thumb-gray-900 scrollbar-h-[32px] scrollbar-track-gray-100 scrollbar-thin'>
      <Messages chatId={params.chatId} imageUrl={user.picture!} />
      <ChatInputExisting chatId={params.chatId} />
      </div>
    </MaxWidthWrapper>
  )
}
