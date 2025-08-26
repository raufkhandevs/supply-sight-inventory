import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TrendingUp, TrendingDown, Target } from "lucide-react";

interface KPICardsProps {
  totalStock: number;
  totalDemand: number;
  fillRate: number;
  loading?: boolean;
}

export function KPICards({ totalStock, totalDemand, fillRate, loading = false }: KPICardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-white/60 backdrop-blur-sm border-slate-200/60">
            <CardHeader className="pb-3">
              <div className="h-4 bg-slate-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-slate-200 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Stock */}
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-slate-700">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-lg font-semibold">Total Stock</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {totalStock.toLocaleString()}
          </div>
          <p className="text-sm text-slate-500">Available inventory across all warehouses</p>
        </CardContent>
      </Card>

      {/* Total Demand */}
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-slate-700">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingDown className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-lg font-semibold">Total Demand</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-orange-600 mb-2">
            {totalDemand.toLocaleString()}
          </div>
          <p className="text-sm text-slate-500">Customer demand across all products</p>
        </CardContent>
      </Card>

      {/* Fill Rate */}
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-slate-700">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-lg font-semibold">Fill Rate</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600 mb-2">
            {fillRate}%
          </div>
          <p className="text-sm text-slate-500">Demand fulfillment efficiency</p>
        </CardContent>
      </Card>
    </div>
  );
}
