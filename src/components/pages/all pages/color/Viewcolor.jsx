import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { useAdmin } from "../../../../admin context/AdminContext";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";

export default function Viewcolor() {

  const { successToast, errorToast, confirmAlert } = useAdmin()
  let baseUrl = import.meta.env.VITE_API_URL
  const [showSearch, setShowSearch] = useState(false);
  const [colorData, setColorData] = useState([]);
  const [checked, setChecked] = useState([])

  // console.log(checked.length, colorData.length);

  let getColorData = () => {
    axios.get(`${baseUrl}color/view`)
      .then(res => {
        if (res.data._status) {
          setColorData(res.data.data)
        }
      })
  }
  // console.log(checked);
  //////use effects



  useEffect(() => {

    getColorData()
  }, [])

  ///////functions
  let handleCheck = (e) => {
    const valueChecked = e.target.checked
    const value = e.target.value
    if (valueChecked) {
      setChecked([...checked, value])
    } else {
      setChecked(checked.filter((item) => item !== value))
    }
  }

  let allCheck = (e) => {
    if (e.target.checked) {
      setChecked(colorData.map((item) => item._id))
    }
    else {
      setChecked([])
    }

  }


  let handleDelete = () => {

    if (checked.length === 0) {
      return errorToast("Please select at least one item")
    }

    axios.post(`${baseUrl}color/delete`, { ids: checked })
      .then(res => {
        console.log(res.data)
        if (res.data._status) {
          confirmAlert({ message: res.data._message }, {
            getColorData,
            setChecked,
          })
        }
        else {
          errorToast(res.data._message)
        }
      })
  }

  let changeStatus = () => {
    if (checked.length === 0) {
      return errorToast("Please select at least one item")
    }
    axios.post(`${baseUrl}color/change-status`, { ids: checked })
      .then(res => {
        if (res.data._status) {
          confirmAlert({ message: res.data._message }, {
            getColorData,
            setChecked,
          })
        }
        else {
          errorToast(res.data._message)
        }
      })
  }



  return (
    <div className="w-full flex justify-center pt-10 pb-50 px-4">
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
            <h2 className="text-xl font-semibold text-gray-800">View Color</h2>

            <div className="flex gap-3">
              {/* FILTER TOGGLE BUTTON */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="bg-blue-600 text-white p-2 rounded-lg"
              >
                {showSearch ? <RxCross2 size={18} /> : <FiFilter size={18} />}
              </button>

              <button onClick={changeStatus} className="bg-green-600 text-white px-4 py-2 rounded-lg">
                Change Status
              </button>
              <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg">
                Delete
              </button>
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#374151] text-gray-400">
              <tr>
                <th className="p-4"><input type="checkbox" onChange={allCheck} checked={
                  colorData.length > 0 &&
                  checked.length === colorData.length
                } /></th>
                <th className="p-4  w-[634px]">Color Name</th>
                <th className="p-4">Code</th>
                <th className="p-4">Order</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {colorData.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-gray-700 hover:bg-[#111827] transition"
                >
                  <td className="p-4">
                    <form action="">
                      <input
                        type="checkbox"
                        value={user._id}
                        onChange={handleCheck}
                        checked={checked.includes(user._id)}
                      />
                    </form>
                  </td>

                  <td className="p-4 font-medium text-white">
                    {user.colorName}
                  </td>

                  <td className="p-4">{user.code}</td>

                  <td className="p-4">{user.order}</td>

                  <td className="p-4">
                    <span
                      className={`px-4 py-1 rounded-full text-white text-xs font-semibold ${user.status
                        ? "bg-green-500"
                        : "bg-red-500"
                        }`}
                    >
                      {user.status ? "Active" : "Deactive"}
                    </span>
                  </td>

                  <td className="p-4">
                    <button className="bg-blue-600 p-3 rounded-full text-white">
                      <Link to={`/color/add/${user._id}`}>
                        <FaEdit />
                      </Link>
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







