import { useState } from 'react';
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast';
import axios from 'axios';

const AdminDashboard = () => {
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
        <Layout title={"Admin Dashboard - LSP"}>
            <div className="container px-4 py-6 mx-auto">
                <div className="bg-[#bdd1ff40] min-h-[75vh] rounded-2xl p-4 flex flex-col md:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="md:w-1/4 w-full">
                        <AdminMenu />
                    </div>

                    {/* Main Content */}
                    <div className="md:w-3/4 w-full flex flex-col">
                        <h1 className="text-center font-bold text-2xl mb-4">ADMIN PANEL</h1>
                        <form onSubmit={handleUpdateProfile} className="bg-white w-full h-full rounded-2xl flex justify-start items-center flex-col gap-2 p-6">
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 border-2 border-gray-300" />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 border-2 border-gray-300" />
                            <button type="submit" className="text-white bg-[#155efc] hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-3 text-center">
                                Update Profile
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
