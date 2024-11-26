import React, { useState, useRef, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AiOutlinePlus } from 'react-icons/ai';
import ProductCard from './components/Product-Card/ProductCard'; // Adjust the path as needed
import apiClient from '../../../lib/axios.lib';
import { ENDPOINTS } from '../../../utils/api/endpoints';
import { AdminContext } from '../../../context/admin-context/admin.context';
import { toast } from 'react-toastify';

const ManageProducts = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const data = useContext(AdminContext);
  console.log(data);
  const { setProducts, products, loading, setLoading } = data;

  const [formState, setFormState] = useState({
    name: '',
    category: '',
    price: '',
    type: '',
    availability: false,
    image: null,
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const response = await apiClient.get(ENDPOINTS.FETCH_ALL_PRODUCTS);
      setProducts(response.data);
    };
    fetchAllProducts();
  }, []);

  const handleAddProduct = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setFormState({
      name: '',
      category: '',
      price: '',
      type: '',
      availability: false,
      image: null,
    });
  };

  const handleUpdateProduct = (product) => {
    setCurrentProduct(product);
    setFormState({
      name: product.name,
      category: product.category,
      price: product.price,
      emotion: product.emotion,
      availability: product.availability,
      image: null,
    });
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentProduct(null);
    setFormState({
      name: '',
      category: '',
      price: '',
      type: '',
      availability: false,
      image: null,
    });
  };

  const handleDeleteProduct = async (productId) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const response = await apiClient.post(ENDPOINTS.DELETE_PRODUCT, {
      productId: productId,
    });
    if (response.status === 200 && response.data.data === 'PRODUCT_DELETED') {
      setLoading(false);
      toast('Product Deleted Successfully');
      setProducts(products.filter((product) => product.id !== productId));
    } else {
      setLoading(false);
      toast('An unexpected error occurred while deleting the product');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === 'price') {
      const regex = /^\d*\.?\d*$/;
      if (regex.test(value)) {
        setFormState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]:
          type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
      }));
    }
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: products.length + 1,
      name: formState.name,
      category: formState.category,
      price: parseFloat(formState.price),
      type: formState.type,
      availability: formState.availability,
      imageLink: URL.createObjectURL(formState.image),
      ingredients: [],
    };
    setProducts([...products, newProduct]);
    setIsAddModalOpen(false);
    setFormState({
      name: '',
      category: '',
      price: '',
      type: '',
      availability: false,
      image: null,
    });
  };

  const handleUpdateProductSubmit = async (e) => {
    if (loading) {
      return;
    }
    setLoading(true);
    e.preventDefault();
    const updatedProduct = {
      ...currentProduct,
      name: formState.name,
      category: formState.category,
      price: parseFloat(formState.price),
      emotion: formState.emotion,
      availability: formState.availability,
    };
    const response = await apiClient.post(ENDPOINTS.UPDATE_PRODUCT, {
      ...updatedProduct,
    });
    if (response.status === 200 && response.data.data === 'PRODUCT_UPDATED') {
      toast('Product Updated Successfully');
      setProducts(
        products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );

      setIsUpdateModalOpen(false);
      setCurrentProduct(null);
      setFormState({
        name: '',
        category: '',
        price: '',
        type: '',
        availability: false,
        image: null,
      });
      setLoading(false);
    } else {
      setLoading(false);
      toast('An unexpected error occurred while updating the product');
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-logoColor mb-[18px]">
          Manage Products
        </h1>
        <button
          onClick={handleAddProduct}
          className="bg-logoColor text-white py-2 px-4 rounded-lg flex items-center gap-2"
        >
          <AiOutlinePlus className="text-white text-[20px]" />
          Add Product
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onUpdate={handleUpdateProduct}
              onDelete={handleDeleteProduct}
            />
          ))}
      </div>
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] text-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-2xl mb-[16px]">Add Product</h2>
            <form onSubmit={handleAddProductSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-[#333333] text-white border-[#1d1d1d] focus:border-themegreen border-[2px] focus:outline-none rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formState.category}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-[#333333] text-white border-[#1d1d1d] focus:border-themegreen border-[2px] focus:outline-none rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Price</label>
                  <input
                    type="text"
                    name="price"
                    value={formState.price}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-[#333333] text-white border-[#1d1d1d] focus:border-themegreen border-[2px] focus:outline-none rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Type</label>
                  <input
                    type="text"
                    name="emotion"
                    value={formState.emotion}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-[#333333] text-white border-[#1d1d1d] focus:border-themegreen border-[2px] focus:outline-none rounded-lg"
                    required
                  />
                </div>

                <div className="mb-4 col-span-2">
                  <label className="block text-sm font-bold mb-2">
                    Upload Image
                  </label>
                  <button
                    type="button"
                    onClick={handleFileInputClick}
                    className="w-full p-2 bg-logoColor text-white border-[#1d1d1d] focus:border-themegreen border-[2px] focus:outline-none rounded-lg"
                  >
                    Choose File
                  </button>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleInputChange}
                    className="hidden"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseAddModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-logoColor text-white py-2 px-4 rounded-lg"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isUpdateModalOpen && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] text-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-2xl mb-4">Update Product</h2>
            <form onSubmit={handleUpdateProductSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-[#333333] text-white border-[#1d1d1d] focus:border-themegreen border-[2px] focus:outline-none rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formState.category}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-[#333333] text-white border-[#1d1d1d] focus:border-themegreen border-[2px] focus:outline-none rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Price</label>
                  <input
                    type="text"
                    name="price"
                    value={formState.price}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-[#333333] text-white border-[#1d1d1d] focus:border-themegreen border-[2px] focus:outline-none rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">
                    emotion
                  </label>
                  <input
                    type="text"
                    name="emotion"
                    value={formState.emotion}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-[#333333] text-white border-[#1d1d1d] focus:border-themegreen border-[2px] focus:outline-none rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseUpdateModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-logoColor text-white py-2 px-4 rounded-lg"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
