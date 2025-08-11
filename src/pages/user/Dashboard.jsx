import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../../context/auth'

const Dashboard = () => {
     const [auth, setAuth] = useAuth();
     const [name, setName] = useState(auth?.user?.name || '');
     const [email, setEmail] = useState(auth?.user?.email || '');
 
     const handleUpdateProfile = async (e) => {
         e.preventDefault();
         try {
             const { data } = await axios.put(`${import.meta.env.VITE_KEY_API}/api/v1/auth/update`, {
                 _id: auth?.user?._id,
                 name,
                 email
             });
 
             if (data?.success) {
                 toast.success("Profile updated successfully");
                 const updatedAuth = { ...auth, user: { ...auth.user, name, email } };
                 setAuth(updatedAuth);
                 localStorage.setItem("auth", JSON.stringify(updatedAuth));
                 setName(data.user.name);
                 setEmail(data.user.email);
             }
         } catch (error) {
             console.error("Error updating profile:", error);
             toast.error("Failed to update profile. Please try again later.");
         }
     };
 
  return (
    <Layout title={"Dashboard - LSP"}>
      <div className="container w-screen bg-[#bdd1ff40] min-h-[77vh] py-1 m-4 flex flex-col rounded-3xl">
        <h1 className='text-center font-bold text-2xl m-2'>PROFILE</h1>
        <div className="bg-white w-fill flex-grow rounded-2xl flex justify-start items-center flex-col mx-4">
          <form onSubmit={handleUpdateProfile} className="bg-white w-full h-full rounded-2xl flex justify-start items-center flex-col gap-2 p-6">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 border-2 border-gray-300" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 border-2 border-gray-300" />
            <button type="submit" className="text-white bg-[#155efc] hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-3 text-center">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard