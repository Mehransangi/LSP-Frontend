import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { FaArrowRightLong, FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { getScholarshipImage } from "../components/getScholarshipImages";
import ScholarshipCardSkeleton from "../components/ScholarshipCardSkeleton";

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    const stored = localStorage.getItem("ScholarshipBM");
    if (stored) {
      setBookmarks(JSON.parse(stored));
    }setLoading(false)
  }, []);

  return (
    <Layout title={"Bookmarks - LSP"}>
      <div className="flex flex-col items-center justify-center bg-background w-full min-h-screen">
        <div className="relative flex flex-col items-center justify-center w-full">
          <h1 className="text-3xl font-bold m-2 mt-20 uppercase text-center animate-fade-in">
          Bookmarks
        </h1>
<div className="my-8 bg-white w-full p-10 h-full">
  
        { loading ? <div className="flex flex-col gap-4">
                {[1, 2, 3, 4].map((n) => (
                  <ScholarshipCardSkeleton key={n} />
                ))}
              </div> : bookmarks.length > 0 ? (
          bookmarks.map((scholarship) => (
            // <div key={scholarship._id} className="md:mx-12 bg-[#bdd1ff40] p-2 flex flex-col rounded-lg h-fit mb-6">
            //   <span className="font-black text-[#155efc] text-xl">{index + 1}.</span>
            //   <div className="bg-white flex flex-col m-2 p-3 rounded-lg h-full">
            //     <div className="flex justify-between items-center m-2">
            //       <h1 className='font-bold text-lg'>
            //          {scholarship.title}
            //       </h1>
            //       <button
            //         onClick={() => {
            //           const alreadyExists = bookmarks.some(item => item._id === scholarship._id);
            //           let updated;

            //           if (alreadyExists) {
            //             updated = bookmarks.filter(item => item._id !== scholarship._id);
            //             toast.success("Item removed from bookmarks");
            //           } else {
            //             updated = [...bookmarks, scholarship];
            //             toast.success("Item added to bookmarks");
            //           }

            //           localStorage.setItem("ScholarshipBM", JSON.stringify(updated));
            //           setBookmarks(updated);
            //         }}
            //       >
            //         {bookmarks.some(item => item._id === scholarship._id) ? (
            //           <FaBookmark fill="#155efc" size={24} />
            //         ) : (
            //           <FaRegBookmark fill="#155efc" size={24} />
            //         )}
            //       </button>
            //     </div>

            //     <div className="m-2 font-light text-sm">
            //       {scholarship?.descriptionHTML?.replace(/<[^>]+>/g, '').length > 198
            //         ? scholarship?.descriptionHTML?.replace(/<[^>]+>/g, '').slice(0, 198) + '...'
            //         : scholarship?.descriptionHTML?.replace(/<[^>]+>/g, '')}
            //     </div>

            //     <div className="flex justify-between flex-wrap m-2">
            //       <div className="flex flex-col items-center">
            //         <p className='text-sm m-2'>Location</p>
            //         <p className='font-bold text-[#155efc] m-2'>{scholarship?.location?.name}</p>
            //       </div>
            //       <div className="flex flex-col items-center">
            //         <p className='text-sm m-2'>University Name</p>
            //         <p className='font-bold text-[#155efc] m-2'>{scholarship?.universityName?.name}</p>
            //       </div>
            //       <div className="flex flex-col items-center">
            //         <p className='text-sm m-2'>Program Level</p>
            //         <p className='font-bold text-[#155efc] m-2'>{scholarship?.programLevel?.name}</p>
            //       </div>
            //       <div className="flex flex-col items-center">
            //         <p className='text-sm m-2'>Category</p>
            //         <p className='font-bold text-[#155efc] m-2'>{scholarship?.category?.name}</p>
            //       </div>
            //       <div className="flex flex-col items-center">
            //         <p className='text-sm m-2'>Deadline</p>
            //         <p className='font-bold text-[#B90000] m-2'>{scholarship?.applicationDeadline}</p>
            //       </div>
            //       <button
            //         onClick={() => navigate(`/scholarship/${scholarship.slug}`)}
            //         className='text-white bg-[#155efc] hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto py-4 px-6 m-1 h-fit text-center flex items-center justify-center gap-3'
            //       >
            //         Read More <FaArrowRightLong size={20} />
            //       </button>
            //     </div>
            //   </div>
            // </div>
            
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
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault();
                      const alreadyExists = bookmarks.some(item => item._id === scholarship._id);
                      let updated;

                      if (alreadyExists) {
                        updated = bookmarks.filter(item => item._id !== scholarship._id);
                        toast.success("Item removed from bookmarks");
                      } else {
                        updated = [...bookmarks, scholarship];
                        toast.success("Item added to bookmarks");
                      }

                      localStorage.setItem("ScholarshipBM", JSON.stringify(updated));
                      setBookmarks(updated);
                    }}
                  >
              {bookmarks.some(item => item._id === scholarship._id) ? (
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
          <p className="text-center text-gray-500">No bookmarks found.</p>
        )}
</div>
      </div>
      </div>
    </Layout>
  );
};

export default BookmarkPage;
