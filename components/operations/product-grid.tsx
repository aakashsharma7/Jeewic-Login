"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronRight, Plus, X, Pencil, ArrowUpToLine, Trash2 } from "lucide-react"
import { APISDK, IDish, IDishCategory } from "@/libs/api"
import { usePopup } from "@/context/popup-context"

export default function ProductGridWithModal({
  isLoading,
  dishes,
  setDishes,
  categories,
  activeTab,
  refreshData,
  onDishDeleted
}: {
  isLoading: boolean
  dishes: IDish[]
  setDishes: (dish: IDish) => void
  categories: IDishCategory[]
  activeTab: string
  refreshData?: () => Promise<void>
  onDishDeleted?: (dishId: string) => void
}) {
  const [filteredDishes, setFilteredDishes] = useState<IDish[]>(dishes)
  const [availability, setAvailability] = useState<Record<string, boolean>>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<IDish | null>(null)
  const [isDeletingDish, setIsDeletingDish] = useState<string | null>(null)
  const [editedProduct, setEditedProduct] = useState<IDish>({
    name: "",
    price: 0,
    dish_category_id: "",
    id: "",
    is_available: false,
    is_non_veg: false,
    meta_data: {},
    picture: "",
    created_at: new Date(),
    updated_at: new Date(),
  })
  const { showPopup, showConfirm } = usePopup()

  // New product state
  const [newProductName, setNewProductName] = useState('')
  const [newCategoryId, setNewCategoryId] = useState('')
  const [newCategoryName, setNewCategoryName] = useState('')
  const [isNewProductNonVeg, setIsNewProductNonVeg] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [newPrice, setNewPrice] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Filter dishes based on activeTab
  useEffect(() => {
    if (activeTab === "ALL ITEMS") {
      setFilteredDishes(dishes)
    } else {
      const selectedCategory = categories.find(category => category.id === activeTab)
      if (selectedCategory) {
        setFilteredDishes(dishes.filter(dish => dish.dish_category_id === selectedCategory.id))
      } else {
        setFilteredDishes(dishes)
      }
    }
  }, [activeTab, dishes, categories])

  // Initialize availability state when dishes change
  useEffect(() => {
    setAvailability(
      dishes.reduce((acc, product) => {
        acc[product.id] = product.is_available
        return acc
      }, {} as Record<string, boolean>)
    )
  }, [dishes])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleSelectFile = () => {
    fileInputRef.current?.click()
  }

  const toggleAvailability = (id: string) => {
    setAvailability((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const openEditModal = (product: IDish) => {
    setCurrentProduct(product)
    setEditedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentProduct(null)
  }

  const closeNewProductModal = () => {
    setIsNewProductModalOpen(false)
    setNewProductName('')
    setNewPrice('')
    setSelectedFile(null)
    setIsVisible(true)
    setIsDropdownOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedProduct(prev => ({
      ...prev,
      [name]: name === "price" ? Number(value) || 0 : value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!currentProduct) return

    closeModal()
  }

  // Function to handle dish deletion
  const handleDeleteDish = async (dishId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    
    showConfirm(
      "Are you sure you want to delete this dish?", 
      async () => {
      try {
        setIsDeletingDish(dishId);
        const token = localStorage.getItem("access_token");
        const api = APISDK.getInstance(token || "");
        await api.deleteDish(dishId);
        
        // Update local state to remove the dish
        if (onDishDeleted) {
          onDishDeleted(dishId);
        }
        
        // If refreshData is provided, call it to update the dish counts
        if (refreshData) {
          await refreshData();
        }
          
          showPopup("Dish deleted successfully", { type: "success" });
      } catch (error) {
        console.error("Error deleting dish:", error);
          showPopup("Failed to delete the dish. Please try again.", { type: "error" });
      } finally {
        setIsDeletingDish(null);
      }
      },
      {
        title: "Delete Dish",
        confirmText: "Delete",
        cancelText: "Cancel"
    }
    );
  };

  const handleNewProductSubmit = async () => {
    const api = APISDK.getInstance();

    if (!selectedFile) {
      return;
    }

    try {
      const upload_data = await api.uploadFile(selectedFile);

      const newProduct: IDish = {
        id: Date.now().toString(),
        name: newProductName,
        price: Number(newPrice) || 0,
        picture: upload_data.url,
        is_available: isVisible,
        dish_category_id: newCategoryId,
        is_non_veg: isNewProductNonVeg,
        meta_data: {},
        created_at: new Date(),
        updated_at: new Date(),
      };

      const dish = await api.createDish(newProduct);
      
      // Update dishes state
      setDishes(dish);
      
      // If refreshData is provided, call it to update the tabs
      if (refreshData) {
        await refreshData();
      }
      
      closeNewProductModal();
    } catch (error) {
      console.error("Error adding new product:", error);
      // You might want to show an error message to the user here
    }
  };

  if(isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center justify-center w-16 h-16 border-4 border-gray-200 border-t-4 border-t-blue-500 rounded-full animate-spin">
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDishes.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow cursor-pointer relative group" onClick={() => {
            openEditModal(product)
          }}>
            <div className="h-48 overflow-hidden">
              <img src={product.picture} alt={product.name} className="w-full h-full object-cover" />
              {/* Delete button */}
              <button 
                onClick={(e) => handleDeleteDish(product.id, e)}
                disabled={isDeletingDish === product.id}
                className="absolute top-3 right-3 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 z-10"
                title="Delete dish"
              >
                {isDeletingDish === product.id ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Trash2 size={16} />
                )}
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mt-2">
                <h3 className="font-medium text-gray-700 text-lg">{product.name}</h3>
                <p className="text-black">₹ {product.price}</p>
              </div>
              <div className="mt-4">
                <button className="text-orange-500 text-sm flex items-center hover:underline" >
                  Advanced settings <ChevronRight size={16} />
                </button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-black">
                  {availability[product.id] ? "Available" : "Unavailable"}
                </span>
                <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={availability[product.id]}
                    onChange={() => toggleAvailability(product.id)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>
          </div>
        ))}

        <div className="border rounded-lg overflow-hidden border-dashed flex items-center justify-center h-full min-h-[300px]">
          <button 
            onClick={() => setIsNewProductModalOpen(true)}
            className="flex flex-col items-center text-black hover:text-orange-500 transition-colors"
          >
            <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center mb-2">
              <Plus size={24} />
            </div>
            <span className="text-sm">Add new product</span>
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && currentProduct && (
        <div 
          className="fixed inset-0 bg-black/50 text-gray-800 bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closeModal} // Add click handler to the backdrop
        >
          <div className="bg-white rounded-lg max-w-md w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <div className="h-48 overflow-hidden">
                <img 
                  src={currentProduct.picture} 
                  alt={currentProduct.name} 
                  className="w-full h-full object-cover"
                />
                <button 
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                  onClick={closeModal}
                >
                  <X size={20} className="text-gray-800" />
                </button>
                <div className="absolute top-4 left-4 bg-white rounded-lg px-4 py-2 shadow-md">
                  <span>Update Image</span>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center">
                    <label className="block text-gray-500">Product Name</label>
                    <button type="button" className="text-gray-400 hover:text-gray-600">
                      <Pencil size={16} />
                    </button>
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center">
                    <label className="block text-gray-500">Product Category</label>
                    <button type="button" className="text-gray-400 hover:text-gray-600">
                      <Pencil size={16} />
                    </button>
                  </div>
                  <input
                    type="text"
                    name="category"
                    value={categories.find(cat => cat.id === editedProduct.dish_category_id)?.name || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center">
                    <label className="block text-gray-500">Product Price</label>
                    <button type="button" className="text-gray-400 hover:text-gray-600">
                      <Pencil size={16} />
                    </button>
                  </div>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      ₹
                    </span>
                    <input
                      type="number"
                      name="price"
                      value={editedProduct.price}
                      onChange={handleInputChange}
                      className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (currentProduct) handleDeleteDish(currentProduct.id, e);
                  }}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 flex items-center"
                  disabled={isDeletingDish === currentProduct.id}
                >
                  {isDeletingDish === currentProduct.id ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Trash2 size={16} className="mr-2" />
                  )}
                  Delete Dish
                </button>
                
                <div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Product Modal */}
      {isNewProductModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closeNewProductModal} // Add click handler to the backdrop
        >
          <div 
            className="max-w-md w-full"
            onClick={(e) => e.stopPropagation()} // Prevent clicks on the modal from closing it
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4">
                <h2 className="font-bold text-gray-800 text-lg mb-4">Product Details</h2>
                
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm mb-1">Product Name</label>
                  <input 
                    type="text" 
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    className="w-full p-2 border text-gray-600 border-gray-300 rounded"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm mb-1">Category Name</label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-grow">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full p-2 border border-gray-300 rounded pr-8 text-gray-500 text-left flex justify-between items-center"
                      >
                        <span>{newCategoryName}</span>
                        <div className="text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6"/>
                          </svg>
                        </div>
                      </button>
                      
                      {isDropdownOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border text-gray-500 border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                          {categories.map((category) => (
                            <div
                              key={category.id}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setNewCategoryId(category.id);
                                setNewCategoryName(category.name);
                                setIsDropdownOpen(false);
                              }}
                            >
                              {category.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm px-2">
                      <span className="text-gray-600">Make it visible for the user</span>
                      <button 
                        type="button"
                        onClick={() => setIsVisible(!isVisible)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isVisible ? 'bg-orange-500' : 'bg-gray-200'}`}
                      >
                        <span 
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isVisible ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium text-gray-800 mb-1">Product Image</h3>
                  <p className="text-gray-500 text-xs mb-2">This will be the cover image for the users and admins</p>
                  
                  <div 
                    className="border-2 border-dashed border-gray-300  rounded-md p-6 flex flex-col items-center justify-center"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                      <ArrowUpToLine className="text-gray-400" size={20} />
                    </div>
                    
                    <p className="text-gray-400 text-sm text-center">
                      Drag and Drop the Images here or{' '}
                      <button 
                        className="text-blue-500"
                        onClick={handleSelectFile}
                      >
                        Select file
                      </button>
                    </p>
                    
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                  
                  <p className="text-gray-400 text-xs mt-2">
                    All formats Supported (PNG, JPG, JPEG, MP4 and MOV)
                  </p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm mb-1">Product Price(₹)</label>
                  <input 
                    type="text" 
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full p-2 border border-gray-300 text-gray-500 rounded"
                  />
                </div>

                {/* Non Veg CheckBox */}
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm mb-1">Is Non Veg?</label>
                  <input 
                    type="checkbox" 
                    checked={isNewProductNonVeg}
                    onChange={(e) => setIsNewProductNonVeg(e.target.checked)}
                    className="w-full p-2 border border-gray-300 text-gray-500 rounded"
                  />
                </div>
              </div>
              
              <div className="flex">
                <button 
                  onClick={closeNewProductModal}
                  className="flex-1 py-3 bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleNewProductSubmit}
                  className="flex-1 bg-orange-500 text-white py-3 font-medium hover:bg-orange-600 transition-colors"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
