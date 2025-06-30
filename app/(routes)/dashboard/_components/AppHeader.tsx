import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const menuOptions=[
    {
        id:1,
        name:'Home',
        path:'/Home'
    },
    {
        id:2,
        name:'History',
        path:'/History'
    },
    {
        id:3,
        name:'Pricing',
        path:'/Pricing'
    },
    {
        id:4,
        name:'Profile',
        path:'/Profile'
    }
]

function AppHeader() {
  return (
    <div className='flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40'>
        <Image src={'logo.svg'} alt='logo' width={180} height={90}/> 
        <div className='hidden md:flex items-center gap-12'>
            {menuOptions.map((option,index)=>(
                <div key={index}>
                    <h2 className='hover:font-bold cursor-pointer transition-all'>{option.name}</h2>
                </div>
            ))}
        </div>
        <UserButton/>
    </div>
  )
}

export default AppHeader