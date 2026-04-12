import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const DashboardLayout = () => {
    return (
        <>

            <header className='fixed top-0 z-50 w-full border-b border-border bg-card' >
                <Navbar />
            </header>


            <main className='flex  min-h-screen max-w-7xl mx-auto px-2 :px-0 pt-16 md:pt-24' >
                <Outlet />
            </main>
        </>
    )
}

export default DashboardLayout
