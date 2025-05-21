"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

interface NewTableModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  onAddTableAction: (tableData: { name: string; capacity: number }) => Promise<void>;
}

export function NewTableModal({ isOpen, onCloseAction, onAddTableAction }: NewTableModalProps) {
  const [tableName, setTableName] = useState("");
  const [capacity, setCapacity] = useState(4);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onCloseAction();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onCloseAction]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddTableAction({ name: tableName, capacity });
    onCloseAction();
    setTableName("");
    setCapacity(4);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg text-black font-medium">Add New Table</h3>
            <button onClick={onCloseAction} className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Table ID
                </label>
                <input
                  type="text"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  placeholder="e.g. EX09"
                  className="w-full px-3 py-2 border rounded-md placeholder:text-gray-400 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Seating Capacity
                </label>
                <select
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none text-gray-600 focus:ring-2 focus:ring-orange-500"
                >
                  <option value={1}>1 Seat</option>
                  <option value={2}>2 Seats</option>
                  <option value={3}>3 Seats</option>
                  <option value={4}>4 Seats</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={onCloseAction}
                  className="px-4 py-2 border rounded-md cursor-pointer text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 cursor-pointer text-white rounded-md hover:bg-orange-600"
                >
                  Add Table
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}