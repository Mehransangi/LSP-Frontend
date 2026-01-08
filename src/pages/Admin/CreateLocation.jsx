import { useEffect, useState } from 'react';
import AdminMenu from '../../components/layout/AdminMenu';
import InputForm from '../../components/layout/InputForm';
import Layout from '../../components/layout/Layout'
import { Modal } from 'antd';
import toast from 'react-hot-toast';
import axios from 'axios';

const CreateLocation = () => {
    const [locations, setLocations] = useState([])
    const [name, setName] = useState('')
    const [updatedName, setUpdatedName] = useState('')
    const [selected, setSelected] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);

    //Getting Locations
    const getLocations = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_KEY_API}/api/v1/location/locations`)
            if (data?.success) {
                setLocations(data.locations)
            } else { toast.error(data.message) }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong!')
        }
    }
    useEffect(() => {
        getLocations()
    }, [])

    //Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_KEY_API}/api/v1/location/create-location`, { name })
            if (data?.success) {
                toast.success(data.message)
                getLocations()
                setName("")
            } else {
                toast.success(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong.")
        }
        setIsSubmitting(false);
    }

    //Handle Update
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_KEY_API}/api/v1/location/update-location/${selected}`, { name: updatedName })
            if (data.success) {
                setIsOpen(false)
                setSelected(null)
                setUpdatedName('')
                getLocations()
            } else { toast.error(data.message) }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong!')
        }
    }

    //Handle Delete
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_KEY_API}/api/v1/location/delete-location/${id}`)
            if (data.success) {
                toast.success("Location Deleted!")
                getLocations()
            } else { toast.error(data.message) }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong!')
        }
    }



    return (
        <Layout title={"Create Location - LSP"}>
            <div className="flex items-center justify-center bg-background w-screen h-fit">
                <div className="container bg-white shadow-lg mx-auto lg:mx-60 lg:my-20 rounded-2xl p-4 flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/6 p-4">
                        <AdminMenu />
                    </div>

                    <div className="w-full md:w-3/4 p-4 flex flex-col">
                        <h1 className="text-center font-bold text-2xl mb-4">MANAGE LOCATIONS</h1>

                        <InputForm handleSubmit={handleSubmit} value={name} setValue={setName} field={"Location"} isSubmitting={isSubmitting} />

                        <div className="bg-white mt-6 rounded-2xl p-4 overflow-auto">
                            <table className="w-full text-sm text-center text-gray-500 rounded-2xl overflow-hidden border-separate border-spacing-y-2">
                                <thead>
                                    <tr className="bg-primary text-white">
                                        <th className="px-6 py-3  first:rounded-tl-2xl last:rounded-tr-2xl uppercase">Location Name</th>
                                        <th className="px-6 py-3  last:rounded-tr-2xl uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {locations?.map((l) => (
                                        <tr
                                            key={l._id}
                                            className={`hover:bg-white gap-y-1 bg-background border-b rounded-xl`}
                                        >
                                            <td className="px-6 py-4 font-medium text-gray-900">{l.name}</td>
                                            <td className="px-6 py-4 flex justify-center gap-2">
                                                <button
                                                    onClick={() => {
                                                        setIsOpen(true);
                                                        setUpdatedName(l.name);
                                                        setSelected(l._id);
                                                    }}
                                                    className="border-2 text-primary hover:bg-background px-4 py-2 rounded-lg"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(l._id)}
                                                    className="border-2 text-red-700 hover:bg-red-100 px-4 py-2 rounded-lg"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Modal open={isOpen} onCancel={() => setIsOpen(false)} footer={null} title="UPDATE LOCATION" width={800} centered>
                            <InputForm handleSubmit={handleUpdate} value={updatedName} setValue={setUpdatedName} field={"Location"} isSubmitting={isSubmitting} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default CreateLocation