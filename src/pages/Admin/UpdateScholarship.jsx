import { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button, Modal, Select } from 'antd';
import { SimpleEditor } from '../../@/components/tiptap-templates/simple/simple-editor';
import { useNavigate, useParams } from 'react-router';

const UpdateScholarship = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState();
    const [levels, setLevels] = useState([]);
    const [programLevel, setProgramLevel] = useState();
    const [uniNames, setUniNames] = useState([]);
    const [universityName, setUniversityName] = useState();
    const [title, setTitle] = useState('');
    const [descriptionHTML, setDescriptionHTML] = useState('');
    const [applicationDeadline, setApplicationDeadline] = useState('');
    const [applicationURL, setApplicationURL] = useState('');
    const [forDisabled, setForDisabled] = useState(false);
    const [id, setId] = useState('');
    const [selected, setSelected] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [editorKey, setEditorKey] = useState('editor');
    const [editorReady, setEditorReady] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();


    // Getting Scholarship Data
    const getScholarshipData = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_KEY_API}/api/v1/scholarship/scholarship/${slug}`);
            if (data?.success) {
                const scholarship = data?.scholarship;
                setTitle(scholarship?.title);
                setDescriptionHTML(scholarship?.descriptionHTML || '');
                setApplicationDeadline(scholarship?.applicationDeadline);
                setApplicationURL(scholarship?.applicationURL);
                setCategory(scholarship?.category?._id);
                setLocation(scholarship?.location?._id);
                setProgramLevel(scholarship?.programLevel?._id);
                setUniversityName(scholarship?.universityName?._id);
                setForDisabled(scholarship?.forDisabled);
                setId(scholarship?._id);
                setEditorReady(true);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching scholarship data:", error);
            toast.error("Failed to fetch scholarship data.");
        }
    }
    useEffect(() => {
        getScholarshipData();
    }, []);

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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${import.meta.env.VITE_KEY_API}/api/v1/scholarship/update-scholarship/${id}`, {
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
                setProgramLevel();
                setUniversityName();
                setForDisabled(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to Update scholarship.");
        }
    }

    // Handle Delete
    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_KEY_API}/api/v1/scholarship/delete-scholarship/${id}`);
            if (data?.success) {
                toast.success("Scholarship Deleted Successfully");
                navigate('/dashboard/admin/manage-scholarships');

            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete scholarship.");
        }
    }


    return (
        <Layout title={"Update University Name - LSP"}>
            <div className="container mx-auto p-6">
                <div className="flex flex-col md:flex-row bg-[#bdd1ff40] rounded-2xl min-h-screen">
                    <div className="w-full md:w-1/4 p-4">
                        <AdminMenu />
                    </div>
                    <div className="w-full md:w-3/4 p-4 flex flex-col">
                        <h1 className="text-center font-bold text-2xl mb-4">UPDATE SCHOLARSHIPS</h1>
                        <div className=" min-h-dvh mt-6 rounded-2xl p-4 overflow-auto">

                            <div className='my-3'>
                                <input onChange={(e) => { setTitle(e.target.value) }} value={title} type="text" className="w-full p-3 rounded-lg outline-0 bg-white text-sm" placeholder=" Title " required />
                            </div>
                            <div className='my-3'>
                                <input onChange={(e) => { setApplicationURL(e.target.value) }} value={applicationURL} type="text" className="w-full p-3 rounded-lg outline-0 bg-white text-sm" placeholder=" URL - Write the original URL Or The Application Form URL  " />
                            </div>
                            <div className='my-3'>
                                <input onChange={(e) => { setApplicationDeadline(e.target.value) }} value={applicationDeadline} type="text" className="w-full p-3 rounded-lg outline-0 bg-white text-sm" placeholder=" Day/Month/Year - Application Deadline" required />
                            </div>
                            {editorReady && (
                                <SimpleEditor
                                    key={editorKey}
                                    content={descriptionHTML}
                                    onUpdate={({ editor }) => setDescriptionHTML(editor.getHTML())}
                                    editable={true}
                                    className="bg-white w-full rounded-lg"
                                />)}

                            <div className="my-3">
                                <Select
                                    placeholder="Select Category"
                                    size='large'
                                    showSearch
                                    variant='borderless'
                                    value={category}
                                    onChange={(value) => setCategory(value)}
                                    style={{ height: '50px' }}
                                    styles={{ popup: { fontSize: '14px', padding: '8px 12px', borderRadius: '8px' } }}
                                    className='w-full bg-white rounded-lg'
                                    options={categories.map(cat => ({ value: cat._id, label: cat.name }))}
                                />
                            </div>
                            <div className="my-3">
                                <Select
                                    placeholder="Select Location"
                                    size='large'
                                    showSearch
                                    variant='borderless'
                                    value={location}
                                    onChange={(value) => setLocation(value)}
                                    style={{ height: '50px' }}
                                    styles={{ popup: { fontSize: '14px', padding: '8px 12px', borderRadius: '8px' } }}
                                    className='w-full bg-white text-gray-600 rounded-lg'
                                    options={locations.map(loc => ({ value: loc._id, label: loc.name }))}
                                />
                            </div>
                            <div className="my-3">
                                <Select
                                    placeholder="Select Program Level"
                                    size='large'
                                    showSearch
                                    variant='borderless'
                                    value={programLevel}
                                    onChange={(value) => setProgramLevel(value)}
                                    style={{ height: '50px' }}
                                    styles={{ popup: { fontSize: '14px', padding: '8px 12px', borderRadius: '8px' } }}
                                    className='w-full bg-white rounded-lg'
                                    options={levels.map(lvl => ({ value: lvl._id, label: lvl.name }))}
                                />
                            </div>
                            <div className="my-3">
                                <Select
                                    placeholder="Select University Name"
                                    size='large'
                                    showSearch
                                    variant='borderless'
                                    value={universityName}
                                    onChange={(value) => setUniversityName(value)}
                                    style={{ height: '50px' }}
                                    styles={{ popup: { fontSize: '14px', padding: '8px 12px', borderRadius: '8px' } }}
                                    className='w-full bg-white rounded-xl'
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
                                <button onClick={handleSubmit} className="text-white bg-[#155efc] hover:bg-blue-800 font-medium rounded-lg text-sm  py-4 px-8 text-center md:mx-2">Update </button>
                                <button onClick={() => {
                                    setIsOpen(true);
                                    setSelected(id);
                                }} className="border-2 text-red-700 hover:bg-red-100 px-8 py-4 mx-2 rounded-lg text-sm">Delete </button>
                            </div>

                        </div>
                        <Modal open={isOpen} onCancel={handleDelete} title="Are you sure you want to delete this scholarship?" footer={[
                            <Button key="cancel" onClick={() => setIsOpen(false)}>Cancel</Button>,
                            <Button key="confirm" type="primary" danger onClick={handleDelete}>Delete</Button>
                        ]}>
                            <p>Deleting this scholarship cannot be undone.</p>
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateScholarship