import type { Product, Warehouse, KPI } from "./types";

// Sample Products Data
export const products: Product[] = [
  {
    id: "P-1001",
    name: "12mm Hex Bolt",
    sku: "HEX-12-100",
    warehouse: "BLR-A",
    stock: 180,
    demand: 120,
  },
  {
    id: "P-1002",
    name: "Steel Washer",
    sku: "WSR-08-500",
    warehouse: "BLR-A",
    stock: 50,
    demand: 80,
  },
  {
    id: "P-1003",
    name: "M8 Nut",
    sku: "NUT-08-200",
    warehouse: "PNQ-C",
    stock: 80,
    demand: 80,
  },
  {
    id: "P-1004",
    name: "Bearing 608ZZ",
    sku: "BRG-608-50",
    warehouse: "DEL-B",
    stock: 24,
    demand: 120,
  },
  {
    id: "P-1005",
    name: "Aluminum Plate",
    sku: "ALP-05-200",
    warehouse: "BLR-A",
    stock: 200,
    demand: 150,
  },
  {
    id: "P-1006",
    name: "Rubber Gasket",
    sku: "RUB-02-100",
    warehouse: "PNQ-C",
    stock: 300,
    demand: 250,
  },
  {
    id: "P-1007",
    name: "Copper Wire",
    sku: "COP-01-500",
    warehouse: "DEL-B",
    stock: 75,
    demand: 60,
  },
  {
    id: "P-1008",
    name: "Steel Screw",
    sku: "SCR-06-300",
    warehouse: "BLR-A",
    stock: 120,
    demand: 100,
  },
  {
    id: "P-1009",
    name: "Plastic Clip",
    sku: "PLC-03-150",
    warehouse: "PNQ-C",
    stock: 90,
    demand: 95,
  },
  {
    id: "P-1010",
    name: "Ceramic Insulator",
    sku: "CER-04-80",
    warehouse: "DEL-B",
    stock: 45,
    demand: 40,
  },
];

// Sample Warehouses Data
export const warehouses: Warehouse[] = [
  {
    code: "BLR-A",
    name: "Bangalore Central",
    city: "Bangalore",
    country: "India",
  },
  { code: "DEL-B", name: "Delhi North", city: "Delhi", country: "India" },
  { code: "PNQ-C", name: "Pune West", city: "Pune", country: "India" },
  { code: "MUM-D", name: "Mumbai Port", city: "Mumbai", country: "India" },
  { code: "CHN-E", name: "Chennai South", city: "Chennai", country: "India" },
];

// Generate KPIs for the last 30 days
export const generateKPIs = (range: string): KPI[] => {
  const days = range === "7d" ? 7 : range === "14d" ? 14 : 30;
  const kpis: KPI[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    // Generate realistic stock and demand data with some variation
    const baseStock = 1500;
    const baseDemand = 1200;
    const stockVariation = Math.floor(Math.random() * 200) - 100;
    const demandVariation = Math.floor(Math.random() * 150) - 75;

    kpis.push({
      date: date.toISOString().split("T")[0],
      stock: Math.max(0, baseStock + stockVariation),
      demand: Math.max(0, baseDemand + demandVariation),
    });
  }

  return kpis;
};
