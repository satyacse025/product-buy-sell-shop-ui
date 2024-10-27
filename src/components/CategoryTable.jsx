import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
export default function CategoryTable() {
    const loadedCategories = useLoaderData();
    const [categories, setCategories] = useState(loadedCategories);

    const handleDelete = (_id) => {
        fetch(`https://product-buy-sell-shop-server.onrender.com/category/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              toast.success("Category Deleted Successfully", {
                position: "top-right",
              });
              const remainingCategories = categories.filter((category) => category._id !== _id);
              setCategories(remainingCategories);
            }
          });
      };
    return (
        <>
        <Helmet>
            <title>Dashboard | All Categories</title>
        </Helmet>
        <div>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <h1 className="text-lg text-center mb-3">
                    Number of categories: {categories.length}
                </h1>
                <div className="flex flex-col items-center mb-3">
                    <Link to={'/dashboard/category/add'}>
                <button className="btn btn-wide bg-[#00ABE4] text-white">Add a new category</button>
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
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td className="px-6 py-4">
                                <img src={category?.imageURL} alt="" className='w-10' />
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {category.name}
                                </th>
                                
                                <td className="px-6 py-4">
                                    <Link to={`/dashboard/category/edit/${category._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3">Edit</Link>
                                    <button onClick={() => handleDelete(category._id)} className="font-medium text-red-600 dark:text-red-300 hover:underline">Delete</button>
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
