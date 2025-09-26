import { FC } from "react";

interface BubbleLoaderProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white" | "gray";
  className?: string;
}

export const BubbleLoader: FC<BubbleLoaderProps> = ({ 
  size = "md", 
  color = "primary", 
  className = "" 
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  const colorClasses = {
    primary: "bg-blue-600",
    white: "bg-white",
    gray: "bg-gray-600"
  };

  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`}>
      <div 
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`}
        style={{ animationDelay: "0ms" }}
      ></div>
      <div 
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`}
        style={{ animationDelay: "150ms" }}
      ></div>
      <div 
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`}
        style={{ animationDelay: "300ms" }}
      ></div>
    </div>
  );
};

export default BubbleLoader;
