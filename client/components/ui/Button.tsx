import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:brightness-110 active:scale-95",

  danger:
    "bg-destructive text-destructive-foreground hover:opacity-90",

  ghost:
    "bg-transparent hover:bg-transparent text-foreground",
};

export default function Button({ variant = "primary", className, ...props }: any) {
  return (
    <button
      className={cn(
        "px-3 py-2 rounded-xl transition",
        variants[variant as keyof typeof variants],
        className
      )}
      {...props}
    />
  );
}