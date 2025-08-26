export interface Warehouse {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  warehouse: string;
  stock: number;
  demand: number;
}

export interface KPI {
  date: string;
  stock: number;
  demand: number;
}

export interface UpdateDemandInput {
  id: string;
  demand: number;
}

export interface TransferStockInput {
  id: string;
  from: string;
  to: string;
  qty: number;
}
