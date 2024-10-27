import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function UserProfile() 
{
    const loadedUser = useLoaderData();
    const [users, setUsers] = useState(loadedUser);

  return (

    <>
            <Helmet>
                <title>Car Bazar | User Profile</title>
            </Helmet>
    <div className="py-8 bg-white dark:bg-black">
        <div className="flex h-full items-center justify-center">
          <div className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
            <div className="flex h-full flex-col justify-center gap-4 p-6">
              <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
              {users.map((user) => (
                <div
                  className="flex flex-col gap-4 pb-4"
                >
                  <h1 className="text-xl font-bold dark:text-white text-center">
                    My Profile
                  </h1>
                  <div className="divider"></div>
                  <div className='flex justify-center items-center'>
                         <img src={user?.imageURL} alt="" className="w-20 h-20 rounded-full"/>
                    </div>
                    <h1 className="font-medium text-green-500 dark:text-white text-center">
                    User Type : {user.userType}
                  </h1>
                  <h1 className="font-medium dark:text-white text-center">
                    Name : {user.name}
                  </h1>
                  <h1 className="font-medium dark:text-white text-center">
                    Email : {user.email}
                  </h1>
                  <h1 className="font-medium dark:text-white text-center">
                    Address : {user.address}
                  </h1>
                  <h1 className="font-medium dark:text-white text-center">
                    Phone : {user.phone}
                  </h1>
                  <Link to={`/dashboard/user/edit/${user._id}`}>
                   <h1 className='text-center text-[#00ABE4] font-medium p-1'>Edit Profile</h1>
                   </Link>
                </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
  )
}
