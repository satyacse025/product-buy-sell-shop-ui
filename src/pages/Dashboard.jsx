import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSlidebar from '../components/DashboardSlidebar'

export default function Dashboard() {
    return (
        <div className="flex h-screen bg-white dark:bg-black">
            <DashboardSlidebar />
            <div className="flex-grow m-4 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <h1 className='text-center text-xl font-semibold'>Welcome to Car Bazar Dashboard</h1>
                <div className="divider"></div>
                <Outlet />
            </div>
        </div>
    )
}
