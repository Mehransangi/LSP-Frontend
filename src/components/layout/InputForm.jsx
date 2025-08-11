import { FaSpinner } from "react-icons/fa6"

const InputForm = ({ handleSubmit, value, setValue, field, isSubmitting }) => {
    return (
        <>
            <form className="w-full mx-auto m-1" onSubmit={handleSubmit}>
                <div className="mb-5 flex gap-3 bg-white p-2 rounded-2xl w-full">
                    <input type="text" className=" outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 " placeholder={`Enter a new ${field}`} value={value} onChange={(e) => setValue(e.target.value)} />
                    <button type="submit" disabled={isSubmitting} className={`text-white bg-[#155efc] hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto py-4 px-8 text-center ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}>{isSubmitting ? <FaSpinner className="animate-spin" /> : "Create"}</button>
                </div>
            </form>

        </>
    )
}

export default InputForm