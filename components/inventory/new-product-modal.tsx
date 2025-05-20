"use client"

import { useState } from "react"
import { X, Upload, ChevronDown, ChevronUp } from "lucide-react"

// Define interface for component props
interface NewProductModalProps {
  onClose: () => void;
}

// Define interface for product variant
interface ProductVariant {
  name: string;
  description: string;
  price: string;
  slashedPrice: string;
}

export function NewProductModal({ onClose }: NewProductModalProps) {
  const [productName, setProductName] = useState<string>("Macbook Air M4 - 16GB RAM/512 GB SSD")
  const [productDescription, setProductDescription] = useState<string>(
    "The MacBook M4 features Apple's latest M4 chip with a 10-core CPU and 12-core GPU, delivering next-gen performance, enhanced thermal efficiency, ProMotion display support, and unmatched battery life for demanding workflows.",
  )
  const [productPrice, setProductPrice] = useState<string>("01,20,000")
  const [slashedPrice, setSlashedPrice] = useState<string>("01,42,000")
  const [stockQty, setStockQty] = useState<string>("20")
  const [productCategory, setProductCategory] = useState<string>("Electronics")
  const [subCategory, setSubCategory] = useState<string>("Sub-Category")
  const [productVisibility, setProductVisibility] = useState<boolean>(true)
  const [showVariants, setShowVariants] = useState<boolean>(false)
  const [variants, setVariants] = useState<ProductVariant[]>([
    {
      name: "Macbook Air M4 - 24 RAM/512 GB SSD",
      description:
        "The MacBook M4 features Apple's latest M4 chip with a 10-core CPU and 12-core GPU, delivering next-gen performance, enhanced thermal efficiency, ProMotion display support, and unmatched battery life for demanding workflows.",
      price: "01,20,000",
      slashedPrice: "01,42,000",
    },
  ])

  const productImages: string[] = [
    "https://i.pinimg.com/474x/15/20/b2/1520b25e509ef0c742551f7aa06a6356.jpg?height=60&width=60&text=MacBook+1",
    "https://i.pinimg.com/474x/15/20/b2/1520b25e509ef0c742551f7aa06a6356.jpg?height=60&width=60&text=MacBook+2",
    "https://i.pinimg.com/474x/15/20/b2/1520b25e509ef0c742551f7aa06a6356.jpg?height=60&width=60&text=MacBook+3",
    "https://i.pinimg.com/474x/15/20/b2/1520b25e509ef0c742551f7aa06a6356.jpg?height=60&width=60&text=MacBook+4",
  ]

  const handleAddVariant = (): void => {
    setVariants([
      ...variants,
      {
        name: "",
        description: "",
        price: "",
        slashedPrice: "",
      },
    ])
  }

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Product Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Product Description</label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-gray-800 min-h-[100px]"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Product Images</h3>
              <p className="text-sm text-gray-500 mb-2">Lorem Dolor Sit Amet, Lorem Ipsum</p>

              <div className="border-2 border-dashed rounded-md p-8 mb-4 flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-1">
                  Drag and Drop the Images here or <span className="text-blue-500">Select file</span>
                </p>
                <p className="text-xs text-gray-500">Formats Supported: PNG, JPG, JPEG, MP4 and MOV</p>
              </div>

              <div className="flex space-x-2 mb-1">
                {productImages.map((image, index) => (
                  <div key={index} className="w-16 h-16 border rounded-md overflow-hidden">
                    <img
                      src={image || "https://i.pinimg.com/474x/15/20/b2/1520b25e509ef0c742551f7aa06a6356.jpg"}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500">First Image will be the cover</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Product Price(₹)</label>
                <input
                  type="text"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Slashed Price(Optional)</label>
                <input
                  type="text"
                  value={slashedPrice}
                  onChange={(e) => setSlashedPrice(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-gray-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Select the Product Category</label>
                <div className="relative">
                  <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-gray-800 appearance-none"
                  >
                    <option>Electronics</option>
                    <option>Chocolates</option>
                    <option>Ramen</option>
                    <option>Snacks</option>
                    <option>Drinks</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Select the Sub-Category(Optional)</label>
                <div className="relative">
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-gray-800 appearance-none"
                  >
                    <option>Sub-Category</option>
                    <option>Laptops</option>
                    <option>Phones</option>
                    <option>Accessories</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Enter the Stock Qty.</label>
                <input
                  type="text"
                  value={stockQty}
                  onChange={(e) => setStockQty(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-gray-800"
                />
              </div>
              <div className="flex items-center">
                <label className="block text-sm text-gray-600 mr-4">Product Visibility</label>
                <div className="relative inline-flex items-center cursor-pointer">
                  <div className={`w-10 h-5 rounded-full ${productVisibility ? "bg-orange-500" : "bg-gray-200"}`}>
                    <div
                      className={`absolute w-3.5 h-3.5 bg-white rounded-full top-[3px] transition-transform ${
                        productVisibility ? "translate-x-[22px]" : "translate-x-[3px]"
                      }`}
                      onClick={() => setProductVisibility(!productVisibility)}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                className="flex items-center text-gray-800 font-medium"
                onClick={() => setShowVariants(!showVariants)}
              >
                Variants(If any) {showVariants ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
              </button>

              {showVariants && (
                <div className="mt-4 space-y-6">
                  {variants.map((variant, index) => (
                    <div key={index} className="border-t pt-4 space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Variant Name</label>
                        <input
                          type="text"
                          value={variant.name}
                          onChange={(e) => {
                            const newVariants = [...variants]
                            newVariants[index].name = e.target.value
                            setVariants(newVariants)
                          }}
                          className="w-full border rounded-md px-3 py-2 text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Variant Description</label>
                        <textarea
                          value={variant.description}
                          onChange={(e) => {
                            const newVariants = [...variants]
                            newVariants[index].description = e.target.value
                            setVariants(newVariants)
                          }}
                          className="w-full border rounded-md px-3 py-2 text-gray-800 min-h-[100px]"
                        />
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Product Images</h3>
                        <p className="text-sm text-gray-500 mb-2">Lorem Dolor Sit Amet, Lorem Ipsum</p>

                        <div className="border-2 border-dashed rounded-md p-8 mb-4 flex flex-col items-center justify-center">
                          <Upload className="h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600 mb-1">
                            Drag and Drop the Images here or <span className="text-blue-500">Select file</span>
                          </p>
                          <p className="text-xs text-gray-500">Formats Supported: PNG, JPG, JPEG, MP4 and MOV</p>
                        </div>

                        <div className="flex space-x-2 mb-1">
                          {productImages.map((image, imgIndex) => (
                            <div key={imgIndex} className="w-16 h-16 border rounded-md overflow-hidden">
                              <img
                                src={image || "https://i.pinimg.com/474x/15/20/b2/1520b25e509ef0c742551f7aa06a6356.jpg"}
                                alt={`Product ${imgIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">First Image will be the cover</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Product Price(₹)</label>
                          <input
                            type="text"
                            value={variant.price}
                            onChange={(e) => {
                              const newVariants = [...variants]
                              newVariants[index].price = e.target.value
                              setVariants(newVariants)
                            }}
                            className="w-full border rounded-md px-3 py-2 text-gray-800"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Slashed Price(Optional)</label>
                          <input
                            type="text"
                            value={variant.slashedPrice}
                            onChange={(e) => {
                              const newVariants = [...variants]
                              newVariants[index].slashedPrice = e.target.value
                              setVariants(newVariants)
                            }}
                            className="w-full border rounded-md px-3 py-2 text-gray-800"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    className="w-full py-3 border border-gray-300 rounded-md text-gray-800 hover:bg-gray-50 flex items-center justify-center"
                    onClick={handleAddVariant}
                  >
                    Add Another Variant
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <button className="w-full py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600" onClick={onClose}>
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}