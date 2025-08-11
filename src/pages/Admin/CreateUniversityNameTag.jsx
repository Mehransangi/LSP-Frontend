import { Modal, Table } from 'antd'
import axios from 'axios'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { FaSpinner } from 'react-icons/fa6'

const CreateUniversityNameTag = () => {
    const [universityNameTags, setUniversityNameTags] = useState([])
    const [name, setName] = useState('')
    const [link, setLink] = useState('')
    const [updatedName, setUpdatedName] = useState('')
    const [updatedLink, setUpdatedLink] = useState('')
    const [selected, setSelected] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [forDisabled, setForDisabled] = useState(false)
    const [updatedforDisabled, setUpdatedforDisabled] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getUniversityNameTags = async () => {
        try {
            const params = new URLSearchParams();
            params.append('limit', 100);
            const { data } = await axios.get(`${import.meta.env.VITE_KEY_API}/api/v1/uninametag/uninametags?${params.toString()}`)
            if (data?.success) {
                setUniversityNameTags(data?.uniNametag)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!")
        }
    }
    useEffect(() => {
        getUniversityNameTags()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isSubmitting) return; // prevent double click
        setIsSubmitting(true);
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_KEY_API}/api/v1/uninametag/create-uninametag`, { name, link, forDisabled })
            if (data?.success) {
                toast.success(data.message)
                setName('')
                setLink('')
                setForDisabled(false)
                getUniversityNameTags()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!")
        }
        setIsSubmitting(false);
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_KEY_API}/api/v1/uninametag/update-uninametag/${selected}`, { name: updatedName, link: updatedLink, forDisabled: updatedforDisabled })
            if (data?.success) {
                toast.success(data.message)
                setIsOpen(false)
                setUpdatedName('')
                setSelected(null)
                getUniversityNameTags()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!")
        }
    }

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_KEY_API}/api/v1/uninametag/delete-uninametag/${id}`)
            if (data?.success) {
                toast.success("University NameTag Deleted!")
                getUniversityNameTags()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!")
        }
    }


    return (
        <Layout title={"Create UniversityTags - LSP"}>
            <div className="container mx-auto p-6">
                <div className="flex flex-col md:flex-row bg-[#bdd1ff40] rounded-2xl min-h-screen">
                    <div className="w-full md:w-1/4 p-4">
                        <AdminMenu />
                    </div>

                    <div className="w-full md:w-3/4 p-4 flex flex-col">
                        <h1 className="text-center font-bold text-2xl mb-4">MANAGE UNIVERSITY NAMETAGS</h1>
                        <form onSubmit={handleSubmit} className="">
                            <input onChange={(e) => { setName(e.target.value) }} value={name} type="text" className="w-full p-3 rounded-lg outline-0 bg-white text-sm my-2" placeholder=" Name - University Name " required />
                            <input onChange={(e) => { setLink(e.target.value) }} value={link} type="text" className="w-full p-3 rounded-lg outline-0 bg-white text-sm my-2" placeholder=" Link - University link to which users will be directed " required />
                            <div className="my-3">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={forDisabled}
                                        onChange={(e) => setForDisabled(e.target.checked)}
                                        className=" h-4 w-5 bg-[#155efc] focus:ring-blue-500 focus:border-blue-500 text-blue-600 border-gray-300"
                                    />
                                    <span className="ml-2 text-sm">For Disabled Individuals</span>
                                </label>
                            </div>
                            <div className="flex justify-center">
                                <button type="submit" disabled={isSubmitting} className={`text-white bg-[#155efc] hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto py-4 px-8 text-center ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                >
                                    {isSubmitting ? <FaSpinner className="animate-spin" /> : "Create"}</button>
                            </div>
                        </form>

                        <div className="bg-white min-h-dvh mt-6 rounded-2xl p-4 overflow-x-auto">
                            <h2 className="text-lg font-semibold mb-4">Existing UniversityTags</h2>
                            <div className="flex flex-wrap gap-4 justify-center">
                                {universityNameTags && universityNameTags.length > 0 ? (
                                    universityNameTags.map((tag) => (
                                        <a href={tag?.link} key={tag?._id} target="_blank" rel="noopener noreferrer" className='w-full sm:w-3/4 md:w-3/4 lg:w-1/3'>
                                            <div className={` p-4 m-2 w-full text-white rounded-tr-4xl rounded-bl-4xl uppercase font-bold text-2xl  hover:scale-102 hover:shadow-lg flex justify-between items-center ${tag.forDisabled === true ? "bg-[#16a8e7] hover:bg-[#4bc5f9]" : "bg-[#3448f9] hover:bg-[#4457fe]"}`}>
                                                <span className="truncate">{tag?.name}</span>
                                                <span className="flex ml-6 gap-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            setIsOpen(true);
                                                            setUpdatedName(tag.name);
                                                            setUpdatedLink(tag.link);
                                                            setUpdatedforDisabled(tag.forDisabled || false);
                                                            setSelected(tag._id);
                                                        }}
                                                        className="hover:bg-[#bdd1ff40] p-2 rounded-2xl hover:underline w-fit gap-3"
                                                    >
                                                        <FiEdit3 size={32} />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleDelete(tag._id);
                                                        }}
                                                        className="hover:bg-[#bdd1ff40] p-2 rounded-2xl text-red-500 hover:underline w-fit"
                                                    >
                                                        <MdOutlineDelete size={32} />
                                                    </button>
                                                </span>
                                            </div>
                                        </a>
                                    ))
                                ) : (
                                    <div className="text-center text-gray-500 w-full">No University NameTags found</div>
                                )}
                            </div>
                        </div>

                        <Modal open={isOpen} onCancel={() => setIsOpen(false)} footer={null} title="UPDATE LOCATION">
                            <form onSubmit={handleUpdate} className="">
                                <input onChange={(e) => { setUpdatedName(e.target.value) }} value={updatedName} type="text" className="w-full p-3 rounded-lg outline-0 bg-white text-sm my-2" placeholder=" Name - University Name " required />
                                <input onChange={(e) => { setUpdatedLink(e.target.value) }} value={updatedLink} type="text" className="w-full p-3 rounded-lg outline-0 bg-white text-sm my-2" placeholder=" Link - University link to which users will be directed " required />
                                <div className="my-3">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={updatedforDisabled}
                                            onChange={(e) => setUpdatedforDisabled(e.target.checked)}
                                            className=" h-4 w-5 bg-[#155efc] focus:ring-blue-500 focus:border-blue-500 text-blue-600 border-gray-300"
                                        />
                                        <span className="ml-2 text-sm">For Disabled Individuals</span>
                                    </label>
                                </div>
                                <div className="flex justify-center">
                                    <button className='text-white bg-[#155efc] hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto py-4 px-8 text-center'>Update</button>
                                </div>
                            </form>
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default CreateUniversityNameTag