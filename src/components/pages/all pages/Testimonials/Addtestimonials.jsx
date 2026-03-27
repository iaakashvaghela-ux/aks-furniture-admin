import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "../../../../admin context/AdminContext";
import axios from "axios";

export default function Addtestimonials() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { successToast, errorToast } = useAdmin();
  const baseUrl = import.meta.env.VITE_API_URL;

  const [imagePreview, setImagePreview] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const [path, setPath] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    rating: "",
    order: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    if (id) {
      axios.get(`${baseUrl}testimonials/single/${id}`)
        .then((res) => {
          if (res.data._status) {
            const data = res.data._data;
            setFormData({
              name: data.name,
              designation: data.designation,
              rating: data.rating,
              order: data.order,
              message: data.message,
            });
            setOldImage(data.image);
            setPath(res.data.path);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [id, baseUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const myData = new FormData(e.target);
    const endpoint = id ? `testimonials/update/${id}` : "testimonials/add";
    const method = id ? "put" : "post";

    axios[method](`${baseUrl}${endpoint}`, myData)
      .then((res) => {
        if (res.data._status) {
          successToast(res.data._message);
          setTimeout(() => {
            navigate("/testimonials/view");
          }, 2000);
        } else {
          errorToast(res.data._message);
        }
      })
      .catch((err) => {
        console.log(err);
        errorToast("Something went wrong!");
      });
  };

  return (
    <div className="w-[95%] mx-auto mt-5 mb-40">
       <h3 className="h-20 text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">Add Testimonials</h3>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className=" border border-t-0 p-3 rounded-b-md border-slate-400"
      >
       
        <div className="flex pt-4 gap-5">
          {/* Image Section */}
          <div className="w-1/3">
            <label
              htmlFor="Image"
              className="border border-gray-300 rounded-md h-64 flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:border-purple-500"
            >
              {imagePreview || (id && oldImage) ? (
                <img
                  src={imagePreview || (path + oldImage)}
                  alt="preview"
                  className="h-full w-full object-cover rounded-md"
                />
              ) : (
                <>
                  <FaCloudUploadAlt size={38} />
                  <p className="mt-2 text-sm">Click or drag image</p>
                </>
              )}
            </label>

            {/* ✅ REAL FILE INPUT */}
            <input
              type="file"
              id="Image"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </div>

          {/* Right Form Section */}
          <div className="w-2/3">
            <div className="mb-5">
              <label className="block mb-1 text-md font-medium text-gray-900">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg w-full py-2.5 px-3"
                placeholder="Name"
              />
            </div>

            <div className="mb-5">
              <label className="block mb-1 text-md font-medium text-gray-900">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg w-full py-2.5 px-3"
                placeholder="Designation"
              />
            </div>

            <div className="mb-5">
              <label className="block mb-1 text-md font-medium text-gray-900">
                Rating
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg w-full py-2.5 px-3"
                placeholder="Rating"
              />
            </div>

            <div className="mb-5">
              <label className="block mb-1 text-md font-medium text-gray-900">
                Order
              </label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                className="text-[19px] border-2 shadow-sm border-gray-300 rounded-lg w-full py-2.5 px-3"
                placeholder="Order"
              />
            </div>

            <div className="mb-5">
              <label className="block mb-1 text-md font-medium text-gray-900">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="resize-none h-[100px] border-2 shadow-sm border-gray-300 rounded-lg w-full py-2.5 px-3"
                placeholder="Message"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          {id ? "Update Testimonial" : "Add Testimonial"}
        </button>
      </form>
    </div>
  );
}
