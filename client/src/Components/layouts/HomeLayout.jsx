import React from 'react'
import Sidebar from '../ui/Shared/Sidebar'

export default function HomeLayout({ children }) {
  return (
    <div className='w-screen h-screen flex flex-col-reverse lg:flex-row justify-start text-paragraph'>
        <Sidebar />
        {children}
    </div>
  )
}
