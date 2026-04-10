import { cn } from "@/lib/utils";

const variants = {
  low: "bg-green-100 text-green-700 dark:bg-green-500 dark:text-white",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-400 dark:text-black",
  high: "bg-red-100 text-red-700 dark:bg-red-500 dark:text-white",
  default: "bg-gray-100 text-gray-600 dark:bg-gray-500 dark:text-white",
};

export default function Badge({ variant = "default", children }: any) {
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full",
        variants[variant as keyof typeof variants]
      )}
    >
      {children}
    </span>
  );
}