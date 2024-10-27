import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import { Link, useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function MyProducts() {
    const loadedCarts = useLoaderData();
    const [carts, setCarts] = useState(loadedCarts);

    const subtotal = carts.reduce((total, cart) => total + parseFloat(cart.carPrice), 0);

 const handleClick = () => {
    toast.success(`Make your Payment`);
  };
    return (
        <>
            <Helmet>
                <title>Dashboard | My Products</title>
            </Helmet>

            <div>


                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                    <h1 className="text-lg text-center mb-3">
                        Number of products: {carts.length}
                    </h1>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Mileage
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Displacement (ml)
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Delivery Address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {carts.map((cart) => (
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4">
                                        <img src={cart?.carImageURL} alt="" className='w-10' />
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {cart.carName}
                                    </th>
                                    <td className="px-6 py-4">
                                        {cart.carMileage}
                                    </td>
                                    <td className="px-6 py-4">
                                        {cart.carDisplacement}
                                    </td>
                                    <td className="px-6 py-4">
                                        {cart.customerReliveryAddress}
                                    </td>
                                    <td className="px-6 py-4">
                                        {cart.carPrice}
                                    </td>
                                    <td className="px-6 py-4 items-center justify-center">

                                        <button onClick={() => handleClick()} className="bg-[#00ABE4] inline-flex items-center justify-center px-5 py-1 text-base font-medium text-center text-white border border-gray-300 rounded-lg hover:bg-[#14303a] focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:bg-slate-600">Payment</button>
                                    </td>
                                </tr>
                            ))}
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td className="px-6 py-4">

                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">

                                </th>
                                <td className="px-6 py-4">

                                </td>
                                <td className="px-6 py-4">

                                </td>
                                <td className="px-6 py-4 font-bold">
                                    Total :
                                </td>
                                <td className="px-6 py-4 font-bold">
                                    {subtotal}
                                </td>
                                <td className="px-6 py-4 items-center justify-center">

                                   
                                </td>
                            </tr>

                        </tbody>
                    </table>

                </div>

            </div>
        </>

    )
}
