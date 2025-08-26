import * as React from "react";
import type { Route } from "./+types/home";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { TopBar } from "../components/layout/TopBar";
import { KPICards } from "../components/dashboard/KPICards";
import { StockDemandChart } from "../components/dashboard/StockDemandChart";
import { Filters } from "../components/dashboard/Filters";
import { ProductsTable } from "../components/dashboard/ProductsTable";
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

  // Fetch data using our custom hooks
  const { products, loading: productsLoading } = useProducts({
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
    // TODO: Open drawer with product details
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
    </DashboardLayout>
  );
}
