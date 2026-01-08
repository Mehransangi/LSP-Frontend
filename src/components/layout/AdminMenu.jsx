import React from 'react'
import { NavLink } from 'react-router'

const AdminMenu = () => {
    return (
        <>
            <div className="w-full h-full py-10 text-sm text-center flex flex-col items-center text-white bg-lineart rounded-2xl">
                <NavLink
                    to="/dashboard/admin/create-category"
                    className={({ isActive }) =>
                        `admin-btn
     ${isActive ? "bg-white text-black text-lg scale-105 !transition-transform !font-bold rounded-xl shadow-lg shadow-primary" : ""}`
                    }
                >
                    Create Category
                </NavLink>

                <NavLink to={"/dashboard/admin/create-programlevel"} className={({ isActive }) =>
                    `admin-btn ${isActive ? "bg-white text-black text-lg scale-105 !transition-transform !font-bold rounded-xl shadow-lg shadow-primary" : ""
                    }`
                }>
                    Create Program Level
                </NavLink>
                <NavLink to={"/dashboard/admin/create-location"} className={({ isActive }) =>
                    `admin-btn ${isActive ? "bg-white text-black text-lg scale-105 !transition-transform !font-bold rounded-xl shadow-lg shadow-primary" : ""
                    }`
                }>
                    Create Location
                </NavLink>
                <NavLink to={"/dashboard/admin/create-universityname"} className={({ isActive }) =>
                    `admin-btn ${isActive ? "bg-white text-black text-lg scale-105 !transition-transform !font-bold rounded-xl shadow-lg shadow-primary" : ""
                    }`
                }>
                    Create University Name
                </NavLink>
                <NavLink to={"/dashboard/admin/create-universitynametag"} className={({ isActive }) =>
                    `admin-btn ${isActive ? "bg-white text-black text-lg scale-105 !transition-transform !font-bold rounded-xl shadow-lg shadow-primary" : ""
                    }`
                }>
                    Create UniTags
                </NavLink>
                <NavLink to={"/dashboard/admin/create-scholarship"} className={({ isActive }) =>
                    `admin-btn ${isActive ? "bg-white text-black text-lg scale-105 !transition-transform !font-bold rounded-xl shadow-lg shadow-primary" : ""
                    }`
                }>
                    Create Scholarship
                </NavLink>
                <NavLink to={"/dashboard/admin/manage-scholarships"} className={({ isActive }) =>
                    `admin-btn ${isActive ? "bg-white text-black text-lg scale-105 !transition-transform !font-bold rounded-xl shadow-lg shadow-primary" : ""
                    }`
                }>
                    Manage Scholarships
                </NavLink>


            </div>


        </>
    )
}

export default AdminMenu