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
    }else{
      toast.error('Somthing Went Wrong!!!')
    }
  };

  return (
    <Layout>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-[#BDD1FF] border-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Set Your Password</h2>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 my-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
           
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 my-1">Confirm Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 text-sm text-[#155efc]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>


        {/* Error Message */}
        <div className=' h-6 m-1'>
        {confirmPassword && password !== confirmPassword && (
          <p className="text-red-500 text-sm ">Passwords do not match</p>
        )}</div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!passwordsMatch}
          className={`w-full py-2 rounded-md text-white font-medium transition ${passwordsMatch ? 'bg-[#155efc] hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
        >
          Set Password
        </button>
      </form>

    </Layout>
  );
};

export default ForgotPassword;
