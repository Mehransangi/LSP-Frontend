import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import { FaBars, FaUser } from "react-icons/fa6"
import { FaTimes } from 'react-icons/fa'

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
    <nav className=" bg-footerbg md:py-2 text-white w-full z-100 shadow-md sticky top-0 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Logo */}
        <div className="text-3xl font-black">
          <Link to="/">LSP</Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center">
          <NavLink
            to="/"
            end
            className="font-light py-3 px-4 rounded-md !transition-all duration-300 ease-in-out hover:font-medium hover:bg-gray-700"
          >
            Home
          </NavLink>
          <NavLink
            to="/scholarships"
            className="font-light py-3 px-4 rounded-md !transition-all duration-300 ease-in-out hover:font-medium hover:bg-gray-700"
          >
            Scholarships
          </NavLink>
          <NavLink
            to="/universitynametag"
            className="font-light py-3 px-4 rounded-md !transition-all duration-300 ease-in-out hover:font-medium hover:bg-gray-700"
          >
            UniversityTags
          </NavLink>
          <NavLink
            to="/rights"
            className="font-light py-3 px-4 rounded-md !transition-all duration-300 ease-in-out hover:font-medium hover:bg-gray-700"
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
        {(
          <ul className={`absolute text-center top-full left-0 w-full bg-black text-white md:hidden px-6 py-4 space-y-4 shadow-lg rounded-b-2xl z-50 !transition-all ease-in-out duration-500 transform ${open ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'} `}>
            <li ><NavLink to="/" className="block !transition-all hover:text-primary">Home</NavLink></li>
            <li><NavLink to="/scholarships" className="block !transition-all hover:text-primary">Scholarships</NavLink></li>
            <li><NavLink to="/universitynametag" className="block !transition-all hover:text-primary">UniversityTags</NavLink></li>
            <li><NavLink to="/rights" className="block !transition-all hover:text-primary">Rights</NavLink></li>
            {!auth.user ? (
              <>

                <li><Link to="/login" className="block !transition-all duration-300 ease-in-out hover:text-primary">Login</Link></li>
                <li><Link to="/register" className="block bg-primary hover:bg-hoverbg !transition-all ease-in duration-300 text-white py-2 px-4 rounded-lg text-center">Sign Up</Link></li>
              </>
            ) : (
              <><li ><div className="h-1 bg-gray-600 w-full rounded"></div></li>
                <li><NavLink to={`/dashboard/${auth.user?.role === 1 ? 'admin' : 'user'}`} className="block hover:text-primary">{auth.user?.role === 1 ? 'Dashboard' : 'Profile'}</NavLink></li>
                <li><NavLink to="/bookmarks" className="block !transition-all hover:text-primary">Bookmarks</NavLink></li>
                <li>
                  <button onClick={handleLogout} className="w-full bg-primary !transition-all duration-300 ease-in-out hover:bg-hoverbg text-white py-2 rounded-lg">Logout</button>
                </li>
              </>
            )}
          </ul>
        )}

        {/* Desktop Auth */}
        {!auth.user ? (
          <div className="hidden md:flex gap-4 items-center">
            <Link to="/login" className="hover:bg-gray-600 rounded-lg px-4 py-2 !transition-all duration-300 ease-in-out uppercase font-medium">Login</Link>
            <Link to="/register" className="bg-primary hover:bg-hoverbg !transition-all ease-in duration-300 text-white px-4 py-2 rounded-lg uppercase font-medium">Sign Up</Link>
          </div>
        ) : (
          <div className="hidden md:block relative">
            <button
              className="bg-primary group text-white rounded-full p-2 hover:bg-hoverbg !transition-all ease-in-out duration-200"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <FaUser className="text-xl p-1 group-hover:p-0 !transition-all duration-300 ease-in-out" />
            </button>

            {/* Dropdown (always rendered, animated) */}
            <div
              className={`absolute top-8 right-0 bg-white text-gray-700 rounded-lg shadow-lg w-48 z-50 !transition-all ease-in-out duration-300 transform 
      ${hover ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}
    `}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <ul className="py-2 flex flex-col justify-center text-center text-sm p-2">
                <li>
                  <NavLink
                    to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}
                    className="block px-4 py-2 hover:bg-gray-200 rounded-lg !transition-all ease-in duration-300"
                  >
                    {auth?.user?.role === 1 ? 'Dashboard' : 'Profile'}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/bookmarks"
                    className="block px-4 py-2 hover:bg-gray-200 rounded-lg !transition-all ease-in duration-300"
                  >
                    Bookmarks
                  </NavLink>
                </li>
                <div className="border-t border-gray-400 my-1" />
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-primary my-2 hover:bg-hoverbg !transition-all ease-in duration-300 text-white py-2 rounded-lg font-medium"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>

        )}
      </div>
    </nav>
  );
};

export default Header;
