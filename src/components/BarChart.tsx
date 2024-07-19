"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";

const chartConfig = {
 Revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface DataType {
  totalRevenue: number;
  fashionRevenue: number;
  electronicsRevenue: number;
  furnitureRevenue: number;
  healthRevenue: number;
  shoesRevenue: number;
}

export default function DashboardChart() {
  const [data, setdata] = useState<DataType>();
  useEffect(() => {
    const getTotalRevenue = async () => {
      const response = await fetch("/api/revenueByCategory");
      const data = await response.json();
      console.log(data);

      setdata(data);

      console.log(data);
    };

    getTotalRevenue();
  }, []);

  const chartData = [
    { month: "Fashion",Revenue: data?.fashionRevenue },
    { month: "Electronics",Revenue: data?.electronicsRevenue },
    { month: "Furniture",Revenue: data?.furnitureRevenue },
    { month: "Health",Revenue: data?.healthRevenue },
    { month: "Shoes",Revenue: data?.shoesRevenue },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="Revenue" fill="var(--color-Revenue)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
