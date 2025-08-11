import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import { FaBars, FaUser } from "react-icons/fa6"
import { FaTimes, FaUserMd } from 'react-icons/fa'

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: '' });
    localStorage.removeItem("auth");
    navigate('/');
    toast.success("Logged Out");
  };

  return (
    <nav className="bg-black text-white w-full z-50 shadow-md sticky top-0">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Logo */}
        <div className="text-3xl font-black">
          <Link to="/">LSP</Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-6 items-center">
          <NavLink
            to="/"
            className="font-medium  py-1 hover:border-b-3 border-transparent hover:border-[#155DFC] transition-all duration-200"
          >
            Home
          </NavLink>
          <NavLink
            to="/scholarships"
            className="font-medium py-1 hover:border-b-3 border-transparent hover:border-[#155DFC] transition-all duration-200"
          >
            Scholarships
          </NavLink>
          <NavLink
            to="/universitynametag"
            className="font-medium py-1 hover:border-b-3 border-transparent hover:border-[#155DFC] transition-all duration-200"
          >
            UniversityTags
          </NavLink>
          <NavLink
            to="/rights"
            className="font-medium py-1 hover:border-b-3 border-transparent hover:border-[#155DFC] transition-all duration-200"
          >
            Rights
          </NavLink>
        </div>


        {/* Mobile Menu Icon */}
        <div className="md:hidden text-2xl">
          <button onClick={() => setOpen(!open)}>
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <ul className="absolute text-center top-full left-0 w-full bg-black text-white md:hidden px-6 py-4 space-y-4 shadow-lg z-40 rounded-b-2xl">
            <li ><NavLink to="/" className="block hover:text-[#155DFC]">Home</NavLink></li>
            <li><NavLink to="/scholarships" className="block hover:text-[#155DFC]">Scholarships</NavLink></li>
            <li><NavLink to="/universitynametag" className="block hover:text-[#155DFC]">UniversityTags</NavLink></li>
            <li><NavLink to="/rights" className="block hover:text-[#155DFC]">Rights</NavLink></li>
            {!auth.user ? (
              <>
                
                <li><Link to="/login" className="block hover:text-[#155DFC]">Login</Link></li>
                <li><Link to="/register" className="block bg-[#155efc] hover:bg-[#114AC8] text-white py-2 px-4 rounded-lg text-center">Sign Up</Link></li>
              </>
            ) : (
              <><li ><div className="h-1 bg-gray-600 w-full rounded"></div></li>
                <li><NavLink to={`/dashboard/${auth.user?.role === 1 ? 'admin' : 'user'}`} className="block hover:text-[#155DFC]">{auth.user?.role === 1 ? 'Dashboard' : 'Profile'}</NavLink></li>
                <li><NavLink to="/bookmarks" className="block hover:text-[#155DFC]">Bookmarks</NavLink></li>
                <li>
                  <button onClick={handleLogout} className="w-full bg-[#155efc] hover:bg-[#114AC8] text-white py-2 rounded-lg">Logout</button>
                </li>
              </>
            )}
          </ul>
        )}

        {/* Desktop Auth */}
        {!auth.user ? (
          <div className="hidden md:flex gap-4 items-center">
            <Link to="/login" className="hover:text-[#114AC8] uppercase font-medium">Login</Link>
            <Link to="/register" className="bg-[#155efc] hover:bg-[#114AC8] text-white px-4 py-2 rounded-lg uppercase font-medium">Sign Up</Link>
          </div>
        ) : (
          <div className="hidden md:block relative">
            <button
              className="bg-[#155efc] text-white rounded-full p-2 hover:bg-[#114AC8] transition ease-in duration-500"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <FaUser className="text-xl p-1" />
            </button>

            {/* Dropdown on hover */}
            {hover && (
              <div
                className="absolute top-8  right-0 bg-white text-gray-700 rounded-lg shadow-lg w-48 z-50 transition ease-in duration-500"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <ul className="py-2 flex flex-col justify-center text-center text-sm p-2 transition ease-in duration-500">
                  <li>
                    <NavLink
                      to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}
                      className="block px-4 py-2 hover:bg-[#bdd1ff80] rounded-lg"
                    >
                      {auth?.user?.role === 1 ? 'Dashboard' : 'Profile'}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/bookmarks"
                      className="block px-4 py-2 hover:bg-[#bdd1ff80] rounded-lg"
                    >
                      Bookmarks
                    </NavLink>
                  </li>
                  <div className="border-t border-gray-400 my-1" />
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-[#155efc] my-2 hover:bg-[#114AC8] text-white py-2 rounded-lg font-medium"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
