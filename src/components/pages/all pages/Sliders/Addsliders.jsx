import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useAdmin } from "../../../../admin context/AdminContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Addsliders() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState("");
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const [path, setPath] = useState("")

  const { successToast, errorToast, infoToast } = useAdmin()
  const navigate = useNavigate()
  const baseUrl = import.meta.env.VITE_API_URL

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };


  let handleSubmit = (e) => {
    e.preventDefault();
    let myData = new FormData(e.target)
    let addOrUpdate = id ? `update/${id}` : 'add'
    let getOrPost = id ? 'put' : 'post'
    axios[getOrPost](`${baseUrl}slider/${addOrUpdate}`, myData)
      .then((res) => {
        if (res.data._status) {
          successToast(res.data._message)
          setTimeout(() => {
            navigate('/sliders/view')
          }, 2000)
        }
        else {
          errorToast(res.data._message)
        }
      })
      .catch((err) => console.log(err))
  };

  useEffect(() => {
    if (id) {
      axios.get(`${baseUrl}slider/single/${id}`)
        .then((res) => {
          console.log(res.data)
          if (res.data._status) {
            setTitle(res.data._data.title)
            setOldImage(res.data._data.image)
            setOrder(res.data._data.order)
            setPath(res.data.path)
          }
        })
        .catch((err) => console.log(err))
    }
  }, [id])
  return (
    <div className=" mt-5 mb-40 border border-blue-300 rounded-lg bg-white">

      {/* Header */}
      <div className="px-6 py-4 border-b bg-slate-50 rounded-t-lg">
        <h2 className="text-xl font-semibold"> {id ? "Update" : "Add"} Slider</h2>
      </div>

      {/* Body */}
      <form onSubmit={handleSubmit}>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Image Upload */}
            <div>
              <label className="block font-medium mb-2">
                Slider Image
              </label>

              <label className="cursor-pointer">
                <div className="border-2 border-dashed rounded-lg h-64 flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 transition">

                  {image || (id && oldImage) ? (
                    <img
                      src={image ? image : path + oldImage}
                      alt="preview"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <FaCloudUploadAlt size={40} />
                      <p className="mt-2">Drag and drop</p>
                    </>
                  )}
                </div>

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Right Side Inputs */}
            <div className="md:col-span-2">

              {/* Slider Name */}
              <div className="mb-6">
                <label className="block font-medium mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  name="order"
                  placeholder="Order"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Button */}
              <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition">
                 {id ? "Update" : "Add"} Slider
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
