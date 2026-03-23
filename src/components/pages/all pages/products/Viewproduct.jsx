// import React from 'react'

// export default function Viewproduct() {
//   return (
//     <div>
//       Viewproduct
//     </div>
//   )
// }





import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const products = [
  {
    id: 1,
    name: "Men's",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ipsa consequatur animi rerum at eveniet praesentium explicabo expedita assumenda voluptas maiores nobis.",
    shortDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ipsa consequatur animi rerum at eveniet praesentium explicabo expedita assumenda voluptas maiores nobis.",
    thumbnail:
      "https://i.pinimg.com/originals/bf/e0/39/bfe03930f2a1bfff7515a14dc47d34d1.png",
    status: "Active",
  },
  {
    id: 2,
    name: "Men's",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ipsa consequatur animi rerum at eveniet praesentium explicabo expedita assumenda voluptas maiores nobis.",
    shortDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ipsa consequatur animi rerum at eveniet praesentium explicabo expedita assumenda voluptas maiores nobis.",
    thumbnail:
      "https://i.pinimg.com/originals/bf/e0/39/bfe03930f2a1bfff7515a14dc47d34d1.png",
    status: "Active",
  },
];

export default function Viewproduct() {
  return (
    <div className="max-w-[1220px] mx-auto py-5">
      <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
        Product Items
      </h3>

      <div className="border border-t-0 rounded-b-md border-slate-400">
        <div className="relative overflow-x-auto">
          <table className="w-full text-left text-gray-500">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Delete</th>
                <th className="px-6 py-3">S. No.</th>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Short Description</th>
                <th className="px-6 py-3">Thumbnails</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item, index) => (
                <tr key={item.id} className="bg-white border-b">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                    />
                  </td>

                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item.name}</td>

                  <td className="px-6 py-4">
                    <p className="line-clamp-1 w-[180px]">
                      {item.description}
                    </p>
                    <button className="text-[14px] text-blue-500 font-semibold hover:text-blue-700">
                      Read More
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    <p className="line-clamp-1 w-[180px]">
                      {item.shortDescription}
                    </p>
                    <button className="text-[14px] text-blue-500 font-semibold hover:text-blue-700">
                      Read More
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="w-16 h-16 rounded-md object-cover"
                    />
                  </td>

                  <td className="px-6 py-4 flex gap-3 mt-6">
                    {/* Delete */}
                    <div className="text-[18px] w-4 h-4 text-red-800 cursor-pointer">
                     <RiDeleteBin6Line />
                    </div>

                    <span>|</span>

                    {/* Edit */}
                    <div className="text-[18px] text-yellow-300 w-4 h-4 cursor-pointer">
                      <FaEdit />
                    </div>
                  </td>

                  <td className="px-6 py-4">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
