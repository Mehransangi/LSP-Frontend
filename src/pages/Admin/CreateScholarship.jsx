import { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd';
import { SimpleEditor } from '../../@/components/tiptap-templates/simple/simple-editor';
import { FaSpinner } from 'react-icons/fa6';



const CreateScholarship = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState();
  const [levels, setLevels] = useState([]);
  const [programLevel, setProgramLevel] = useState([]);
  const [uniNames, setUniNames] = useState([]);
  const [universityName, setUniversityName] = useState();
  const [title, setTitle] = useState('');
  const [descriptionHTML, setDescriptionHTML] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [applicationURL, setApplicationURL] = useState('');
  const [forDisabled, setForDisabled] = useState(false);
  const [editorKey, setEditorKey] = useState('editor');
  const [isSubmitting, setIsSubmitting] = useState(false);

  //Getting Categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_KEY_API}/api/v1/category/categories`)
      if (data?.success) {
        setCategories(data?.categories)
      } else { toast.error(data.message) }
    } catch (error) {
      console.log(error)
      toast.error("Something Went Wrong.")
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
        setUniNames(data.uniNames)
      } else { toast.error(data.message) }
    } catch (error) {
      console.log(error)
      toast.error("Something Went Wrong.")
    }
  }
  useEffect(() => {
    getUniversityName()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_KEY_API}/api/v1/scholarship/create-scholarship`, {
        title,
        descriptionHTML,
        applicationDeadline,
        applicationURL,
        category,
        location,
        programLevel,
        universityName,
        forDisabled
      });
      if (response.data.success) {
        toast.success("Scholarship Created Successfully");
        setTitle('');
        setEditorKey(`editor-${Date.now()}`);
        setDescriptionHTML('');
        setApplicationDeadline('');
        setApplicationURL('');
        setCategory();
        setLocation();
        setProgramLevel([]);
        setUniversityName();
        setForDisabled(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create scholarship.");
    }
    setIsSubmitting(false); // Reset submitting state after the request completes
  }


  return (
    <Layout title={"Create Scholarship - LSP"}>
      <div className="flex items-center justify-center bg-background w-screen h-fit">
        <div className="container bg-white shadow-lg mx-auto lg:mx-60 lg:my-20 rounded-2xl p-4 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4 p-4">
            <AdminMenu />
          </div>
          <div className="w-full md:w-3/4 p-4 flex flex-col">
            <h1 className="text-center font-bold text-2xl mb-4">CREATE SCHOLARSHIPS</h1>
            <div className=" min-h-dvh mt-6 rounded-2xl p-4 overflow-auto">
              <form onSubmit={handleSubmit}>
                <div className='my-3'>
                  <input onChange={(e) => { setTitle(e.target.value) }} value={title} type="text" className="input-field" placeholder=" Title " required />
               
                  <input onChange={(e) => { setApplicationURL(e.target.value) }} value={applicationURL} type="text" className="input-field" placeholder=" URL - Write the original URL Or The Application Form URL  " />
                
                  <input onChange={(e) => { setApplicationDeadline(e.target.value) }} value={applicationDeadline} type="text" className="input-field" placeholder=" Day/Month/Year - Application Deadline" required />
                </div>
                <div className="">
                  <SimpleEditor
                    key={editorKey}
                    content={descriptionHTML}
                    onUpdate={({ editor }) => setDescriptionHTML(editor.getHTML())}
                    editable={true}
                    className="input-field"
                  />
                </div>


                <div className="my-3">
                  <Select
                    placeholder="Select Category"
                    size='large'
                    variant='borderless'
                    value={category}
                    onChange={(value) => setCategory(value)}
                    style={{ height: '50px' }}
                    className='input-field'
                    options={categories.map(cat => ({ value: cat._id, label: cat.name }))}
                  />
                </div>
                <div className="my-3">
                  <Select
                    placeholder="Select Location"
                    size='large'
                    variant='borderless'
                    value={location}
                    onChange={(value) => setLocation(value)}
                    style={{ height: '50px' }}
                    className='input-field'
                    options={locations.map(loc => ({ value: loc._id, label: loc.name }))}
                  />
                </div>
                <div className="my-3">
                  <Select
                    mode='multiple'
                    placeholder="Select Program Level"
                    size='large'
                    variant='borderless'
                    value={programLevel}
                    onChange={(value) => setProgramLevel(value)}
                    style={{ height: '50px' }}
                    className='input-field'
                    options={levels.map(lvl => ({ value: lvl._id, label: lvl.name }))}
                  />
                </div>
                <div className="my-3">
                  <Select
                    placeholder="Select University Name"
                    size='large'
                    variant='borderless'
                    value={universityName}
                    onChange={(value) => setUniversityName(value)}
                    style={{ height: '50px' }}
                    styles={{ popup: { fontSize: '14px', padding: '8px 12px', borderRadius: '8px' } }}
                    className='input-field'
                    options={uniNames.map(uni => ({ value: uni._id, label: uni.name }))}
                  />
                </div>

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
                <div className="flex justify-center items-center">
                  <button type="submit" disabled={isSubmitting} className={`btn ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? <FaSpinner className="animate-spin" /> : "Create"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
      </div >
    </Layout >
  )
}

export default CreateScholarship