import { Button } from "../ui/button";

interface TopBarProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

export function TopBar({ selectedRange, onRangeChange }: TopBarProps) {
  const ranges = [
    { value: "7d", label: "7 Days" },
    { value: "14d", label: "14 Days" },
    { value: "30d", label: "30 Days" },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                SupplySight
              </h1>
              <p className="text-sm text-slate-500">Inventory Dashboard</p>
            </div>
          </div>

          {/* Date Range Chips */}
          <div className="flex items-center space-x-2 bg-slate-100/80 p-1 rounded-lg">
            {ranges.map((range) => (
              <Button
                key={range.value}
                variant={selectedRange === range.value ? "default" : "ghost"}
                size="sm"
                onClick={() => onRangeChange(range.value)}
                className={`${
                  selectedRange === range.value
                    ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg"
                    : "text-slate-600 hover:text-slate-800 hover:bg-white/60"
                } transition-all duration-200`}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
