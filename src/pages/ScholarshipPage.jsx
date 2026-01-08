import { useEffect, useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
  FaAngleUp,
  FaArrowRightLong,
  FaBookmark,
  FaRegBookmark,
  FaSpinner,
} from "react-icons/fa6";
import toast from "react-hot-toast";
import { Checkbox } from "antd";
import { Link, useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";
import { getScholarshipImage } from "../components/getScholarshipImages";
import ScholarshipCardSkeleton from "../components/ScholarshipCardSkeleton";

const ScholarshipPage = () => {
  const [scholarship, setScholarship] = useState([]);
  const [categorires, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [universityNames, setUniversityNames] = useState([]);
  const [levels, setLevels] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedLocations, setCheckedLocations] = useState([]);
  const [checkedUniversities, setCheckedUniversities] = useState([]);
  const [checkedLevels, setCheckedLevels] = useState([]);
  const [isForDisabled, setIsForDisabled] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [scholarshipBM, setScholarshipBM] = useState(() => {
  try {
    const saved = localStorage.getItem("ScholarshipBM");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});

const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(null);

  //Get all scholarships
  const getScholarships = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (checkedCategories.length)
        params.append("categories", checkedCategories.join(","));
      if (checkedLocations.length)
        params.append("locations", checkedLocations.join(","));
      if (checkedUniversities.length)
        params.append("universities", checkedUniversities.join(","));
      if (checkedLevels.length)
        params.append("levels", checkedLevels.join(","));
      if (isForDisabled) params.append("isForDisabled", "true");
      if (search.trim()) params.append("search", search.trim());
      params.append("page", page);
      params.append("limit", 9); // Adjust if needed

      const { data } = await axios.get(
        `${import.meta.env.VITE_KEY_API
        }/api/v1/scholarship/scholarships?${params.toString()}`
      );
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
  }, [
    checkedCategories,
    checkedLocations,
    checkedUniversities,
    checkedLevels,
    isForDisabled,
    search,
    page,
  ]);

  //Getting Categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_KEY_API}/api/v1/category/categories`
      );
      if (data?.success) {
        setCategories(data.categories);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
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
        setUniversityNames(data.uniNames);
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

  // Handle Filter
  const handleFilter = (checked, id, type) => {
    const update = (prev) =>
      checked ? [...prev, id] : prev.filter((i) => i !== id);

    switch (type) {
      case "category":
        setCheckedCategories(update);
        break;
      case "location":
        setCheckedLocations(update);
        break;
      case "university":
        setCheckedUniversities(update);
        break;
      case "level":
        setCheckedLevels(update);
        break;
      default:
        break;
    }

    setPage(1); // Reset to first page after filter change
  };

  const allDropdownsRef = useRef([]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!allDropdownsRef.current.some((ref) => ref?.contains(e.target))) {
        setOpenDropdown(null); // close all
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLoggedIn = !!localStorage.getItem("auth");  
  const bookMark = (e, scholarship) => {
    e.stopPropagation();
    e.preventDefault();
    setScholarshipBM((prev) => {
      const alreadyExists = prev.some(
        (item) => item._id === scholarship._id
      );
      let updated;
      

      if (!isLoggedIn) {
      toast.error("Please log in to bookmark scholarships");
      return prev
    }

      if (alreadyExists) {
        updated = prev.filter(
          (item) => item._id !== scholarship._id
        );
        toast.success("Item removed from bookmarks");
      } else {
        updated = [...prev, scholarship];
        toast.success("Item added to bookmarks");
      }
console.log("ID:", scholarship._id);

      localStorage.setItem(
        "ScholarshipBM",
        JSON.stringify(updated)
      );
      return updated;
    })
  }

  return (
      <Layout title={"Scholarships - LSP"}>
        <div className="flex flex-col items-center justify-center bg-background w-full min-h-screen">
          <div className="relative flex flex-col items-center justify-center px-4 w-full max-w-7xl">
            <h1 className="text-3xl font-bold m-2 mt-40 uppercase text-center animate-fade-in">
              Scholarships
            </h1>

            {/* Search bar */}
            <div
              className="flex gap-3 animate-fade-in-delay-1 bg-white p-4 my-8 rounded-2xl 
          w-full sm:w-3/4 lg:w-1/2 border-3 border-gray-200 
          focus-within:shadow-xl focus-within:border-primary !transition-all duration-300"
            >
              <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="outline-none text-gray-900 text-md rounded-lg block w-full !transition-all duration-300"
              />
              <FaSearch size={20} className="text-footerbg hover:text-primary" />
            </div>

            {/* Filters */}
            <div
              className="flex flex-wrap animate-fade-in-delay-2 justify-center 
          w-full sm:w-3/4 lg:w-2/3 gap-x-4 gap-y-5 my-10 mb-20"
            >
              {/* Filter box reusable class */}
              {/** Replace all w-65 → responsive width */}
              {/** Mobile full width, tablet half, desktop fixed */}
              <style>{`
          .filter-box {
            width: 100%;
          }
          @media (min-width: 640px) {
            .filter-box {
              width: 48%;
            }
          }
          @media (min-width: 1024px) {
            .filter-box {
              width: 220px;
            }
          }
        `}</style>

              {/* 1 - CATEGORY */}
              <div
                ref={(el) => (allDropdownsRef.current[0] = el)}
                className="filter-box h-15 flex items-center bg-white rounded-2xl relative 
          !transition-all duration-200 hover:bg-background border-3 border-white"
              >
                <button
                  className="flex justify-between items-center w-full h-full px-5"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "category" ? null : "category"
                    )
                  }
                >
                  <span>Category</span>
                  {openDropdown === "category" ? <FaAngleUp /> : <FaAngleDown />}
                </button>

                <div
                  className={`absolute top-16 bg-white text-gray-700 rounded-2xl shadow-lg 
            w-full z-50 !transition-all duration-300 transform 
            ${openDropdown === "category"
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                    }`}
                >
                  <ul className="py-2 flex flex-col text-center text-sm p-2">
                    <li className="flex flex-col py-3">
                      {categorires?.map((c) => (
                        <Checkbox
                          key={c._id}
                          onChange={(e) =>
                            handleFilter(e.target.checked, c._id, "category")
                          }
                          styles={"padding: 20px"}
                        >
                          {c.name}
                        </Checkbox>
                      ))}
                    </li>
                  </ul>
                </div>
              </div>

              {/* 2 - LOCATION */}
              <div
                ref={(el) => (allDropdownsRef.current[1] = el)}
                className="filter-box h-15 flex items-center bg-white rounded-2xl relative 
          !transition-all duration-200 hover:bg-background border-3 border-white"
              >
                <button
                  className="flex justify-between items-center w-full h-full px-5"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "location" ? null : "location"
                    )
                  }
                >
                  <span>Location</span>
                  {openDropdown === "location" ? <FaAngleUp /> : <FaAngleDown />}
                </button>

                <div
                  className={`absolute top-16 bg-white text-gray-700 rounded-2xl shadow-lg 
            w-full z-50 !transition-all duration-300 transform
            ${openDropdown === "location"
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                    }`}
                >
                  <ul className="py-2 flex flex-col text-center text-sm p-2">
                    <li className="flex flex-col py-3">
                      {locations?.map((location) => (
                        <Checkbox
                          key={location._id}
                          onChange={(e) =>
                            handleFilter(
                              e.target.checked,
                              location._id,
                              "location"
                            )
                          }
                        >
                          {location.name}
                        </Checkbox>
                      ))}
                    </li>
                  </ul>
                </div>
              </div>

              {/* 3 - UNIVERSITIES */}
              <div
                ref={(el) => (allDropdownsRef.current[2] = el)}
                className="filter-box h-15 flex items-center bg-white rounded-2xl relative 
          !transition-all duration-200 hover:bg-background border-3 border-white"
              >
                <button
                  className="flex justify-between items-center w-full h-full px-5"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "Universities" ? null : "Universities"
                    )
                  }
                >
                  <span>Universities</span>
                  {openDropdown === "Universities" ? (
                    <FaAngleUp />
                  ) : (
                    <FaAngleDown />
                  )}
                </button>

                <div
                  className={`absolute top-16 bg-white text-gray-700 rounded-2xl shadow-lg 
            w-full z-50 !transition-all duration-300 transform 
            ${openDropdown === "Universities"
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                    }`}
                >
                  <ul className="py-2 flex flex-col text-center text-sm p-2">
                    <li className="flex flex-col py-3">
                      {universityNames?.map((uniName) => (
                        <Checkbox
                          key={uniName._id}
                          onChange={(e) =>
                            handleFilter(
                              e.target.checked,
                              uniName._id,
                              "university"
                            )
                          }
                        >
                          {uniName.name}
                        </Checkbox>
                      ))}
                    </li>
                  </ul>
                </div>
              </div>

              {/* 4 - LEVELS */}
              <div
                ref={(el) => (allDropdownsRef.current[3] = el)}
                className="filter-box h-15 flex items-center bg-white rounded-2xl relative 
          !transition-all duration-200 hover:bg-background border-3 border-white"
              >
                <button
                  className="flex justify-between items-center w-full h-full px-5"
                  onClick={() =>
                    setOpenDropdown(openDropdown === "Levels" ? null : "Levels")
                  }
                >
                  <span>Program Levels</span>
                  {openDropdown === "Levels" ? <FaAngleUp /> : <FaAngleDown />}
                </button>

                <div
                  className={`absolute top-16 bg-white text-gray-700 rounded-2xl shadow-lg 
            w-full z-50 !transition-all duration-300 transform 
            ${openDropdown === "Levels"
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                    }`}
                >
                  <ul className="py-2 flex flex-col text-center text-sm p-2">
                    <li className="flex flex-col py-3">
                      {levels?.map((level) => (
                        <Checkbox
                          key={level._id}
                          onChange={(e) =>
                            handleFilter(e.target.checked, level._id, "level")
                          }
                        >
                          {level.name}
                        </Checkbox>
                      ))}
                    </li>
                  </ul>
                </div>
              </div>

              {/* 5 - For Disabled */}
              <div
                className={`filter-box h-15 flex items-center rounded-2xl relative !transition-all duration-200 
            ${isForDisabled ? "bg-primary text-white" : "bg-white"}`}
              >
                <button
                  className="flex justify-between items-center w-full h-full px-5 rounded-2xl hover:bg-background border-3 border-white"
                  onClick={() => setIsForDisabled(!isForDisabled)}
                >
                  <span>For Disabled</span>
                  <div
                    className={`h-6 w-6 rounded-full border-3 border-primary bg-white 
                ${isForDisabled ? "!border-[#2C15FC40]" : ""}`}
                  ></div>
                </button>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <section className="w-full bg-white py-20 px-4">
            {loading ? (
              <div className="flex flex-col gap-4">
                {[1, 2, 3, 4].map((n) => (
                  <ScholarshipCardSkeleton key={n} />
                ))}
              </div>
            ) : scholarship.length > 0 ? (
              scholarship.map((scholarship) => (
                <Link
                  to={`/scholarship/${scholarship.slug}`}
                  className="no-underline"
                  key={scholarship._id}
                >
                  <div
                    className="bg-white !transition-all duration-400 group
                hover:rounded-xl hover:bg-background hover:translate-x-3 shadow-md 
                hover:shadow-gray-400 hover:shadow-lg 
                p-4 flex flex-col sm:flex-row gap-4 mb-5 w-full max-w-3xl mx-auto"
                  >
                    {/* IMAGE */}
                    <div className="w-full sm:w-48 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={getScholarshipImage(
                          scholarship?.title,
                          scholarship?.universityName?.name
                        )}
                        alt={scholarship.title}
                        className="w-full h-48 sm:h-full object-cover group-hover:scale-110 !transition-all duration-300"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col flex-grow min-w-0">
                      <div className="flex flex-wrap items-center justify-between text-xs uppercase text-gray-800 font-bold">
                        <div className="flex gap-2 sm:gap-3 text-xs line-clamp-1">
                          <span>
                            {scholarship?.location?.name?.slice(0, 15) || "--"}
                          </span>
                          <span>
                            {scholarship?.universityName?.name?.slice(0, 15) ||
                              "--"}
                          </span>
                          <span>
                            {scholarship?.programLevel?.name?.slice(0, 15) ||
                              "--"}
                          </span>
                          <span>
                            {scholarship?.category?.name?.slice(0, 15) || "--"}
                          </span>
                        </div>
                        <span className="text-gray-900 text-xs line-clamp-1">
                          {scholarship.applicationDeadline || "--"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center m-2">
                        <h2 className="font-bold text-lg line-clamp-1 my-3">
                          {scholarship.title}
                        </h2>
                        <div className="">
                          <button
                            onClick={(e) => bookMark(e, scholarship)}
                        >
                          {isLoggedIn && scholarshipBM.some(item => item._id === scholarship._id) ? (
  <FaBookmark fill="#2C15FC" size={24} />
) : (
  <FaRegBookmark fill="#2C15FC" size={24} />
)}

                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {scholarship?.descriptionHTML
                        ? scholarship.descriptionHTML
                          .replace(/<[^>]+>/g, "")
                          .slice(0, 220) + "..."
                        : "--"}
                    </p>

                    <div className="flex justify-end mt-auto pt-2">
                      <div className="p-3 rounded-xl hover:bg-primary hover:text-white group-hover:bg-primary group-hover:text-white !transition-colors duration-200">
                        <FaArrowRightLong size={18} />
                      </div>
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

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="bg-primary hover:bg-hoverbg text-white p-4 rounded-xl disabled:bg-border"
            >
              <FaAngleLeft />
            </button>

            <span>
              <span className="font-medium text-xl">{page}</span> of{" "}
              {totalPages}
            </span>

            <button
              onClick={() =>
                setPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
              disabled={page === totalPages}
              className="bg-primary hover:bg-hoverbg text-white p-4 rounded-xl disabled:bg-border"
            >
              <FaAngleRight />
            </button>
          </div>
        </section>
      </div>
    </Layout >
  );
};

export default ScholarshipPage;
