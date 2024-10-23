import React from 'react'
import ToyotaCar from '../assets/Toyota.png'

export default function
    () {
    return (
        <div className="lg:w-5/6 mx-auto mt-12">
            <h1 className="text-center text-[#00ABE4] text-xl font-bold dark:text-white mb-6">Featured Car</h1>
            <h1 className="text-center text-black text-lg dark:text-white tracking-tight">
                The Toyota Taisor S Plus is engineered for those who crave both performance and style.
                With a 104 HP engine, cutting-edge technology, and a sleek design,
                this car delivers an unforgettable driving experience.
                Whether you're cruising through the city or hitting the open road, the Toyota Taisor S Plus is built to impress.
            </h1>
            <section className="lg:w-5/6 mx-auto bg-white dark:bg-black">
                <div className="grid max-w-screen-xl mb-0 px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="order-first lg:mt-0 lg:col-span-6 lg:flex">
                        <img src={ToyotaCar} alt="mockup" />
                    </div>
                    <div className="mr-auto mt-5 lg:ml-4 place-self-center lg:col-span-6">
                        <h1 className="max-w-2xl mb-5 text-lg text-[#00ABE4] font-extrabold tracking-tight leading-none md:text-xl 
                        xl:text-xl dark:text-white">Toyota Taisor S Plus</h1>


                        <p className="max-w-xl mb-5 text-lg text-justify tracking-tight leading-none md:text-lg xl:text-lg 
                        dark:text-white">
                            <span className='font-bold'>Model :</span> Toyota Taisor S Plus <br />
                            <span className='font-bold'>Color :</span> White, Silver, Black, Red, and Blue <br />
                            <span className='font-bold'>Engine Type :</span> 4-cylinder inline, DOHC, VVT-i (Variable Valve Timing with intelligence) <br />
                            <span className='font-bold'>Mileage :</span> 17 Kmpl <br />
                            <span className='font-bold'>Max. Power :</span> 104 hp @ 6,000 rpm<br />
                            <span className='font-bold'>Displacement (ml) :</span> 1,496 cc<br />
                            <span>
                                <div className="rating">
                                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-[#00ABE4]" />
                                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-[#00ABE4]" />
                                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-[#00ABE4]" />
                                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-[#00ABE4]" defaultChecked/>
                                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-[#00ABE4]" />
                                </div>

                            </span>
                            <br /><br />

                            <span>Discover More | Schedule a Test Drive</span>
                        </p>

                    </div>

                </div>
            </section>


        </div>
    )
}
