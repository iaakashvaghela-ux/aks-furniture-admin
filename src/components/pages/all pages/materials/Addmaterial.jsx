import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAdmin } from "../../../../admin context/AdminContext";

export default function AddMaterial() {
  const { id } = useParams()
  const { successToast, errorToast, infoToast } = useAdmin()
  const [materialsName, setMaterialsName] = useState("");
  const [order, setOrder] = useState("");

  let baseUrl = import.meta.env.VITE_API_URL

  const navigate = useNavigate()
  let handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${baseUrl}materials/add`, { name: materialsName, order })
      .then(res => {
        if (res.data._status) {
          successToast(res.data._message)
          setMaterialsName("")
          setOrder("")
          setTimeout(() => {
            navigate('/materials/view')
          }, 2000)
        }
        else {
          errorToast(res.data._message)
        }
      })
  }




  useEffect(() => {
    if (id) {
      axios.get(`${baseUrl}materials/single/${id}`)
        .then((res) => {
          if (res.data._status) {
            setMaterialsName(res.data._data.name)
            setOrder(res.data._data.order)
          }
        })
        .catch((err) => console.log(err))
    }
  }, [id])

  return (
    <div className="border max-w-[1220px] mx-auto mt-3 mb-30 border-blue-300 rounded-lg bg-white">

      {/* Header */}
      <div className="px-6 py-4 border-b bg-slate-50 rounded-t-lg">
        <h2 className="text-xl font-semibold">{id ? "Update" : "Add"} Material</h2>
      </div>

      {/* Body */}
      <form onSubmit={handleSubmit}>
        <div className="p-6">

          {/* Material Name */}
          <div className="mb-6">
            <label className="block font-medium mb-2">
              Material Name
            </label>
            <input
              type="text"
              placeholder="Material Name"
              value={materialsName}
              onChange={(e) => setMaterialsName(e.target.value)}
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
          <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition">
            {id ? "Update" : "Add"} Material
          </button>
        </div>
      </form>
    </div>
  );
}
