import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "../../../../admin context/AdminContext";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";

export default function Addwhychooseus() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState("");
  const [description, setDescription] = useState("");
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
    axios[getOrPost](`${baseUrl}why-choose-us/${addOrUpdate}`, myData)
      .then((res) => {
        if (res.data._status) {
          successToast(res.data._message)
          setTimeout(() => {
            navigate('/why-choose-us/view')
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
      axios.get(`${baseUrl}why-choose-us/single/${id}`)
        .then((res) => {
          console.log(res.data)
          if (res.data._status) {
            setTitle(res.data._data.title)
            setOldImage(res.data._data.image)
            setOrder(res.data._data.order)
            setDescription(res.data._data.description)
            setPath(res.data.path)
          }
        })
        .catch((err) => console.log(err))
    }
  }, [id])
  return (
    <div className="max-w-[95%]  mx-auto mt-5 mb-40 bg-white border border-blue-300 rounded-md">

      {/* HEADER */}
      <div className="px-5 py-3 border-b border-blue-300 bg-gray-50">
        <h2 className="text-lg font-semibold">Add Why Choose Us</h2>
      </div>
      <form onSubmit={handleSubmit}>

        <div className="p-6">

          <div className="grid grid-cols-12 gap-6">

            {/* LEFT IMAGE */}
            <div className="col-span-4">
              <label className="text-sm font-medium text-gray-700">
                Choose Image
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

            {/* RIGHT FORM */}
            <div className="col-span-8 space-y-5">

              <div>
                <label className="text-sm font-medium text-gray-700">Title</label>
                <input
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Title"
                  className="mt-2 w-full h-10 px-3 border rounded-md outline-none
                focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Order</label>
                <input
                  name="order"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  type="number"
                  placeholder="Order"
                  className="mt-2 w-full h-10 px-3 border rounded-md outline-none
                focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 w-full h-[100px] px-3 py-2 border rounded-md
                outline-none resize-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>
          </div>

          {/* BUTTON */}
          <button
            className="mt-6 bg-purple-600 text-white px-5 py-2 rounded-md
          hover:bg-purple-700 transition">
          {id ? "Update Why Choose Us" : "Add Why Choose Us"}
          </button>

        </div>
      </form>
    </div>
  );
}
