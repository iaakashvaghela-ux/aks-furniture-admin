import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useAdmin } from "../../../../admin context/AdminContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Addsubsubcategory() {
  const { id } = useParams();
  let baseUrl = import.meta.env.VITE_API_URL
  const navigate = useNavigate();
  const { successToast, errorToast } = useAdmin()
  const [oldImage, setOldImage] = useState("");
  const [image, setImage] = useState(null);
  const [parentCategory, setParentCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [parentCategoryData, setParentCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [path, setPath] = useState("");
  const [subSubCategoryName, setSubSubCategoryName] = useState("");
  const [order, setOrder] = useState("");


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };


  let getParentCategory = () => {
    axios.get(`${baseUrl}sub-category/parent`)
      .then(res => {
        if (res.data._status) {
          setParentCategoryData(res.data.data)
        }
      })
  }



  let getSubCategory = () => {
    if (!parentCategory) return;

    axios
      .get(`${baseUrl}sub-sub-category/sub-category/${parentCategory}`)
      .then((res) => {
        if (res.data._status) {
          setSubCategoryData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        errorToast("Failed to load sub categories");
      });
  };



  let handleSubmit = (e) => {
    e.preventDefault()
    let formData = new FormData(e.target);
    let addOrUpdate = id ? `update/${id}` : 'add'
    let getOrPost = id ? 'put' : 'post'

    console.log(formData);
    axios[getOrPost](`${baseUrl}sub-sub-category/${addOrUpdate}`, formData)
      .then((res) => {
        if (res.data._status) {
          successToast(res.data._message)
          setTimeout(() => {
            navigate('/sub-sub-categories/view')
          }, 2000)
        }
        else {
          errorToast(res.data._message)
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (parentCategory) {
      getSubCategory()
    }
  }, [parentCategory])

  useEffect(() => {
    getParentCategory()
  }, [])


  useEffect(() => {
    if (id) {
      axios.get(`${baseUrl}sub-sub-category/single/${id}`)
        .then((res) => {
          if (res.data._status) {
            setSubSubCategoryName(res.data._data.name)
            setOldImage(res.data._data.image)
            setOrder(res.data._data.order)
            setPath(res.data.path)
            setSubCategory(res.data._data.subCategory)
            setParentCategory(res.data._data.parentCategory)
          }
        })
        .catch((err) => console.log(err))
    }
  }, [id])

  return (
    <div className="border border-blue-300 rounded-lg bg-white">

      {/* Header */}
      <div className="px-6 py-4 border-b bg-slate-50 rounded-t-lg">
        <h2 className="text-xl font-semibold">{id ? "Update" : "Add"} Sub Sub Category</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Image Upload */}
            <div>
              <label className="block font-medium mb-2">
                Category Image
              </label>

              <label className="cursor-pointer">
                <div className="border border-gray-200 rounded-md h-64 flex flex-col items-center justify-center text-gray-400">

                  {image || (id && oldImage) ? (
                    <img
                      src={image ? image : path + oldImage}
                      alt="preview"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <FaCloudUploadAlt size={40} />
                      <p className="mt-2">Drag and drop</p>
                    </>
                  )}
                </div>

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Right Side Inputs */}
            <div className="md:col-span-2">

              {/* Parent Category */}
              <div className="mb-6">
                <label className="block font-medium mb-2">
                  Parent Category Name
                </label>
                <select
                  name="parentCategory"
                  value={parentCategory}
                  onChange={(e) => {
                    setParentCategory(e.target.value);
                    setSubCategory("");

                  }}
                  className="w-full border rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Category</option>
                  {
                    parentCategoryData.map((Obj, index) => {
                      return (
                        <option key={Obj._id} value={Obj._id}>{Obj.name}</option>
                      )
                    })
                  }
                </select>
              </div>

              {/* Sub Category */}
              <div className="mb-6">
                <label className="block font-medium mb-2">
                  Sub Category Name
                </label>
                <select
                  disabled={!parentCategory}
                  name="subCategory"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="w-full border rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-[0.5] disabled:cursor-not-allowed disabled:bg-gray-100"
                >
                  <option value="">
                    {parentCategory ? "Select Sub Category" : "First select parent category"}
                  </option>

                  {
                    subCategoryData.map((Obj, index) => {
                      return (
                        <option key={Obj._id} value={Obj._id}>{Obj.name}</option>
                      )
                    })
                  }
                </select>
              </div>

              {/* Sub Sub Category Name */}
              <div className="mb-6">
                <label className="block font-medium mb-2">
                  Sub Sub Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Category Name"
                  value={subSubCategoryName}
                  onChange={(e) => setSubSubCategoryName(e.target.value)}
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Order */}
              <div className="mb-8">
                <label className="block font-medium mb-2">
                  Order
                </label>
                <input
                  name="order"
                  type="number"
                  placeholder="Category Order"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Button */}
              <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition">
                {id ? "Update" : "Add"} Sub Sub Category
              </button>

            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
