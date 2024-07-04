import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BarChart from "./BarChart";
import { Label } from "./ui/label";
import { SheetDemo } from "./Sheet";
import { DashboardSheet } from "./DashboardSheet";
import { ProductType } from "@/app/dashboard/product/page";

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
}

export function Dashboard({ users, orders, products, stocks }: DashboardProps) {
  console.log(
    users,
    orders,
    products,
    stocks[0]?.category,
    stocks[0]?._sum.stock
  );
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          {/* <SheetDemo/> */}
          <DashboardSheet />
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[1200px]"
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
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users}</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
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
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
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
            <BarChart />
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>INVENTORY</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-5">
              <div>
                <Label>
                  {stocks[0]?.category.toUpperCase()} : {stocks[0]?._sum.stock}
                </Label>
                <Input
                  type="range"
                  min={0}
                  max={2000}
                  value={stocks[0]?._sum.stock}
                />
              </div>
              <div>
                <Label>
                  {stocks[1]?.category.toUpperCase()} : {stocks[1]?._sum.stock}
                </Label>
                <Input
                  type="range"
                  min={0}
                  max={2000}
                  value={stocks[1]?._sum.stock}
                />
              </div>{" "}
              <div>
                <Label>
                  {stocks[2]?.category.toUpperCase()} : {stocks[2]?._sum.stock}
                </Label>
                <Input
                  type="range"
                  min={0}
                  max={2000}
                  value={stocks[2]?._sum.stock}
                />
              </div>{" "}
              <div>
                <Label>
                  {stocks[3]?.category.toUpperCase()} : {stocks[3]?._sum.stock}
                </Label>
                <Input
                  type="range"
                  min={0}
                  max={2000}
                  value={stocks[3]?._sum.stock}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
