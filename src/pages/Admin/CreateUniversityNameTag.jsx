import { Modal } from "antd";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa6";

const CreateUniversityNameTag = () => {
  const [universityNameTags, setUniversityNameTags] = useState([]);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedLink, setUpdatedLink] = useState("");
  const [updatedImgLink, setupdatedImgLink] = useState("");
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [forDisabled, setForDisabled] = useState(false);
  const [updatedforDisabled, setUpdatedforDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingUniTags, setLoadingUniTags] = useState(false);

  const images = import.meta.glob("/public/Images/*", {
    eager: true,
    import: "default",
  });

  const imageOptions = Object.keys(images).map((fullPath) => {
    const fileName = fullPath.split("/").pop();
    const url = `/Images/${fileName}`;
    return { fileName, url };
  });

  const getUniversityNameTags = async () => {
    try {
      setLoadingUniTags(true)
      const params = new URLSearchParams();
      params.append("limit", 100);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_KEY_API
        }/api/v1/uninametag/uninametags?${params.toString()}`
      );
      if (data?.success) {
        setUniversityNameTags(data?.uniNametag);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }finally{
      setLoadingUniTags(false)
    }
  };
  useEffect(() => {
    getUniversityNameTags();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // prevent double click
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_KEY_API}/api/v1/uninametag/create-uninametag`,
        { name, link, imgLink, forDisabled }
      );
      console.log(name, link, imgLink)
      if (data?.success) {
        toast.success(data.message);
        setName("");
        setLink("");
        setImgLink("");
        setForDisabled(false);
        getUniversityNameTags();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
    setIsSubmitting(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_KEY_API
        }/api/v1/uninametag/update-uninametag/${selected}`,
        {
          name: updatedName,
          link: updatedLink,
          imgLink: updatedImgLink,
          forDisabled: updatedforDisabled,
        }
      );
      if (data?.success) {
        toast.success(data.message);
        setIsOpen(false);
        setSelected(null);
        getUniversityNameTags();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${
          import.meta.env.VITE_KEY_API
        }/api/v1/uninametag/delete-uninametag/${id}`
      );
      if (data?.success) {
        toast.success("University NameTag Deleted!");
        getUniversityNameTags();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const ShimmerCard = () => {
    return (
      <div className="animate-pulse bg-card rounded-lg overflow-hidden w-full shadow-md min-h-[250px]">
        <div className="h-48 bg-gray-300 w-full"></div>

        <div className="p-6">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
        </div>
      </div>
    );
  };

  return (
    <Layout title={"Create UniversityTags - LSP"}>
      <div className="flex items-center justify-center bg-background w-screen h-fit">
        <div className="container bg-white shadow-lg mx-auto lg:mx-60 lg:my-20 rounded-2xl p-4 flex flex-col md:flex-row gap-6">
          <div className="md:w-2/6 lg:min-w-20 p-4">
            <AdminMenu />
          </div>

          <div className=" p-4 md:w-4/6 flex flex-col">
            <h1 className="text-center font-bold text-2xl mb-4">
              MANAGE UNIVERSITY NAMETAGS
            </h1>
            <form onSubmit={handleSubmit} className="">
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
                className="input-field"
                placeholder=" Name - University Name "
                required
              />
              <input
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                value={link}
                type="text"
                className="input-field"
                placeholder=" Link - University link to which users will be directed "
                required
              />
              <select
                className="input-field text-center"
                value={imgLink}
                onChange={(e) => setImgLink(e.target.value)}
              >
                <option value="">Select Image</option>
                {imageOptions.map((img, idx) => (
                  <option key={idx} value={img.url}>
                    {img.fileName}
                  </option>
                ))}
              </select>
              {imgLink && (
                <div className="flex items-center justify-center">
                  <img
                    src={imgLink}
                    alt="Preview"
                    width={200}
                    className={`m-4 opacity-0 !transition-all ease-in-out duration-300 transform ${
                      imgLink
                        ? `opacity-100 translate-y-0 visible`
                        : `opacity-0 -translate-y-2 invisible`
                    } `}
                  />
                </div>
              )}

              <div className="my-3">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={forDisabled}
                    onChange={(e) => setForDisabled(e.target.checked)}
                    className=" h-5 w-5"
                  />
                  <span className="ml-2 text-sm">For Disabled Individuals</span>
                </label>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    "Create"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 rounded-2xl p-4 overflow-x-auto">
              <h2 className="text-xl font-bold text-center mb-8">
                UniversityTags
              </h2>
              <div>
              {/* 
              <div className="grid grid-cols-2 gap-4">
                                {universityNameTags && universityNameTags?.length > 0 ? (
                                    universityNameTags.map((tag) => (
                                        <a href={tag?.link} key={tag?._id} target="_blank" rel="noopener noreferrer" className=''>
                                            <div className={` p-4 m-2 text-white rounded-tr-4xl rounded-bl-4xl uppercase font-bold text-2xl  hover:scale-102 hover:shadow-lg flex justify-between items-center ${tag.forDisabled === true ? "bg-[#16a8e7] hover:bg-[#4bc5f9]" : "bg-[#3448f9] hover:bg-[#4457fe]"}`}>
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
                            </div> */}
                </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loadingUniTags ? (
                    <>
                    {[1,2,3,4,5,6].map((i)=> (
                      <ShimmerCard key={i} />
                    ))}
                    </>
                  ) : universityNameTags && universityNameTags?.length > 0 ? (
                  universityNameTags.map((tag, key) => (
                    <div
                      key={key}
                      className="group bg-card rounded-lg overflow-hidden shadow-md !transition-all ease-out duration-300 card-hover"
                    >
                      <div className="h-48 border-b-1 border-gray-500 overflow-hidden">
                        <img
                          src={tag?.imgLink}
                          alt={tag.name}
                          className="w-full h-full object-cover !transition-transform !duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-1">
                          {tag.name}
                        </h3>
                        <div className="flex justify-between items-center">
                          <div className="flex justify-center items-end h-full w-full">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsOpen(true);
                                setUpdatedName(tag.name);
                                setUpdatedLink(tag.link);
                                setupdatedImgLink(tag.imgLink);
                                setUpdatedforDisabled(tag.forDisabled || false);
                                setSelected(tag._id);
                              }}
                              className="hover:bg-background p-2 rounded-2xl hover:underline w-fit gap-3"
                            >
                              <FiEdit3 size={24} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleDelete(tag._id);
                              }}
                              className="hover:bg-background p-2 rounded-2xl text-red-500 hover:underline w-fit"
                            >
                              <MdOutlineDelete size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 w-full">
                    No University NameTags found
                  </div>
                )}
              </div>
            </div>



            <Modal
              open={isOpen}
              onCancel={() => setIsOpen(false)}
              footer={null}
              title="UPDATE LOCATION"
            >
              <form onSubmit={handleUpdate} className="">
                <input
                  onChange={(e) => {
                    setUpdatedName(e.target.value);
                  }}
                  value={updatedName}
                  type="text"
                  className="input-field"
                  placeholder=" Name - University Name "
                  required
                />
                <input
                  onChange={(e) => {
                    setUpdatedLink(e.target.value);
                  }}
                  value={updatedLink}
                  type="text"
                  className="input-field"
                  placeholder=" Link - University link to which users will be directed "
                  required
                />
                <select
                  className="input-field text-center"
                  value={updatedImgLink}
                  onChange={(e) => setupdatedImgLink(e.target.value)}
                >
                  <option value="">Select Image</option>
                  {imageOptions.map((img, idx) => (
                    <option key={idx} value={img.url}>
                      {img.fileName}
                    </option>
                  ))}
                </select>
                {updatedImgLink && (
                  <div className="flex items-center justify-center">
                    <img
                      src={updatedImgLink}
                      alt="Preview"
                      width={200}
                      className={`m-4 opacity-0 !transition-all ease-in-out duration-300 transform ${
                        updatedImgLink
                          ? `opacity-100 translate-y-0 visible`
                          : `opacity-0 -translate-y-2 invisible`
                      } `}
                    />
                  </div>
                )}

                <div className="my-3">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={updatedforDisabled}
                      onChange={(e) => setUpdatedforDisabled(e.target.checked)}
                      className=" h-4 w-5 bg-[#155efc] focus:ring-blue-500 focus:border-blue-500 text-blue-600 border-gray-300"
                    />
                    <span className="ml-2 text-sm">
                      For Disabled Individuals
                    </span>
                  </label>
                </div>
                <div className="flex justify-center">
                  <button className="btn">Update</button>
                </div>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateUniversityNameTag;
