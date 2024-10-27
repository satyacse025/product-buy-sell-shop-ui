import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import StarRating from './StarRating';

export default function ProductsbyCategory() {
    const loadedProducts = useLoaderData();
    const [products, setProducts] = useState(loadedProducts);
    const location = useLocation();
    const selectCategory = location.state?.productCatrgory;

    return (

        <>
            <Helmet>
                <title>Dashboard | All Products - Category : {selectCategory} </title>
            </Helmet>


            <div className="bg-white pt-6">
                <div className="w-full">
                    <div className='lg:w-5/6 mx-auto'>
                        <div className="divider"><h1 className="text-center text-green-800 text-xl font-bold mb-2">All Products | Category : {selectCategory}</h1></div>

                        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ml-5 mr-5">

                            {products?.map((product) => (

                                <div className="shadow-2xl flex justify-center  flex-col px-3 py-3">
                                    <img src={product.image} alt={product.carName} className="h-96" />
                                    <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white mb-2">{product.carName}</h5>
                                    <h5 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white mb-2">Price : {product.sellPrice}</h5>
                                    <h5 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white mb-2"><StarRating rating={product.rating} /></h5>
                                    
                                    <div>
                                        <Link to={`/product/details/${product._id}`}>
                                            <button type="button" className="w-full text-white bg-[#00ABE4] hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View Details</button>
                                        </Link>
                                    </div>
                                </div>


                            ))}
                        </section>

                    </div>
                    <br />
                </div>

            </div>
        </>

    )
}
