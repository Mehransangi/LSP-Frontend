import axios from 'axios';
import Layout from '../components/layout/Layout'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';

const ScholarshipDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [scholarship, setScholarship] = useState({});
    const applicationLink = scholarship?.applicationURL || "/scholarships";
    const [loading, setLoading] = useState(false);

const processedHTML = scholarship?.descriptionHTML

  // ---- H2 ----
  ?.replace(/<h2([^>]*)>/gi, (match, attributes) => {
    if (/style="/i.test(attributes)) {
      return `<h2${attributes.replace(
        /style="/i,
        'style="margin-top: 8px; margin-bottom: 8px; '
      )}>`;
    }
    return `<h2 style="margin-top: 8px; margin-bottom: 8px;"${attributes}>`;
  })

  // ---p---
?.replace(/<p([^>]*)>/gi, (match, attributes) => {
    if (/style="/i.test(attributes)) {
      return `<p${attributes.replace(
        /style="/i,
        'style="margin-top: 8px; margin-bottom: 8px; '
      )}>`;
    }
    return `<p style="margin-top: 8px; margin-bottom: 8px;"${attributes}>`;
  })

  // ---- H3 ----
  ?.replace(/<h3([^>]*)>/gi, (match, attributes) => {
    if (/style="/i.test(attributes)) {
      return `<h3${attributes.replace(
        /style="/i,
        'style="margin-top: 6px; margin-bottom: 6px; '
      )}>`;
    }
    return `<h3 style="margin-top: 6px; margin-bottom: 6px;"${attributes}>`;
  })

  // ---- UL ----
  ?.replace(/<ul([^>]*)>/gi, (match, attributes) => {
    if (/style="/i.test(attributes)) {
      return `<ul${attributes.replace(
        /style="/i,
        'style="margin-top: 6px; margin-bottom: 6px; padding-left: 18px; '
      )}>`;
    }
    return `<ul style="margin-top: 6px; margin-bottom: 6px; padding-left: 18px;"${attributes}>`;
  })

  // ---- LI ----
  ?.replace(/<li([^>]*)>/gi, (match, attributes) => {
    if (/style="/i.test(attributes)) {
      return `<li${attributes.replace(
        /style="/i,
        'style="margin-top: 4px; margin-bottom: 4px; '
      )}>`;
    }
    return `<li style="margin-top: 4px; margin-bottom: 4px;"${attributes}>`;
  });
 

 

    const getScholarship = async () => { 
        setLoading(true)
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_KEY_API}/api/v1/scholarship/scholarship/${params.slug}`);
            if(data?.success){
            setScholarship(data?.scholarship)
        }else{
            toast.error(data.message);
            navigate('/scholarships');
            }
        } catch (error) {
            console.log(error)
        } 
        setLoading(false)
    }
    useEffect(() => {
        if (params?.slug) getScholarship();
    }, [params?.slug]);

const ShimmerCard = () => {
  return (
    <div className="animate-pulse p-6 rounded-lg ">
      <div className="h-7 bg-gray-300 rounded-md w-3/4 mb-4"></div>

      <div className="h-4 bg-gray-300 rounded-md w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded-md w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded-md w-5/6 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded-md w-4/6 mb-4"></div>

        <div className="h-7 bg-gray-300 rounded-md w-3/4 mb-4"></div>

      <div className="h-4 bg-gray-300 rounded-md w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded-md w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded-md w-5/6 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded-md w-4/6 mb-4"></div>

        <div className="h-7 bg-gray-300 rounded-md w-3/4 mb-4"></div>

      <div className="h-4 bg-gray-300 rounded-md w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded-md w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded-md w-5/6 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded-md w-4/6"></div>
    </div>
  );
};


    return (
<Layout title={`${scholarship?.title} - LSP`}>
    <div className="flex flex-col items-center justify-center bg-background w-full min-h-screen">
        
        <div className="relative flex flex-col items-center justify-center px-4 w-full max-w-7xl">
            
            <h1 className="text-3xl font-bold m-2 mt-40 uppercase text-center animate-fade-in">
                {scholarship?.title}
            </h1>

            {/* MAIN LAYOUT */}
            <div className="flex flex-col md:flex-row gap-6 my-20 w-full">

                {/* MAIN CONTENT */}
                <div className="w-full md:w-2/3 p-4 sm:p-6 rounded-2xl bg-white min-w-0">
                    {loading ? (
                        <ShimmerCard />
                    ) : (
                        <div
                            className="p-6"
                            dangerouslySetInnerHTML={{ __html: processedHTML }}
                        />
                    )}
                </div>

                {/* SIDEBAR */}
                <aside className="w-full md:w-1/3 min-w-0">
                    <div className="w-full bg-white hover:shadow-xl shadow-primary card-hover !transition-all ease-linear duration-300 rounded-2xl text-center sticky top-24 p-4">
                        <h3 className="font-bold text-lg mb-2 uppercase text-center">
                            Want to Read the entire Scholarship?
                        </h3>

                        <a
                            className="btn"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={applicationLink}
                        >
                            Read
                        </a>
                    </div>
                </aside>

            </div>
        </div>
    </div>
</Layout>

    )
}

export default ScholarshipDetails