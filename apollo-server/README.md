# Apollo Server - SupplySight Mock API

Mock GraphQL server providing data for the SupplySight Dashboard.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Server runs on `http://localhost:4000/graphql`

## 📊 Endpoints

- **GraphQL**: `/graphql`
- **Health**: `/health`

## 🔍 Schema

### Queries

- `products(search, status, warehouse)` - Filtered products
- `warehouses` - All warehouses
- `kpis(range)` - Date range KPIs (7d, 14d, 30d)

### Mutations

- `updateDemand(id, demand)` - Update product demand
- `transferStock(id, from, to, qty)` - Transfer stock

## 🛠️ Tech Stack

- Apollo Server v5
- GraphQL + TypeScript
- Mock data generators
