import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Helmet } from "react-helmet-async";

export default function CategoryForm() {

    const [formData, setFormData] = useState({
        name: '',
        image: null
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
                const category = {
                    name: formData.name,
                    imageURL: imgData.data.url,
                    isActive: 'Active',
                };

                // Save product information to the database
                const result = await fetch('http://localhost:5000/category', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(category)
                });

                const data = await result.json();

                if (data.acknowledged)
                    {
                    toast.success(`${formData.name} is added successfully`);
                    //setFormData('');
                   navigate('/dashboard/categories');
                } 
                else 
                {
                    toast.error('Failed to add Category.');
                }
            } 
            else
             {
                toast.error('Image upload failed. Please try again.');
            }
        } catch (error) {
            console.error('Failed to add Category:', error);
            toast.error('An error occurred while adding the category.');
        }
    };


    return (
        <>
        <Helmet>
            <title>Dashboard | Add Category</title>
        </Helmet>
        <div>

            <form onSubmit={handleSubmit}>
                <h1 className='text-center font-semibold text-lg'>Add category</h1>
                <div className="divider divide-dashed"></div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Car name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    
                    <div>

                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload Image</label>
                        <input 
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" required />
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" >SVG, PNG, JPG or GIF (MAX. 800x400px).</p>

                    </div>
                   
                    
                  
                    
                   

                    
                </div>


                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add category</button>
            </form>


        </div>
        </>
    )
}
