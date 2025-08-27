# SupplySight Inventory Dashboard

Professional inventory management platform with real-time dashboard and GraphQL API.

## 🚀 Quick Start

1. **Start Apollo Server** (Backend)

   ```bash
   cd apollo-server
   npm install && npm run dev
   ```

   Server runs on `http://localhost:4000/graphql`

2. **Start Dashboard** (Frontend)
   ```bash
   cd dashboard
   npm install && npm run dev
   ```
   Dashboard opens at `http://localhost:5173`

## 📁 Project Structure

- **[📊 Dashboard](./dashboard/)** - React frontend with Tailwind CSS
- **[🔌 Apollo Server](./apollo-server/)** - Mock GraphQL backend
- **[📝 Notes](./NOTES.md)** - Development details and decisions

## 🎯 Features

- **Real-time Dashboard**: KPI cards, trend charts, filters
- **Interactive Management**: Product drawer, demand updates, stock transfers
- **Professional UI**: Modern design with smooth animations
- **GraphQL API**: Efficient data fetching and mutations

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Tailwind CSS + Apollo Client
- **Backend**: Apollo Server v5 + GraphQL + TypeScript
- **UI Components**: shadcn/ui library

## 📸 Sample Images

![Dashboard Overview](./sample/1.png)
_Figure 1: Main dashboard with KPI cards, charts, and product table_

![Product Management](./sample/2.png)
_Figure 2: Product detail drawer with update demand and transfer stock forms_

![Interactive Features](./sample/3.png)
_Figure 3: Dashboard interactions and filtering capabilities_

---

**📖 For detailed setup and development info, check the README files in each folder above.**
