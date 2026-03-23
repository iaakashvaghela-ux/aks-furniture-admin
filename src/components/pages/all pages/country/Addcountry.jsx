import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../../../admin context/AdminContext";

export default function Addcountry() {
  const [name, setName] = useState("");
  const [order, setOrder] = useState("");
  const navigate = useNavigate();
  let baseUrl = import.meta.env.VITE_API_URL
  const { successToast, errorToast } = useAdmin()
  let handleSubmit = (e) => {
    e.preventDefault();
    let obj = { name, order }
    axios.post(`${baseUrl}country/add`, obj)
      .then((res) => {
        if (res.data._status) {
          successToast(res.data._message)
          setTimeout(() => {
            navigate('/country/view')
          }, 2000)
        }
        else {
          errorToast(res.data._message)
        }
      })
      .catch((err) => console.log(err))
  };


  return (
    <div className="border max-w-[1220px] mx-auto mt-3 mb-30 border-blue-300 rounded-lg bg-white">

      {/* Header */}
      <div className="px-6 py-4 border-b bg-slate-50 rounded-t-lg">
        <h2 className="text-xl font-semibold">Add Country</h2>
      </div>

      {/* Body */}
      <form onSubmit={handleSubmit}>
        <div className="p-6">

          {/* Category Name */}
          <div className="mb-6">
            <label className="block font-medium mb-2">
              Country Name
            </label>
            <input
              type="text"
              placeholder="Country Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Order */}
          <div className="mb-8">
            <label className="block font-medium mb-2">
              Order
            </label>
            <input
              type="number"
              placeholder="Order"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Button */}
          <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition">
            Add Country
          </button>
        </div>
      </form>
    </div>
  );
}
