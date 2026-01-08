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

  const ShimmerCard = () => {
  return (
    <div className="animate-pulse bg-card rounded-lg overflow-hidden shadow-md">
      <div className="h-48 bg-gray-300 w-full"></div>

      <div className="p-6">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
      </div>
    </div>
  );
};


  return (
    <Layout title={"University Tags - LSP"}>
<div className="flex flex-col items-center justify-center bg-background w-screen h-fit">

  <h1 className="text-3xl font-bold m-2 mt-40 uppercase text-center opacity-0 animate-fade-in-delay-1">
    UniversityTags
  </h1>

  <p className="text-center mb-40 opacity-0 animate-fade-in-delay-2">
    Each tag will lead you to that specific university’s scholarship page that is being offered to & for their students.
  </p>

  {/* UniversityTags */}
  <div className="bg-white px-60 pb-20 opacity-0 animate-fade-in-delay-3">
    <h2 className="text-2xl text-center font-bold m-15 uppercase">for ordinary students</h2>

    {/* --- SHIMMER FOR LOADING --- */}
    {loading ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
      </div>
    ) : universityNameTags?.filter(tag => tag.forDisabled === false).length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
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
              <div className="group bg-card rounded-lg overflow-hidden shadow-md !transition-all ease-out duration-300 card-hover">
                <div className="h-48 border-b-2 border-gray-700 overflow-hidden">
                  <img
                    src={tag?.imgLink}
                    alt={tag?.name}
                    className="w-full h-full object-cover !transition-transform !duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1 truncate">
                    {tag?.name}
                  </h3>
                </div>
              </div>
            </a>
          ))}
      </div>
    ) : (
      <div className="text-center text-gray-500">No University NameTags found</div>
    )}
  </div>

  {/* SPECIAL STUDENTS */}
  <div className="px-60 pb-20 mb-20 opacity-0 animate-fade-in-delay-4">
    <h2 className="text-2xl text-center font-bold mb-30 mt-20 uppercase">for SPECIAL students</h2>

    {/* --- SHIMMER FOR LOADING --- */}
    {loading ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
      </div>
    ) : universityNameTags?.filter(tag => tag.forDisabled === true).length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
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
              <div className="group bg-card rounded-lg overflow-hidden shadow-md !transition-all ease-out duration-300 card-hover">
                <div className="h-48 border-b-2 border-gray-700 overflow-hidden">
                  <img
                    src={tag?.imgLink}
                    alt={tag?.name}
                    className="w-full h-full object-cover !transition-transform !duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1 truncate">
                    {tag?.name}
                  </h3>
                </div>
              </div>
            </a>
          ))}
      </div>
    ) : (
      <div className="text-center text-gray-500">No University NameTags for Disabled found</div>
    )}
  </div>
</div>

    </Layout>
  )
}

export default UniversityNameTag