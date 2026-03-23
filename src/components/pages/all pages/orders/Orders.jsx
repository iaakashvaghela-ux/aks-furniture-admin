// import React from 'react'

// export default function Orders() {
//   return (
//     <div>
//       Orders
//     </div>
//   )
// }



export default function Orders() {
  return (
    <div className="max-w-[95%] bg-white border border-blue-300 rounded-md">

      {/* HEADER */}
      <div className="px-5 py-3 border-b border-blue-300 bg-gray-50">
        <h2 className="text-lg font-semibold">Order&apos;s List</h2>
      </div>

      {/* BODY */}
      <form action="">
        <div className="p-5">

          {/* DELETE BUTTON */}
          <button className="mb-4 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl text-white px-5 py-2 rounded-md text-sm">
            Delete
          </button>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 ">
                <tr className="text-gray-700 font-semibold">
                  <th className="px-3 py-3"></th>
                  <th className="px-3 py-3">S. NO.</th>
                  <th className="px-3 py-3">ORDER ID</th>
                  <th className="px-3 py-3">NAME</th>
                  <th className="px-3 py-3">QUANTITY</th>
                  <th className="px-3 py-3">PRICE</th>
                  <th className="px-3 py-3">DATE</th>
                  <th className="px-3 py-3">STATUS</th>
                  <th className="px-3 py-3">VIEW</th>
                </tr>
              </thead>

              <tbody>
                <tr className="">
                  <td className="px-3 py-4">
                    <input type="checkbox" />
                  </td>
                  <td className="px-3 py-4">1</td>
                  <td className="px-3 py-4">Frank01</td>
                  <td className="px-3 py-4 text-blue-600">
                    Roshan Chaurasia
                  </td>
                  <td className="px-3 py-4">2</td>
                  <td className="px-3 py-4">₹ 3500</td>
                  <td className="px-3 py-4">10/06/2024</td>
                  <td className="px-3 py-4 text-blue-500">
                    Processing...
                  </td>
                  <td className="px-3 py-4">
                    <button className="px-4 py-1.5 border rounded-full text-sm">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </form>
    </div>
  );
}
