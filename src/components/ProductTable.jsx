import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import { Link, useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";


export default function ProductTable() {

    const loadedProducts = useLoaderData();
    const [products, setProducts] = useState(loadedProducts);

    const handleDelete = (_id) => {
        fetch(`https://product-buy-sell-shop-server.onrender.com/product/${_id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount) {
                    toast.success("Product Deleted Successfully", {
                        position: "top-right",
                    });
                    const remainingProducts = products.filter((product) => product._id !== _id);
                    setProducts(remainingProducts);
                }
            });
    };
    // Handle loading, error, and display data
  
    return (

        <>
            <Helmet>
                <title>Dashboard | All Products</title>
            </Helmet>
            <div>


                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                    <h1 className="text-lg text-center mb-3">
                        Number of products: {products.length}
                    </h1>
                    <div className="flex flex-col items-center mb-3">
                        <Link to={'/dashboard/product/add'}>
                            <button className="btn btn-wide bg-[#00ABE4] text-white">Add a new product</button>
                        </Link>
                    </div>

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
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Brand
                                </th>
                                
                                <th scope="col" className="px-6 py-3">
                                    Color
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Mileage
                                </th>
                                <th scope="col" className="px-6 py-3">
                                Displacement (ml)
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Rating
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4">
                                        <img src={product?.image} alt="" className='w-10' />
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {product.carName}
                                    </th>
                                    <td className="px-6 py-4">
                                    {product.categoryName}  
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.sellPrice}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.carBrand}
                                    </td>
                                  
                                    <td className="px-6 py-4">
                                        {product.carColor}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.carMileage}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.carDisplacement}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.rating}
                                    </td>
                                    <td className="px-6 py-4 items-center justify-center">
                                        <Link to={`/dashboard/product/edit/${product._id}`} state={{ productCatrgory: product.categoryName  }}      className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3">Edit</Link>
                                        <button onClick={() => handleDelete(product._id)} className="font-medium text-red-600 dark:text-red-300 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}
