import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import React, { use } from 'react'
import { db } from '../../../prisma/prismaclient'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ChatInput from '@/components/ChatInput'

export default async function page() {
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
      <div className='w-full h-full pb-24 lg:pb-0 bg-[#F4F5FC] rounded-3xl p-6 relative overflow-y-scroll'>
      <div className='bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] w-4 h-4 rounded-md ' />
      <h1 className='text-4xl md:text-[2.75rem] font-semibold mt-4'>Hello again</h1>
      <p className=' text-base md:text-[1.375rem] text-[#525458] mt-6 font-normal'>Tell me what’s on your mind, or pick a suggestion. I have limitations and won’t always get it right, but your feedback will help me improve.</p>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-6 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className='text-[#B1868C]'>Understand</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <Button className='bg-[#F1F2F8] rounded-full text-[#000219] text-base font-medium hover:text-white' size={'lg'} >Character from book</Button>
            <Button className='bg-[#F1F2F8] rounded-full text-[#000219] text-base font-medium hover:text-white' size={'lg'} >Product comparisons</Button>
            <Button className='bg-[#F1F2F8] rounded-full text-[#000219] text-base font-medium hover:text-white' size={'lg'} >Debug python code</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-[#9978A7]'>Create</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <Button className='bg-[#F1F2F8] rounded-full text-[#000219] text-base font-medium hover:text-white' size={'lg'} >Character from book</Button>
            <Button className='bg-[#F1F2F8] rounded-full text-[#000219] text-base font-medium hover:text-white' size={'lg'} >Product comparisons</Button>
            <Button className='bg-[#F1F2F8] rounded-full text-[#000219] text-base font-medium hover:text-white' size={'lg'} >Debug python code</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-[#7778AE]'>Explore</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <Button className='bg-[#F1F2F8] rounded-full text-[#000219] text-base font-medium hover:text-white' size={'lg'} >Character from book</Button>
            <Button className='bg-[#F1F2F8] rounded-full text-[#000219] text-base font-medium hover:text-white' size={'lg'} >Product comparisons</Button>
            <Button className='bg-[#F1F2F8] rounded-full text-[#000219] text-base font-medium hover:text-white' size={'lg'} >Debug python code</Button>
          </CardContent>
        </Card>
      </div>
      <ChatInput />
      </div>
    </MaxWidthWrapper>
  )
}
