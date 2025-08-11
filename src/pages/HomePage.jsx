import { FaArrowRightLong, FaSpinner } from 'react-icons/fa6';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';


const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState([]);
  const [universityNameTags, setUniversityNameTags] = useState([])
  const [loadingUniTags, setLoadingUniTags] = useState(false);
  const [loadingScholarships, setLoadingScholarships] = useState(false);


  const getUniversityNameTags = async () => {
    try {
      setLoadingUniTags(true);
      const params = new URLSearchParams();
      params.append('limit', 4);

      const { data } = await axios.get(`${import.meta.env.VITE_KEY_API}/api/v1/uninametag/uninametags?${params.toString()}`)
      if (data?.success) {
        setUniversityNameTags(data?.uniNametag)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!")
    } finally {
      setLoadingUniTags(false);
    }

  }
  useEffect(() => {
    getUniversityNameTags()
  }, [])

  const getScholarships = async () => {
    try {
      setLoadingScholarships(true);
      const params = new URLSearchParams();
      params.append('limit', 4);
      const { data } = await axios.get(`${import.meta.env.VITE_KEY_API}/api/v1/scholarship/scholarships?${params.toString()}`);
      if (data?.success) {
        setScholarships(data.scholarships);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingScholarships(false);
    }
  };

  useEffect(() => {
    getScholarships();
  }, []);




  return (
    <Layout title="Home - LSP">
      <div className="bg-[#bdd1ff80] container md:mx-auto mx-3 flex-grow p-3 md:p-6 rounded-xl my-10">

        {/* Banner */}
        <div className="bg-white p-4 rounded-2xl overflow-hidden mb-6">
          <div className="relative min-h-[300px] rounded-2xl overflow-hidden">
            {/* Proper background image with cover and center */}
            <div
              className="absolute inset-0 bg-cover bg-right"
              style={{ backgroundImage: "url('/bg-3.jpg')" }}
            />

            {/* Skewed overlay */}
            <div className="absolute -left-1/4 -top-1/4 w-[150%] h-[150%] bg-black opacity-30 -skew-y-3 z-10" />

            {/* Content Layer */}
            <div className="relative p-6 text-white flex flex-col justify-center h-full w-full md:w-1/2 z-20">
              <h1 className="text-xl md:text-4xl font-bold uppercase md:mx-20 mt-8 mb-4">
                Looking for a Scholarship in Pakistan?
              </h1>
              <p className="text-sm md:w-1/2 md:mx-20">
                <strong>LSP is the answer you were looking for</strong>. We’ve gathered scholarships from all across Pakistan into one place for you. Start your journey today and unlock your potential. Bookmark your favorites for easy access later. Let’s get started!
              </p>
            </div>
          </div>
        </div>


        {/* Header */}
        <div className="bg-white mb-4 flex justify-between items-center p-4 rounded-2xl">
          <h3 className="text-xl font-bold uppercase">Scholarships</h3>
        </div>

        {/* Scholarships */}
        <div className="bg-white w-full rounded-2xl flex flex-col p-4 overflow-auto">
          {loadingScholarships ? (
            <div className="flex justify-center"><FaSpinner className="animate-spin" /></div>
          ) : scholarships.length > 0 ? (
            scholarships.map((scholarship) => (
              <div key={scholarship._id} className="bg-[#bdd1ff40] p-5 flex flex-col rounded-lg mb-6 md:mx-40">
                <div className="bg-white flex flex-col p-4 rounded-lg h-full">

                  {/* Title */}
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="font-bold text-base sm:text-lg truncate">
                      {scholarship.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <div className="text-sm font-light mb-3">
                    {scholarship?.descriptionHTML?.replace(/<[^>]+>/g, '').length > 198
                      ? scholarship?.descriptionHTML?.replace(/<[^>]+>/g, '').slice(0, 398) + '...'
                      : scholarship?.descriptionHTML?.replace(/<[^>]+>/g, '')}
                  </div>

                  {/* Info Grid */}
                  <div className="flex flex-col">
                    <div className='flex'>
                      <p className="text-gray-600 text-sm mr-2">Location:</p>
                      <p className="font-bold text-sm text-[#155efc]">{scholarship?.location?.name}</p>
                    </div>
                    <div className="flex">
                      <p className="text-gray-600 text-sm mr-2">University: </p>
                      <p className="font-bold text-sm text-[#155efc]">{scholarship?.universityName?.name}</p>
                    </div>
                    <div className="flex">
                      <p className="text-gray-600 text-sm mr-2">Program: </p>
                      <p className="font-bold text-sm text-[#155efc]">
                        {scholarship?.programLevel?.map((level, index) => (
                          <span key={level._id}>
                            {level.name}
                            {index < scholarship.programLevel.length - 1 && ", "}
                          </span>
                        ))}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="text-gray-600 text-sm mr-2">Category: </p>
                      <p className="font-bold text-sm text-[#155efc]">{scholarship?.category?.name}</p>
                    </div>
                    <div className="flex">
                      <p className="text-gray-600 text-sm mr-2">Deadline: </p>
                      <p className="font-bold text-sm truncate text-[#B90000]">{scholarship?.applicationDeadline}</p>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => navigate(`/scholarship/${scholarship.slug}`)}
                      className="text-white bg-[#155efc] hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-4 flex items-center gap-2"
                    >
                      Read More <FaArrowRightLong size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full m-4">
              <p className="text-gray-500 uppercase">No scholarships found.</p>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={() => navigate(`/universitynametag`)}
              className="text-white bg-[#155efc] hover:bg-[#114AC8] font-medium rounded-lg text-sm py-3 px-6 flex items-center justify-center gap-2 md:w-fit"
            >
              View All <FaArrowRightLong size={20} />
            </button>
          </div>
        </div>

        {/* University Name Tags */}
        <div className="bg-white flex justify-between items-center p-4 my-5 rounded-2xl">
          <h3 className="text-xl font-bold uppercase">University Tags</h3>
          <button
            onClick={() => navigate(`/universitynametag`)}
            className="text-white bg-[#155efc] hover:bg-[#114AC8] font-medium rounded-lg text-sm py-3 px-6 flex items-center gap-2"
          >
            View All <FaArrowRightLong size={20} />
          </button>
        </div>
        <div className='bg-white p-6 rounded-2xl'>
          {loadingUniTags ? (<div className="flex justify-center"><FaSpinner className="animate-spin" /></div>) :
            universityNameTags?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {universityNameTags.map(tag => (
                  <a
                    href={tag?.link}
                    key={tag?._id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="bg-[#3448f9] text-white p-5 rounded-tr-4xl rounded-bl-4xl uppercase font-bold text-lg hover:bg-[#4457fe] hover:scale-105 transition-transform duration-200 shadow-md flex items-center justify-between">
                      <span className="truncate w-full">{tag?.name}</span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 ">No University NameTags found</div>
            )}
        </div>
        {/* Contact Us Section */}
        <div className=" text-white md:min-h-70 bg-[url('/ContactUS.jpg')] bg-no-repeat bg-cover bg-center rounded-2xl p-6 mt-6">
          <div className="flex flex-col justify-center my-15 mx-8">
            <h4 className='font-bold text-2xl gap-2 md:w-1/2'>IF YOU HAVE ANY QUERIES FEEL FREE TO CONTACT US</h4>
            <button
              onClick={() => navigate(`/contact`)}
              className="text-white max-w-fit my-4 bg-[#155efc] hover:bg-[#114AC8] font-medium rounded-lg text-sm py-3 px-6 flex items-center gap-2"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>



    </Layout >

  );
};

export default HomePage;
