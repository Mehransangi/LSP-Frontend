import React from 'react'
import { NavLink } from 'react-router'

const AdminMenu = () => {
    return (
        <>
            <div className="w-fill pb-10 text-sm text-center flex flex-col items-center text-gray-900 bg-white rounded-br-4xl rounded-tl-4xl sticky top-16 z-10">
                <h4 className='font-bold text-2xl w-[20vw] my-4'>Menu</h4>
                <div className=' flex item-center flex-grow h-[2px] rounded bg-[#bdd1ff] w-full ' />
                <NavLink to={"/dashboard/admin/create-category"} aria-current="true" className={({ isActive }) =>
                    `block w-full px-4 py-3 text-black border-b border-gray-800 cursor-pointer hover:bg-[#bdd1ff40] hover:border-white focus:outline-none focus:text-[#155efc] ${isActive ? "bg-[#bdd1ff40] border-white text-[#155efc]" : ""}`
                }>
                    Create Category
                </NavLink>
                <NavLink to={"/dashboard/admin/create-programlevel"} className={({ isActive }) =>
                    `block w-full px-4 py-3 text-black border-b border-gray-800 cursor-pointer hover:bg-[#bdd1ff40] hover:border-white focus:outline-none focus:text-[#155efc] ${isActive ? "bg-[#bdd1ff40] border-white text-[#155efc]" : ""
                    }`
                }>
                    Create Program Level
                </NavLink>
                <NavLink to={"/dashboard/admin/create-location"} className={({ isActive }) =>
                    `block w-full px-4 py-3 text-black border-b border-gray-800 cursor-pointer hover:bg-[#bdd1ff40] hover:border-white focus:outline-none focus:text-[#155efc] ${isActive ? "bg-[#bdd1ff40] border-white text-[#155efc]" : ""
                    }`
                }>
                    Create Location
                </NavLink>
                <NavLink to={"/dashboard/admin/create-universityname"} className={({ isActive }) =>
                    `block w-full px-4 py-3 text-black border-b border-gray-800 cursor-pointer hover:bg-[#bdd1ff40] hover:border-white focus:outline-none focus:text-[#155efc] ${isActive ? "bg-[#bdd1ff40] border-white text-[#155efc]" : ""
                    }`
                }>
                    Create University Name
                </NavLink>
                <NavLink to={"/dashboard/admin/create-universitynametag"} className={({ isActive }) =>
                    `block w-full px-4 py-3 text-black border-b border-gray-800 cursor-pointer hover:bg-[#bdd1ff40] hover:border-white focus:outline-none focus:text-[#155efc] ${isActive ? "bg-[#bdd1ff40] border-white text-[#155efc]" : ""
                    }`
                }>
                    Create University NameTag
                </NavLink>
                <NavLink to={"/dashboard/admin/create-scholarship"} className={({ isActive }) =>
                    `block w-full px-4 py-3 text-black border-b border-gray-800 cursor-pointer hover:bg-[#bdd1ff40] hover:border-white focus:outline-none focus:text-[#155efc] ${isActive ? "bg-[#bdd1ff40] border-white text-[#155efc]" : ""
                    }`
                }>
                    Create Scholarship
                </NavLink>
                <NavLink to={"/dashboard/admin/manage-scholarships"} className={({ isActive }) =>
                    `block w-full px-4 py-3 text-black border-b border-gray-800 cursor-pointer hover:bg-[#bdd1ff40] hover:border-white focus:outline-none focus:text-[#155efc] ${isActive ? "bg-[#bdd1ff40] border-white text-[#155efc]" : ""
                    }`
                }>
                    Manage Scholarships
                </NavLink>
               

            </div>


        </>
    )
}

export default AdminMenu