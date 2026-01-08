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
  const [showPassword, setShowPassword] = useState(false);

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
      <div className="w-full bg-linearb flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white text-black rounded-2xl shadow-xl p-8 pb-10 my-20"
        >
          <div className="rounded-2xl flex flex-col justify-center">
            <h1 className="text-3xl font-bold uppercase text-center mb-3">welcome back!</h1>

            {/* Email Input */}
            <div className="relative w-full group">
              <label
                htmlFor="floating_email"
                className="font-semibold"
              >
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="floating_email"
                id="floating_email"
                className="input-field mt-3"
                placeholder="Enter your Email"
                required
              />


              {/* Password Input */}

              <label
                htmlFor="floating_password"
                className="font-semibold"
              >
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                id="floating_password"
                className="input-field mt-3"
                placeholder="Enter your password"
                required
              />
              <div className="">
              <button
                type="button"
                className="hover:underline hover:text-primary !transition-all ease-in-out cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide Password' : 'Show Password'}
              </button>
            </div>
            </div>
            {/* Links */}
            <p className="font-light text-sm text-end">
              <Link to="/verify-email" className="font-bold hover:underline text-primary !transition-all">
                Forgot Password?
              </Link>
            </p>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn my-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {isSubmitting ? <FaSpinner className="animate-spin" /> : "Login"}
            </button>

            <p className="font-light mt-2 text-sm text-center">
              Don't have an account?{" "}
              <Link to="/register" className="font-bold hover:underline hover:text-primary !transition-all">
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