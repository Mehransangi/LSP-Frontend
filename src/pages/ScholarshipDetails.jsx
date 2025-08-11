import axios from 'axios';
import Layout from '../components/layout/Layout'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';

const ScholarshipDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [scholarship, setScholarship] = useState({});
    const applicationLink = scholarship?.applicationURL || "/scholarships";
    

    const getScholarship = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_KEY_API}/api/v1/scholarship/scholarship/${params.slug}`);
            if(data?.success){
            setScholarship(data?.scholarship)
        }else{
            toast.error(data.message);
            navigate('/scholarships');
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (params?.slug) getScholarship();
    }, [params?.slug]);
    return (
        <Layout title="Scholarship Details - LSP">
            <div className="bg-[#bdd1ff40] container mx-auto p-6 rounded-xl m-10 min-h-screen">
                <div className="p-4">
                    <h1 className="text-3xl md:text-4xl p-4 rounded-2xl font-bold text-center uppercase mb-6 bg-white">{scholarship?.title}</h1>
                    <div className="flex flex-col md:flex-row gap-4 ">
                        <div className="w-full md:w-3/4  p-4 sm:p-6 rounded-2xl bg-white min-h-screen">
                            <h2 className='text-2xl font-bold'></h2>
                            <div
                                className="min-h-[dvh]"
                                dangerouslySetInnerHTML={{ __html: scholarship?.descriptionHTML }}
                            />
                        </div>
                        <aside className="md:w-1/4 w-full bg-white p-4 rounded-2xl">
                            <div className="bg-[#bdd1ff40] rounded-xl p-4 sticky top-18">
                                <div className="bg-white p-4 rounded-lg ">
                                    <h3 className="font-bold text-lg mb-1 uppercase">Read the entire Scholarship</h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                    </p>
                                    <a
                                        className="block text-white bg-[#155efc] hover:bg-blue-800 font-medium rounded-lg text-sm py-3 px-6 text-center"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={applicationLink}
                                    >
                                        Read
                                    </a>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ScholarshipDetails