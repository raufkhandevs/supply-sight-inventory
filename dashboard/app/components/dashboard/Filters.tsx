import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Search, Filter } from "lucide-react";
import type { Warehouse } from "../../types/graphql";

interface FiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedWarehouse: string;
  onWarehouseChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  warehouses: Warehouse[];
  loading?: boolean;
}

export function Filters({
  search,
  onSearchChange,
  selectedWarehouse,
  onWarehouseChange,
  selectedStatus,
  onStatusChange,
  warehouses,
  loading = false,
}: FiltersProps) {
  const statusOptions = [
    { value: "All", label: "All Statuses" },
    { value: "Healthy", label: "🟢 Healthy" },
    { value: "Low", label: "🟡 Low" },
    { value: "Critical", label: "🔴 Critical" },
  ];

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="w-5 h-5 text-slate-600" />
        <h3 className="text-lg font-semibold text-slate-700">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Search Products</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by name, SKU, or ID..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-white/80 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Warehouse Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Warehouse</label>
          <Select value={selectedWarehouse} onValueChange={onWarehouseChange} disabled={loading}>
            <SelectTrigger className="bg-white/80 border-slate-200 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="All Warehouses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Warehouses</SelectItem>
              {warehouses.map((warehouse) => (
                <SelectItem key={warehouse.code} value={warehouse.code}>
                  {warehouse.name} ({warehouse.city})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Status</label>
          <Select value={selectedStatus} onValueChange={onStatusChange} disabled={loading}>
            <SelectTrigger className="bg-white/80 border-slate-200 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
