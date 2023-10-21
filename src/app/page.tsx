import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LoginLink, RegisterLink, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {

  
  return (
    <main className="">
      <MaxWidthWrapper className=''>
      <nav className='flex items-center justify-between sticky top-0 inset-x-0 pt-4 z-10'>
        <Link className='font-semibold text-gray-500 flex items-center gap-1' href={'/'}>
          <span className='text-base'>
            Damnify
          </span>
          <span className='border rounded-lg border-border p-1 text-[.75rem]  text-primary font-[500]'>Experiment</span>
        </Link>
        <div className='flex items-center gap-6'>
          <LoginLink className="hidden sm:block">
            <span className={cn(buttonVariants({variant:'ghost', size:'sm'}))}>Sign in</span>
          </LoginLink>
          <RegisterLink className={cn(buttonVariants({size:'sm'}))}>Get started</RegisterLink>
        </div>
      </nav>

      <div className='mt-[8.6rem] flex flex-col md:flex-row max-w-6xl mx-auto'>
        <div className='md:w-1/2 flex flex-col items-center md:items-start'>
          <h1 className='text-5xl md:text-6xl lg:text-7xl antialiased font-bold mb-4'>Damnify</h1>
          <h3 className='md:max-w-[23.75rem] text-2xl font-medium text-center md:text-start'>A conversational AI tool by Damned</h3>
          <p className='text-base md:max-w-[23.2rem] mt-[2rem] text-center md:text-start'>Collaborate with Damnify to brainstorm ideas, spark creativity, and accelerate productivity</p>
          <LoginLink className={cn(buttonVariants({size:'lg'}), 'rounded-r-full rounded-l-full mt-[2rem]')}>
            Sign in
          </LoginLink>
        </div>
        <div className='md:w-1/2 w-full '>
          <Image alt='hero image' src={'/images/hero-img.png'} className='mt-8 sm:mt-0 rounded-lg w-full sm:max-w-lg mx-auto' width={676} height={616} />
        </div>
      </div>
      </MaxWidthWrapper>
    </main>
  )
}
