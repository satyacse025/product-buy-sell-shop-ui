import React from 'react'
import carLogo from '../assets/carlogo.png'
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa6";
import { FaFacebookMessenger } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="bg-[#00ABE4] dark:bg-black"> <div>
    <footer className="footer footer-center text-base-content rounded p-10 ">
    <span className='text-white dark:text-white'>
    
    <span className='font-semibold text-lg'>Car Bazar™</span>
    <span className='tracking-tight text-lg'>Bashundhara, Dhaka, Bangladesh</span>
    <span className='tracking-tight text-lg'>+88 017 49 090 971</span>
    <span className='tracking-tight text-lg'>info@car-bazar.com</span>
    <div className='flex text-xl'>
    <Link to={"https://www.facebook.com/"} target="_blank"><FaFacebookSquare className='mr-4'/></Link>
    <Link to={"https://x.com/"} target="_blank"><FaXTwitter className='mr-4'/></Link>
    <Link to={"https://www.youtube.com/"} target="_blank"><IoLogoYoutube className='mr-4'/></Link>
    <Link to={"https://web.whatsapp.com/"} target="_blank"><FaWhatsapp className='mr-4'/></Link>
    <Link to={"https://www.messenger.com/"} target="_blank"><FaFacebookMessenger /></Link>
    </div>
    
    </span>
       
        <aside>
            <p className='text-white dark:text-white text-lg'>Copyright © {new Date().getFullYear()} - All right reserved by Car Bazar™</p>
        </aside>
    </footer>
</div></div>
  )
}
