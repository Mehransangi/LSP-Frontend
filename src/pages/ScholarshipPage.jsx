import { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { FaAngleLeft, FaAngleRight, FaArrowRightLong, FaBookmark, FaRegBookmark, FaSpinner } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import { Checkbox } from 'antd'
import { useNavigate } from 'react-router'


const ScholarshipPage = () => {
  const [scholarship, setScholarship] = useState([])
  const [categorires, setCategories] = useState([])
  const [locations, setLocations] = useState([])
  const [universityNames, setUniversityNames] = useState([])
  const [levels, setLevels] = useState([])
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedLocations, setCheckedLocations] = useState([]);
  const [checkedUniversities, setCheckedUniversities] = useState([]);
  const [checkedLevels, setCheckedLevels] = useState([]);
  const [isForDisabled, setIsForDisabled] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [scholarshipBM, setScholarshipBM] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const isBookmarked = scholarshipBM.some(item => item._id === scholarship._id);
  const [loading, setLoading] = useState(false);

  //Get all scholarships
  const getScholarships = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (checkedCategories.length) params.append('categories', checkedCategories.join(','));
      if (checkedLocations.length) params.append('locations', checkedLocations.join(','));
      if (checkedUniversities.length) params.append('universities', checkedUniversities.join(','));
      if (checkedLevels.length) params.append('levels', checkedLevels.join(','));
      if (isForDisabled) params.append('isForDisabled', 'true');
      if (search.trim()) params.append('search', search.trim());
      params.append('page', page);
      params.append('limit', 9); // Adjust if needed

      const { data } = await axios.get(`${import.meta.env.VITE_KEY_API}/api/v1/scholarship/scholarships?${params.toString()}`);
      if (data.success) {
        setScholarship(data.scholarships);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getScholarships();
  }, [checkedCategories, checkedLocations, checkedUniversities, checkedLevels, isForDisabled, search, page]);


  //Getting Categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_KEY_API}/api/v1/category/categories`)
      if (data?.success) {
        setCategories(data.categories)
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCategories()
  }, [])

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


  // Get All Program Level
  const getLevel = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_KEY_API}/api/v1/programlevel/levels`)
      if (data?.success) {
        setLevels(data.levels)
      } else { toast.error(data.message) }
    } catch (error) {
      console.log(error)
      toast.error("Something Went Wrong.")
    }
  }
  useEffect(() => {
    getLevel()
  }, [])


  // Get All University Names
  const getUniversityName = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_KEY_API}/api/v1/universityname/uninames`)
      if (data?.success) {
        setUniversityNames(data.uniNames)
      } else { toast.error(data.message) }
    } catch (error) {
      console.log(error)
      toast.error("Something Went Wrong.")
    }
  }
  useEffect(() => {
    getUniversityName()
  }, [])

  // Handle Filter 
  const handleFilter = (checked, id, type) => {
    const update = (prev) => checked ? [...prev, id] : prev.filter(i => i !== id);

    switch (type) {
      case 'category':
        setCheckedCategories(update);
        break;
      case 'location':
        setCheckedLocations(update);
        break;
      case 'university':
        setCheckedUniversities(update);
        break;
      case 'level':
        setCheckedLevels(update);
        break;
      default:
        break;
    }

    setPage(1); // Reset to first page after filter change
  };


  return (
    <Layout>
      <div className="bg-[#bdd1ff40] container mx-auto p-6 rounded-xl m-10">
        <div className="p-4">

          <h1 className="text-3xl md:text-4xl p-4 rounded-2xl font-bold text-center uppercase mb-6 bg-white">Scholarships</h1>

          <div className="flex flex-col md:flex-row gap-4 ">
            {/* Filter */}
            <aside className="md:w-1/4 w-full bg-white p-4 rounded-2xl ">

              <div className="bg-[#bdd1ff40] rounded-xl p-4 sticky top-4  ">
                <h2 className="text-xl font-semibold mb-4 uppercase text-center">Filters</h2>
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="bg-white p-3 outline-0 w-full rounded-lg mb-4"
                />
                {/* Add filter options here */}
                <div className="bg-white p-4 rounded-lg max-h-[80vh] overflow-y-auto">

                  <div className="">
                    <h4 className='font-semibold'>Categories</h4>
                    <div className="flex flex-col m-2">
                      {categorires?.map((c) => (
                        <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id, 'category')} >{c.name}</Checkbox>
                      ))}
                    </div>
                  </div>
                  <div className="">
                    <h4 className='font-semibold'>Locations</h4>
                    <div className="flex flex-col m-2">
                      {locations?.map((location) => (
                        <Checkbox key={location._id} onChange={(e) => handleFilter(e.target.checked, location._id, 'location')} >{location.name}</Checkbox>
                      ))}
                    </div>
                  </div>
                  <div className="">
                    <h4 className='font-semibold'>Universities</h4>
                    <div className="flex flex-col m-2">
                      {universityNames?.map((uniName) => (
                        <Checkbox key={uniName._id} onChange={(e) => handleFilter(e.target.checked, uniName._id, 'university')} >{uniName.name}</Checkbox>
                      ))}
                    </div>
                  </div>
                  <div className="">
                    <h4 className='font-semibold'>Program Levels</h4>
                    <div className="flex flex-col m-2">
                      {levels?.map((level) => (
                        <Checkbox key={level._id} onChange={(e) => handleFilter(e.target.checked, level._id, 'level')} >{level.name}</Checkbox>
                      ))}
                    </div>
                  </div>
                  <h4 className='font-semibold'>For Disabled</h4>
                  <div className="m-2">
                    <Checkbox checked={isForDisabled} onChange={(e) => setIsForDisabled(e.target.checked)}>
                      For Disabled
                    </Checkbox>
                  </div>

                </div>
              </div>
            </aside>
            {/* Main content area */}
            <div className="w-full md:w-3/4  p-4 sm:p-6 rounded-2xl bg-white">
              {loading ? <div className="flex justify-center"><FaSpinner className="animate-spin" /></div> :
                scholarship.length > 0 ? (scholarship.map((scholarship) => (
                  <div key={scholarship._id} className="md:mx-12 bg-[#bdd1ff40] p-2 flex flex-col rounded-lg h-fit mb-6">
                    <div className="bg-white flex flex-col m-2 p-3 rounded-lg h-full ">
                      <div className="flex justify-between m-2">
                        <h1 className='font-bold text-lg'>{scholarship.title}</h1>

                        <div className="bg-white">
                          <button
                            onClick={() => {
                              setScholarshipBM(prev => {
                                const alreadyExists = prev.some(item => item._id === scholarship._id);
                                let updated;

                                if (alreadyExists) {
                                  updated = prev.filter(item => item._id !== scholarship._id);
                                  toast.success("Item removed from bookmarks");
                                } else {
                                  updated = [...prev, scholarship];
                                  toast.success("Item added to bookmarks");
                                }

                                localStorage.setItem("ScholarshipBM", JSON.stringify(updated));
                                return updated;
                              });
                            }}
                          >
                            {scholarshipBM.some(item => item._id === scholarship._id) ? (
                              <FaBookmark fill="#155efc" size={24} />
                            ) : (
                              <FaRegBookmark fill="#155efc" size={24} />
                            )}
                          </button>

                        </div>

                      </div>
                      <div className="m-2 font-light text-sm">
                        {scholarship?.descriptionHTML?.replace(/<[^>]+>/g, '').length > 298
                          ? scholarship?.descriptionHTML?.replace(/<[^>]+>/g, '').slice(0, 298) + '...'
                          : scholarship?.descriptionHTML?.replace(/<[^>]+>/g, '')}
                      </div>
                      <div className="m-2 flex flex-col">
                        <div className='flex'>
                          <p className="text-gray-600 text-sm flex items-center mr-2">Location:</p>
                          <p className="font-bold text-sm text-[#155efc]">{scholarship?.location?.name}</p>
                        </div>
                        <div className="flex">
                          <p className="text-gray-600 text-sm flex items-center  mr-2">University: </p>
                          <p className="font-bold text-sm text-[#155efc]">{scholarship?.universityName?.name}</p>
                        </div>
                        <div className="flex">
                          <p className="text-gray-600 text-sm flex items-center  mr-2">Program: </p>
                          <p className="font-bold text-sm text-[#155efc]">{scholarship?.programLevel?.map((level, index) => (
                            <span key={level._id}>
                              {level.name}
                              {index < scholarship.programLevel.length - 1 && ", "}
                            </span>
                          ))}</p>
                        </div>
                        <div className="flex">
                          <p className="text-gray-600 text-sm flex items-center  mr-2">Category: </p>
                          <p className="font-bold text-sm text-[#155efc]">{scholarship?.category?.name}</p>
                        </div>
                        <div className="flex">
                          <p className="text-gray-600 text-sm flex items-center  mr-2">Deadline: </p>
                          <p className="font-bold text-sm truncate text-[#B90000]">{scholarship?.applicationDeadline}</p>
                        </div>
                        <div className="flex justify-end">
                          <button onClick={() => navigate(`/scholarship/${scholarship.slug}`)} className='text-white bg-[#155efc] hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto py-4 px-6 m-1 h-fit text-center flex items-center justify-center gap-3'>Read More  <FaArrowRightLong size={20} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))) : (
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

export default ScholarshipPage