import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { updateProfile } from 'firebase/auth';
import {auth, AuthContext } from "../provider/AuthProvider";

export default function UserTypeEdit() {
    const loadedUser = useLoaderData();
    const [formData, setFormData] = useState({
        name: loadedUser.name,
        userType: loadedUser.userType,
    });
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = {
                userType: formData.userType,
            };

            // Update user information to the database
            const result = await fetch(`https://product-buy-sell-shop-server.onrender.com/user-type/${loadedUser._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(user)
            });

            const data = await result.json();
            
            if (data.acknowledged) {

                toast.success(`${formData.name} is edited successfully`);
                //setFormData('');
                navigate(`/dashboard/users`);
            }
            else {
                toast.error('Failed to edit user.');
            }

        } catch (error) {
            toast.error('An error occurred while editing the user.');
        }
    };


    return (
        <>
            <Helmet>
                <title>Dashboard | Edit User Type</title>
            </Helmet>
            <div>

                <form onSubmit={handleSubmit}>
                    <h1 className='text-center font-semibold text-lg'>Edit User Type</h1>
                    <div className="divider divide-dashed"></div>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                defaultValue={loadedUser.name}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly='readonly' />
                        </div>
                        <div>
                            <label for="userType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select User Type</label>
                            <select
                                name="userType"
                                value={formData.userType}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                               
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                                
                                defaultValue={loadedUser.userType}
                            </select>
                        </div>
                    </div>


                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update User Type</button>
                </form>


            </div>
        </>
    )
}
