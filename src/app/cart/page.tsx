"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Cartitem from "@/components/Cartitem";
import Link from "next/link";
import { ShippingForm } from "@/components/ShippingForm";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { PrismaClient } from "@prisma/client";
import { Item } from "@radix-ui/react-dropdown-menu";

export default function Page() {
  const items = useSelector((state: RootState) => state.cart);

  console.log(items);

  var totalpricelist = items.map((product) => {
    return product.price * product.quantity;
  });

  console.log(totalpricelist);

  const Subtotal = totalpricelist.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  console.log(Subtotal);

  // var Subtotal = 4000;
  if (Subtotal == 0) {
    var ShippingCharges = 0;
  } else {
    ShippingCharges = 200;
  }
  var Tax = Math.round(Subtotal * 0.18);
  var Discount = 400;
  var Total = Subtotal + ShippingCharges + Tax;

  // const [quantity, setquantity] = useState<number>(1);
  // console.log(count);

  return (
    <div className="flex  h-screen  mx-6 max-md:items-center max-md:gap-y-20  max-md:flex-col  mt-10">
      <div className="flex-[2.5] h-full  solid max-md:overflow-y-auto ">
        {items.map((cartitem) => (
          <Cartitem
            key={cartitem.id}
            id={cartitem.id}
            name={cartitem.name}
            price={cartitem.price}
            quantity={cartitem.quantity}

            // items={items}
          />
        ))}
      </div>

      <div className="flex-[1] max-sm:text-[15px] gap-y-1 flex flex-col pl-16  items-start justify-center">
        <p>Subtotal : Rs.{Subtotal}</p>
        <p>Shipping Charges : Rs.{ShippingCharges}</p>
        <p>Tax : Rs.{Tax}</p>
        <p>Discount : Rs.{Discount}</p>
        <p>Total : Rs.{Total}</p>
        {/* 
        <Input
          type="text"
          placeholder="Coupon code..."
          className=" w-64 max-sm:w-fit"
        /> */}

        <Link href={"/shipping"}>
          <Button className=" w-64 button max-sm:w-fit">Checkout</Button>
        </Link>
      </div>
    </div>
  );
}
