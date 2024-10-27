import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import { auth, AuthContext } from "../provider/AuthProvider";

import toast from "react-hot-toast";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Helmet } from "react-helmet-async";


const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    imageURL: null,
    email: '',
    address: '',
    phone: '',
    password: ''

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
          email: formData.email,
          address: formData.address,
          phone: formData.phone,
          password: formData.password,
          userType: 'User',

        };

        // Save product information to the database
        const result = await fetch('https://product-buy-sell-shop-server.onrender.com/user', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(user)
        });
        const data = await result.json();

        if (data.acknowledged) {

          const name = formData.name;
          const photo = imgData.data.url;
          const email = formData.email;
          const password = formData.password;
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
    
          // Update user's profile with display name and image
          await updateProfile(user, {
            displayName: name,
            photoURL: photo,
          });
          auth.signOut();
          toast.success("User Registration Successful", {
            position: "top-right",
          });
          navigate("/login");
        }
        else {
          toast.error('Failed to add User.');
        }
      }
      else {
        toast.error('Image upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Failed to add User:', error);
      toast.error('An error occurred while adding the User.');
    }
  };











  return (
    <>
      <Helmet>
        <title>Car Bazar | Register</title>
      </Helmet>
      <div>
        <div className="py-8 bg-white dark:bg-black">
          <div className="flex h-full items-center justify-center">
            <div className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
              <div className="flex h-full flex-col justify-center gap-4 p-6">
                <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 pb-4"
                  >
                    <h1 className="mb-4 text-2xl font-bold dark:text-white text-center">
                      Register your Account
                    </h1>

                    <div>
                      <div className="mb-2">
                        <label
                          className="text-sm font-medium text-gray-900 dark:text-gray-300"
                          htmlFor="name"
                        >
                          Name
                        </label>
                      </div>
                      <div className="flex w-full rounded-lg pt-1">
                        <div className="relative w-full">
                          <input
                            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-none"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your Name"
                            autoComplete="on"
                            required
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 flex">
                        <label
                          className="text-sm font-medium text-gray-900 dark:text-gray-300"
                          htmlFor="photo"
                        >
                          Photo  <img src={formData?.image} alt="" className='w-10 ml-2' />
                        </label>
                      </div>
                      <div className="flex w-full rounded-lg pt-1">
                        <div className="relative w-full">
                          <input
                            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-none"
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            required
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2">
                        <label
                          className="text-sm font-medium text-gray-900 dark:text-gray-300"
                          htmlFor="name"
                        >
                          Address
                        </label>
                      </div>
                      <div className="flex w-full rounded-lg pt-1">
                        <div className="relative w-full">
                          <input
                            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-none"
                            
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Your Address"
                            autoComplete="on"
                            required
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2">
                        <label
                          className="text-sm font-medium text-gray-900 dark:text-gray-300"
                          htmlFor="name"
                        >
                          Phone
                        </label>
                      </div>
                      <div className="flex w-full rounded-lg pt-1">
                        <div className="relative w-full">
                          <input
                            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-none"
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Your Phone"
                            autoComplete="on"
                            required
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2">
                        <label
                          className="text-sm font-medium text-gray-900 dark:text-gray-300"
                          htmlFor="email"
                        >
                          Email
                        </label>
                      </div>
                      <div className="flex w-full rounded-lg pt-1">
                        <div className="relative w-full">
                          <input
                            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-none"
                            

                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="email@example.com"
                            autoComplete="on"
                            required
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2">
                        <label
                          className="text-sm font-medium text-gray-900 dark:text-gray-300"
                          data-testid="flowbite-label"
                          htmlFor="password"
                        >
                          Password
                        </label>
                      </div>
                      <div className="flex w-full rounded-lg pt-1">
                        <div className="relative w-full">
                          <input
                            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-none"
                            

                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            autoComplete="on"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex items-center mt-4">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-info"
                        />
                        <Link className="label-text text-blue-700 ml-2">
                          Accept Terms and Conditions
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        type="submit"
                        className="btn btn-outline btn-info rounded-none"
                      >
                        <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                          Register
                        </span>
                      </button>
                    </div>
                  </form>
                  <div className="min-w-[270px]">
                    <div className="mt-2 text-center dark:text-gray-200">
                      Already Have an Account? &nbsp;
                      <Link
                        className="text-blue-500 underline hover:text-blue-600"
                        to="/login"
                      >
                        Login Here
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
