import { FaSpinner } from "react-icons/fa6"

const InputForm = ({ handleSubmit, value, setValue, field, isSubmitting }) => {
    return (
        <>
            <form className="w-full mx-auto m-1" onSubmit={handleSubmit}>
                <div className="flex gap-3 bg-white p-2 rounded-2xl w-full border-3 border-gray-400 focus-within:shadow-xl !transition-all ease-in-out duration-300">
                    <input type="text" className="outline-none text-gray-900 text-md rounded-lg block w-full p-4 !transition-all ease-in-out duration-300" placeholder={`Enter a new ${field}`} value={value} onChange={(e) => setValue(e.target.value)} />
                    <button type="submit" disabled={isSubmitting} className={`text-white bg-primary !transition-all ease-in-out duration-300 card-hover hover:bg-hoverbg font-medium rounded-xl text-md w-full sm:w-auto py-4 px-14 text-center ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}>{isSubmitting ? <FaSpinner className="animate-spin" /> : "Create"}</button>
                </div>
            </form>

        </>
    )
}

export default InputForm