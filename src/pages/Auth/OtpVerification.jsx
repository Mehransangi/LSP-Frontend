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
            <div className="w-full bg-linearb flex justify-center items-center">
                <div className="w-full max-w-lg bg-white text-black rounded-2xl shadow-xl p-8 pb-10 my-20">

                    <h2 className="text-3xl font-bold uppercase text-center mb-3">Enter OTP</h2>
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
                                className="input-field text-center"
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={otp.includes('')}
                        className={`btn ${otp.includes('')
                            ? 'bg-gray-600 cursor-not-allowed'
                            : ''
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
