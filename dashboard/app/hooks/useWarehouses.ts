import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import type { Warehouse } from "../types/graphql";

const GET_WAREHOUSES = gql`
  query GetWarehouses {
    warehouses {
      code
      name
      city
      country
    }
  }
`;

export const useWarehouses = () => {
  const { data, loading, error } = useQuery(GET_WAREHOUSES, {
    fetchPolicy: "cache-first",
  });

  const warehouses = (data as { warehouses?: Warehouse[] })?.warehouses || [];

  return {
    warehouses,
    loading,
    error,
  };
};
