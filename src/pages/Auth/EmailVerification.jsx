import { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'

const EmailVerification = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(email)
            const res = await axios.post(`${import.meta.env.VITE_KEY_API}/api/v1/auth/verify-email`, { email })
            if (res?.data.success) {
                toast.success("OTP has been sent to your Email, Please go and check it out.", { duration: 3000 })
                navigate('/verify-otp')
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Layout>
            <div className="w-full bg-linearb flex justify-center items-center">
                <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white text-black rounded-2xl shadow-xl p-8 pb-10 my-20">
                    <div className="rounded-2xl flex flex-col justify-center">
                        <h1 className='text-3xl font-bold uppercase text-center mb-3'>Find Your Account</h1>
                        <p className='text-center text-gray-500 mb-6'> Please enter your email address to which you will receive a 6 digit OTP.</p>
                        <div className="m-2">
                            <label htmlFor="email" className="font-semibold my-3 ">Your Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" aria-describedby="helper-text-explanation" className="input-field mt-3" placeholder="name@gmail.com" />
                            <button type="submit" className="btn">Enter</button>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default EmailVerification