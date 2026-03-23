import { useState } from "react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("edit");
  const [image, setImage] = useState(
    "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/users/59c32aee-61e4-4868-b27c-e9339ab54e9a-1670132624.jpg"
  );

  const [form, setForm] = useState({
    name: "Admin",
    email: "xyz@gmail.com",
    number: "1234567890",
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
    <div className="w-full px-6 grid grid-cols-[30%_auto] gap-[10px] py-[20px]">
      {/* LEFT PROFILE CARD */}
      <div className="bg-white self-start rounded-lg shadow-md">
        <div className="py-[40px] text-center">
          <img
            className="w-[80px] h-[80px] mx-auto rounded-full object-cover"
            src={image}
            alt="Profile"
          />
          <h5 className="pt-[6px] font-semibold">{form.name}</h5>
        </div>

        <div className="bg-[#F6F9FD] p-[20px] rounded-lg shadow-md">
          <h4 className="py-[8px] font-bold">Contact Information</h4>

          <p className="flex items-center gap-[8px] py-[6px]">
            📞 {form.number}
          </p>
          <p className="flex items-center gap-[8px] py-[6px]">
            ✉️ {form.email}
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Tabs */}
        <div className="flex border-b border-gray-300 mb-4">
          <button
            onClick={() => setActiveTab("edit")}
            className={`px-6 py-2 text-lg font-medium ${
              activeTab === "edit"
                ? "border-b-4 border-purple-700 text-purple-700"
                : "text-gray-600"
            }`}
          >
            Edit Profile
          </button>

          <button
            onClick={() => setActiveTab("password")}
            className={`px-6 py-2 text-lg font-medium ${
              activeTab === "password"
                ? "border-b-4 border-purple-700 text-purple-700"
                : "text-gray-600"
            }`}
          >
            Change Password
          </button>
        </div>

        {/* EDIT PROFILE */}
        {activeTab === "edit" && (
          <form onSubmit={handleSubmit} className="p-3">
            <div className="flex gap-5">
              {/* Image */}
              <div className="w-1/3">
                <label className="block text-md font-medium">
                  Choose Image
                </label>

                <div className="border-2 border-dashed rounded-md h-[250px] flex items-center justify-center bg-gray-50 relative">
                  {image ? (
                    <img
                      src={image}
                      className="h-full w-full object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-gray-400">Upload Image</span>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Inputs */}
              <div className="w-2/3">
                <div className="mb-5">
                  <label className="block text-md font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="input"
                    placeholder="Name"
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-md font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="input"
                    placeholder="Email"
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-md font-medium">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="number"
                    value={form.number}
                    onChange={handleChange}
                    className="input"
                    placeholder="Number"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="my-5 text-white bg-purple-700 hover:bg-purple-800 rounded-lg px-5 py-2.5"
            >
              Update Profile
            </button>
          </form>
        )}

        {/* CHANGE PASSWORD */}
        {activeTab === "password" && (
          <form className="p-3 space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              className="input"
            />
            <input
              type="password"
              placeholder="New Password"
              className="input"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="input"
            />

            <button className="text-white bg-purple-700 hover:bg-purple-800 rounded-lg px-5 py-2.5">
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
