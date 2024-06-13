import React, { useEffect, useState } from "react";
import axios from "axios";
import { PRODUCT_API } from "../../router/ApiRoutes";
import PriceComponent from "../../util/PriceComponent";

export default function Product() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(PRODUCT_API);
        setProductData(response.data.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    price: 0,
    quantity: 0,
    image: "",
    status: "Đang kinh doanh",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleAddProduct = async () => {
    const existingProduct = productData.find(
      (product) => product.productName === newProduct.productName
    );

    if (existingProduct) {
      try {
        const updatedProduct = {
          ...existingProduct,
          quantity:
            parseInt(existingProduct.quantity) + parseInt(newProduct.quantity),
        };
        console.log(updatedProduct);
        await axios.put(
          `${PRODUCT_API}${existingProduct.productId}`,
          updatedProduct
        );

        setProductData((prev) =>
          prev.map((product) =>
            product.productId === existingProduct.productId
              ? updatedProduct
              : product
          )
        );

        setModalOpen(false);
        resetNewProduct();
      } catch (error) {
        console.error("Error updating product:", error);
      }
    } else {
      if (selectedImage) {
        try {
          const formData = new FormData();
          formData.append("image", selectedImage);

          const { data } = await axios.post(`${PRODUCT_API}image`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          const imageUrl = data.url;

          const newProductWithImage = {
            ...newProduct,
            image: imageUrl,
          };

          const result = await axios.post(PRODUCT_API, newProductWithImage);
          setProductData((prev) => [...prev, result.data.data]);
          setModalOpen(false);
          resetNewProduct();
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      } else {
        await axios.post(PRODUCT_API, newProduct);

        setProductData((prev) => [...prev, newProduct]);
        setModalOpen(false);
        resetNewProduct();
      }
    }
  };

  const handleEditProduct = async () => {
    try {
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const { data } = await axios.post(`${PRODUCT_API}image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const imageUrl = data.url;

        const updatedProductWithImage = {
          ...newProduct,
          image: imageUrl,
        };

        await axios.put(
          `${PRODUCT_API}${currentProduct.productId}`,
          updatedProductWithImage
        );

        setProductData((prev) =>
          prev.map((product) =>
            product.productId === currentProduct.productId
              ? updatedProductWithImage
              : product
          )
        );
      } else {
        await axios.put(
          `${PRODUCT_API}${currentProduct.productId}`,
          newProduct
        );

        setProductData((prev) =>
          prev.map((product) =>
            product.productId === currentProduct.productId
              ? newProduct
              : product
          )
        );
      }
      setModalOpen(false);
      resetNewProduct();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleEditButtonClick = (product) => {
    setCurrentProduct(product);
    setNewProduct(product);
    setIsEditing(true);
    setModalOpen(true);
  };

  const resetNewProduct = () => {
    setNewProduct({
      productName: "",
      price: 0,
      quantity: 0,
      image: "",
      status: "Đang kinh doanh",
    });
    setSelectedImage(null);
    setCurrentProduct(null);
  };

  return (
    <div className="px-5 py-8">
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
              <th className="py-2 px-4 border-b">Hình ảnh</th>
              <th className="py-2 px-4 border-b">Tên sản phẩm</th>

              <th className="py-2 px-4 border-b">Số lượng</th>
              <th className="py-2 px-4 border-b">Giá</th>
              <th className="py-2 px-4 border-b">Trạng thái</th>
              <th className="py-2 px-4 border-b">Chỉnh sửa</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((product) => (
              <tr key={product.productId}>
                <td className="py-2 px-4 border-b">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="py-2 px-4 border-b">{product.productName}</td>

                <td className="py-2 px-4 border-b">{product.quantity}</td>
                <td className="py-2 px-4 border-b">
                  <PriceComponent price={product.price} />
                </td>
                <td
                  className={`py-2 px-4 border-b ${
                    product.status == "Ngừng kinh doanh"
                      ? "text-red-500"
                      : "text-black"
                  }`}
                >
                  {product.status}
                </td>
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
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded w-10/12">
              <h2 className="text-xl mb-4">
                {isEditing ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
              </h2>
              <label>Tên sản phẩm</label>
              <input
                type="text"
                name="productName"
                value={newProduct.productName}
                onChange={handleChange}
                placeholder="Tên sản phẩm"
                className="mb-5 px-4 py-2 border rounded w-full"
              />
              <label>Số lượng</label>
              <input
                type="text"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleChange}
                placeholder="Số lượng"
                className="mb-5 px-4 py-2 border rounded w-full"
              />
              <label>Đơn giá</label>
              <input
                type="text"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                placeholder="Giá sản phẩm"
                className="mb-5 px-4 py-2 border rounded w-full"
              />
              <label>Hình ảnh</label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="mb-5 px-4 py-2 border rounded w-full"
              />
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="mb-5 border rounded w-20"
                />
              ) : (
                <div>
                  {currentProduct && currentProduct.image && (
                    <img
                      src={currentProduct.image}
                      alt="Selected"
                      className="mb-5 border rounded w-20"
                    />
                  )}
                </div>
              )}
              <label>Trạng thái</label>
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
