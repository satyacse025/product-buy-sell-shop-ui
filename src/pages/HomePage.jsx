import React from 'react'
import Banner from '../components/Banner'
import AllCategory from '../components/AllCategory'
import FeaturedCar from '../components/FeaturedCar'
import Faq from '../components/Faq'
import { Helmet } from "react-helmet-async";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Car Bazar | Your Online Car Shop</title>
      </Helmet>

      <div className="bg-white dark:bg-black">
        <Banner />
        <AllCategory />
        <FeaturedCar />
        <Faq />
      </div>
    </>
  )
}
