import axios from "axios";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaAngleLeft,
  FaAngleRight,
  FaArrowRightLong,
  FaRegBookmark,
  FaSpinner,
} from "react-icons/fa6";
import { Link } from "react-router";
import { getScholarshipImage } from "../../components/getScholarshipImages";
import ScholarshipCardSkeleton from "../../components/ScholarshipCardSkeleton";

const Scholarship = () => {
  const [scholarships, setScholarships] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const getScholarships = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", 9); // Adjust if needed
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_KEY_API
        }/api/v1/scholarship/scholarships?${params.toString()}`
      );

      if (data?.success) {
        setScholarships(data.scholarships);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching scholarships:", error);
      toast.error("Failed to fetch scholarships.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getScholarships();
  }, [page]);

  return (
    <Layout title={"Manage Scholarships - LSP"}>
      <div className="flex items-center justify-center bg-background w-screen h-fit">
        <div className="container bg-white shadow-lg mx-auto lg:mx-60 lg:my-20 rounded-2xl p-4 flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-2/6 lg:min-w-20 p-4">
            <AdminMenu />
          </div>

          {/* Main Content */}
          <div className="p-4 md:w-4/6 flex flex-col">
            <h1 className="text-center font-bold text-xl sm:text-2xl mb-4">
              SCHOLARSHIPS
            </h1>

<div className="bg-white w-full rounded-2xl flex flex-col p-4 overflow-auto">
  {loading ? (
    <div className="flex justify-center m-2">
     <div className="flex flex-col gap-4">
     {[1, 2, 3, 4].map((n) => (
      <ScholarshipCardSkeleton key={n} />
    ))}
      </div>
    </div>
  ) : scholarships.length > 0 ? (
    scholarships.map((scholarship) => (
      <Link
        to={`/dashboard/admin/scholarship/${scholarship.slug}`}
        className="no-underline"
        key={scholarship._id}
      >
        <div className="bg-white !transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
        hover:rounded-xl hover:bg-background hover:translate-x-3 group shadow-md hover:shadow-gray-400 
        hover:shadow-lg px-4 py-8 flex flex-col sm:flex-row gap-4 mb-5">

          {/* LEFT SIDE IMAGE */}
          <div className="w-full sm:w-45 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={getScholarshipImage(
                scholarship?.title,
                scholarship?.universityName?.name
              )}
              alt={scholarship.title}
              className="w-full h-48 sm:h-full object-cover group-hover:scale-110 !transition-all ease-in-out duration-300"
            />
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="flex flex-col flex-grow">
            {/* TOP META ROW */}
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between text-xs uppercase text-gray-800 font-bold tracking-wide">
              <div className="flex gap-2 sm:gap-3 text-xs line-clamp-1">
                <span>{scholarship?.location?.name?.slice(0, 15) || "--"}</span>
                <span>{scholarship?.universityName?.name?.slice(0, 15) || "--"}</span>
                <span>{scholarship?.programLevel?.name?.slice(0, 15) || "--"}</span>
                <span>{scholarship?.category?.name?.slice(0, 15) || "--"}</span>
              </div>

              <div className="hidden sm:block w-full lg:max-w-14 border-t border-gray-800 my-2"></div>

              <span className="text-gray-900 text-xs line-clamp-1">
                {scholarship?.applicationDeadline
                  ? String(scholarship.applicationDeadline).length > 12
                    ? String(scholarship.applicationDeadline).slice(0, 12) + "..."
                    : scholarship.applicationDeadline
                  : "--"}
              </span>
            </div>

            {/* TITLE */}
            <div className="flex justify-between items-start my-3">
              <h2 className="font-bold text-lg line-clamp-1">{scholarship.title}</h2>
            </div>

            {/* DESCRIPTION */}
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {scholarship?.descriptionHTML
                ? scholarship?.descriptionHTML
                    ?.replace(/<[^>]+>/g, "")
                    ?.slice(0, 220) + "..."
                : "--"}
            </p>

            {/* BOTTOM ARROW */}
            <div className="flex justify-end mt-auto pt-2">
              <div className="p-3 rounded-xl group-hover:bg-primary group-hover:text-white !transition-colors duration-200">
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
      className="bg-primary hover:hoverbg text-white p-4 rounded-xl disabled:bg-border"
    >
      <FaAngleLeft />
    </button>
    <span>
      <span className="font-medium text-xl">{page}</span> of {totalPages}
    </span>
    <button
      onClick={() =>
        setPage((prev) => (prev < totalPages ? prev + 1 : prev))
      }
      disabled={page === totalPages}
      className="bg-primary hover:hoverbg text-white p-4 rounded-xl disabled:bg-border"
    >
      <FaAngleRight />
    </button>
  </div>
</div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Scholarship;
