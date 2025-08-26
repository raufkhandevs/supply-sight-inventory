import * as React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { X, Package, MapPin, Hash, TrendingUp, TrendingDown, ArrowRight, CheckCircle } from "lucide-react";
import type { Product, Warehouse } from "../../types/graphql";
import { calculateProductStatus } from "../../utils/product-status";

interface ProductDetailDrawerProps {
    product: Product | null;
    warehouses: Warehouse[];
    isOpen: boolean;
    onClose: () => void;
    onUpdateDemand: (id: string, demand: number) => Promise<void>;
    onTransferStock: (id: string, from: string, to: string, qty: number) => Promise<void>;
}

export function ProductDetailDrawer({
    product,
    warehouses,
    isOpen,
    onClose,
    onUpdateDemand,
    onTransferStock,
}: ProductDetailDrawerProps) {
    // Handle escape key to close drawer
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            return () => document.removeEventListener("keydown", handleEscape);
        }
    }, [isOpen, onClose]);
    const [demand, setDemand] = React.useState("");
    const [transferQty, setTransferQty] = React.useState("");
    const [selectedWarehouse, setSelectedWarehouse] = React.useState("");
    const [isUpdating, setIsUpdating] = React.useState(false);
    const [isTransferring, setIsTransferring] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);

    // Reset form when product changes
    React.useEffect(() => {
        if (product) {
            setDemand(product.demand.toString());
            setTransferQty("");
            setSelectedWarehouse("");
        }
    }, [product]);

    const handleUpdateDemand = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product || !demand) return;

        const demandNum = parseInt(demand);
        if (isNaN(demandNum) || demandNum < 0) return;

        setIsUpdating(true);
        try {
            await onUpdateDemand(product.id, demandNum);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        } catch (error) {
            console.error("Failed to update demand:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleTransferStock = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product || !transferQty || !selectedWarehouse) return;

        const qtyNum = parseInt(transferQty);
        if (isNaN(qtyNum) || qtyNum <= 0 || qtyNum > product.stock) return;

        setIsTransferring(true);
        try {
            await onTransferStock(product.id, product.warehouse, selectedWarehouse, qtyNum);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        } catch (error) {
            console.error("Failed to transfer stock:", error);
        } finally {
            setIsTransferring(false);
        }
    };

    if (!product) return null;

    const status = calculateProductStatus(product);
    const availableWarehouses = warehouses.filter(w => w.code !== product.warehouse);

    return (
        <div
            className={`fixed inset-y-0 right-0 w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-60 ${isOpen ? "translate-x-0" : "translate-x-full"
                }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold text-slate-800">Product Details</h2>
                <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-slate-100">
                    <X className="w-5 h-5" />
                </Button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto h-full">
                {/* Product Info Card */}
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center space-x-3 text-slate-800">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-lg font-bold">{product.name}</div>
                                <div className="text-sm text-slate-600">ID: {product.id}</div>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* SKU */}
                        <div className="flex items-center space-x-2">
                            <Hash className="w-4 h-4 text-slate-500" />
                            <span className="font-mono text-sm text-slate-700">{product.sku}</span>
                        </div>

                        {/* Warehouse */}
                        <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-700">
                                {warehouses.find(w => w.code === product.warehouse)?.name || product.warehouse}
                            </span>
                        </div>

                        {/* Stock & Demand */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-blue-100 rounded-lg">
                                <div className="flex items-center justify-center space-x-1 mb-1">
                                    <TrendingUp className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-medium text-blue-700">Stock</span>
                                </div>
                                <div className="text-2xl font-bold text-blue-600">{product.stock.toLocaleString()}</div>
                            </div>
                            <div className="text-center p-3 bg-orange-100 rounded-lg">
                                <div className="flex items-center justify-center space-x-1 mb-1">
                                    <TrendingDown className="w-4 h-4 text-orange-600" />
                                    <span className="text-sm font-medium text-orange-700">Demand</span>
                                </div>
                                <div className="text-2xl font-bold text-orange-600">{product.demand.toLocaleString()}</div>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="flex justify-center">
                            <Badge
                                variant={status.color === "green" ? "default" : status.color === "yellow" ? "secondary" : "destructive"}
                                className="text-sm font-medium px-4 py-2"
                            >
                                {status.status}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Update Demand Form */}
                <Card className={`border-orange-200 transition-all duration-300 ${showSuccess ? 'ring-2 ring-green-500 ring-opacity-50' : ''}`}>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-slate-800 flex items-center justify-between">
                            Update Demand
                            {showSuccess && (
                                <div className="flex items-center space-x-2 text-green-600">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="text-sm font-medium">Updated!</span>
                                </div>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleUpdateDemand} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="demand" className="text-sm font-medium text-slate-700">
                                    New Demand Value
                                </Label>
                                <Input
                                    id="demand"
                                    type="number"
                                    min="0"
                                    value={demand}
                                    onChange={(e) => setDemand(e.target.value)}
                                    placeholder="Enter new demand"
                                    className="border-slate-200 focus:border-orange-500 focus:ring-orange-500"
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={isUpdating || !demand || parseInt(demand) < 0}
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isUpdating ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Updating...</span>
                                    </div>
                                ) : (
                                    "Update Demand"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Transfer Stock Form */}
                <Card className={`border-blue-200 transition-all duration-300 ${showSuccess ? 'ring-2 ring-green-500 ring-opacity-50' : ''}`}>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-slate-800 flex items-center justify-between">
                            Transfer Stock
                            {showSuccess && (
                                <div className="flex items-center space-x-2 text-green-600">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="text-sm font-medium">Transferred!</span>
                                </div>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleTransferStock} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="quantity" className="text-sm font-medium text-slate-700">
                                    Transfer Quantity
                                </Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    max={product.stock}
                                    value={transferQty}
                                    onChange={(e) => setTransferQty(e.target.value)}
                                    placeholder={`Max: ${product.stock}`}
                                    className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="warehouse" className="text-sm font-medium text-slate-700">
                                    Destination Warehouse
                                </Label>
                                <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
                                    <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                                        <SelectValue placeholder="Select warehouse" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableWarehouses.map((warehouse) => (
                                            <SelectItem key={warehouse.code} value={warehouse.code}>
                                                <div className="flex items-center space-x-2">
                                                    <span>{warehouse.name}</span>
                                                    <span className="text-slate-500">({warehouse.city})</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button
                                type="submit"
                                disabled={isTransferring || !transferQty || !selectedWarehouse || parseInt(transferQty) <= 0 || parseInt(transferQty) > product.stock}
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isTransferring ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Transferring...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <span>Transfer Stock</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
