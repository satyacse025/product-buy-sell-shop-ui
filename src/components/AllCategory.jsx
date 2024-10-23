import React from 'react'

export default function AllCategory() {
    return (
        <div className="lg:w-5/6 mx-auto">
            <h1 className="text-center text-[#00ABE4] text-xl font-bold dark:text-white mb-3">All Categories</h1>
            <h1 className="text-center text-black text-lg mb-2 dark:text-white">Browse all categories & find your dream car</h1>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 mt-6">
                <div className="card bg-base-100 w-96 shadow-xl flex justify-center items-center flex-col dark:bg-black dark:text-white dark:border-solid dark:border-white">
                    <figure className="px-10 pt-10">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions">
                            <button className="btn bg-[#00ABE4] text-white hover:bg-[#14303a]">View Products</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 w-96 shadow-xl flex justify-center items-center flex-col">
                    <figure className="px-10 pt-10">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 w-96 shadow-xl flex justify-center items-center flex-col">
                    <figure className="px-10 pt-10">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
