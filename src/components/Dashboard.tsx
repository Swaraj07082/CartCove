import { Activity, CreditCard, DollarSign, Search, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { nanoid } from "@reduxjs/toolkit";
import DashboardChart from "./BarChart";
import { DashboardSheet } from "./DashboardSheet";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export interface StockType {
  _sum: {
    stock: number;
  };
  category: string;
}

interface DashboardProps {
  users: number;
  orders: number;
  products: number;
  stocks: StockType[];
  totalRevenue: number;
}

export function Dashboard({
  users,
  orders,
  products,
  stocks,
  totalRevenue,
}: DashboardProps) {
  console.log(
    users,
    orders,
    products,
    stocks[0]?.category,
    stocks[0]?._sum.stock
  );
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className=" flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <DashboardSheet />
          <Button onClick={() => signOut()}>Logout</Button>
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[500px]"
              />
            </div>
          </form>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Transactions
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products}</div>
              <p className="text-xs text-muted-foreground"></p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <DashboardChart />
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>INVENTORY</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-5">
              {stocks.map((stock) => (
                <div key={nanoid()}>
                  <Label>
                    {stock.category.toUpperCase()} :{" "}
                    {stock._sum.stock + " " + "UNITS"}
                  </Label>
                  <Input
                    type="range"
                    min={0}
                    max={2000}
                    value={stock._sum.stock}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
