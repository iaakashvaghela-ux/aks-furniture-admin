import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../../../admin context/AdminContext";
import axios from "axios";

export default function Addfaqs() {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    order: "",
  });

  const navigate = useNavigate();
  let baseUrl = import.meta.env.VITE_API_URL
  const { successToast, errorToast } = useAdmin()
  
 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${baseUrl}faq/add`, formData)
      .then((res) => {
        if (res.data._status) {
          successToast(res.data._message)
          setTimeout(() => {
            navigate('/faqs/view')
          }, 2000)
        }
        else {
          errorToast(res.data._message)
        }
      })
      .catch((err) => console.log(err))
  };



  return (
    <div className="w-[95%] mx-auto mt-5 mb-40">
      <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">Add Faq</h3>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="border border-t-0 p-3 rounded-b-md border-slate-400"
      >
        <div>
          {/* question */}
          <div className="mb-5">
            <label
              htmlFor="question"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              question
            </label>
            <input
              type="text"
              name="question"
              id="question"
              value={formData.question}
              onChange={handleChange}
              className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg w-full py-2.5 px-3"
              placeholder="question"
            />
          </div>

          {/* answer */}
          <div className="mb-5">
            <label
              htmlFor="answer"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              answer
            </label>
            <textarea
              name="answer"
              id="answer"
              value={formData.answer}
              onChange={handleChange}
              className="text-[19px] h-[150px] border-2 shadow-sm border-gray-300 rounded-lg w-full py-2.5 px-3"
              placeholder="answer"
            />
          </div>

          {/* Order */}
          <div className="mb-5">
            <label
              htmlFor="order"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Order
            </label>
            <input
              type="number"
              name="order"
              id="order"
              value={formData.order}
              onChange={handleChange}
              className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg w-full py-2.5 px-3"
              placeholder="Order"
            />
          </div>
        </div>

        <button
          type="submit"
          className="my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Add Faq
        </button>
      </form>

    </div>
  );
}
