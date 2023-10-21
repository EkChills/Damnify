
import React from 'react'
import NewChatButton from './NewChatButton'
import Location from './Location'
import Chats from './Chats'

export default function SidebarContent() {
  return (
    <div className="flex flex-col lg:pl-4 h-full">
   
    <NewChatButton />
    
    <h4 className='text-sm font-medium text-[#0E0E0E] mt-8'>Recent</h4>
    <Chats />
    <Location />
  </div>
  )
}
