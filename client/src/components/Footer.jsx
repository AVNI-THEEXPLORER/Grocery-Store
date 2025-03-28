import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='border-t'>
        <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2 font-light'>
        <p className='text-normal '>&copy; All Rights Reserved {new Date().getFullYear()}</p>

            <div className='flex items-center gap-4 justify-center text-2xl'>
                <a href='www.facebook.com' className='hover:text-blue-500'>
                    <FaFacebook/>
                </a>
                <a href='www.instagram.com' className='hover:text-blue-500'>
                    <FaInstagram/>
                </a>
                <a href='www.linkedin.com' className='hover:text-blue-500'>
                    <FaLinkedin/>
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer
