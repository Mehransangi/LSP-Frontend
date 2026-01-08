import axios from 'axios';
import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordsMatch) {
      const res = await axios.post(`${import.meta.env.VITE_KEY_API}/api/v1/auth/forgot-password`, { password })
      toast.success("Loged In", { duration: 3000 })
      navigate('/login')
    } else {
      toast.error('Somthing Went Wrong!!!')
    }
  };

  return (
    <Layout>
      <div className="w-full bg-linearb flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white text-black rounded-2xl shadow-xl p-8 pb-10 my-20"
        >
          <h2 className="text-3xl font-bold uppercase text-center mb-3">Set Your Password</h2>

          {/* Password Field */}
          <div className="mb-4">
            <label className="font-semibold">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-field mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label className="font-semibold">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-field mt-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-end">
              <button
                type="button"
                className="hover:underline hover:text-primary !transition-all ease-in-out cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide Password' : 'Show Password'}
              </button>
            </div>
          </div>


          {/* Error Message */}
          <div className='h-6 m-1'>
            {confirmPassword && password !== confirmPassword && (
              <p className="text-red-500 text-md">Passwords do not match</p>
            )}</div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!passwordsMatch}
            className={`btn ${passwordsMatch ? '' : 'bg-gray-600 cursor-not-allowed'
              }`}
          >
            Set Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
