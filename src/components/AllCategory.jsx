import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";


export default function AllCategory() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch product data from the Express API
    const fetchCategories = async () => {
      try {
        const response = await fetch(`https://product-buy-sell-shop-server.onrender.com/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCategories();
  }, []);


  return (
    <>
      <Helmet>
        <title>Dashboard | All Categories </title>
      </Helmet>
      <div className="lg:w-5/6 mx-auto">
        <h1 className="text-center text-[#00ABE4] text-xl font-bold dark:text-white mb-3">All Categories</h1>
        <h1 className="text-center text-black text-lg mb-2 dark:text-white">Browse all categories & find your dream car</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 mt-6">

          {categories.map((category) => (
            <div className="card bg-base-100 w-96 shadow-xl flex justify-center items-center flex-col dark:bg-black dark:text-white dark:border-solid dark:border-white">
              <figure className="px-10 pt-10">
                <img
                  src={category.imageURL}
                  alt="Shoes"
                  className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{category.name}</h2>
                <div className="card-actions">
                  <Link to={`/products/category/${category._id}`} state={{ productCatrgory: category.name }}>
                    <button className="btn bg-[#00ABE4] text-white hover:bg-[#14303a]">View Products</button>
                  </Link>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </>
  )
}
