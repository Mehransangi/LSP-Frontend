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
      <div className="flex items-center justify-center bg-background w-screen h-fit">
       
        <div className="container bg-white shadow-lg mx-auto lg:mx-70 lg:my-20 rounded-2xl p-4 flex flex-col items-center gap-6">
          <h1 className='text-center font-bold text-2xl mt-10'>PROFILE</h1>
          <form onSubmit={handleUpdateProfile} className="bg-white w-full max-w-3xl h-full rounded-2xl flex justify-start items-center flex-col gap-2 p-6">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
            <button type="submit" className="btn">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard