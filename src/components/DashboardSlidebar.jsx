import React, { useRef, useEffect, useContext, useState } from 'react';
import { Link, NavLink, useNavigate, useLoaderData } from 'react-router-dom';
import { AuthContext } from "../provider/AuthProvider";
import { IoHome } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

export default function DashboardSlidebar() {



    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    // State to manage the visibility of the sidebar
    const [isOpen, setIsOpen] = useState(false);

    // Function to handle the toggling of the sidebar
    const toggleMenu = () => {
        setIsOpen(!isOpen); // Toggle the state between true and false
    };


    const handleSignOut = () => {
        logOut()
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const [users, setUsers] = useState([]);

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

    return (
        <>
            {/* Hamburger Icon */}
            <div className="md:hidden p-4">
                <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
                    {/* Conditional Rendering: Show "X" icon if menu is open, otherwise show hamburger icon */}
                    {isOpen ? (
                        // Close Icon (X)
                        <IoClose size='30px' />
                    ) : (
                        // Hamburger Icon
                        <GiHamburgerMenu size='30px' />
                    )}
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 w-96 h-full bg-[#F9FAFB] md:w-96 text-black transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out z-50 md:relative md:translate-x-0 px-3 py-3 overflow-y-auto`}
            >
                <div className="p-4">
                    <span>
                        <span className="block md:hidden text-right cursor-pointer" onClick={toggleMenu}>
                            {isOpen && <IoClose size='30px' />}
                        </span>

                    </span>
                    {/* <h1 className="text-xl font-bold mb-4" > {isOpen ? 'X' : ''} </h1> */}
                    {user && <div className='flex justify-center items-center'>
                        <img src={user?.photoURL} alt="" className="w-12 h-12 rounded-full" />
                    </div>}
                    {user && <h1 className='text-center font-medium'>{user.displayName}</h1>}
                    <Link to={`/dashboard/user/profile/${user.email}`}>
                        <h1 className='text-center text-[#00ABE4] font-medium p-1'>Profile</h1>
                    </Link>
                    <div className="divider"></div>
                    {users.map((loaddeduser) => (
                        <ul className="space-y-2">
                            <li>
                                <Link to={'/'} className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white
                             hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                                    <IoHome size='20px' />
                                    <span className='ms-3'>Car Bazar (Home)</span></Link>
                            </li>
                            <li>
                                <Link to={'/dashboard'} className="flex items-center p-2 text-gray-900 rounded-lg
                             dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <MdDashboard size='20px' />
                                    <span className="ms-3">Dashboard</span>
                                </Link>
                            </li>

                            {loaddeduser && loaddeduser.userType === 'Admin' &&
                                <li>
                                    <Link to={'/dashboard/users'} className="flex items-center p-2 text-gray-900 rounded-lg
                             dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <FaUserGroup size='20px' />
                                        <span className="ms-3">All Users</span>
                                    </Link>
                                </li>
                            }
                            {loaddeduser && loaddeduser.userType === 'Admin' &&
                                <li>
                                    <Link to={'/dashboard/categories'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <MdCategory size='20px' />
                                        <span className="ms-3">All Categories</span>
                                    </Link>
                                </li>
                            }
                            {loaddeduser && loaddeduser.userType === 'Admin' &&
                                <li>
                                    <Link to={'/dashboard/products'} className="flex items-center p-2 text-gray-900 rounded-lg
                             dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <FaProductHunt size='20px' />
                                        <span className="ms-3">All Products</span>
                                    </Link>
                                </li>
                            }
                            <li>
                                <Link to={`/dashboard/user/my-products/${user.email}`} className="flex items-center p-2 text-gray-900 rounded-lg
                             dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <FaCartPlus size='20px' />
                                    <span className="ms-3">My Products</span>
                                </Link>
                            </li>
                            <li>
                                <a onClick={handleSignOut} className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <FaSignOutAlt size='20px' />
                                    <span className="ms-3">Sign Out</span>
                                </a>
                            </li>
                        </ul>

                    ))}
                </div>
            </div>


        </>
    )
}
