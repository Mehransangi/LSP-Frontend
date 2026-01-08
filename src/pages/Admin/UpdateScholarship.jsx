import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, Modal, Select } from "antd";
import { SimpleEditor } from "../../@/components/tiptap-templates/simple/simple-editor";
import { useNavigate, useParams } from "react-router";

const UpdateScholarship = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState();
  const [levels, setLevels] = useState([]);
  const [programLevel, setProgramLevel] = useState();
  const [uniNames, setUniNames] = useState([]);
  const [universityName, setUniversityName] = useState();
  const [title, setTitle] = useState("");
  const [descriptionHTML, setDescriptionHTML] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [applicationURL, setApplicationURL] = useState("");
  const [forDisabled, setForDisabled] = useState(false);
  const [id, setId] = useState("");
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editorKey, setEditorKey] = useState("editor");
  const [editorReady, setEditorReady] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  // Getting Scholarship Data
  const getScholarshipData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_KEY_API}/api/v1/scholarship/scholarship/${slug}`
      );
      if (data?.success) {
        const scholarship = data?.scholarship;
        setTitle(scholarship?.title);
        setDescriptionHTML(scholarship?.descriptionHTML || "");
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
  };
  useEffect(() => {
    getScholarshipData();
  }, []);

  //Getting Categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_KEY_API}/api/v1/category/categories`
      );
      if (data?.success) {
        setCategories(data?.categories);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong.");
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  //Getting Locations
  const getLocations = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_KEY_API}/api/v1/location/locations`
      );
      if (data?.success) {
        setLocations(data.locations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  useEffect(() => {
    getLocations();
  }, []);

  // Get All Program Level
  const getLevel = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_KEY_API}/api/v1/programlevel/levels`
      );
      if (data?.success) {
        setLevels(data.levels);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong.");
    }
  };
  useEffect(() => {
    getLevel();
  }, []);

  // Get All University Names
  const getUniversityName = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_KEY_API}/api/v1/universityname/uninames`
      );
      if (data?.success) {
        setUniNames(data.uniNames);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong.");
    }
  };
  useEffect(() => {
    getUniversityName();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_KEY_API
        }/api/v1/scholarship/update-scholarship/${id}`,
        {
          title,
          descriptionHTML,
          applicationDeadline,
          applicationURL,
          category,
          location,
          programLevel,
          universityName,
          forDisabled,
        }
      );
      if (response.data.success) {
        toast.success("Scholarship Created Successfully");
        navigate("/dashboard/admin/manage-scholarships");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to Update scholarship.");
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${
          import.meta.env.VITE_KEY_API
        }/api/v1/scholarship/delete-scholarship/${id}`
      );
      if (data?.success) {
        toast.success("Scholarship Deleted Successfully");
        setIsOpen(false)
        navigate("/dashboard/admin/manage-scholarships");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete scholarship.");
    }
  };

  return (
    <Layout title={"Update University Name - LSP"}>
        <div className="flex items-center justify-center bg-background w-screen h-fit">
        <div className="container bg-white shadow-lg mx-auto lg:mx-60 lg:my-20 rounded-2xl p-4 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4 p-4">
            <AdminMenu />
          </div>
          <div className="w-full md:w-3/4 p-4 flex flex-col">
            <h1 className="text-center font-bold text-2xl mb-4">
              UPDATE SCHOLARSHIPS
            </h1>
            <div className=" min-h-dvh mt-6 rounded-2xl p-4 overflow-auto">
              <div className="my-3">
                <input
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                  type="text"
                  className="input-field"
                  placeholder=" Title "
                  required
                />
              
                <input
                  onChange={(e) => {
                    setApplicationURL(e.target.value);
                  }}
                  value={applicationURL}
                  type="text"
                  className="input-field"
                  placeholder=" URL - Write the original URL Or The Application Form URL  "
                />
              
                <input
                  onChange={(e) => {
                    setApplicationDeadline(e.target.value);
                  }}
                  value={applicationDeadline}
                  type="text"
                  className="input-field"
                  placeholder=" Day/Month/Year - Application Deadline"
                  required
                />
              </div>
              {editorReady && (
                <SimpleEditor
                  key={editorKey}
                  content={descriptionHTML}
                  onUpdate={({ editor }) =>
                    setDescriptionHTML(editor.getHTML())
                  }
                  editable={true}
                  className="input-field"
                />
              )}

              <div className="my-3">
                <Select
                  placeholder="Select Category"
                  size="large"
                  showSearch
                  variant="borderless"
                  value={category}
                  onChange={(value) => setCategory(value)}
                  style={{ height: "60px" }}
                  className="input-field"
                  options={categories.map((cat) => ({
                    value: cat._id,
                    label: cat.name,
                  }))}
                />
              </div>
              <div className="my-3">
                <Select
                  placeholder="Select Location"
                  size="large"
                  showSearch
                  variant="borderless"
                  value={location}
                  onChange={(value) => setLocation(value)}
                  style={{ height: "60px" }}
                  className="input-field"
                  options={locations.map((loc) => ({
                    value: loc._id,
                    label: loc.name,
                  }))}
                />
              </div>
              <div className="my-3">
                <Select
                  placeholder="Select Program Level"
                  size="large"
                  showSearch
                  variant="borderless"
                  value={programLevel}
                  onChange={(value) => setProgramLevel(value)}
                  style={{ height: "60px" }}
                  className="input-field"
                  options={levels.map((lvl) => ({
                    value: lvl._id,
                    label: lvl.name,
                  }))}
                />
              </div>
              <div className="my-3">
                <Select
                  placeholder="Select University Name"
                  size="large"
                  showSearch
                  variant="borderless"
                  value={universityName}
                  onChange={(value) => setUniversityName(value)}
                  style={{ height: "60px" }}
                  className="input-field"
                  options={uniNames.map((uni) => ({
                    value: uni._id,
                    label: uni.name,
                  }))}
                />
              </div>

              <div className="my-3">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={forDisabled}
                    onChange={(e) => setForDisabled(e.target.checked)}
                    className=" h-4 w-5"
                  />
                  <span className="ml-2 text-sm">For Disabled Individuals</span>
                </label>
              </div>
              <div className="flex justify-center items-center">
                <button
                  onClick={handleSubmit}
                  className="btn mx-1"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setIsOpen(true);
                    setSelected(id);
                  }}
                  className="btn mx-1 border-2 bg-transparent text-red-600 border-red-600 hover:text-white hover:bg-red-800 hover:border-red-800"
                >
                  Delete
                </button>
              </div>
            </div>


            <Modal
              open={isOpen}
              centered
              onCancel={() => setIsOpen(false)}
              title="Are you sure you want to delete this scholarship?"
              footer={[
                <Button key="cancel" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>,
                <Button
                  key="delete"
                  className=""
                  danger
                  onClick={handleDelete}
                >
                  Delete
                </Button>,
              ]}
            >
              <p>Deleting this scholarship cannot be undone.</p>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateScholarship;
