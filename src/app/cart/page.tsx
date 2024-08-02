"use client";
import Cartitem from "@/components/Cartitem";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Page() {
  const items = useSelector((state: RootState) => state.cart);

  var totalpricelist = items.map((product) => {
    return product.price * product.quantity;
  });

  const Subtotal = totalpricelist.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  if (Subtotal == 0) {
    var ShippingCharges = 0;
  } else {
    ShippingCharges = 200;
  }
  var Tax = Math.round(Subtotal * 0.18);
  var Discount = Subtotal / 10;
  var Total = Subtotal + ShippingCharges + Tax - Discount;

  return (
    <div className="container mx-auto py-12">
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-2xl font-bold">Cart</h2>
      </div>
      <div className="grid gap-6">
        {items.map((cartitem) => (
          <Cartitem
            key={cartitem.id}
            id={cartitem.id}
            name={cartitem.name}
            price={cartitem.price}
            quantity={cartitem.quantity}
            url={cartitem.url}
          />
        ))}
      </div>
      <div className="mt-8 bg-background p-4 rounded-lg shadow-md">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Subtotal</h3>
            <span className="text-lg font-bold">Rs.{Subtotal}</span>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Shipping Charges</h3>
            <span className="text-lg font-bold">Rs.{ShippingCharges}</span>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Tax</h3>
            <span className="text-lg font-bold">Rs.{Tax}</span>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Discount</h3>
            <span className="text-lg font-bold">-Rs.{Discount}</span>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Total</h3>
            <span className="text-lg font-bold">Rs.{Total}</span>
          </div>
        </div>
        <Link href={Total == 0 ? "/search" : "/shipping"}>
          <Button className="w-full mt-4" disabled={Total == 0 ? true : false}>
            {Total == 0 ? "Cart is Empty" : "Proceed to Checkout"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
