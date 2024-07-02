import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Cartitem from "@/components/Cartitem";
import Link from "next/link";
import { ShippingForm } from "@/components/ShippingForm";

var Subtotal = 4000;
var ShippingCharges = 200;
var Tax = Math.round(Subtotal * 0.18);
var Discount = 400;
var Total = Subtotal + ShippingCharges + Tax;

export default function page() {
  return (
    <div className="flex h-screen  mx-24 mt-10">
      <div className="flex-[2.5] h-full  solid">
        <Cartitem />
        <Cartitem />
      </div>

      <div className="flex-[1] gap-y-1 flex flex-col pl-16 items-start justify-center">
        <p>Subtotal : Rs.{Subtotal}</p>
        <p>Shipping Charges : Rs.{ShippingCharges}</p>
        <p>Tax : Rs.{Tax}</p>
        <p>Discount : Rs.{Discount}</p>
        <p>Total : Rs.{Total}</p>

        <Input type="text" placeholder="Coupon code..." className=" w-64" />
        <Link href={"/shipping"}>
          <Button className=" w-64">Checkout</Button>
        </Link>
      </div>
    </div>
  );
}
