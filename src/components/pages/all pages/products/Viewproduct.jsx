import React, { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";
import ImagePreview from "../../../common/ImagePreview";

export default function Viewproduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_API_URL;
  const [previewImage, setPreviewImage] = useState(null);
  const imgPath = baseUrl.replace("/admin/", "/uploads/product/");

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${baseUrl}product/view`);
      setProducts(res.data._data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1220px] mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold text-slate-800">
          Product Catalog
        </h3>
        <Link
          to="/products/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
        >
          + Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-2 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center"><input type="checkbox" /></th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">S. No.</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Prices</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {products.length > 0 ? (
                products.map((item, index) => (
                  <tr key={item._id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-2 py-5 text-center font-medium text-slate-400"><input type="checkbox" /></td>
                    <td className="px-6 py-5 text-center font-medium text-slate-400">{index + 1}</td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0 bg-slate-50">
                          {
                            console.log(item.productImage)
                          }
                          <img
                            src={item.productImage ? imgPath + item.productImage : "https://via.placeholder.com/64"}
                            alt={item.productName}
                            onClick={() => setPreviewImage(`${imgPath}${item.productImage}`)}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 line-clamp-1">{item.productName}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{item.parentCategory?.name || 'No Category'}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-green-600">₹{item.salePrice}</span>
                        <span className="text-xs text-slate-400 line-through">₹{item.actualPrice}</span>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.stocks > 10 ? 'bg-green-100 text-green-700' :
                        item.stocks > 0 ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                        {item.stocks} left
                      </span>
                    </td>

                    <td className="px-6 py-5 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                        {item.status ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-center items-center gap-3">
                        <Link
                          to={`/products/details/${item._id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FaEye className="text-lg" />
                        </Link>

                        <div className="w-px h-4 bg-slate-200"></div>

                        <Link to={`/products/add/${item._id}`} className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
                          <FaEdit className="text-lg" />
                        </Link>

                        <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <RiDeleteBin6Line className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500 italic">
                    No products found. Start by adding one!
                  </td>
                </tr>
              )}
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

