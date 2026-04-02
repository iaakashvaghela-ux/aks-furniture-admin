import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

export default function Addproduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  let baseUrl = import.meta.env.VITE_API_URL
  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [path, setPath] = useState("")
  const [colors, setColors] = useState([]);
  const [product, setProduct] = useState(null);
  const imgPath = baseUrl.replace("/admin/", "/uploads/product/");
  const [images, setImages] = useState({
    productImage: null,
    backImage: null,
    galleryImage: [],
  });

  const [previews, setPreviews] = useState({
    productImage: null,
    backImage: null,
    galleryImage: [],
  });


  const [formData, setFormData] = useState({
    productName: "",
    parentCategory: "",
    subCategory: "",
    subSubCategory: "",
    material: [],
    productType: "",
    isTopRated: "",
    isBestSelling: "",
    isUpsell: "",
    color: [],
    actualPrice: "",
    salePrice: "",
    stocks: "",
    order: "",
    description: "",
  });

  // console.log(formData);
  /* ---------- handlers ---------- */
  const getProduct = async () => {
    try {
      const res = await axios.get(`${baseUrl}product/single/${id}`);
      const data = res.data._data;
      // setFormData(data);
      setFormData({
        productName: data.productName,
        parentCategory: data.parentCategory._id,
        subCategory: data.subCategory._id,
        subSubCategory: data.subSubCategory._id,
        material: data.material.map((item) => item._id),
        productType: data.productType,
        isTopRated: data.isTopRated,
        isBestSelling: data.isBestSelling,
        isUpsell: data.isUpsell,
        color: data.color.map((item) => item._id),
        actualPrice: data.actualPrice,
        salePrice: data.salePrice,
        stocks: data.stocks,
        order: data.order,
        description: data.description,
      });
      setImages({
        ...images,
        productImage: data.productImage,
        backImage: data.backImage,
        galleryImage: data.galleryImage,
      });
      setPreviews({
        ...previews,
        productImage: imgPath + data.productImage,
        backImage: imgPath + data.backImage,
        galleryImage: data.galleryImage.map((item) => imgPath + item),
      });


      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);
  console.log(previews);
  const handleImageChange = (e) => {
    const { name, files, multiple } = e.target;
    if (multiple) {
      const fileArray = Array.from(files);
      const previewArray = fileArray.map((file) => URL.createObjectURL(file));

      setImages((prev) => ({
        ...prev,
        [name]: [...prev[name], ...fileArray],
      }));
      setPreviews((prev) => ({
        ...prev,
        [name]: [...prev[name], ...previewArray],
      }));
    } else {
      const file = files[0];
      if (!file) return;

      setImages((prev) => ({ ...prev, [name]: file }));
      setPreviews((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(file),
      }));
    }
  };

  const removeImage = (name, index) => {
    setImages((prev) => ({
      ...prev,
      [name]: prev[name].filter((_, i) => i !== index),
    }));
    setPreviews((prev) => {
      // Revoke the URL to avoid memory leaks
      URL.revokeObjectURL(prev[name][index]);
      return {
        ...prev,
        [name]: prev[name].filter((_, i) => i !== index),
      };
    });
  };

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === "select-multiple") {
      const selections = Array.from(selectedOptions).map((option) => option.value);
      setFormData((prev) => ({ ...prev, [name]: selections }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataAll = new FormData();

    // Append all form fields
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((val) => formDataAll.append(key, val));
      } else {
        formDataAll.append(key, formData[key]);
      }
    }

    // Append images
    if (images.productImage) {
      formDataAll.append("productImage", images.productImage);
    }
    if (images.backImage) {
      formDataAll.append("backImage", images.backImage);
    }
    if (images.galleryImage && images.galleryImage.length > 0) {
      images.galleryImage.forEach((img) => formDataAll.append("galleryImage", img));
    }

    // Send request
    let addOrUpdate = id ? `update/${id}` : 'add'
    let getOrPost = id ? 'put' : 'post'
    axios[getOrPost](`${baseUrl}product/${addOrUpdate}`, formDataAll, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(res => {
        if (res.data._status) {
          navigate("/products/view");
        }
      })
      .catch(err => console.log(err));


    // console.log("Form Data 👉", formDataAll);
  };

  /* ---------- reusable image box ---------- */
  const ImageBox = ({ label, name, preview, multiple = false }) => (
    <div className={`mb-4 ${multiple ? "min-h-[200px]" : "h-[200px]"}`}>
      <label className="block text-md font-medium text-[#76838f]">
        {label}
      </label>

      <div
        className={`${multiple ? "min-h-[160px] py-4" : "h-[160px]"
          } border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 relative`}
      >
        {preview && (multiple ? preview.length > 0 : preview) ? (
          multiple && Array.isArray(preview) ? (
            <div className="grid grid-cols-3 gap-3 p-3 w-full">
              {preview.map((src, index) => (
                <div key={index} className="relative group aspect-square">
                  <img
                    src={src}
                    alt={`preview-${index}`}
                    className="h-full w-full object-cover rounded-lg shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(name, index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <label
                htmlFor={name}
                className="aspect-square w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-white/50 text-gray-400 cursor-pointer hover:border-blue-500 transition-colors"
              >
                <FaCloudUploadAlt size={20} />
                <p className="text-[10px] mt-1 font-medium text-center px-1">
                  Add More
                </p>
              </label>
            </div>
          ) : (
            <label htmlFor={name} className="w-full h-full cursor-pointer">
              <img
                src={preview}
                alt="preview"
                className="h-full w-full object-cover rounded-lg"
              />
            </label>
          )
        ) : (
          <label
            htmlFor={name}
            className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
          >
            <FaCloudUploadAlt size={32} className="text-gray-300" />
            <p className="text-sm mt-2 font-medium">Click to upload</p>
            <p className="text-xs mt-1 text-gray-400">
              {multiple ? "Select multiple images" : "Select one image"}
            </p>
          </label>
        )}
      </div>

      <input
        type="file"
        id={name}
        name={name}
        className="hidden"
        accept="image/*"
        multiple={multiple}
        onChange={handleImageChange}
      />
    </div>
  );


  let getParentCategory = () => {
    axios.get(`${baseUrl}product/parent`)
      .then((res) => {
        setParentCategories(res.data._data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  let getSubCategory = () => {
    if (!formData.parentCategory) return;
    axios.get(`${baseUrl}product/sub-category/${formData.parentCategory}`)
      .then((res) => {
        setSubCategories(res.data._data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  let subSubCategory = () => {
    if (!subCategories) return;
    axios.get(`${baseUrl}product/sub-sub-category/${formData.subCategory}`)
      .then((res) => {
        setSubSubCategories(res.data._data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  let getMaterial = () => {
    axios.get(`${baseUrl}product/material`)
      .then((res) => {
        setMaterials(res.data._data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  let getColor = () => {
    axios.get(`${baseUrl}product/color`)
      .then((res) => {
        setColors(res.data._data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getParentCategory()
    getMaterial()
    getColor()
  }, [])

  useEffect(() => {
    if (formData.parentCategory) {
      getSubCategory()
    }
  }, [formData.parentCategory])

  useEffect(() => {
    if (formData.subCategory) {
      subSubCategory()
    }
  }, [formData.subCategory])

  return (
    <div className="w-full px-6 py-6">
      <form onSubmit={handleSubmit}>
        {/* images */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="">

            <ImageBox
              label="Product Image"
              name="productImage"
              preview={previews.productImage}
            />
            <ImageBox
              label="Back Image"
              name="backImage"
              preview={previews.backImage}
            />
            <ImageBox
              label="Gallery Image"
              name="galleryImage"
              preview={previews.galleryImage}
              multiple={true}
            />

          </div>





          {/* MIDDLE SECTION */}
          <div className="middle">
            <div className="mb-5">
              <label
                htmlFor="Prodct_Name"
                className="block text-md font-medium text-gray-900 text-[#76838f]"
              >
                Prodct Name
              </label>
              <input
                type="text"
                className=" border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                placeholder="Prodct Name"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-5">
              <label className="block text-md font-medium text-gray-900 text-[#76838f]">
                Select Sub Category
              </label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={(e) => {
                  handleChange(e)
                  setSubSubCategories([])
                }}
                className="  border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3"
              >
                <option value="">Select Category</option>
                {
                  subCategories?.map((item, index) => {
                    return (
                      <option key={index} value={item._id}>{item.name}</option>
                    )
                  })
                }
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-md font-medium text-gray-900 text-[#76838f]">
                Select Material
              </label>
              <select
                name="material"
                value={formData.material}
                multiple
                onChange={handleChange}
                className="  border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3"
              >
                <option value="">Nothing Selected</option>
                {
                  materials?.map((item, index) => {
                    return (
                      <option key={index} value={item._id}>{item.name}</option>
                    )
                  })
                }
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-md font-medium text-gray-900 text-[#76838f]">
                Select Product Type
              </label>
              <select
                name="productType"
                onChange={handleChange}
                className="  border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3"
              >
                <option value="">Nothing Selected</option>
                <option>Featured</option>
                <option>New Arrivals</option>
                <option>Onsale</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-md font-medium text-gray-900 text-[#76838f]">
                Is Top Rated
              </label>
              <select
                name="isTopRated"
                value={formData.isTopRated}
                onChange={handleChange}
                className="  border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3"
              >
                <option value="">Nothing Selected</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-md font-medium text-gray-900 text-[#76838f]">
                Actual Price
              </label>
              <input
                type="text"
                name="actualPrice"
                value={formData.actualPrice}
                onChange={handleChange}
                placeholder="Actual Price"
                className=" border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3"
              />
            </div>

            <div className="mb-5">
              <label className="block text-md font-medium text-gray-900 text-[#76838f]">
                Total In Stocks
              </label>
              <input
                type="number"
                name="stocks"
                value={formData.stocks}
                onChange={handleChange}
                placeholder="Total In Stocks"
                className=" border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3"
              />
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="right-items">
            <div className="mb-5">
              <label className="block text-md font-medium text-gray-900 text-[#76838f]">
                Select Parent Category
              </label>
              <select
                name="parentCategory"
                value={formData.parentCategory}
                onChange={(e) => {
                  handleChange(e)
                  setSubCategories([])
                  setSubSubCategories([])

                }}
                className="  border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3"
              >
                <option value="">Nothing Selected</option>
                {
                  parentCategories?.map((item, index) => {
                    return (
                      <option key={index} value={item._id}>{item.name}</option>
                    )
                  })
                }
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-md font-medium text-gray-900 text-[#76838f]">
                Select Sub Sub Category
              </label>
              <select
                name="subSubCategory"
                value={formData.subSubCategory}
                onChange={(e) => {
                  handleChange(e)
                }}
                className="  border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3"
              >
                <option value="">Nothing Selected</option>
                {
                  subSubCategories?.map((item, index) => {
                    return (
                      <option key={index} value={item._id}>{item.name}</option>
                    )
                  })
                }
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-md font-medium text-gray-900 text-[#76838f]">
                Select Color
              </label>
              <select
                name="color"
                value={formData.color}
                multiple
                onChange={handleChange}
                className=" border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3 "
              >
                <option value="">Nothing Selected</option>
                {
                  colors?.map((item, index) => {
                    return (
                      <option key={index} value={item._id}>{item.colorName}</option>
                    )
                  })
                }
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-md font-medium text-gray-900 text-[#76838f]">
                Is Best Selling
              </label>
              <select
                name="isBestSelling"
                value={formData.isBestSelling}
                onChange={handleChange}
                className="  border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3"
              >
                <option value="">Nothing Selected</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-md font-medium text-gray-900 text-[#76838f]">
                Is Upsell
              </label>
              <select
                name="isUpsell"
                value={formData.isUpsell}
                onChange={handleChange}
                className="  border-2 shadow-sm border-gray-300 rounded-lg block w-full py-2.5 px-3"
              >
                <option value="">Nothing Selected</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-md font-medium text-gray-900 text-[#76838f]">
                Sale Price
              </label>
              <input
                type="text"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleChange}
                placeholder="Sale Price"
                className=" border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3"
              />
            </div>

            <div className="mb-5">
              <label className="block text-md font-medium text-gray-900 text-[#76838f]">
                Order
              </label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                placeholder="Order"
                className=" border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3"
              />
            </div>
          </div>

        </div>



        {/* description */}
        <div className="mt-8">
          <label className="block text-md font-medium text-[#76838f] mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full h-[200px] border-2 rounded-lg p-3"
          />
        </div>




        <button
          type="submit"
          className="mt-6 bg-gradient-to-br from-purple-600 to-blue-500 text-white px-6 py-2.5 rounded-lg"
        >
          Add Product
        </button>
      </form>
    </div>
  );

}