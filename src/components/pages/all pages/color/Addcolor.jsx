import { useEffect, useState } from "react";
import { Sketch } from "@uiw/react-color";

import { useAdmin } from "../../../../admin context/AdminContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Addcolor() {
  let baseUrl = import.meta.env.VITE_API_URL
  const { id } = useParams()
  const { successToast, errorToast, infoToast } = useAdmin()
  const [colorName, setColorName] = useState("");
  const [code, setCode] = useState("#000000");
  const [order, setOrder] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`${baseUrl}color/single/${id}`)
        .then((res) => {
          if (res.data._status) {
            setColorName(res.data._data.colorName)
            setCode(res.data._data.code)
            setOrder(res.data._data.order)
          }
        })
        .catch((err) => console.log(err))
    }
  }, [id])


  let handleSubmit = (e) => {
    e.preventDefault();
    let obj = { colorName, code, order }
    let addOrUpdate = id ? `update/${id}` : 'add'
    let getOrPost = id ? 'put' : 'post'
    axios[getOrPost](`${baseUrl}color/${addOrUpdate}`, obj)
      .then((res) => {
        if (res.data._status) {
          successToast(res.data._message)
          setTimeout(() => {
            navigate('/color/view')
          }, 2000)
        }
        else {
          errorToast(res.data._message)
        }
      })
      .catch((err) => console.log(err))
  };



  return (
    <div className="border border-blue-300 rounded-lg mt-2 p-6  bg-white">
      <form onSubmit={handleSubmit}>

        {/* Header */}
        <h2 className="text-lg font-semibold border-b pb-3 mb-6">
          {id ? "Update" : "Add"} Colors
        </h2>

        {/* Color Name */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Color Name</label>

          <input
            type="text"
            placeholder="Enter Color Name"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

        </div>

        {/* Color Picker */}
        <div className="mb-6">
          <label className="block font-medium mb-3">Color Picker</label>

          <div className="flex items-start gap-6">
            {/* Picker */}
            <Sketch
              color={code}
              onChange={(c) => setCode(c.hex)}
            />

            {/* Selected Color Box */}
            <div
              className="w-10 h-10 rounded-md border"
              style={{ backgroundColor: code }}
            ></div>
          </div>
        </div>

        {/* Order */}
        <div className="mb-8">
          <label className="block font-medium mb-2">Order</label>

          <input
            type="number"
            placeholder="Enter Order"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Button */}
        <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition">
          {id ? "Update" : "Add"} Color
        </button>
      </form>
    </div>
  );
}
