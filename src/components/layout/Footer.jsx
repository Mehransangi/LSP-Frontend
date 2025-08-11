import React from 'react'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <>

      <div className="bg-black text-white text-center py-4">
        <p className='my-1'>
          <Link to={"/about"} className='px-2 font-medium hover:text-[#155efc] hover:transition-all'>About</Link>|
          <Link to={"/policy"} className='px-2 font-medium hover:text-[#155efc] hover:transition-all'>Privacy Policy</Link>|
          <Link to={"/Contact"} className='px-2 font-medium hover:text-[#155efc]  hover:transition-all'>Contact</Link>
        </p>
        2025 All Rights Reserved to &copy;<span className='font-bold'>LSP</span>
      </div>
    </>
  )
}

export default Footer