import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { KPI } from "../../types/graphql";

interface StockDemandChartProps {
  kpis: KPI[];
  loading?: boolean;
}

export function StockDemandChart({ kpis, loading = false }: StockDemandChartProps) {
  if (loading) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 mb-8">
        <CardHeader>
          <CardTitle className="text-slate-700">Stock vs Demand Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-slate-200 rounded animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  if (!kpis.length) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 mb-8">
        <CardHeader>
          <CardTitle className="text-slate-700">Stock vs Demand Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center text-slate-500">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = kpis.map((kpi) => ({
    date: new Date(kpi.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    stock: kpi.stock,
    demand: kpi.demand,
  }));

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-slate-700">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
          </div>
          <span>Stock vs Demand Trend</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              labelStyle={{ color: "#475569", fontWeight: "600" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="stock"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
              name="Stock"
            />
            <Line
              type="monotone"
              dataKey="demand"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#f59e0b", strokeWidth: 2 }}
              name="Demand"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
