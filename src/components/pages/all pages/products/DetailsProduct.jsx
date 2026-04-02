import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DetailsProduct() {
  const { id } = useParams();
  const baseUrl = import.meta.env.VITE_API_URL;

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");

  const imgPath = baseUrl.replace("/admin/", "/uploads/product/");
console.log(product);
  // 🔥 Fetch product by ID
  const getProduct = async () => {
    try {
      const res = await axios.get(`${baseUrl}product/single/${id}`);
      const data = res.data._data;
      setProduct(data);

      // default image
      setActiveImage(data.productImage ? imgPath + data.productImage : "");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* 🔥 LEFT SIDE - IMAGES */}
        <div>
          <img
            src={activeImage}
            alt={product.productName}
            className="w-full h-[500px] object-cover rounded-xl shadow-lg border border-gray-100"
          />

          {/* thumbnails */}
          <div className="flex gap-3 mt-4 flex-wrap">
            {[product.productImage, product.backImage, ...(product.galleryImage || [])]
              .filter(Boolean)
              .map((img, i) => (
                <img
                  key={i}
                  src={imgPath + img}
                  onClick={() => setActiveImage(imgPath + img)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                    activeImage === imgPath + img ? "border-blue-500 scale-105 shadow-md" : "border-gray-200 hover:border-blue-300"
                  }`}
                />
              ))}
          </div>
        </div>

        {/* 🔥 RIGHT SIDE - DETAILS */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold text-slate-800">{product.productName}</h1>

          <p className="text-slate-600 leading-relaxed text-lg">{product.description}</p>

          {/* PRICE */}
          <div className="flex items-center gap-4 mt-2">
            <span className="text-3xl font-bold text-green-600">
              ₹{product.salePrice}
            </span>
            <span className="line-through text-slate-400 text-xl font-medium">
              ₹{product.actualPrice}
            </span>
            <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {Math.round(((product.actualPrice - product.salePrice) / product.actualPrice) * 100)}% OFF
            </span>
          </div>

          {/* BADGES */}
          <div className="flex flex-wrap gap-2">
            {product.productType && (
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                🏷️ {product.productType}
              </span>
            )}
            {product.isTopRated === "Yes" && (
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                ★ Top Rated
              </span>
            )}
            {product.isBestSelling === "Yes" && (
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                🔥 Best Selling
              </span>
            )}
            {product.isUpsell === "Yes" && (
              <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                ✨ Featured
              </span>
            )}
          </div>

          {/* STOCK */}
          <div className="flex items-center mt-2 group">
            <div className={`w-3 h-3 rounded-full mr-3 animate-pulse ${product.stocks > 0 ? "bg-green-500" : "bg-red-500"}`}></div>
            <span className={`text-lg font-semibold ${product.stocks > 0 ? "text-green-700" : "text-red-700"}`}>
              {product.stocks > 0 ? `In Stock (${product.stocks} available)` : "Currently Unavailable"}
            </span>
          </div>

          {/* COLORS */}
          {product.color?.length > 0 && (
            <div className="mt-4 p-4 bg-slate-50 rounded-xl">
              <h3 className="font-bold text-slate-700 mb-3 flex items-center">
                <span className="mr-2">🎨</span> Available Colors:
              </h3>
              <div className="flex gap-3 flex-wrap">
                {product.color.map((c, i) => (
                  <div
                    key={i}
                    className="group relative flex flex-col items-center"
                  >
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm ring-2 ring-transparent group-hover:ring-blue-400 transition-all cursor-pointer"
                      style={{ backgroundColor: typeof c === 'object' ? c.code : '#ccc' }}
                      title={typeof c === 'object' ? c.colorName : 'Unknown'}
                    ></div>
                    <span className="text-[10px] mt-1 text-slate-500 font-medium">
                      {typeof c === 'object' ? String(c.colorName || 'No Name') : 'Invalid'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MATERIAL */}
          {product.material?.length > 0 && (
            <div className="mt-2">
              <h3 className="font-bold text-slate-700 mb-2">Materials:</h3>
              <div className="flex gap-2 flex-wrap">
                {product.material.map((m, i) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 font-medium shadow-sm"
                  >
                    {typeof m === 'object' ? String(m.name || 'No Name') : 'Invalid'}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}