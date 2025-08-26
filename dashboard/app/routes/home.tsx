import * as React from "react";
import type { Route } from "./+types/home";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { TopBar } from "../components/layout/TopBar";
import { KPICards } from "../components/dashboard/KPICards";
import { StockDemandChart } from "../components/dashboard/StockDemandChart";
import { Filters } from "../components/dashboard/Filters";
import { ProductsTable } from "../components/dashboard/ProductsTable";
import { ProductDetailDrawer } from "../components/dashboard/ProductDetailDrawer";
import { Toast } from "../components/ui/toast";
import { useProducts, useWarehouses, useKPIs } from "../hooks";
import { calculateFillRate } from "../utils/product-status";
import type { Product } from "../types/graphql";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "SupplySight Dashboard" },
    { name: "description", content: "Daily Inventory Dashboard for SupplySight" },
  ];
}

export default function Home() {
  const [selectedRange, setSelectedRange] = React.useState("7d");
  const [search, setSearch] = React.useState("");
  const [selectedWarehouse, setSelectedWarehouse] = React.useState("all");
  const [selectedStatus, setSelectedStatus] = React.useState("All");
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [toast, setToast] = React.useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  // Fetch data using our custom hooks
  const { products, loading: productsLoading, updateDemand, transferStock } = useProducts({
    search: search || undefined,
    status: selectedStatus === "All" ? undefined : selectedStatus,
    warehouse: selectedWarehouse === "all" ? undefined : selectedWarehouse,
  });

  const { warehouses, loading: warehousesLoading } = useWarehouses();
  const { kpis, loading: kpisLoading } = useKPIs(selectedRange);

  // Calculate KPIs
  const totalStock = products.reduce((sum: number, product: Product) => sum + product.stock, 0);
  const totalDemand = products.reduce((sum: number, product: Product) => sum + product.demand, 0);
  const fillRate = calculateFillRate(products);

  const handleProductRowClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
  };

  const handleUpdateDemand = async (id: string, demand: number) => {
    try {
      await updateDemand({ id, demand });
      setToast({
        message: "Demand updated successfully!",
        type: "success",
        isVisible: true,
      });
    } catch (error) {
      console.error("Failed to update demand:", error);
      setToast({
        message: "Failed to update demand. Please try again.",
        type: "error",
        isVisible: true,
      });
    }
  };

  const handleTransferStock = async (id: string, from: string, to: string, qty: number) => {
    try {
      await transferStock({ id, from, to, qty });
      setToast({
        message: "Stock transferred successfully!",
        type: "success",
        isVisible: true,
      });
    } catch (error) {
      console.error("Failed to transfer stock:", error);
      setToast({
        message: "Failed to transfer stock. Please try again.",
        type: "error",
        isVisible: true,
      });
    }
  };

  return (
    <DashboardLayout>
      <TopBar selectedRange={selectedRange} onRangeChange={setSelectedRange} />

      <div className="pt-6">
        <KPICards
          totalStock={totalStock}
          totalDemand={totalDemand}
          fillRate={fillRate}
          loading={productsLoading}
        />

        <StockDemandChart kpis={kpis} loading={kpisLoading} />

        <Filters
          search={search}
          onSearchChange={setSearch}
          selectedWarehouse={selectedWarehouse}
          onWarehouseChange={setSelectedWarehouse}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          warehouses={warehouses}
          loading={warehousesLoading}
        />

        <ProductsTable
          products={products}
          loading={productsLoading}
          onRowClick={handleProductRowClick}
        />
      </div>

                        {/* Product Detail Drawer */}
                  {isDrawerOpen && (
                    <div 
                      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                      onClick={handleCloseDrawer}
                    />
                  )}
      <ProductDetailDrawer
        product={selectedProduct}
        warehouses={warehouses}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onUpdateDemand={handleUpdateDemand}
        onTransferStock={handleTransferStock}
      />

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </DashboardLayout>
  );
}
