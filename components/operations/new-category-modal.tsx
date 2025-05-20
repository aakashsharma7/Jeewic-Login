"use client"

import { useState, useRef } from 'react';
import { ArrowUpToLine, X } from 'lucide-react';
import { APISDK, IDishCategory } from '@/libs/api';

interface NewCategoryModalProps {
  closeAction: () => void;
  categories: IDishCategory[];
  setCategories: React.Dispatch<React.SetStateAction<IDishCategory[]>>;
  onCategoryAdded?: () => Promise<void>;
}

export function NewCategoryModal({closeAction, categories, setCategories, onCategoryAdded }: NewCategoryModalProps) {
  const [categoryName, setCategoryName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    const api = APISDK.getInstance();

    if (!selectedFile) {
      return;
    }

    const upload_data = await api.uploadFile(selectedFile);

    const cat_data = await api.createDishCategory(categoryName, upload_data.url);

    setCategories([...categories, cat_data]);

    if (onCategoryAdded) {
      await onCategoryAdded();
    }
  
    closeAction();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Category Details</h2>
            <button onClick={closeAction} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Category Name</label>
              <input 
                type="text" 
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full p-2 border text-gray-400 border-gray-300 rounded"
                placeholder="Enter category name"
              />
            </div>
            
            <div>
              <label className="block text-gray-600 text-sm mb-1">Category Image</label>
              <p className="text-gray-500 text-xs mb-2">This will be the cover image for the users and admins</p>
              
              <div 
                className="border-2 border-dashed border-gray-300 rounded p-6 flex flex-col items-center justify-center"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {selectedFile ? (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Selected file:</p>
                    <p className="text-sm font-medium text-gray-800">{selectedFile.name}</p>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                      <ArrowUpToLine className="text-gray-400" size={20} />
                    </div>
                    <p className="text-gray-400 text-sm text-center">
                      Drag and Drop the images here or{' '}
                      <button 
                        type="button"
                        className="text-blue-500 hover:text-blue-600"
                        onClick={handleSelectFile}
                      >
                        Select file
                      </button>
                    </p>
                  </>
                )}
                
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
          </div>
          
          <div className="mt-8 flex space-x-3">
            <button 
              onClick={closeAction}
              className="flex-1 py-2 border border-gray-300 rounded text-gray-800 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="flex-1 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Add Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}