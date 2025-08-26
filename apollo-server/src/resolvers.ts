import type { Product, Warehouse, KPI } from "./types";
import { products, warehouses, generateKPIs } from "./data";

export const resolvers = {
  Query: {
    products: (
      _: any,
      {
        search,
        status,
        warehouse,
      }: { search?: string; status?: string; warehouse?: string }
    ) => {
      let filteredProducts = [...products];

      // Filter by search (name, SKU, or ID)
      if (search) {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchLower) ||
            product.sku.toLowerCase().includes(searchLower) ||
            product.id.toLowerCase().includes(searchLower)
        );
      }

      // Filter by warehouse
      if (warehouse) {
        filteredProducts = filteredProducts.filter(
          (product) => product.warehouse === warehouse
        );
      }

      // Filter by status
      if (status && status !== "All") {
        filteredProducts = filteredProducts.filter((product) => {
          if (status === "Healthy") return product.stock > product.demand;
          if (status === "Low") return product.stock === product.demand;
          if (status === "Critical") return product.stock < product.demand;
          return true;
        });
      }

      return filteredProducts;
    },

    warehouses: () => {
      return warehouses;
    },

    kpis: (_: any, { range }: { range: string }) => {
      return generateKPIs(range);
    },
  },

  Mutation: {
    updateDemand: (_: any, { id, demand }: { id: string; demand: number }) => {
      const productIndex = products.findIndex((p) => p.id === id);
      if (productIndex === -1) {
        throw new Error(`Product with ID ${id} not found`);
      }

      if (demand < 0) {
        throw new Error("Demand cannot be negative");
      }

      products[productIndex].demand = demand;
      return products[productIndex];
    },

    transferStock: (
      _: any,
      {
        id,
        from,
        to,
        qty,
      }: { id: string; from: string; to: string; qty: number }
    ) => {
      const productIndex = products.findIndex((p) => p.id === id);
      if (productIndex === -1) {
        throw new Error(`Product with ID ${id} not found`);
      }

      const product = products[productIndex];

      if (product.warehouse !== from) {
        throw new Error(`Product is not in warehouse ${from}`);
      }

      if (qty <= 0) {
        throw new Error("Transfer quantity must be positive");
      }

      if (qty > product.stock) {
        throw new Error("Insufficient stock for transfer");
      }

      // Update product warehouse and stock
      product.warehouse = to;
      product.stock -= qty;

      return product;
    },
  },
};
