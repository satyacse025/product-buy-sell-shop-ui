import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";


export default function UsersTable() {
    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers);

    const handleDelete = (_id) => {
        fetch(`https://product-buy-sell-shop-server.onrender.com/user/${_id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount) {
                    toast.success("User Deleted Successfully", {
                        position: "top-right",
                    });
                    const remainingUsers = users.filter((user) => user._id !== _id);
                    setUsers(remainingUsers);
                }
            });
    };
    return (
        <>
            <Helmet>
                <title>Car Bazar | All Users</title>
            </Helmet>
        <div>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <h1 className="text-lg text-center mb-3">
                    Number of users: {users.length}
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
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User Type
                            </th>

                            <th scope="col" className="px-6 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td className="px-6 py-4">
                                    <img src={user?.imageURL} alt="" className='w-10' />
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.name}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.email}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.address}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.phone}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.userType}
                                </th>

                                <td className="px-6 py-4">
                                    <Link to={`/dashboard/usertype/edit/${user._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3">Change User Type</Link>
                                    <button onClick={() => handleDelete(user._id)} className="font-medium text-red-600 dark:text-red-300 hover:underline">Delete</button>
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
