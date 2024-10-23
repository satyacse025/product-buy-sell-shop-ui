import React from 'react'
import bannerImage from '../assets/banner.png';
export default function Banner() {
  return (
    <div className="w-full bg-white dark:bg-black">
    <section className="lg:w-5/6 mx-auto bg-white dark:bg-black">
<div className="grid max-w-screen-xl mb-0 px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
    <div className="mr-auto mt-5 place-self-center lg:col-span-7">
        <h1 className="max-w-2xl mb-5 text-lg text-[#00ABE4] font-extrabold tracking-tight leading-none md:text-xl xl:text-xl dark:text-white">Unlock Your Journey, Drive Uniqueness</h1>
        <h1 className="max-w-xl mb-5 text-lg text-justify tracking-tight leading-none md:text-lg xl:text-lg dark:text-white">Discover cutting-edge design, unmatched performance, and advanced technology that transforms every drive into an exhilarating journey. Whether you're seeking luxury, speed, or fuel efficiency, we have the perfect car to suit your lifestyle. Explore our lineup and start your journey today!</h1>
        <a href="#" className="bg-[#00ABE4] inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border border-gray-300 rounded-lg hover:bg-[#14303a] focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:bg-slate-600">
        Buy Your Dreams
        </a> 
    </div>
    <div className="order-first lg:order-last lg:mt-0 lg:col-span-5 lg:flex">
        <img src={bannerImage} alt="mockup"/>
    </div>                
</div>
</section>
</div>
  )
}
