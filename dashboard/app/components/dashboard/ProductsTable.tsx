import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Package, MapPin, Hash } from "lucide-react";
import type { Product } from "../../types/graphql";
import { calculateProductStatus } from "../../utils/product-status";

interface ProductsTableProps {
  products: Product[];
  loading?: boolean;
  onRowClick: (product: Product) => void;
}

export function ProductsTable({ products, loading = false, onRowClick }: ProductsTableProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const getStatusBadge = (product: Product) => {
    const status = calculateProductStatus(product);
    const variant = status.color === "green" ? "default" : status.color === "yellow" ? "secondary" : "destructive";
    
    return (
      <Badge variant={variant} className="font-medium">
        {status.status}
      </Badge>
    );
  };

  const getRowStyle = (product: Product) => {
    const status = calculateProductStatus(product);
    if (status.status === "Critical") {
      return "bg-red-50/80 hover:bg-red-100/80 cursor-pointer transition-colors";
    }
    return "hover:bg-slate-50/80 cursor-pointer transition-colors";
  };

  if (loading) {
    return (
      <div className="bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6">
        <div className="h-8 bg-slate-200 rounded w-48 mb-4 animate-pulse" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-slate-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 text-center">
        <Package className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-600 mb-2">No products found</h3>
        <p className="text-slate-500">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-700">Products Inventory</h3>
        <div className="text-sm text-slate-500">
          Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} products
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200">
              <TableHead className="text-slate-700 font-semibold">Product</TableHead>
              <TableHead className="text-slate-700 font-semibold">SKU</TableHead>
              <TableHead className="text-slate-700 font-semibold">Warehouse</TableHead>
              <TableHead className="text-slate-700 font-semibold text-right">Stock</TableHead>
              <TableHead className="text-slate-700 font-semibold text-right">Demand</TableHead>
              <TableHead className="text-slate-700 font-semibold text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProducts.map((product) => (
              <TableRow
                key={product.id}
                className={getRowStyle(product)}
                onClick={() => onRowClick(product)}
              >
                <TableCell className="font-medium text-slate-900">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                      <Package className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-xs text-slate-500">ID: {product.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm text-slate-600">
                  <div className="flex items-center space-x-1">
                    <Hash className="w-3 h-3 text-slate-400" />
                    <span>{product.sku}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{product.warehouse}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold text-blue-600">
                  {product.stock.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-semibold text-orange-600">
                  {product.demand.toLocaleString()}
                </TableCell>
                <TableCell className="text-center">
                  {getStatusBadge(product)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
          <div className="text-sm text-slate-500">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="border-slate-200 hover:bg-slate-50"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="border-slate-200 hover:bg-slate-50"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
