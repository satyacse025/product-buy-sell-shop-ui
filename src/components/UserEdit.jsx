import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { updateProfile } from 'firebase/auth';
import {auth, AuthContext } from "../provider/AuthProvider";

export default function UserEdit() {
    const loadedUser = useLoaderData();
    const [formData, setFormData] = useState({
        name: loadedUser.name,
        image: loadedUser.imageURL,
        email: loadedUser.email,
        address: loadedUser.address,
        phone: loadedUser.phone,
        userType: loadedUser.userType,
    });
    const navigate = useNavigate();
    const imageHostKey = import.meta.env.VITE_IMAGE_HOST_KEY;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
      };

    const handleSubmit = async (e) => {
      
        e.preventDefault();

        const image = formData.image;
        const imageData = new FormData();
        imageData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    
        try {
          const res = await fetch(url, {
            method: 'POST',
            body: imageData
          });
          const imgData = await res.json();
    
          if (imgData.success) {
            const user = {
    
                name: formData.name,
                imageURL: imgData.data.url,
                address: formData.address,
                phone: formData.phone,
    
            };
    
             // Update user information to the database
             const result = await fetch(`https://product-buy-sell-shop-server.onrender.com/user/${loadedUser._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            const data = await result.json();
    
            if (data.acknowledged) {

                // Update user's profile with display name and image
                const userLoggedin = auth.currentUser;
                await updateProfile(userLoggedin, {
                    displayName: formData.name,
                    photoURL: imgData.data.url,
                });
              toast.success(`${formData.name} is edited successfully`);
              //setFormData('');
              navigate(`/dashboard/user/profile/${formData.email}`);
            }
            else {
              toast.error('Failed to edit User.');
            }
          }
          else {
            toast.error('Image upload failed. Please try again.');
          }
        } catch (error) {
          console.error('Failed to edit User:', error);
          toast.error('An error occurred while editing the User.');
        }
      };
    
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      

    return (
        <>
            <Helmet>
                <title>Dashboard | Edit User</title>
            </Helmet>
            <div>

                <form onSubmit={handleSubmit}>
                    <h1 className='text-center font-semibold text-lg'>Edit User</h1>
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
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        
                        <div>
                            <div className='flex'>

                                <span className='text-sm font-medium text-[#00ABE4]'>Current Image - </span>
                                <img src={formData?.image} alt="" className='w-10 ml-2' />


                            </div>
                            <div> <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleFileChange}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>

                        </div>
                        

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                defaultValue={loadedUser.address}
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                defaultValue={loadedUser.phone}
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>



                    </div>


                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update User</button>
                </form>


            </div>
        </>
    )
}
