import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Link, useLocation, useNavigate } from 'react-router'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/auth'
import { FaSpinner } from 'react-icons/fa6'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_KEY_API}/api/v1/auth/login`, { email, password })
      if (res.data.success) {
        toast.success(res.data.message, { duration: 3000 })
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        })
        localStorage.setItem('auth', JSON.stringify(res.data))
        navigate(location.state || "/")
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Somthing Went Wrong!")
    }
    setIsSubmitting(false);
  }
  return (
    <Layout title={"Login - LSP"}>
      <div className="flex flex-col justify-center items-center min-h-[80vh] md:container px-4 sm:px-6 text-black">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-[#bdd1ff80] flex flex-col rounded-xl items-center shadow-md"
        >
          <h1 className="font-bold mt-4 mb-2 text-2xl sm:text-3xl">LOGIN</h1>
          <div className="bg-white w-[90%] flex flex-col items-center rounded-lg my-4 p-4 sm:p-6">

            {/* Email Input */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600"
              >
                Email address
              </label>
            </div>

            {/* Password Input */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="floating_password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600"
              >
                Password
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`text-white bg-[#155efc] hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto py-4 px-8 text-center ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
              {isSubmitting ? <FaSpinner className="animate-spin" /> : "Login"}
            </button>

            {/* Links */}
            <p className="font-light mt-3 text-sm text-center">
              <Link to="/verify-email" className="font-bold underline opacity-80">
                Forgot Password?
              </Link>
            </p>
            <p className="font-light mt-2 text-sm text-center">
              Don't have an account?{" "}
              <Link to="/register" className="font-bold underline opacity-80">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Layout>

  )
}

export default Login