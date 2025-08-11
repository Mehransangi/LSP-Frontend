import { useState } from 'react'
import Layout from '../components/layout/layout'
import toast from 'react-hot-toast'
import axios from 'axios'

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_KEY_API}/api/v1/auth/contactus`, { name, email, message })
      if (data?.success) {
        toast.success(data?.message)
        setName('')
        setEmail('')
        setMessage('')
      } else { toast.error(data.message) }
    } catch (error) {
      console.log(error)
      toast.error("Somthing Went Wrong.")
    }
    setIsSubmitting(false);
  }

  return (
    <Layout title={"Contact Us - LSP"}>
      <form onSubmit={handleSubmit} className=" container max-w-[48rem] items-center justify-center text-black bg-[#bdd1ff80] p-3 md:p-12 rounded-2xl">
        <div className="bg-white p-3 md:p-10 rounded-2xl flex flex-col justify-center">
          <h1 className="text-3xl font-bold uppercase text-center mb-2">Contact Us</h1>
          <p className="mb-2 text-center text-gray-500">For any queries or support, please reach out to us at:</p>
          <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" className="w-full flex p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 my-2 focus:ring-blue-500" placeholder="Name" required />

          <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" className="w-full p-4 border-2 border-gray-300 my-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email" required />

          <textarea value={message} onChange={(e) => { setMessage(e.target.value) }} className="w-full p-2 min-h-40 border-2 border-gray-300 my-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Message" required />

          <div className="flex justify-center">
            <button className={`text-white max-w-fit my-4 bg-[#155efc] hover:bg-[#114AC8] font-medium rounded-lg text-sm py-3 px-6 m-2 flex items-center gap-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`} disabled={isSubmitting}>
              {isSubmitting ? <FaSpinner className="animate-spin" /> : "Send"}
            </button>
          </div>
        </div>
      </form>
    </Layout>
  )
}

export default Contact