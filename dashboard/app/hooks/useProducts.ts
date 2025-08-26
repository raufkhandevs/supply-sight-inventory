import { useQuery, useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import type {
  Product,
  ProductsQueryVariables,
  UpdateDemandInput,
  TransferStockInput,
} from "../types/graphql";

// GraphQL Queries
const GET_PRODUCTS = gql`
  query GetProducts($search: String, $status: String, $warehouse: String) {
    products(search: $search, status: $status, warehouse: $warehouse) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;

const UPDATE_DEMAND = gql`
  mutation UpdateDemand($id: ID!, $demand: Int!) {
    updateDemand(id: $id, demand: $demand) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;

const TRANSFER_STOCK = gql`
  mutation TransferStock($id: ID!, $from: String!, $to: String!, $qty: Int!) {
    transferStock(id: $id, from: $from, to: $to, qty: $qty) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;

export const useProducts = (variables: ProductsQueryVariables = {}) => {
  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const [updateDemand] = useMutation(UPDATE_DEMAND);
  const [transferStock] = useMutation(TRANSFER_STOCK);

  const products = (data as { products?: Product[] })?.products || [];

  const handleUpdateDemand = async (
    input: UpdateDemandInput
  ): Promise<Product> => {
    try {
      const result = await updateDemand({
        variables: input,
        update: (cache, { data: mutationData }) => {
          // Update cache with new data
          cache.modify({
            fields: {
              products(existingProducts = []) {
                return existingProducts.map((product: Product) =>
                  product.id === input.id
                    ? { ...product, demand: input.demand }
                    : product
                );
              },
            },
          });
        },
      });

      return (result.data as { updateDemand?: Product })
        ?.updateDemand as Product;
    } catch (error) {
      console.error("Error updating demand:", error);
      throw error;
    }
  };

  const handleTransferStock = async (
    input: TransferStockInput
  ): Promise<Product> => {
    try {
      const result = await transferStock({
        variables: input,
        update: (cache, { data: mutationData }) => {
          // Update cache with new data
          cache.modify({
            fields: {
              products(existingProducts = []) {
                return existingProducts.map((product: Product) =>
                  product.id === input.id
                    ? { ...product, warehouse: input.to }
                    : product
                );
              },
            },
          });
        },
      });

      return (result.data as { transferStock?: Product })
        ?.transferStock as Product;
    } catch (error) {
      console.error("Error transferring stock:", error);
      throw error;
    }
  };

  return {
    products,
    loading,
    error,
    refetch,
    updateDemand: handleUpdateDemand,
    transferStock: handleTransferStock,
  };
};
