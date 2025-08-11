import { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { FaSpinner } from 'react-icons/fa6'


const UniversityNameTag = () => {
  const [universityNameTags, setUniversityNameTags] = useState([])
  const [loading, setLoading] = useState(false)

  const getUniversityNameTags = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('limit', 20);
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
      setLoading(false);
    }
  }
  useEffect(() => {
    getUniversityNameTags()
  }, [])

  return (
    <Layout>
      <div className='bg-[#bdd1ff40] container mx-auto p-6 rounded-xl m-10'>
        <div className="bg-white rounded-2xl p-6 mb-6">
          <h2 className="text-3xl font-bold m-2 uppercase text-center">UniversityTags</h2>
          <p className="text-gray-600 mx-40 px-4 bg-white">Explore a diverse range of university Tags curated specifically for students. Each Tag serves as a direct link to the official scholarship page of the respective university, providing comprehensive information about the financial aid and scholarship opportunities available. These resources are designed to help students discover and apply for programs that support their academic journey and reduce the financial burden of higher education.</p>
        </div>
        <div className="bg-white p-4 rounded-xl">
          <div className="flex flex-col gap-8">

            {/* UniversityTags */}
            <div>
              <h3 className="text-xl font-semibold m-4 uppercase">For Normal Students</h3>
              {loading ? <div className="flex justify-center m-2"><FaSpinner className="animate-spin" /></div> :
                universityNameTags?.filter(tag => tag.forDisabled === false).length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {universityNameTags
                      .filter(tag => tag.forDisabled === false)
                      .map(tag => (
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

            <div>
              <h3 className="text-xl font-semibold m-4 uppercase">For Disabled Students</h3>
              {loading ? <div className="flex justify-center m-2"><FaSpinner className="animate-spin" /></div> :
                universityNameTags?.filter(tag => tag.forDisabled === true).length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {universityNameTags
                      .filter(tag => tag.forDisabled === true)
                      .map(tag => (
                        <a
                          href={tag?.link}
                          key={tag?._id}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <div className="bg-[#16a8e7] hover:bg-[#4bc5f9] text-white p-5 rounded-tr-4xl rounded-bl-4xl uppercase font-bold text-lg  hover:scale-102 transition-transform duration-200 shadow-md flex items-center justify-between">
                            <span className="truncate w-full">{tag?.name}</span>
                          </div>
                        </a>
                      ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500">No University NameTags for Disabled found</div>
                )}
            </div>

          </div>
        </div>

      </div>
    </Layout>
  )
}

export default UniversityNameTag