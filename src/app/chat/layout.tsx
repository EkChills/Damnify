import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import {PropsWithChildren} from 'react'

export default  function ChatLayout({children}:PropsWithChildren) {
  
  
  return (
    <div>
      <Navbar />
      <Sidebar />
      {children}
    </div>
  )
}
