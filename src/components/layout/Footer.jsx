import React from 'react'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <>
      <footer className="bg-footerbg text-white py-16 px-8 md:px-20 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column */}
          <div>
            <h2 className="text-3xl font-black">
              <Link to="/">LSP</Link>
            </h2>
            <p className="font-light max-w-md my-3">
              At LSP we have found scholarships from all across Pakistan and gathered them in one place for you.
            </p>
          </div>

          {/* Right column */}
          <div className="flex flex-col items-start md:items-end">
            <Link
              to="/about"
              className="p-2 md:p-3 font-light rounded-lg hover:font-bold !transition-all duration-300 ease-in-out hover:bg-gray-700"
            >
              About
            </Link>
            <Link
              to="/policy"
              className="p-2 md:p-3 font-light rounded-lg hover:font-bold !transition-all duration-300 ease-in-out hover:bg-gray-700"
            >
              Privacy Policy
            </Link>
            <Link
              to="/contact"
              className="p-2 md:p-3 font-light rounded-lg hover:font-bold !transition-all duration-300 ease-in-out hover:bg-gray-700"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-600 text-center font-light text-sm py-6 mt-8">
          &copy; {new Date().getFullYear()} <span className="font-bold">LSP.</span> All Rights Reserved.
        </div>
      </footer>

    </>
  )
}

export default Footer