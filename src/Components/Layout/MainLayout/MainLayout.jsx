import React from 'react'
import { Outlet } from 'react-router-dom'
import HeroUINavbar from '../Navbar'
import Footer from '../../Footer/Footer'

export default function MainLayout() {
    return (
        <>
            <HeroUINavbar />
            <div className="container mx-auto">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}