import * as React from "react"
import { cn } from "@/lib/utils"

// 🔹 Main Card
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col rounded-2xl border border-border bg-card text-card-foreground",
        "p-4 sm:p-5 md:p-6", // responsive padding
        "shadow-sm hover:shadow-md transition-all duration-200",
        "gap-4", // consistent spacing
        "hover:scale-[1.02] hover:border-primary/40", 
        className
      )}
      {...props}
    />
  )
}

// 🔹 Header
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex items-start justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

// 🔹 Title
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-semibold leading-tight",
        "text-base sm:text-lg", // responsive text
        className
      )}
      {...props}
    />
  )
}

// 🔹 Description
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-sm text-muted-foreground",
        "line-clamp-2", // prevents overflow on mobile
        className
      )}
      {...props}
    />
  )
}

// 🔹 Action (icons/buttons)
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "flex items-center gap-2",
        className
      )}
      {...props}
    />
  )
}

// 🔹 Content
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "text-sm sm:text-base",
        className
      )}
      {...props}
    />
  )
}

// 🔹 Footer
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center justify-between gap-2 pt-2",
        "border-t border-border/50", // subtle separation
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}