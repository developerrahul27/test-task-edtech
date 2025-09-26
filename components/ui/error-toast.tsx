"use client";

import { toast } from "sonner";
import { XCircle, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { JSX } from "react";

type ToastVariant = "success" | "error" | "warning" | "info";

interface ShowToastOptions {
  variant?: ToastVariant;
  showClose?: boolean;
  duration?: number;
}

const variantConfig: Record<ToastVariant, { bg: string; icon: JSX.Element }> = {
  success: {
    bg: "bg-green-600",
    icon: <CheckCircle className="w-5 h-5" />,
  },
  error: {
    bg: "bg-red-600",
    icon: <XCircle className="w-5 h-5" />,
  },
  warning: {
    bg: "bg-yellow-500",
    icon: <AlertTriangle className="w-5 h-5" />,
  },
  info: {
    bg: "bg-blue-600",
    icon: <Info className="w-5 h-5" />,
  },
};

export function showToast(
  message: string,
  { variant = "info", showClose = true, duration = 3000 }: ShowToastOptions = {}
) {
  toast.custom(
    (t) => {
      const { bg, icon } = variantConfig[variant];
      return (
        <div
          className={`${bg} text-white px-4 py-3 rounded-md shadow-lg flex items-center gap-3 relative`}
        >
          {icon}
          <span className="text-sm font-medium">{message}</span>
          {showClose && (
            <button
              onClick={() => toast.dismiss(t)}
              className="ml-auto hover:opacity-80 rounded-full p-1"
              aria-label="Close"
            >
              <XCircle className="w-5 h-5" />
            </button>
          )}
        </div>
      );
    },
    {
      position: "top-center",
      duration,
    }
  );
}
