"use client";

import { useEffect, useState } from "react";
import { BillDetails } from "./bill-details";
import { TableLegend } from "./table-legend";
import { Plus } from "lucide-react";
import { NewTableModal } from "./new-table-modal";
import { APISDK, IDineInTable } from "@/libs/api";

export type TableStatus = "Active" | "Ready to Bill" | "To be Cleaned" | "Untouched";

export default function TableGridSystem({
  tables,
  setTables,
  tableStates,
}: Readonly<{
  tables: IDineInTable[],
  setTables: React.Dispatch<React.SetStateAction<IDineInTable[]>>,
  tableStates: IDineInTableStats[]
}>) {
  const statuses = [
    { name: "Active", color: "bg-green-400" },
    { name: "Ready to Bill", color: "bg-orange-400" },
    { name: "To be Cleaned", color: "bg-red-400" },
    { name: "Untouched", color: "bg-gray-300" },
  ];

  const [selectedTable, setSelectedTable] = useState("");
  const [showNewTableModal, setShowNewTableModal] = useState(false);

  const [bills, setBills] = useState<Record<string, Bill>>({});
  const [tableStatus, setTableStatus] = useState<{
    [tableId: string]: TableStatus;
  }>({});

  useEffect(() => {
    const newBills: Record<string, Bill> = {};
    tableStates.forEach((stat) => {
      setTableStatus((prev) => ({
        ...prev,
        [stat.table_number]: stat.status as TableStatus,
      }));
      newBills[stat.table_number] = {
        tableId: stat.table_number,
        items: stat.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal: stat.total_amount,
        discount: { percentage: 0, amount: 0 },
        gst: { percentage: 0, amount: 0 },
        grandTotal: stat.total_amount,
        checkout_id: stat.checkout_id ?? null,
        booking_id: stat.booking_id ?? null,
      };
    });
    setBills(newBills);
  }, [tableStates]);

  const updateTableCapacity = (tableId: string, capacity: number) => {
    setTables(prevTables =>
      prevTables.map(table =>
        table.id === tableId ? { ...table, capacity } : table
      )
    );
  };

  const handleAddTable = async (tableData: { name: string; capacity: number }) => {
    try {
      const api = APISDK.getInstance();
      const newTable = await api.createTable({
        table_number: tableData.name,
        capacity: tableData.capacity,
        meta_data: {
          status: 'Untouched',
          qr_code: `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=https://dine.jeevic.com/book/${tableData.name}`,
        }
      });
      setTables([...tables, newTable.data]);
    } catch (error) {
      console.error("Error adding table:", error);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-800">Floor Layout</h3>
        <button
          onClick={() => setShowNewTableModal(true)}
          className="flex items-center px-3 py-2 cursor-pointer bg-gray-200 text-gray-700 rounded-md hover:bg-orange-400"
        >
          <Plus size={18} className="mr-1" />
          Add Table
        </button>
      </div>

      <div className="grid grid-cols-[2fr,1fr] gap-4">
        <TableGrid 
          tables={tables} 
          selectedTable={selectedTable} 
          setSelectedTable={setSelectedTable} 
          statuses={statuses}
          tableStatus={tableStatus}
        />
        <TableLegend statuses={statuses} />
        <div className="mt-4">
          <div className="my-3 border-t pt-3 flex items-center text-sm text-gray-600">
            <span className="mr-2">Table Management</span>
            <span className="mx-2">•</span>
            <span className="font-medium mr-2">{selectedTable}</span>
          </div>
          <BillDetails 
            bill={bills[selectedTable]} 
            onUpdateCapacityAction={(capacity: number) => updateTableCapacity(selectedTable, capacity)}
            table={tables.find(t => t.table_number === selectedTable)}
          />
        </div>
      </div>

      <NewTableModal 
        isOpen={showNewTableModal}
        onCloseAction={() => setShowNewTableModal(false)}
        onAddTableAction={handleAddTable}
      />
    </div>
  );
}

function TableGrid({ 
  tables, 
  selectedTable, 
  setSelectedTable,
  tableStatus
}: Readonly<{ 
  tables: IDineInTable[], 
  selectedTable: string, 
  setSelectedTable: (id: string) => void,
  statuses: { name: string; color: string }[],
  tableStatus: { [tableId: string]: TableStatus }
}>) {
  const getTableColor = (status: TableStatus) => {
    switch (status) {
      case "Active":
        return "bg-green-400";
      case "Ready to Bill":
        return "bg-orange-400";
      case "To be Cleaned":
        return "bg-red-400";
      default:
        return "bg-gray-300";
    }
  };

  const renderTableSeats = (table: IDineInTable) => {
    const seats = [];
    
    // Add seats based on capacity
    if (table.capacity >= 1) {
      // Left seat is always present for 1 or more seats
      seats.push(
        <div key="left" className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-2.5 h-14 bg-gray-100 rounded-full"></div>
      );
    }
    
    if (table.capacity >= 2) {
      // Right seat for 2 or more seats
      seats.push(
        <div key="right" className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-2.5 h-14 bg-gray-100 rounded-full"></div>
      );
    }
    
    if (table.capacity >= 3) {
      // Top seat for 3 or more seats
      seats.push(
        <div key="top" className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-14 h-2.5 bg-gray-100 rounded-full"></div>
      );
    }
    
    if (table.capacity >= 4) {
      // Bottom seat for 4 seats
      seats.push(
        <div key="bottom" className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-14 h-2.5 bg-gray-100 rounded-full"></div>
      );
    }
    
    return seats;
  };

  return (
    <div className="grid grid-cols-3 gap-12">
      {tables.map((table) => {
        const isSelected = selectedTable === table.table_number;
        return (
          <div
            key={table.id}
            className="flex items-center  justify-center relative"
          >
            <div
              className={`relative w-20 h-20 ${isSelected ? "scale-110" : ""} transition-all m-2  duration-200`}
              onClick={() => setSelectedTable(table.table_number)}
            >
              {renderTableSeats(table)}
              
              {/* Table */}
              <div
                className={`
                  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  w-16 h-16 rounded-xl flex items-center justify-center
                  ${getTableColor(tableStatus[table.table_number])}
                  ${isSelected ? "border-2 border-blue-500" : ""}
                  cursor-pointer
                `}
              >
                <span className="font-medium text-white text-base">{table.table_number}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}