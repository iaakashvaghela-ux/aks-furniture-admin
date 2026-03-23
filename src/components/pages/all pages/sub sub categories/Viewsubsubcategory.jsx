import { useEffect, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { useAdmin } from "../../../../admin context/AdminContext";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import ImagePreview from "../../../common/ImagePreview";

export default function Viewsubsubcategory() {
  let baseUrl = import.meta.env.VITE_API_URL
  const [showSearch, setShowSearch] = useState(false);
  const [path, setPath] = useState("")
  const [subSubCategoryData, setSubSubCategoryData] = useState([]);

  const [previewImage, setPreviewImage] = useState(null);
  const [checked, setChecked] = useState([]);
  const { successToast, errorToast, infoToast } = useAdmin()

  // const users = [
  //   {
  //     id: 1,
  //     name: "Neil Sims",
  //     order: "1",
  //     status: "Active",
  //   },

  // ];



  let getSubSubCategoryData = () => {
    axios.get(`${baseUrl}sub-sub-category/view`)
      .then(res => {
        if (res.data._status) {
          setSubSubCategoryData(res.data.data)
          setPath(res.data.path)
        }
      })
  }

  useEffect(() => {
    getSubSubCategoryData()
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
      setChecked(subSubCategoryData.map((item) => item._id))
    }
    else {
      setChecked([])
    }

  }


  let handleDelete = () => {

    if (checked.length === 0) {
      return errorToast("Please select at least one item")
    }

    axios.post(`${baseUrl}sub-sub-category/delete`, { ids: checked })
      .then(res => {
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
              getSubSubCategoryData()
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
    axios.post(`${baseUrl}sub-sub-category/change-status`, { ids: checked })
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
              getSubSubCategoryData()
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
            <h2 className="text-xl font-semibold text-gray-800">View Material</h2>

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
                <th className="p-4"><input onChange={allCheck} checked={
                  subSubCategoryData.length > 0 &&
                  checked.length === subSubCategoryData.length
                } type="checkbox" /></th>
                <th className="p-4  w-[416px]">Sub Sub Category Name</th>
                <th className="p-4">Parent Category Name</th>
                <th className="p-4">Sub Category Name</th>
                <th className="p-4">IMAGE</th>
                <th className="p-4">ORDER</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {subSubCategoryData.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-gray-700 hover:bg-[#111827] transition"
                >
                  <td className="p-4">
                    <form action="">
                      <input onChange={handleCheck}
                        checked={checked.includes(user._id)}
                        value={user._id} type="checkbox" />
                    </form>
                  </td>

                  <td className="p-4 font-medium text-white">
                    {user.name}
                  </td>

                  <td className="p-4 font-medium text-white">
                    {user.parentCategory.name}
                  </td>

                  <td className="p-4 font-medium text-white">
                    {user.subCategory.name}
                  </td>

                  <td className="p-4">
                    <img
                      src={`${path}${user.image}`}
                      alt={user.name}
                      className="w-12 h-12 object-cover rounded cursor-pointer"
                      onClick={() => setPreviewImage(`${path}${user.image}`)}
                    />
                  </td>

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
                      <Link to={`/sub-sub-categories/add/${user._id}`}>
                        <FaEdit />
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {previewImage && (
            <ImagePreview previewImage={previewImage} setPreviewImage={setPreviewImage} />
          )}

        </div>
      </div>
    </div>
  );
}
