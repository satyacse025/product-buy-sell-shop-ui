import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLoaderData, useNavigate } from "react-router-dom";

export default function ProductEdit() {
    const loadedProduct = useLoaderData();
    const [categories, setCategories] = useState([]);
    const [categoryObject, setCategoryObject] = useState({});
    const [formData, setFormData] = useState({
        name: loadedProduct.carName,
        category: loadedProduct.category,
        image: loadedProduct.image,
        price: loadedProduct.sellPrice,
        brand: loadedProduct.carBrand,
        model: loadedProduct.carModel,
        color: loadedProduct.carColor,
        mileage: loadedProduct.carMileage
    });
    const navigate = useNavigate();
    const imageHostKey = "c82e0f4efb7046c2298dbff69528a716";

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('http://localhost:5000/categories');
                const data = await res.json();
                setCategories(data);

                const tempCategoryObject = {};
                data.forEach(category => {
                    tempCategoryObject[category.name] = category._id;
                });
                setCategoryObject(tempCategoryObject);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);
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
                const product = {
                    carName: formData.name,
                    categoryId: categoryObject[formData.category],
                    category: formData.category,
                    image: imgData.data.url,
                    sellPrice: formData.price,
                    carBrand: formData.brand,
                    carModel: formData.model,
                    carColor: formData.color,
                    carMileage: formData.mileage,
                    postingTime: new Date(),
                    status: 'available',
                };

                // Update product information to the database
                const result = await fetch(`http://localhost:5000/product/${loadedProduct._id}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(product)
                });

                const data = await result.json();

                if (data.acknowledged) {
                    toast.success(`${formData.name} is edited successfully`);
                    //setFormData('');
                    navigate('/dashboard/products');
                }
                else {
                    toast.error('Failed to edit product.');
                }
            }
            else {
                toast.error('Image upload failed. Please try again.');
            }
        } catch (error) {
            console.error('Failed to add product:', error);
            toast.error('An error occurred while editing the product.');
        }
    };


    return (
        <div>

            <form onSubmit={handleSubmit}>
                <h1 className='text-center font-semibold text-lg'>Edit Product</h1>
                <div className="divider divide-dashed"></div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Car name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            defaultValue={loadedProduct.carName}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div>
                        <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            defaultValue={loadedProduct.category}
                            <option value="No Category Selected">Select a category</option>
                            {Object.keys(categoryObject).map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}

                        </select>
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
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" >SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                        </div>

                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Car Price</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            defaultValue={loadedProduct.sellPrice}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Car Brand</label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                            defaultValue={loadedProduct.carBrand}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Car Model</label>
                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleInputChange}
                            defaultValue={loadedProduct.carModel}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Car Color</label>
                        <input
                            type="text"
                            name="color"
                            value={formData.color}
                            onChange={handleInputChange}
                            defaultValue={loadedProduct.carColor}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Car Mileage</label>
                        <input
                            type="text"
                            name="mileage"
                            value={formData.mileage}
                            onChange={handleInputChange}
                            defaultValue={loadedProduct.carMileage}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                </div>


                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update product</button>
            </form>


        </div>
    )
}
