import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

export default function CommonLayout() {
  return (
    <div className="bg-[#00ABE4] dark:bg-black">
        <Navbar />
        <Outlet />
        <Footer/>
    </div>
  )
}
