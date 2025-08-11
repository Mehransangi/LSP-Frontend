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
            if(res?.data.success){
                toast.success("OTP has been sent to your Email, Please go and check it out.",{duration: 3000})
                navigate('/verify-otp')
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Layout>

            <form onSubmit={handleSubmit} className=" border-8 shadow-2xl shadow-gray-300 border-[#BDD1FF] rounded-2xl max-w-lg mx-auto">
                <div className="m-1">
                    <h1 className='text-2xl font-bold my-3 mx-1 '>Find Your Account</h1>
                    <p className='m-2'> Please enter your email address to which you will receive a 6 digit OTP.</p>
                    <div className="m-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" aria-describedby="helper-text-explanation" className="outline-none bg-gray-50 border border-gray-300 text-gray-900 p-2 w-full text-sm rounded-lg " placeholder="name@gmail.com" />
                        <button type="submit" className=" my-3 text-white bg-[#155efc] hover:bg-blue-800 rounded-lg text-sm w-full sm:w-auto px-7 py-3 text-center transition-all ">Enter</button>
                    </div>
                    </div>
            </form>

        </Layout>
    )
}

export default EmailVerification