import { cn } from '@/lib/utils'
import React from 'react'

interface MaxWidthWrapperProps extends React.PropsWithChildren {
  className?:string;
}

export default function MaxWidthWrapper({className,children}:MaxWidthWrapperProps) {
  return (
    <div className={cn('px-6', className)}>
      {children}
    </div>
  )
}
