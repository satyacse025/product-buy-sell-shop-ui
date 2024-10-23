import React from 'react'
import DashboardSlidebar from './DashboardSlidebar'
import { Outlet } from 'react-router-dom'


export default function DashboardBody() {
    return (
        <div className="bg-white dark:bg-black">
            <div className=''>
                <DashboardSlidebar />
                <div className="p-4 sm:ml-64">
                    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                        <h1 className='text-center text-lg font-semibold'>Welcome to Car Bazar Dashboard</h1>

                        {/* <Outlet /> */}
                    </div>
                </div>

            </div>


        </div>
    )
}
