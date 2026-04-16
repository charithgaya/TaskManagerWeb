"use client";

import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { useTasks } from "@/context/taskContext";

export const description = "A radial chart with stacked sections";

// ✅ FIXED: keys must match data (completed, pending)
const chartConfig: ChartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-2))",
  },
};

function RadialChart() {
  const { tasks, completedTasks, activeTasks } = useTasks();
  const taskTotal = tasks.length;

  const percentage =
  taskTotal === 0
    ? 0
    : Math.round((completedTasks.length / taskTotal) * 100);

  const progressColor =
    percentage > 70
    ? "hsl(var(--chart-1))"
    : percentage > 40
    ? "hsl(var(--chart-3))"
    : "hsl(var(--chart-2))";

  const chartData = [
    {
      pending: activeTasks.length,
      completed: completedTasks.length,
    },
  ];

  return (
    <Card className="flex flex-col hover:shadow-md transition border-border">
      {/* ✅ Removed all hardcoded colors */}

      <CardHeader className="flex flex-col items-center pb-2 text-center">
        <CardTitle>Completed vs Pending Tasks</CardTitle>
        <CardDescription>Percentage of completion status</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="w-full max-h-[220px] h-[180px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={60}
            outerRadius={100}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        {/* ✅ theme-aware text */}
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 10}
                          className="fill-foreground text-lg font-bold"
                        >
                          {percentage}%
                        </tspan>

                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 10}
                          className="fill-muted-foreground text-xs"
                        >
                          Completed
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>

            {/* ✅ Use theme tokens (already correct) */}
            <RadialBar
              dataKey="completed"
              stackId="a"
              cornerRadius={5}
              fill="hsl(var(--chart-1))"
            />

            <RadialBar
              dataKey="pending"
              stackId="a"
              cornerRadius={5}
              fill={progressColor}
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-1 text-sm text-center">
        <div className="flex items-center gap-2 leading-none font-medium text-muted-foreground">
          {taskTotal} Total Tasks
          <TrendingUp className="h-4 w-4" />
        </div>

        <div className="text-muted-foreground leading-none">
          Analysis based on last 30 days
        </div>
      </CardFooter>
    </Card>
  );
}

export default RadialChart;