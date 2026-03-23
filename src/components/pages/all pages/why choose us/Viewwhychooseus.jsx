// import React from 'react'

// export default function Viewwhychooseus() {
//   return (
//     <div>
//       Viewwhychooseus
//     </div>
//   )
// }





import { useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

export default function Viewwhychooseus() {
  const [showSearch, setShowSearch] = useState(false);

  const users = [
    {
      id: 1,
      name: "Neil Sims",
      order: "1",
      status: "Active",
    },

  ];

  return (
    <div className="max-w-[1220px] flex justify-center pt-10 pb-50 px-4">
      <div className="w-full max-w-[1220px] space-y-6">

        {/* 🔍 SEARCH BAR (toggle) */}
        {showSearch && (
          <div className="border rounded-lg p-4 flex gap-3 items-center">
            <form action="">
              <input
                type="text"
                placeholder="Search Name"
                className="bg-[#374151] text-white px-4 py-2 rounded-lg w-[300px] outline-none"
              />
            </form>
            <button className="bg-blue-600 p-3 rounded-lg text-white">
              <FaSearch />
            </button>
          </div>
        )}

        {/* TABLE CONTAINER */}
        <div className="bg-[#1f2937] rounded-lg overflow-hidden shadow-lg">

          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">View Material</h2>

            <div className="flex gap-3">
              {/* FILTER TOGGLE BUTTON */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="bg-blue-600 text-white p-2 rounded-lg"
              >
                {showSearch ? <RxCross2 size={18} /> : <FiFilter size={18} />}
              </button>

              <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                Change Status
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
                Delete
              </button>
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#374151] text-gray-400">
              <tr>
                <th className="p-4"><input type="checkbox" /></th>
                <th className="p-4  w-[816px]">Material Name</th>
                <th className="p-4">ORDER</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-700 hover:bg-[#111827] transition"
                >
                  <td className="p-4">
                    <form action="">
                      <input type="checkbox" />
                    </form>
                  </td>

                  <td className="p-4 font-medium text-white">
                    {user.name}
                  </td>

                  <td className="p-4">{user.order}</td>

                  <td className="p-4">
                    <span
                      className={`px-4 py-1 rounded-full text-white text-xs font-semibold ${user.status === "Active"
                        ? "bg-green-500"
                        : "bg-red-500"
                        }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <button className="bg-blue-600 p-3 rounded-full text-white">
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}
