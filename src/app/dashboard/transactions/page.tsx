"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Search, MoreHorizontal, PanelLeft } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductType } from "../product/page";

import { DeleteAlertDialog } from "@/components/DeleteAlertDialog";
import Link from "next/link";
import { DashboardSheet } from "@/components/DashboardSheet";

export interface OrderType {
  id: string;
  email: string;
  Address: string;
  City: string;
  State: string;
  Pincode: number;
}

export interface OrderedProductType {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  order: OrderType;
  product: ProductType;
}

export type OrderWithProducts = {
  id: string;
  email: string;
  Address: string;
  City: string;
  State: string;
  Pincode: number;
  OrderedProduct: OrderedProductType[];
};

export default function Transactions() {
  const [orders, setOrders] = useState<OrderWithProducts[]>([]);

  console.log(orders);
  useEffect(() => {
    const getOrders = async () => {
      const response = await fetch("/api/orders");
      const data = await response.json();
      const { orders } = data;
      setOrders(orders);
    };

    getOrders();
  }, []);

  const [query, setQuery] = useState<string>("");
  console.log(query);

  const neworders = orders.filter((order) =>
    order.email
      .toLowerCase()
      .split(" ")
      .join("")
      .includes(query.toLowerCase().split(" ").join(""))
  );
  const calculateSubtotal = (order: OrderWithProducts) => {
    return order.OrderedProduct.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);
  };
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          {/* <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs"></SheetContent>
          </Sheet> */}
          <DashboardSheet />

          {/* 
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </Button> */}
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by email..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[500px]"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader className=" text-center">
                  <CardTitle>TRANSACTIONS</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>OrderId</TableHead>
                        {/* <TableHead>Status</TableHead> */}
                        <TableHead className="hidden md:table-cell">
                          Email
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Amount
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {neworders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="hidden sm:table-cell">
                            <Image
                              alt="Product image"
                              className="aspect-square rounded-md object-cover"
                              height="64"
                              src="/placeholder.svg"
                              width="64"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {order.id}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {order.email}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {/* {order.OrderedProduct.map((orderedProduct) => (
                              <div key={orderedProduct.id}>
                                {orderedProduct.product.name}:{" "}
                                {orderedProduct.quantity} x $
                                {orderedProduct.product.price} = $
                                {orderedProduct.quantity *
                                  orderedProduct.product.price}
                              </div>
                            ))} */}
                            {calculateSubtotal(order).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu modal={false}>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <Link href={`transactions/${order.id}`}>
                                    View Details...
                                  </Link>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing all transactions
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
