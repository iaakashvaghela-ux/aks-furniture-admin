import { useState } from "react";

export default function CompanyProfile() {
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    mapUrl: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="px-6 bg-[#F1F4F5]">
      {/* Header */}
      <div className="py-5">
        <h2 className="text-[18px] font-semibold">Company Profile</h2>
        <ul className="flex text-[14px] text-[#7693BE]">
          <li className="text-blue-600">Dashboard / </li>
          <li className="ml-1">Company Profile</li>
        </ul>
      </div>

      {/* Card */}
      <div className="bg-white p-6 rounded-md">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="flex gap-5">
            {/* Image Upload */}
            <div className="w-1/3">
              <label className="block text-md font-medium text-gray-900">
                Category Image
              </label>

              <div className="border-2 border-dashed rounded-md h-[194px] flex items-center justify-center bg-gray-50">
                {image ? (
                  <img
                    src={image}
                    alt="preview"
                    className="h-full w-full object-cover rounded-md"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">
                    Drag & Drop or Click
                  </span>
                )}
                <input
                  type="file"
                  onChange={handleImage}
                  className="absolute opacity-0 h-[194px] w-[30%] cursor-pointer"
                />
              </div>
            </div>

            {/* Right Inputs */}
            <div className="w-2/3 space-y-3">
              <div>
                <label className="block text-md font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className=" border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder="Name"
                />
              </div>

              <div>
                <label className="block text-md font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className=" border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder="Email"
                />
              </div>

              <div>
                <label className="block text-md font-medium">
                  Mobile Number
                </label>
                <input
                  type="number"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  className=" border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder="Mobile Number"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="my-3">
            <label className="block text-sm font-medium">Address</label>
            <textarea
              rows="3"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="block p-2.5 w-full text-sm resize-none  rounded-lg border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Address"
            />
          </div>

          {/* Map URL */}
          <div className="my-3">
            <label className="block text-sm font-medium">
              Google Map URL
            </label>
            <textarea
              rows="3"
              name="mapUrl"
              value={form.mapUrl}
              onChange={handleChange}
              className="block p-2.5 w-full text-sm resize-none  rounded-lg border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Google Map URL"
            />
          </div>

          {/* Map Preview */}
          <div className="my-4 p-2 border-2 rounded-md">
            <iframe
              className="w-full h-[250px]"
              src={form.mapUrl || "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d70434.50219678717!2d73.030606!3d26.273815!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c5b1dfafdd7%3A0xf992fd41c21a238e!2sLaxmi%20Dairy%20%26%20Provision%20Store!5e1!3m2!1sen!2sin!4v1769454072960!5m2!1sen!2sin"}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />


           
          </div>

          {/* Button */}
          <button
            type="submit"
            className="my-5 text-white bg-purple-700 hover:bg-purple-800 rounded-lg px-5 py-2.5"
          >
            Update Company Profile
          </button>
        </form>
      </div>
    </div>
  );
}
