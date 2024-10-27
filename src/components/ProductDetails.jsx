import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLoaderData, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import StarRating from './StarRating';
import Modal from 'react-modal';
import { AuthContext } from "../provider/AuthProvider";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        maxHeight: '80vh',  // Set max height for the modal
        overflowY: 'auto',
    },
};
Modal.setAppElement('#root');

export default function ProductDetails() {

    const loadedProduct = useLoaderData();

    const { carName, sellPrice, image, carMileage, carDisplacement, rating, carModel, carColor, carBrand } = loadedProduct;

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const { user, logOut } = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch product data from the Express API
        const fetchUsers = async () => {
            try {
                const response = await fetch(`https://product-buy-sell-shop-server.onrender.com/user/profile/${user.email}`);
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUsers();
    }, []);

    // Open the modal
    const openModal = () => setModalIsOpen(true);

    // Close the modal
    const closeModal = () => setModalIsOpen(false);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData(event.currentTarget);

        const customerID = form.get("custId");
        const customerName = form.get("custName");
        const customerEmail = user.email;
        const customerPhone = form.get("custPhone");
        const customerReliveryAddress = form.get("custReliveryAddress");

      


        const cartData = {
            customerID: customerID,
            customerName: customerName,
            customerEmail: customerEmail,
            customerPhone: customerPhone,
            customerReliveryAddress: customerReliveryAddress,
            carName: carName,
            carPrice: sellPrice,
            carImageURL: image,
            carMileage: carMileage,
            carDisplacement: carDisplacement,
            carRating: rating,

        };

        // Save product information to the database
        const result = await fetch('https://product-buy-sell-shop-server.onrender.com/carts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(cartData)
        });

        const data = await result.json();

        if (data.acknowledged) {
            toast.success(`${carName} buy successfully`);
            // Close modal after submission
            closeModal();
            navigate('/');

        }
        else {
            toast.error('Failed to buy.');
            // Close modal after submission
            closeModal();
        }


    };


    return (

        <>
            <Helmet>
                <title>Car Bazar | Product Details</title>
            </Helmet>
            <div className="w-full bg-white dark:bg-black dark:text-white">
                <section className="lg:w-5/6 mx-auto">
                    <div className="grid max-w-screen-xl mb-0 px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">

                        <div className="order-first lg:mt-0 lg:col-span-6 lg:flex">
                            <img src={image} alt="" />

                        </div>
                        <div className="mr-auto place-self-center lg:col-span-6 md:ml-5 mt-3 md:mt-0">

                            <h1 className="max-w-2xl mb-3 text-lg font-extrabold tracking-tight leading-none md:text-xl xl:text-xl">{carName} </h1>
                            <div className="divider divide-dashed"></div>
                            <span className='font-bold'>Model : </span> {carModel} <br />
                            <span className='font-bold'>Price :</span> {sellPrice} <br />
                            <span className='font-bold'>Mileage :</span> {carMileage}  <br />
                            <span className='font-bold'>Brand :</span> {carBrand}<br />
                            <span className='font-bold'>Color :</span> {carColor} <br />
                            <span className='font-bold'>Displacement (ml) :</span>{carDisplacement} <br />

                            <span className='font-bold'><StarRating rating={rating} /></span><br />

                            <button onClick={openModal} className="bg-[#00ABE4] inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-black focus:ring-4 focus:ring-gray-100 ">
                                Buy Now
                            </button>

                        </div>
                    </div>
                </section>
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
                    <h2 className="text-xl font-bold mb-4 text-center text-[#00ABE4]">Product Cart</h2>
                    <div>
                        <img src={image} alt="" className='w-16' />
                        <span className='font-bold'>Name :</span> {carName} <br />

                        <span className='font-bold'>Price :</span> {sellPrice} <br />
                        <p className='text-center'>------------------------------------------------------</p>
                    </div>
                    <form onSubmit={handleSubmit}>

                        {users.map((loddeduser) => (
                            <div key={loddeduser._id}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold">Customer Name</label>
                                    <input
                                        type="text"
                                        name='custName'
                                        className="w-full p-2 border rounded"
                                        defaultValue={loddeduser.name}
                                        required
                                    />
                                    <input
                                        type="hidden"
                                        name='custId'
                                        className="w-full p-2 border rounded"
                                        defaultValue={loddeduser._id}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold">Email</label>
                                    <input
                                        type="email"
                                        name='custEmail'
                                        value={loddeduser.email}
                                        className="w-full p-2 border rounded"
                                        disabled='disabled'

                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold">Phone</label>
                                    <input
                                        type="text"
                                        name='custPhone'
                                        className="w-full p-2 border rounded"
                                        defaultValue={loddeduser.phone}
                                        required
                                    />
                                </div>

                            </div>
                        ))}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold">Relivery Address</label>
                            <input
                                type="text"
                                name='custReliveryAddress'
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Close
                            </button>
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                                Submit
                            </button>
                        </div>
                    </form>
                </Modal>


            </div>
        </>
    )
}
