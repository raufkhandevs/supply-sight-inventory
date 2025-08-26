import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "SupplySight Dashboard" },
    { name: "description", content: "Daily Inventory Dashboard for SupplySight" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          SupplySight Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome to the SupplySight Inventory Dashboard. This is where we'll build our inventory management system.
        </p>
      </div>
    </div>
  );
}
