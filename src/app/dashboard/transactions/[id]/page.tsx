import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
  Ship,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import db from "@/lib/db";
import { OrderWithProducts } from "../page";
import { FaFilePdf } from "react-icons/fa";
import { generatePDF } from "@/utils/pdfGenerator";
interface ParamsType {
  params: {
    id: string;
  };
}

export async function getOrder(id: string) {
  return await db.orders.findUnique({
    where: { id },
    include: {
      user: true,
      OrderedProduct: {
        include: {
          order: true,
          product: true,
        },
      },
    },
  });
}

export default async function Page({ params }: ParamsType) {
  // console.log(params.id)
  const order = await getOrder(params.id);
  console.log(order);

  const subtotal = order?.OrderedProduct.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  console.log(subtotal);

  if (subtotal == 0) {
    var ShippingCharges = 0;
  } else {
    ShippingCharges = 200;
  }
  var Tax = Math.round(subtotal * 0.18);
  var Discount = subtotal / 10;
  var Total = subtotal + ShippingCharges + Tax - Discount;

  const MonthNumber = order?.createdAt.getMonth();
  var Month;
  switch (MonthNumber) {
    case 1:
      Month = "January";
      break;

    case 2:
      Month = "February";
      break;
    case 3:
      Month = "March";
      break;
    case 4:
      Month = "April";
      break;
    case 5:
      Month = "May";
      break;
    case 6:
      Month = "June";
      break;
    case 7:
      Month = "July";
      break;
    case 8:
      Month = "August";
      break;
    case 9:
      Month = "September";
      break;
    case 10:
      Month = "October";
      break;
    case 11:
      Month = "November";
      break;
    case 12:
      Month = "December";
      break;

    default:
      break;
  }

  return (
    <Card className="overflow-hidden m-20">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Order {order?.id}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            ></Button>
          </CardTitle>
          {/* <CardDescription>Date: November 23, 2023</CardDescription> */}
          <CardDescription>
            Date:{" "}
            {`${Month} ${order?.createdAt.getDate()} , ${order?.createdAt.getFullYear()}`}
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {/* <Button size="sm" variant="outline" className="h-8 gap-1">
            <FaFilePdf className="h-3.5 w-3.5" />
            <span
              className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap"
              // onClick={() => generatePDF(order)}
            >
              Generate PDF
            </span>
          </Button> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Order Details</div>
          <ul className="grid gap-3">
            {order?.OrderedProduct.map((item) => (
              <li key={item.id} className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {item.product.name} x <span>{item.quantity}</span>
                </span>
                <span>${item.product.price * item.quantity}</span>
              </li>
            ))}
            {/* <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Aqua Filters x <span>1</span>
              </span>
              <span>$49.00</span>
            </li> */}
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal?.toFixed(2)}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>${ShippingCharges.toFixed(2)}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>${Tax.toFixed(2)}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Discount</span>
              <span>${Discount.toFixed(2)}</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>${Total.toFixed(2)}</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Shipping Information</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>{order?.Address}</span>
              <span>{order?.City}</span>
              <span>{order?.State}</span>
            </address>
          </div>
          {/* <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Billing Information</div>
            <div className="text-muted-foreground">
              Same as shipping address
            </div>
          </div> */}
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Customer Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <dd>{order?.user.username}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a href="mailto:">{order?.email}</a>
              </dd>
            </div>
            {/* <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Phone</dt>
              <dd>
                <a href="tel:">+1 234 567 890</a>
              </dd>
            </div> */}
          </dl>
        </div>
        {/* <Separator className="my-4" /> */}
        {/* <div className="grid gap-3">
          <div className="font-semibold">Payment Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                Visa
              </dt>
              <dd>**** **** **** 4532</dd>
            </div>
          </dl>
        </div> */}
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          {/* Updated <time dateTime="2023-11-23">November 23, 2023</time> */}
        </div>
        {/* <Pagination className="ml-auto mr-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="sr-only">Previous Order</span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="sr-only">Next Order</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination> */}
      </CardFooter>
    </Card>
  );
}
