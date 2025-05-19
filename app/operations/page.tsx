"use client"

import { useEffect, useState } from "react"
import { Breadcrumb } from "@/components/breadcrumb"
import { CategoryCards } from "@/components/operations/category-cards"
import { ItemTabs } from "@/components/operations/item-tabs"
import ProductGridWithModal from "@/components/operations/product-grid"
import { PlusCircle } from "lucide-react"
import { NewCategoryModal } from "../../components/operations/new-category-modal"
import { APISDK, IDish, IDishCategory } from "@/libs/api"

// Define the interface for category data used in tabs
interface ICategoryData {
  id: string;
  name: string;
  count: number;
  image: string;
}

export default function OperationsPage() {
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false)
  const [dishes, setDishes] = useState<IDish[]>([])
  const [categories, setCategories] = useState<IDishCategory[]>([]);
  const [tabs, setTabs] = useState<ICategoryData[]>([]);
  const [activeTab, setActiveTab] = useState("ALL ITEMS");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (token: string) => {
    try {
      const api = APISDK.getInstance(token);
      const categoriesData = await api.getDishCategories();
      const dishesData = await api.getDishes();
      
      // Calculate counts for each category
      const categoryCounts = categoriesData.map((category) => ({
        id: category.id,
        name: category.name,
        count: dishesData.filter(dish => dish.dish_category_id === category.id).length,
        image: category.picture || "/placeholder-image.png",
      }));

      // Create tabs with "ALL ITEMS" as the first tab
      const allItemsTab: ICategoryData = { 
        id: "all-items", 
        name: "ALL ITEMS", 
        count: dishesData.length, 
        image: "/menu-card.png" 
      };
      
      setCategories(categoriesData);
      setDishes(dishesData);
      setTabs([allItemsTab, ...categoryCounts]);
      
      // If the active tab no longer exists (category was deleted), reset to "ALL ITEMS"
      if (activeTab !== "ALL ITEMS" && !categoriesData.some(cat => cat.id === activeTab)) {
        setActiveTab("ALL ITEMS");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Function to refresh data after a new category or product is added
  const refreshData = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      await fetchData(token);
      setIsLoading(false);
    }
  }

  // Function to handle category deletion
  const handleCategoryDeleted = async () => {
    await refreshData();
    // Always switch to "ALL ITEMS" tab after a category is deleted
    setActiveTab("ALL ITEMS");
  };

  // Function to update tabs when a new dish is added without fetching from API
  const updateTabsAfterDishAdded = (newDish: IDish) => {
    setTabs(prevTabs => {
      return prevTabs.map(tab => {
        // Update the ALL ITEMS tab count
        if (tab.name === "ALL ITEMS") {
          return { ...tab, count: tab.count + 1 };
        }
        // Update the specific category tab count
        if (tab.id === newDish.dish_category_id) {
          return { ...tab, count: tab.count + 1 };
        }
        return tab;
      });
    });
  };

  // Function to handle dish deletion
  const handleDishDeleted = (dishId: string) => {
    // Get the category ID of the deleted dish
    const deletedDish = dishes.find(dish => dish.id === dishId);
    
    // Update dishes state by removing the deleted dish
    setDishes(prevDishes => prevDishes.filter(dish => dish.id !== dishId));
    
    // Update tabs to reflect the deleted dish
    if (deletedDish) {
      setTabs(prevTabs => {
        return prevTabs.map(tab => {
          // Update the ALL ITEMS tab count
          if (tab.name === "ALL ITEMS") {
            return { ...tab, count: tab.count - 1 };
          }
          // Update the specific category tab count
          if (tab.id === deletedDish.dish_category_id) {
            return { ...tab, count: tab.count - 1 };
          }
          return tab;
        });
      });
    }
  };

  // Initial data loading
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchData(token)
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  // Filter dishes based on the active tab
  const getFilteredDishes = () => {
    if (activeTab === "ALL ITEMS") {
      return dishes;
    } else {
      const selectedCategory = categories.find(category => category.id === activeTab);
      return selectedCategory 
        ? dishes.filter(dish => dish.dish_category_id === selectedCategory.id)
        : dishes;
    }
  };

  // Handle dish added event
  const handleDishAdded = (newDish: IDish) => {
    setDishes(prev => [...prev, newDish]);
    updateTabsAfterDishAdded(newDish);
  };

  return (
    <>
      <Breadcrumb items={["Cafe", "Operations"]} />
      <main className="flex-1 p-6 ">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-black mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            <h2 className="text-gray-700 text-lg font-medium">Menu</h2>
          </div>
          <button 
            onClick={() => setShowNewCategoryModal(true)}
            className="flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 font-medium hover:bg-gray-200 transition-colors"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            New Category
          </button>
        </div>

        <CategoryCards 
          tabs={tabs} 
          onCategoryDeleted={handleCategoryDeleted}
        />

        <div className="mt-8">
          <h3 className="text-lg text-gray-700 font-medium mb-4">Items</h3>
          <ItemTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
          <ProductGridWithModal 
            isLoading={isLoading} 
            dishes={getFilteredDishes()} 
            setDishes={handleDishAdded} 
            categories={categories} 
            activeTab={activeTab}
            refreshData={refreshData}
            onDishDeleted={handleDishDeleted}
          />
        </div>

        {showNewCategoryModal && (
          <NewCategoryModal 
            closeAction={() => setShowNewCategoryModal(false)} 
            categories={categories} 
            setCategories={setCategories}
            onCategoryAdded={refreshData} 
          />
        )}
      </main>
    </>
  )
}
