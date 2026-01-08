import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Link, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import axios from 'axios'
import { FaSpinner } from 'react-icons/fa6'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_KEY_API}/api/v1/auth/register`, { name, email, password })
            if (res.data.success) {
                toast.success("Sign up successfull", { duration: 3000 })
                navigate("/login")
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
        setIsSubmitting(false);
    }

    return (
        <Layout title={"Sign Up - LSP"}>
            <div className="w-full bg-linearb flex justify-center items-center">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-lg bg-white text-black rounded-2xl shadow-xl p-8 pb-10 my-20"
                >
                    <div className="rounded-2xl flex flex-col justify-center">
                    <h1 className="text-3xl font-bold uppercase text-center mb-3">SIGN UP</h1>
                    <p className="text-center text-gray-500 mb-6">Enter your details for an account</p>
                        {/* Name Input */}
                        <div className="relative w-full group">
                            <label
                                htmlFor="floating_first_name"
                                className="font-semibold"
                            >
                                First name
                            </label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                name="floating_first_name"
                                id="floating_first_name"
                                className="input-field mt-3"
                                placeholder="Enter Your Full Name"
                                required
                            />
                        

                        {/* Email Input */}
                        
                            <label
                                htmlFor="floating_email"
                                className="font-semibold"
                            >
                                Email address
                            </label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="floating_email"
                                id="floating_email"
                                className="input-field mt-3"
                                placeholder="Enter Your Email"
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
                                type="password"
                                name="floating_password"
                                id="floating_password"
                                className="input-field mt-3"
                                placeholder="Enter Your Password"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`btn my-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {isSubmitting ? <FaSpinner className="animate-spin" /> : "Sign Up"}
                        </button>

                        {/* Login Redirect */}
                        <p className="font-light my-2 text-sm text-center">
                            Already have an account?{" "}
                            <Link to="/login" className="font-bold hover:underline hover:text-primary !transition-all">
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Register