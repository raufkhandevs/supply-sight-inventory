import type { Product, ProductStatus } from "../types/graphql";

export const calculateProductStatus = (product: Product): ProductStatus => {
  if (product.stock > product.demand) {
    return { status: "Healthy", color: "green" };
  } else if (product.stock === product.demand) {
    return { status: "Low", color: "yellow" };
  } else {
    return { status: "Critical", color: "red" };
  }
};

export const calculateFillRate = (products: Product[]): number => {
  const totalDemand = products.reduce(
    (sum, product) => sum + product.demand,
    0
  );
  const totalFilled = products.reduce(
    (sum, product) => sum + Math.min(product.stock, product.demand),
    0
  );

  if (totalDemand === 0) return 0;
  return Math.round((totalFilled / totalDemand) * 100);
};
