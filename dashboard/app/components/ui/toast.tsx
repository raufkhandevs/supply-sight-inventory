import * as React from "react";
import { CheckCircle, XCircle, X } from "lucide-react";
import { cn } from "../../lib/utils";

interface ToastProps {
    message: string;
    type: "success" | "error";
    isVisible: boolean;
    onClose: () => void;
}

export function Toast({ message, type, isVisible, onClose }: ToastProps) {
    React.useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed top-4 right-4 z-[80] transform transition-all duration-300 ease-out">
            <div
                className={cn(
                    "flex items-center space-x-3 p-4 rounded-lg shadow-lg border min-w-[300px] transform transition-all duration-300",
                    type === "success"
                        ? "bg-green-50 border-green-200 text-green-800"
                        : "bg-red-50 border-red-200 text-red-800"
                )}
                style={{
                    animation: isVisible
                        ? "slideInRight 0.3s ease-out"
                        : "slideOutRight 0.3s ease-in"
                }}
            >
                {type === "success" ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                )}
                <span className="flex-1 font-medium">{message}</span>
                <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
