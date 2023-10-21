import React from 'react'

export default async function Location() {
  const res = await fetch('https://ipapi.co/json')
  if(!res.ok) throw new Error('something went wrong')
  const data = await res.json()

  return (
    <>
    <div className='flex items-center gap-4 mt-auto'>
      <span className='w-4 h-4 rounded-full bg-[#7A7A7A]'></span>
      <p className='text-sm font-medium'>{data.country_name}</p>
    </div>
      <p className='text-sm text-[#2C57AC] font-medium mt-2'>From your ip address</p>
    </>
  )
}
