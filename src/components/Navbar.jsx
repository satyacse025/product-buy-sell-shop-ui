import React, { useRef, useEffect, useContext, useState } from 'react';
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { IoLogInOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import mainLogo from '../assets/carlogo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from "../provider/AuthProvider";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [hidden, setHidden] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  }
  const hiddenShowHandler = () => {
    setHidden(!hidden);
    let menu = document.querySelector('#menu');
    menu.classList.toggle('hidden');
  }

  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section className='lg:w-5/6 mx-auto bg-[#00ABE4]'>
      <header>


        <nav className=" bg-[#00ABE4] dark:bg-black w-full top-0 start-0">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">

              <img src={mainLogo} alt="" className='w-16' />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white dark:text-white">Car Bazar</span>
            </Link>
            <div className="flex md:order-2 md:space-x-0 rtl:space-x-reverse gap-3 items-center">

              <div className="navbar-end flex justify-center items-center">

                {user && <span className="text-white hidden md:block">{user.displayName}</span>}
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar mr-3"
                >
                  <div className="w-7 rounded-full">
                    {/* <img alt="User" src={user?.photoURL} /> */}
                    {user && <img src={user?.photoURL} alt="" />}
                  </div>
                </div>

                {user ? (

                  <span onClick={handleSignOut} className='cursor-pointer'>
                    <span className="block md:hidden">
                      {/* For Mobile Device Show Only Icons */}
                      {/* <img src={logoutLogo} alt="" className='w-16 cursor-pointer' /> */}
                      <IoLogOutOutline size="30px" color="white" />
                    </span>
                    <span className="hidden md:block  py-2 px-3 text-white hover:bg-[#60c5ea] rounded md:bg-transparent md:text-white  md:p-0 md:dark:text-white ">
                      Logout
                    </span>
                  </span>
                ) : (

                  <Link to="/login">
                    <span>
                      <span className="block md:hidden">
                        {/* For Mobile Device Show Only Icons */}
                        {/* <img src={loginLogo} alt="" className='w-16' /> */}
                        <IoLogInOutline size="30px" color="white" />
                      </span>
                      <span className="hidden md:block  py-2 px-3 text-white hover:bg-[#60c5ea] rounded md:bg-transparent md:text-white  md:p-0 md:dark:text-white ">
                        Login
                      </span>
                    </span>
                  </Link>
                )}
              </div>
              <button data-collapse-toggle="menu" type="button" className="inline-flex items-center w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="menu" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14" onClick={() => hiddenShowHandler()}>
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
              <span className='pl-0 md:pl-6'><button onClick={() => darkModeHandler()}>
                {

                  dark && <IoSunny size="20px" color="white" />
                }
                {
                  !dark && <IoMoon size="20px" />
                }
              </button></span>




            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="menu">
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-black">
                <li>
                  <Link to={"/"} className="block py-2 px-3 text-white hover:bg-[#60c5ea] rounded md:bg-transparent md:text-white  md:p-0 md:dark:text-white ">Home</Link>
                </li>

                <li>
                  <Link to={"/all-products"} className="block py-2 px-3 text-white hover:bg-[#60c5ea] rounded md:bg-transparent md:text-white  md:p-0 md:dark:text-white ">All Products</Link>
                </li>
                {user &&
                  <li>
                    <Link to={"/dashboard"} className="block py-2 px-3 text-white hover:bg-[#60c5ea] rounded md:bg-transparent md:text-white  md:p-0 md:dark:text-white ">Dashboard</Link>
                  </li>
                }
              </ul>
            </div>
          </div>
        </nav>

      </header>
    </section>



  )
}
