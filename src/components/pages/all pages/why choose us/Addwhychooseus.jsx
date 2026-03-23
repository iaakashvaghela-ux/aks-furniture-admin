// import React from 'react'

// export default function Addwhychooseus() {
//   return (
//     <div>
//       Add Why Choose Us
//     </div>
//   )
// }





export default function Addwhychooseus() {
  return (
    <div className="max-w-[95%]  mx-auto mt-5 mb-40 bg-white border border-blue-300 rounded-md">

      {/* HEADER */}
      <div className="px-5 py-3 border-b border-blue-300 bg-gray-50">
        <h2 className="text-lg font-semibold">Add Why Choose Us</h2>
      </div>
      <form action="">

        <div className="p-6">

          <div className="grid grid-cols-12 gap-6">

            {/* LEFT IMAGE */}
            <div className="col-span-4">
              <label className="text-sm font-medium text-gray-700">
                Choose Image
              </label>

              <div className="mt-2 h-[230px] border-2 border-dashed rounded-md
              flex flex-col items-center justify-center text-gray-400 cursor-pointer">
                <svg
                  className="w-12 h-12 mb-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 15a4 4 0 004 4h10a4 4 0 000-8h-1a5 5 0 10-9-4" />
                </svg>
                <span className="text-sm">Drag and drop</span>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="col-span-8 space-y-5">

              <div>
                <label className="text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  className="mt-2 w-full h-10 px-3 border rounded-md outline-none
                focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Order</label>
                <input
                  type="text"
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
            Add Category
          </button>

        </div>
      </form>
    </div>
  );
}
