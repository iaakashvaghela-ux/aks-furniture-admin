import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../admin context/AdminContext";

export default function LoginPage() {
  const { successToast, infoToast } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      successToast("Login Successful!");
      navigate("/dashboard");
    } else {
      infoToast("Please fill in both email and password.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">

      {/* Logo */}
      <div className="mb-6">
        <img
          src="https://www.wscubetech.com/images/wscube-tech-logo-2.svg"
          alt="WsCube Tech"
          className="h-12 mx-auto"
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">

        <h2 className="text-2xl font-semibold mb-6">
          Sign in to your account
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              required
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
