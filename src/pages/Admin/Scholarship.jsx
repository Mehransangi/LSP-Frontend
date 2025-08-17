import axios from 'axios';
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaAngleLeft, FaAngleRight, FaArrowRightLong, FaRegBookmark } from 'react-icons/fa6';
import { Link } from 'react-router';


const Scholarship = () => {
    const [scholarships, setScholarships] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false)

    const getScholarships = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams()
            params.append('page', page);
            params.append('limit', 9); // Adjust if needed
            const { data } = await axios.get(`${import.meta.env.VITE_KEY_API}/api/v1/scholarship/scholarships?${params.toString()}`);

            if (data?.success) {
                setScholarships(data.scholarships);
                setTotalPages(data.totalPages);
            }
        } catch (error) {
            console.error("Error fetching scholarships:", error);
            toast.error("Failed to fetch scholarships.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getScholarships();
    }, [page]);

    return (
        <Layout title={"Manage Scholarships - LSP"}>
            <div className="container mx-auto p-4 sm:p-6">
                <div className="flex flex-col md:flex-row bg-[#bdd1ff40] rounded-2xl min-h-screen">

                    {/* Sidebar */}
                    <div className="w-full md:w-1/4 p-4">
                        <AdminMenu />
                    </div>

                    {/* Main Content */}
                    <div className="w-full md:w-3/4 p-4 flex flex-col">
                        <h1 className="text-center font-bold text-xl sm:text-2xl mb-4">SCHOLARSHIPS</h1>

                        <div className="bg-white w-full rounded-2xl flex flex-col p-4 overflow-auto">
                            { loading ? <div className="flex justify-center m-2"><FaSpinner className="animate-spin" /></div> : scholarships.length > 0 ? (
                                scholarships.map((scholarship) => (
                                    <Link
                                        to={`/dashboard/admin/scholarship/${scholarship.slug}`}
                                        className="no-underline"
                                        key={scholarship._id}
                                    >
                                        <div className="bg-[#bdd1ff40] p-3 flex flex-col rounded-lg mb-6">
                                            <div className="bg-white flex flex-col p-4 rounded-lg h-full">

                                                {/* Title and Bookmark */}
                                                <div className="flex justify-between items-start mb-2">
                                                    <h2 className="font-bold text-base sm:text-lg truncate">
                                                        {scholarship.title}
                                                    </h2>
                                                    <FaRegBookmark fill="#155efc" size={20} />
                                                </div>

                                                {/* Description */}
                                                <div className="text-sm font-light mb-3">
                                                    {scholarship?.descriptionHTML?.replace(/<[^>]+>/g, '').length > 198
                                                        ? scholarship?.descriptionHTML?.replace(/<[^>]+>/g, '').slice(0, 198) + '...'
                                                        : scholarship?.descriptionHTML?.replace(/<[^>]+>/g, '')}
                                                </div>

                                                {/* Info Grid */}
                                                <div className="flex flex-col">
                                                    <div className='flex'>
                                                        <p className="text-gray-600 text-sm flex items-center mr-2">Location:</p>
                                                        <p className="font-bold text-sm text-[#155efc]">{scholarship?.location?.name}</p>
                                                    </div>
                                                    <div className="flex">
                                                        <p className="text-gray-600 text-sm flex items-center  mr-2">University: </p>
                                                        <p className="font-bold text-[#155efc]">{scholarship?.universityName?.name}</p>
                                                    </div>
                                                    <div className="flex">
                                                        <p className="text-gray-600 text-sm flex items-center  mr-2">Program: </p>
                                                        <p className="font-bold text-[#155efc]">{scholarship?.programLevel?.name}</p>
                                                    </div>
                                                    <div className="flex">
                                                        <p className="text-gray-600 text-sm flex items-center  mr-2">Category: </p>
                                                        <p className="font-bold text-[#155efc]">{scholarship?.category?.name}</p>
                                                    </div>
                                                    <div className="flex">
                                                        <p className="text-gray-600 text-sm flex items-center  mr-2">Deadline: </p>
                                                        <p className="font-bold truncate text-[#B90000]">{scholarship?.applicationDeadline}</p>
                                                    </div>
                                                </div>

                                                {/* Button */}
                                                <div className="flex justify-center">
                                                    <button className="text-white bg-[#155efc] hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-4 flex items-center gap-2">
                                                        Read More <FaArrowRightLong size={16} />
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="flex items-center justify-center w-full">
                                    <p className="text-gray-500 uppercase">No scholarships found.</p>
                                </div>
                            )}
                            <div className="flex justify-center items-center gap-4 mt-6">
                                <button
                                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                    className="bg-[#155efc] hover:bg-blue-800 text-white p-4  rounded-xl disabled:bg-gray-400"
                                >
                                    <FaAngleLeft />
                                </button>
                                <span> <span className='font-medium text-xl'>{page}</span> of {totalPages}</span>
                                <button
                                    onClick={() => setPage(prev => (prev < totalPages ? prev + 1 : prev))}
                                    disabled={page === totalPages}
                                    className="bg-[#155efc] hover:bg-blue-800 text-white p-4 rounded-xl disabled:bg-gray-400"
                                >
                                    <FaAngleRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default Scholarship