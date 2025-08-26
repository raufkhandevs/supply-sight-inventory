import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import type { KPI, KPIsQueryVariables } from "../types/graphql";

const GET_KPIS = gql`
  query GetKPIs($range: String!) {
    kpis(range: $range) {
      date
      stock
      demand
    }
  }
`;

export const useKPIs = (range: string = "7d") => {
  const { data, loading, error, refetch } = useQuery(GET_KPIS, {
    variables: { range },
    fetchPolicy: "cache-and-network",
  });

  const kpis = data?.kpis || [];

  const refetchKPIs = (newRange: string) => {
    refetch({ range: newRange });
  };

  return {
    kpis,
    loading,
    error,
    refetch: refetchKPIs,
  };
};
