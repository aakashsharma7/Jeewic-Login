"use client"

import { Trash2 } from "lucide-react"
import { useState } from "react"
import { APISDK } from "@/libs/api"
import { usePopup } from "@/context/popup-context"

export function CategoryCards(
  {
    tabs,
    onCategoryDeleted
  }: Readonly<{
    tabs: ICategoryData[];
    onCategoryDeleted?: () => Promise<void>;
  }>
) {
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const { showPopup, showConfirm } = usePopup();

    if (!tabs) {
        return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="flex items-center justify-center w-16 h-16 border-4 border-gray-200 border-t-4 border-t-blue-500 rounded-full animate-spin">
              Loading...
            </div>
          </div>
        );
    }

    const handleDeleteCategory = async (categoryId: string, e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent card click event
      
      if (categoryId === "all-items") {
        showPopup("Cannot delete 'All Items' category", { type: "warning" });
        return;
      }
      
      try {
        // Find out how many dishes are in this category
        const token = localStorage.getItem("access_token");
        const api = APISDK.getInstance(token || "");
        const allDishes = await api.getDishes();
        const dishesToDelete = allDishes.filter(dish => dish.dish_category_id === categoryId);
        
        // Get category name
        const category = tabs.find(tab => tab.id === categoryId);
        const categoryName = category ? category.name : "this category";
        
        // Ask for confirmation with dish count
        const confirmMessage = `Are you sure you want to delete "${categoryName}"? This will also delete ${dishesToDelete.length} dish${dishesToDelete.length !== 1 ? 'es' : ''} in this category.`;
        
        showConfirm(
          confirmMessage,
          async () => {
          setIsDeleting(categoryId);
          
          // Delete all dishes in this category
          const deletePromises = dishesToDelete.map(dish => api.deleteDish(dish.id));
          await Promise.all(deletePromises);
          
          // Then delete the category itself
          await api.deleteDishCategory(categoryId);
          
          console.log(`Deleted category ${categoryId} and ${dishesToDelete.length} associated dishes`);
            
            showPopup(`Successfully deleted "${categoryName}" and ${dishesToDelete.length} associated dishes`, { 
              type: "success" 
            });
          
          // Call the callback to refresh data
          if (onCategoryDeleted) {
            await onCategoryDeleted();
          }
          },
          {
            title: "Delete Category",
            confirmText: "Delete",
            cancelText: "Cancel"
        }
        );
      } catch (error) {
        console.error("Error deleting category:", error);
        showPopup("Failed to delete category. Please try again.", { type: "error" });
      } finally {
        setIsDeleting(null);
      }
    };
  
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {tabs.map((category) => (
          <div key={category.id} className="relative overflow-hidden rounded-lg cursor-pointer group">
            <img
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0  flex flex-col justify-end p-3">
              <h3 className="text-white font-bold text-lg">{category.name}</h3>
              <div className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-xs absolute top-3 right-3">
                {category.count}
              </div>
              
              {/* Delete button - only show for non-ALL ITEMS categories */}
              {category.id !== "all-items" && (
                <button 
                  onClick={(e) => handleDeleteCategory(category.id, e)}
                  disabled={isDeleting === category.id}
                  className="absolute top-3 left-3 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                  title="Delete category"
                >
                  {isDeleting === category.id ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }
  