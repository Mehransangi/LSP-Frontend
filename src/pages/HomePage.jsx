import {
  FaArrowRightLong,
  FaBookmark,
  FaChevronLeft,
  FaChevronRight,
  FaRegBookmark,
} from "react-icons/fa6";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Carousel from "../components/Carousel";
import { getScholarshipImage } from "../components/getScholarshipImages";
import ScholarshipCardSkeleton from "../components/ScholarshipCardSkeleton";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState([]);
  const [universityNameTags, setUniversityNameTags] = useState([]);
  const [loadingUniTags, setLoadingUniTags] = useState(false);
  const [loadingScholarships, setLoadingScholarships] = useState(false);
  const [scholarshipBM, setScholarshipBM] = useState(() => {
    try {
      const saved = localStorage.getItem("ScholarshipBM");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const getUniversityNameTags = async () => {
    try {
      setLoadingUniTags(true);
      const params = new URLSearchParams();
      params.append("limit", 6);

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
    } finally {
      setLoadingUniTags(false);
    }
  };
  useEffect(() => {
    getUniversityNameTags();
  }, []);

  const getScholarships = async () => {
    try {
      setLoadingScholarships(true);
      const params = new URLSearchParams();
      params.append("limit", 4);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_KEY_API
        }/api/v1/scholarship/scholarships?${params.toString()}`
      );
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

  const isLoggedIn = !!localStorage.getItem("auth");
  const bookMark = (e, scholarship) => {
    e.stopPropagation();
    e.preventDefault();
    setScholarshipBM((prev) => {
      const alreadyExists = prev.some((item) => item._id === scholarship._id);
      let updated;

      if (!isLoggedIn) {
        toast.error("Please log in to bookmark scholarships");
        return prev;
      }

      if (alreadyExists) {
        updated = prev.filter((item) => item._id !== scholarship._id);
        toast.success("Item removed from bookmarks");
      } else {
        updated = [...prev, scholarship];
        toast.success("Item added to bookmarks");
      }
      console.log("ID:", scholarship._id);

      localStorage.setItem("ScholarshipBM", JSON.stringify(updated));
      return updated;
    });
  };

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
    <Layout title="Home - LSP">
      <div className="flex flex-col items-center justify-center bg-background w-full min-h-screen">
        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center px-4 w-full max-w-7xl mx-auto">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center w-full my-10 gap-6">
            {/* Left Text */}
            <h1 className="text-2xl md:text-5xl font-black uppercase animate-fade-in leading-tight md:w-1/2">
              Looking for a Scholarship in Pakistan?
            </h1>

            {/* Right Description + Button */}
            <div className="flex flex-col md:items-end w-full md:w-1/2 animate-fade-in-delay-1">
              <p className="text-sm md:text-base md:w-4/5 text-gray-700">
                <span className="font-semibold">
                  LSP is the answer you were looking for
                </span>
                , we have found scholarships from all across Pakistan and
                gathered them in one place for you.
              </p>

              <Link
                to={"/scholarships"}
                className="rounded-lg p-2 px-6 my-3 border-2 border-primary hover:bg-primary hover:text-white text-center !transition-all duration-200"
              >
                Read Scholarship
              </Link>
            </div>
          </div>

          {/* Carousel Section */}
          <div className="w-full rounded-2xl animate-fade-in-delay-2">
            <Carousel />
          </div>
        </div>

        {/* Scholarship */}
        <div className="bg-white w-full flex flex-col items-center p-10 my-20">
          <h2 className="text-2xl font-bold uppercase">Scholarships</h2>
          <div className="bg-white w-full rounded-2xl flex flex-col p-4 overflow-auto">
            {loadingScholarships ? (
              <div className="flex flex-col gap-4">
                {[1, 2, 3, 4].map((n) => (
                  <ScholarshipCardSkeleton key={n} />
                ))}
              </div>
            ) : scholarships.length > 0 ? (
              scholarships.map((scholarship) => (
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
                          <button onClick={(e) => bookMark(e, scholarship)}>
                            {isLoggedIn &&
                            scholarshipBM.some(
                              (item) => item._id === scholarship._id
                            ) ? (
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
              <div className="flex items-center justify-center w-full m-4">
                <p className="text-gray-500 uppercase">
                  No scholarships found.
                </p>
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={() => navigate(`/universitynametag`)}
                className="btn max-w-3xl mt-6"
              >
                View All <FaArrowRightLong size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* University Name Tags */}
        <div className="relative flex flex-col items-center justify-center w-full box-border bg-white py-20 mb-20">
          <h2 className="text-2xl font-bold uppercase mb-6">University Tags</h2>

          <div className="w-full bg-white relative">
            {/* LEFT BUTTON */}
            <button
              onClick={() =>
                document
                  .getElementById("uniScroller")
                  .scrollBy({ left: -300, behavior: "smooth" })
              }
              className="group hidden h-full items-center rounded-xl mx-6 sm:flex absolute sm:left-0 xl:left-25 top-1/2 -translate-y-1/2 z-20 border-transparent border-3 hover:border-3 hover:border-primary hover:shadow-xl active:bg-primary p-3 !transition-all bg-background"
            >
              <FaChevronLeft className="text-black group-active:text-white" />
            </button>

            {/* RIGHT BUTTON */}
            <button
              onClick={() =>
                document
                  .getElementById("uniScroller")
                  .scrollBy({ left: 300, behavior: "smooth" })
              }
              className="group hidden h-full items-center rounded-xl mx-6 sm:flex absolute sm:right-0 xl:right-25 top-1/2 -translate-y-1/2 z-20 border-transparent border-3 hover:border-3 hover:border-primary hover:shadow-xl p-3 active:bg-primary !transition-all bg-background"
            >
              <FaChevronRight className="text-black group-active:text-white" />
            </button>

            <div className="max-w-7xl mx-auto w-full px-4 box-border">
              {/* SCROLLER */}
              <div
                id="uniScroller"
                className="overflow-x-auto no-scrollbar -mx-4 px-4 scroll-smooth"
                style={{ overscrollBehaviorX: "contain" }}
              >
                <div
                  className="flex gap-4 py-5 box-border"
                  style={{
                    scrollSnapType: "x mandatory",
                    boxSizing: "border-box",
                    width: "100%",
                  }}
                >
                  {loadingUniTags ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-10">
                      <ShimmerCard />
                      <ShimmerCard />
                      <ShimmerCard />
                    </div>
                  ) : universityNameTags?.length > 0 ? (
                    universityNameTags.map((tag) => (
                      <a
                        href={tag?.link}
                        key={tag?._id}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block md:max-w-xs md:min-w-xs"
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
                    ))
                  ) : (
                    <div className="text-center text-gray-500 w-full py-8">
                      No University NameTags found
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Hide scrollbar */}
            <style>{`
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      .no-scrollbar::-webkit-scrollbar { display: none; height: 0; }
      .group img { max-width: 100%; height: auto; display: block; }
    `}</style>
          </div>

          <button
            onClick={() => navigate(`/universitynametag`)}
            className="btn max-w-3xl mt-6"
          >
            View All <FaArrowRightLong size={20} />
          </button>
        </div>

        {/* Contact Us Section */}
        <div className=" w-full bg-lineartt text-white py-35 text-center flex flex-col items-center justify-center">
          <h3 className="font-bold text-7xl mb-3">TALK TO US</h3>
          <p className="font-medium text-lg mb-10">
            IF YOU HAVE ANY QUERIES FEEL FREE TO CONTACT US.
          </p>
          <button onClick={() => navigate(`/contact`)} className="btn max-w-3xl">
            Contact Us
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
