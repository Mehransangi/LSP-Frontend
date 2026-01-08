import { useState } from 'react'
import Layout from '../components/layout/Layout'
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
      <div className="w-full bg-linearb flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white text-black rounded-2xl shadow-xl p-8 pb-10 my-20"
        >
          <div className="rounded-2xl flex flex-col justify-center">
            <h1 className="text-3xl font-bold uppercase text-center mb-3">Want To Talk?</h1>
            <p className="text-center text-gray-500 mb-6">Feel free to write whatever your query is.</p>
            <label htmlFor="name" className='font-semibold my-3'>Name</label>
            <input
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="input-field"
              placeholder="Enter Your Name"
              required
            />

            <label htmlFor="email" className='font-semibold my-3'>Email</label>
            <input
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="input-field"
              placeholder="Enter Your Email"
              required
            />

            <label htmlFor="message" className='font-semibold my-3'>Message</label>
            <textarea
              id='message'
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input-field"
              placeholder="Write Your Message"
              required
            />

            <div className="flex justify-center">
              <button
                type="submit"
                className={`text-white w-full bg-primary hover:bg-hoverbg font-medium rounded-xl py-3 px-6 flex items-center justify-center gap-2 !transition-all ease-in-out duration-300 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? <FaSpinner className="animate-spin" /> : "Send"}
              </button>
            </div>
          </div>
        </form>
      </div>

    </Layout>
  )
}

export default Contact