import React, { useState } from "react";
import hero51 from "../../assets/hero-5-1.jpg";
import PriceComponent from "../../util/PriceComponent";

export default function Product() {
  const [productData, setProductData] = useState([
    {
      productId: 1,
      name: "Kem body",
      amount: 200000,
      image: hero51,
      status: "Đang kinh doanh",
    },
    {
      productId: 2,
      name: "Serum",
      amount: 300000,
      image: hero51,
      status: "Đang kinh doanh",
    },
  ]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    amount: "",
    image: "",
    status: "Đang kinh doanh",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const [selectedImage, setSelectedImage] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = () => {
    const newProductId = productData.length
      ? productData[productData.length - 1].productId + 1
      : 1;
    setProductData((prev) => [
      ...prev,
      { ...newProduct, productId: newProductId },
    ]);
    setModalOpen(false);
    resetNewProduct();
  };

  const handleEditProduct = () => {
    setProductData((prev) =>
      prev.map((product) =>
        product.productId === currentProduct.productId ? newProduct : product
      )
    );
    setModalOpen(false);
    resetNewProduct();
    setIsEditing(false);
  };

  const handleEditButtonClick = (product) => {
    setCurrentProduct(product);
    setNewProduct(product);
    setIsEditing(true);
    setModalOpen(true);
  };

  const resetNewProduct = () => {
    setNewProduct({
      name: "",
      amount: "",
      image: "",
      status: "Đang kinh doanh",
    });
  };

  return (
    <div className="px-5 py-8 ">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => {
          setModalOpen(true);
          setIsEditing(false);
          resetNewProduct();
        }}
      >
        Thêm sản phẩm
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-left">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 border-b">Mã sản phẩm</th>
              <th className="py-2 px-4 border-b">Hình ảnh</th>
              <th className="py-2 px-4 border-b">Tên sản phẩm</th>
              <th className="py-2 px-4 border-b">Giá</th>
              <th className="py-2 px-4 border-b">Trạng thái</th>
              <th className="py-2 px-4 border-b">Chỉnh sửa</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((product) => (
              <tr key={product.productId}>
                <td className="py-2 px-4 border-b">{product.productId}</td>
                <td className="py-2 px-4 border-b">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">
                  <PriceComponent price={product.amount} />
                </td>
                <td className="py-2 px-4 border-b">{product.status}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-500"
                    onClick={() => handleEditButtonClick(product)}
                  >
                    Chỉnh sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div className="fixed inset-0  bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded w-10/12">
              <h2 className="text-xl mb-4">
                {isEditing ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
              </h2>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                placeholder="Tên sản phẩm"
                className="mb-2 px-4 py-2 border rounded w-full"
              />
              <input
                type="text"
                name="amount"
                value={newProduct.amount}
                onChange={handleChange}
                placeholder="Giá sản phẩm"
                className="mb-2 px-4 py-2 border rounded w-full"
              />
              <input
                type="file"
                onChange={handleImageUpload}
                className="mb-2 px-4 py-2 border rounded w-full"
              />
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Selected"
                  width={120}
                  className="mb-2 border rounded md:w-20"
                />
              )}
              <select
                name="status"
                value={newProduct.status}
                onChange={handleChange}
                className="mb-2 px-4 py-2 border rounded w-full"
              >
                <option value="Đang kinh doanh">Đang kinh doanh</option>
                <option value="Ngừng kinh doanh">Ngừng kinh doanh</option>
              </select>
              <div className="flex justify-end">
                <button
                  className="mr-2 px-4 py-2 bg-gray-300 rounded"
                  onClick={() => {
                    setModalOpen(false);
                    setIsEditing(false);
                    resetNewProduct();
                  }}
                >
                  Hủy
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={isEditing ? handleEditProduct : handleAddProduct}
                >
                  {isEditing ? "Lưu thay đổi" : "Thêm"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
