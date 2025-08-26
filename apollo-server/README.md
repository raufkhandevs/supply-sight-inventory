# Apollo Server - SupplySight Mock GraphQL API

This is a mock GraphQL server built with Apollo Server to provide data for the SupplySight Dashboard.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📊 Available Endpoints

- **GraphQL**: `http://localhost:4000/graphql`
- **Health Check**: `http://localhost:4000/health`

## 🔍 GraphQL Schema

### Queries

- `products(search, status, warehouse)` - Get filtered products
- `warehouses` - Get all warehouses
- `kpis(range)` - Get KPIs for specified date range (7d, 14d, 30d)

### Mutations

- `updateDemand(id, demand)` - Update product demand
- `transferStock(id, from, to, qty)` - Transfer stock between warehouses

## 📁 Project Structure

```
src/
├── server.ts      # Main server file
├── schema.ts      # GraphQL schema definition
├── resolvers.ts   # Query and mutation resolvers
├── data.ts        # Mock data and generators
└── types.ts       # TypeScript type definitions
```

## 🛠️ Development

The server runs on port 4000 by default. You can change this by setting the `PORT` environment variable.

## 🔗 CORS Configuration

Configured to allow requests from:

- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Create React App dev server)
