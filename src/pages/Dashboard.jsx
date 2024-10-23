import React from 'react'

import { Outlet } from 'react-router-dom'
import DashboardSlidebar from '../components/DashboardSlidebar'
import ProductForm from '../components/ProductForm'
export default function Dashboard() {
    return (
        <div className="bg-white dark:bg-black">
        <div className=''>
            <DashboardSlidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <h1 className='text-center text-xl font-semibold'>Welcome to Car Bazar Dashboard</h1>
                    <div className="divider"></div>
                    <Outlet />

                    {/* <ProductForm /> */}
                </div>
            </div>

        </div>


    </div>
    )
}
