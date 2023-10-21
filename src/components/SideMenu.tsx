import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { Menu, Plus } from 'lucide-react'
import Location from './Location'
import SidebarContent from './SidebarContent'

export default function SideMenu() {
  return (
    <Sheet >
    <SheetTrigger asChild className='lg:hidden'>
      <Button variant="outline">
        <Menu className='w-6 h-6' />
      </Button>
    </SheetTrigger>
    <SheetContent side={'left'}>
   <SidebarContent />
    </SheetContent>
  </Sheet>
  )
}
