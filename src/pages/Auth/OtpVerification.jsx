import React, { useRef, useState } from 'react';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const OtpVerification = () => {
    const inputRefs = useRef([]);
    const navigate = useNavigate()
    const [otp, setOtp] = useState(new Array(6).fill(''));

    const handleChange = (element, index) => {
        const value = element.value.replace(/\D/, ''); // Allow only digits
        if (!value) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move focus to next input
        if (index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            const newOtp = [...otp];
            if (otp[index]) {
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('Text').trim().slice(0, 6).split('');
        const newOtp = [...otp];
        for (let i = 0; i < pastedData.length; i++) {
            if (/\d/.test(pastedData[i])) {
                newOtp[i] = pastedData[i];
                if (inputRefs.current[i]) inputRefs.current[i].value = pastedData[i];
            }
        }
        setOtp(newOtp);
        if (inputRefs.current[pastedData.length - 1]) {
            inputRefs.current[pastedData.length - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const code = otp.join('')
            const res = await axios.post(`${import.meta.env.VITE_KEY_API}/api/v1/auth/verify-otp`, { code })

            if (res.data.success) {
                navigate('/forgot-password')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Invalid Token or Token Expired!!')
        }
    }


    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen min-w-screen px-4 sm:px-6 ">
                <div className="bg-white p-2 sm:p-8 rounded-xl shadow-lg w-full max-w-sm text-center border-6 border-[#BDD1FF]">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Enter OTP</h2>

                    <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
                        {otp.map((digit, i) => (
                            <input
                                key={i}
                                ref={(el) => (inputRefs.current[i] = el)}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(e.target, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                className="w-10 sm:w-12 h-12 sm:h-14 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={otp.includes('')}
                        className={`w-full py-2.5 rounded-md text-white font-medium transition duration-200 ${otp.includes('')
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#155efc] hover:bg-blue-700'
                            }`}
                    >
                        Verify OTP
                    </button>
                </div>
            </div>
        </Layout>

    );
};


export default OtpVerification;
