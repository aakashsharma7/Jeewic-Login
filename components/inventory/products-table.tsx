"use client"

import { useState } from "react"
import { Search,  MoreVertical, PlusCircle, StarIcon } from "lucide-react"
import { NewProductModal } from "./new-product-modal"
import { NewCategoryModal } from "./new-category-modal"

export function ProductsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("All")
  const [showNewProductModal, setShowNewProductModal] = useState(false)
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false)
  
  // Initial products data
  const initialProducts = [
    {
      id: 1,
      name: "Bluetooth Earphones-IP...",
      category: "Electronics",
      price: 2000,
      quantity: 40,
      rating: 4.6,
      reviews: 32,
      visible: true,
      image: "https://i.pinimg.com/474x/15/20/b2/1520b25e509ef0c742551f7aa06a6356.jpg?height=60&width=60&text=Earphones",
    },
    {
      id: 2,
      name: "N607 Rechargeable Coo...",
      category: "Electronics",
      price: 2000,
      quantity: 40,
      rating: 4.6,
      reviews: 32,
      visible: true,
      image: "https://i.pinimg.com/474x/15/20/b2/1520b25e509ef0c742551f7aa06a6356.jpg?height=60&width=60&text=N607",
    },
    {
      id: 3,
      name: "Remax fast Compatible ...",
      category: "Electronics",
      price: 2000,
      quantity: 40,
      rating: 4.6,
      reviews: 32,
      visible: true,
      image: "https://i.pinimg.com/474x/15/20/b2/1520b25e509ef0c742551f7aa06a6356.jpg?height=60&width=60&text=Remax",
    },
    {
      id: 4,
      name: "Remax CozyPods W7N ...",
      category: "Electronics",
      price: 2000,
      quantity: 40,
      rating: 4.6,
      reviews: 32,
      visible: true,
      image: "https://i.pinimg.com/474x/15/20/b2/1520b25e509ef0c742551f7aa06a6356.jpg?height=60&width=60&text=CozyPods",
    },
    {
      id: 5,
      name: "Remax CozyPods w10N...",
      category: "Electronics",
      price: 2000,
      quantity: 40,
      rating: 4.6,
      reviews: 32,
      visible: true,
      image: "https://i.pinimg.com/474x/15/20/b2/1520b25e509ef0c742551f7aa06a6356.jpg?height=60&width=60&text=w10N",
    },
    {
      id: 6,
      name: "Remax Fast Charging W...",
      category: "Electronics",
      price: 2000,
      quantity: 40,
      rating: 4.6,
      reviews: 32,
      visible: true,
      image: "https://i.pinimg.com/474x/15/20/b2/1520b25e509ef0c742551f7aa06a6356.jpg?height=60&width=60&text=Charging",
    },
    {
      id: 7,
      name: "Remax RP-U107 Mecha...",
      category: "Electronics",
      price: 2000,
      quantity: 40,
      rating: 4.6,
      reviews: 32,
      visible: true,
      image: "https://i.pinimg.com/474x/15/20/b2/1520b25e509ef0c742551f7aa06a6356.jpg?height=60&width=60&text=RP-U107",
    },
    {
      id: 8,
      name: "Xundd multifunctionalM...",
      category: "Electronics",
      price: 2000,
      quantity: 40,
      rating: 4.6,
      reviews: 32,
      visible: true,
      image: "https://i.pinimg.com/474x/15/20/b2/1520b25e509ef0c742551f7aa06a6356.jpg?height=60&width=60&text=Xundd",
    },
    {
      id: 9,
      name: "Xundd Wireless Car Ch...",
      category: "Electronics",
      price: 2000,
      quantity: 40,
      rating: 4.6,
      reviews: 32,
      visible: true,
      image: "https://i.pinimg.com/474x/15/20/b2/1520b25e509ef0c742551f7aa06a6356.jpg?height=60&width=60&text=Wireless",
    },
    {
      id: 10,
      name: "Xundd XDCH-055 67W...",
      category: "Electronics",
      price: 2000,
      quantity: 40,
      rating: 4.6,
      reviews: 32,
      visible: true,
      image: "https://i.pinimg.com/474x/15/20/b2/1520b25e509ef0c742551f7aa06a6356.jpg?height=60&width=60&text=XDCH-055",
    },
  ]
  
  const [products, setProducts] = useState(initialProducts)

  const tabs = [
    { id: "All", label: "All", count: 75 },
    { id: "Electronics", label: "Electronics", count: 46 },
    { id: "Chocolates", label: "Chocolates", count: 42 },
    { id: "Ramen", label: "Ramen", count: 37 },
    { id: "Snacks", label: "Snacks", count: 26 },
    { id: "Drinks", label: "Drinks", count: 43 },
  ]

  const filteredProducts = activeTab === "All" 
    ? products 
    : products.filter((product) => product.category === activeTab)

  const handleVisibilityToggle = (productId: number) => {
    setProducts(currentProducts =>
      currentProducts.map(product =>
        product.id === productId 
          ? { ...product, visible: !product.visible }
          : product
      )
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-medium text-gray-800">All Reservations</h2>
          <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur</p>
        </div>
        <div className="flex gap-3">
        <button
            onClick={() => setShowNewProductModal(true)}
            className="px-4 py-2 bg-orange-500 text-white rounded-md flex gap-2 hover:bg-orange-600"
          >
            <PlusCircle />
            New Product
          </button>
          <button
            onClick={() => setShowNewCategoryModal(true)}
            className="px-4 py-2 border rounded-md text-gray-800 flex gap-2 hover:bg-gray-50"
          >
            <PlusCircle />
            New Category
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a Product name"
            className="pl-10 text-gray-700 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      <div className="border-b mb-4">
        <div className="flex space-x-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`pb-2 px-1 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-500 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label} <span className="ml-1 text-xs bg-gray-100 px-1.5 py-0.5 rounded-md">{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ratings & Reviews
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 mr-3">
                      <img
                        className="h-10 w-10 rounded-md object-cover"
                        src={product.image || "https://i.pinimg.com/474x/15/20/b2/1520b25e509ef0c742551f7aa06a6356.jpg"}
                        alt={product.name}
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">#{product.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">₹ {product.price.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.quantity} Uts.</div>
                </td>
                <td className="px-6 py-4  whitespace-nowrap">
                  <div className="flex space-x-2  items-center">
                    <div className="bg-gray-200 flex gap-1 p-1 rounded-3xl pl-2">
                      <StarIcon className="h-4 w-4  text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-900 mr-2">{product.rating}/5</span>
                    </div>
                    <span className="text-sm text-gray-500">{product.reviews} Reviews</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center">
                    <div className="mr-4 flex items-center">
                      <span className="mr-2 text-sm text-gray-500">Visibility</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={product.visible}
                          onChange={() => handleVisibilityToggle(product.id)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                          peer-focus:ring-orange-300 rounded-full peer 
                          peer-checked:after:translate-x-full peer-checked:after:border-white 
                          after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                          after:bg-white after:border-gray-300 after:border after:rounded-full 
                          after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500">
                        </div>
                      </label>
                    </div>
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-6 py-3 flex items-center justify-between border-t">
          <div className="text-sm text-gray-700">Showing 10 of 46 Results</div>
          <div className="flex items-center">
            <span className="text-sm text-gray-700 mr-3">Page 1 of 5</span>
            <div className="flex">
              <button className="px-2 py-1 border rounded-l-md bg-gray-100 text-gray-600">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="px-2 py-1 border-t border-b border-r rounded-r-md bg-gray-100 text-gray-600">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showNewProductModal && <NewProductModal onClose={() => setShowNewProductModal(false)} />}

      {showNewCategoryModal && <NewCategoryModal onClose={() => setShowNewCategoryModal(false)} />}
    </div>
  )
}
