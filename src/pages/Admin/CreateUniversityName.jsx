import { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout'
import { Modal } from 'antd';
import InputForm from '../../components/layout/InputForm';
import AdminMenu from '../../components/layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';

const CreateUniversityName = () => {
  const [uniNames, setUniNames] = useState([])
  const [name, setName] = useState('')
  const [updatedName, setUpdatedName] = useState('')
  const [selected, setSelected] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get All University Names
  const getUniversityName = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_KEY_API}/api/v1/universityname/uninames`)
      if (data?.success) {
        setUniNames(data.uniNames)
      } else { toast.error(data.message) }
    } catch (error) {
      console.log(error)
      toast.error("Something Went Wrong.")
    }
  }
  useEffect(() => {
    getUniversityName()
  }, [])

  //Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_KEY_API}/api/v1/universityname/create-uniname`, { name })
      if (data?.success) {
        toast.success(data.message)
        getUniversityName()
        setName('')
      } else {
        toast.success(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something Went Wrong.")
    }
    setIsSubmitting(false);
  }

  //Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_KEY_API}/api/v1/universityname/update-uniname/${selected}`, { name: updatedName })
      if (data.success) {
        setIsOpen(false)
        setUpdatedName("")
        setSelected(null)
        getUniversityName()
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something Went Wrong.")
    }
  }

  //Handle Delete
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_KEY_API}/api/v1/universityname/delete-uniname/${id}`)
      if (data.success) {
        toast.success("Program Level Delete.")
        getUniversityName()
      }
    } catch (error) {
      console.log(error)
      toast.error("Something Went Wrong.")
    }
  }


  return (
    <Layout title={"Create University Name - LSP"}>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row bg-[#bdd1ff40] rounded-2xl min-h-screen">
          <div className="w-full md:w-1/4 p-4">
            <AdminMenu />
          </div>

          <div className="w-full md:w-3/4 p-4 flex flex-col">
            <h1 className="text-center font-bold text-2xl mb-4">MANAGE UNIVERSITY NAME</h1>

            <InputForm handleSubmit={handleSubmit} value={name} setValue={setName} field={"University Name"} isSubmitting={isSubmitting} />

            <div className="bg-white min-h-dvh mt-6 rounded-2xl p-4 overflow-auto">
              <table className="w-full text-sm text-center text-gray-500 rounded-2xl overflow-hidden border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-[#155efc] text-white">
                    <th className="px-6 py-3  first:rounded-tl-2xl last:rounded-tr-2xl uppercase">Location Name</th>
                    <th className="px-6 py-3  last:rounded-tr-2xl uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {uniNames?.map((u) => (
                    <tr
                      key={u._id}
                      className={`hover:bg-white gap-y-1 bg-[#bdd1ff40] border-b rounded-xl`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">{u.name}</td>
                      <td className="px-6 py-4 flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setIsOpen(true);
                            setUpdatedName(u.name);
                            setSelected(u._id);
                          }}
                          className="border-2 text-[#155efc] hover:bg-blue-100 px-4 py-2 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(u._id)}
                          className="border-2 text-red-700 hover:bg-red-100 px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Modal open={isOpen} onCancel={() => setIsOpen(false)} footer={null} title="UPDATE UNIVERSITY NAME">
              <InputForm handleSubmit={handleUpdate} value={updatedName} setValue={setUpdatedName} field={"University Name"} isSubmitting={isSubmitting} />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateUniversityName