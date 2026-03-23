import { useEffect, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { useAdmin } from "../../../../admin context/AdminContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function Viewfaqs() {
  const [faqData, setFaqData] = useState([])
  const [checked, setChecked] = useState([])
  const { successToast, errorToast, infoToast } = useAdmin()
  let baseUrl = import.meta.env.VITE_API_URL

  let getFaqData = () => {
    axios.get(`${baseUrl}faq/view`)
      .then(res => {
        console.log(res.data.data)
        setFaqData(res.data.data)
      })
  }


  useEffect(() => {
    getFaqData()
  }, [])


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
      setChecked(faqData.map((item) => item._id))
    }
    else {
      setChecked([])
    }

  }

  let handleDelete = () => {

    if (checked.length === 0) {
      return errorToast("Please select at least one item")
    }

    axios.post(`${baseUrl}faq/delete`, { ids: checked })
      .then(res => {
        console.log(res.data)
        if (res.data._status) {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              getFaqData()
              setChecked([])
              successToast(res.data._message)
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
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
    axios.post(`${baseUrl}faq/change-status`, { ids: checked })
      .then(res => {
        if (res.data._status) {
          Swal.fire({
            title: "Are you sure?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change status!"
          }).then((result) => {
            if (result.isConfirmed) {
              getFaqData()
              setChecked([])
              successToast(res.data._message)
              Swal.fire({
                title: "status changed!",
                text: "Your file has been changed.",
                icon: "success"
              });
            }
          });
        }
        else {
          errorToast(res.data._message)
        }
      })
  }


  return (
    <div className="w-full flex justify-center pb-50 pt-10 px-4">
      <div className="w-full max-w-[1220px]">

        {/* TABLE CONTAINER */}
        <div className="bg-[#1f2937] rounded-lg overflow-hidden shadow-lg">

          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              View FAQ
            </h2>

            <div className="flex gap-3">
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
            <thead className="bg-[#374151] text-gray-400 uppercase text-xs">
              <tr>
                <th className="p-4">
                  <input onChange={allCheck} checked={
                    faqData.length > 0 &&
                    checked.length === faqData.length
                  }
                    type="checkbox" />
                </th>
                <th className="p-4 w-[250px]">Question</th>
                <th className="p-4">Answer</th>
                <th className="p-4">Order</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {faqData.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-700 hover:bg-[#111827] transition"
                >
                  {/* Checkbox */}
                  <td className="p-4">
                    <input value={item._id}
                      onChange={handleCheck}
                      checked={checked.includes(item._id)}
                      type="checkbox" />
                  </td>

                  {/* Question */}
                  <td className="p-4 font-semibold text-white">
                    {item.question}
                  </td>

                  {/* Answer */}
                  <td className="p-4 text-gray-400 leading-relaxed">
                    {item.answer}
                  </td>

                  {/* Order */}
                  <td className="p-4">{item.order}</td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-4 py-1 rounded-lg text-white text-xs font-semibold ${item.status
                        ? "bg-green-500"
                        : "bg-red-500"
                        }`}
                    >
                      {item.status ? "Active" : "Deactive"}
                    </span>
                  </td>

                  {/* Action */}
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