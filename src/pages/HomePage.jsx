import React from 'react'
import Banner from '../components/Banner'
import AllCategory from '../components/AllCategory'
import FeaturedCar from '../components/FeaturedCar'
import Faq from '../components/Faq'

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-black">
        <Banner/>
        <AllCategory/>
        <FeaturedCar/>
        <Faq/>
    </div>
  )
}
