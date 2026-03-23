// import React from 'react'

// export default function Addtestimonials() {
//   return (
//     <div>
//       Addtestimonials
//     </div>
//   )
// }



import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function Addtestimonials() {
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    Image: null,
    Name: "",
    Designation: "",
    Rating: "",
    Order: "",
    Message: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "Image") {
      setFormData({ ...formData, Image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]))
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data 👉", formData);
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
              {imagePreview ? (
                <img
                  src={imagePreview}
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
              name="Image"
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
                name="Name"
                value={formData.Name}
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
                type="number"
                name="Designation"
                value={formData.Designation}
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
                name="Rating"
                value={formData.Rating}
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
                name="Order"
                value={formData.Order}
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
                name="Message"
                value={formData.Message}
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
          Add Testimonial
        </button>
      </form>
    </div>
  );
}
