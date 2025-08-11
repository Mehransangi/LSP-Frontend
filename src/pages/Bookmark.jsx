import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { FaArrowRightLong, FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("ScholarshipBM");
    if (stored) {
      setBookmarks(JSON.parse(stored));
    }
  }, []);

  return (
    <Layout title={"Bookmarks - LSP"}>
      <div className="container mx-auto p-6 m-10 bg-[#bdd1ff40] rounded-xl">
        <h1 className="text-3xl font-bold text-center uppercase bg-white p-4 rounded-2xl mb-6">
          Bookmarks
        </h1>

        {bookmarks.length > 0 ? (
          bookmarks.map((scholarship, index) => (
            <div key={scholarship._id} className="md:mx-12 bg-[#bdd1ff40] p-2 flex flex-col rounded-lg h-fit mb-6">
              <span className="font-black text-[#155efc] text-xl">{index + 1}.</span>
              <div className="bg-white flex flex-col m-2 p-3 rounded-lg h-full">
                <div className="flex justify-between items-center m-2">
                  <h1 className='font-bold text-lg'>
                     {scholarship.title}
                  </h1>
                  <button
                    onClick={() => {
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
                      <FaBookmark fill="#155efc" size={24} />
                    ) : (
                      <FaRegBookmark fill="#155efc" size={24} />
                    )}
                  </button>
                </div>

                <div className="m-2 font-light text-sm">
                  {scholarship?.descriptionHTML?.replace(/<[^>]+>/g, '').length > 198
                    ? scholarship?.descriptionHTML?.replace(/<[^>]+>/g, '').slice(0, 198) + '...'
                    : scholarship?.descriptionHTML?.replace(/<[^>]+>/g, '')}
                </div>

                <div className="flex justify-between flex-wrap m-2">
                  <div className="flex flex-col items-center">
                    <p className='text-sm m-2'>Location</p>
                    <p className='font-bold text-[#155efc] m-2'>{scholarship?.location?.name}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className='text-sm m-2'>University Name</p>
                    <p className='font-bold text-[#155efc] m-2'>{scholarship?.universityName?.name}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className='text-sm m-2'>Program Level</p>
                    <p className='font-bold text-[#155efc] m-2'>{scholarship?.programLevel?.name}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className='text-sm m-2'>Category</p>
                    <p className='font-bold text-[#155efc] m-2'>{scholarship?.category?.name}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className='text-sm m-2'>Deadline</p>
                    <p className='font-bold text-[#B90000] m-2'>{scholarship?.applicationDeadline}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/scholarship/${scholarship.slug}`)}
                    className='text-white bg-[#155efc] hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto py-4 px-6 m-1 h-fit text-center flex items-center justify-center gap-3'
                  >
                    Read More <FaArrowRightLong size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No bookmarks found.</p>
        )}

      </div>
    </Layout>
  );
};

export default BookmarkPage;
