"use client";
import Image from "next/image";
import React, { useState } from "react";
import cameraimage from "../../../public/camera.jpg";
import { Button } from "./button";
import dummyproducts from "../../../public/Dummyshoes.json";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import {
  addCartItem,
  updateCartItemQuantity,
} from "@/app/features/cart/cartSlice";

export default function Homepage() {
  const [quantity, setquantity] = useState<number>(1);

  const cartItems = useSelector((state: RootState) => state.cart);
  const Dispatch = useDispatch();

  const addCartItemhandler = (
    id: string,
    name: string,
    price: number,
    quantity: number
  ) => {
    const existingCartItem = cartItems.find((item) => item.id === id);

    if (existingCartItem) {
      Dispatch(
        updateCartItemQuantity({
          id: id,
          quantity: existingCartItem.quantity + quantity,
        })
      );
    } else {
      Dispatch(
        addCartItem({
          id: id,
          name: name,
          price: price,
          quantity: quantity,
        })
      );
    }
  };
  return (
    <div className=" mx-24 flex flex-col gap-y-10 mt-10">
      <div className=" w-full h-64">
        <Image
          src={cameraimage}
          alt=""
          className=" h-full w-full object-cover"
        />
      </div>

      <div>
        <div className=" flex  items-center justify-between">
          <p className=" text-3xl">LATEST PRODUCTS</p>
          <p className=" text-sm font-semibold">MORE</p>
        </div>

        <div className=" grid grid-cols-4 place-items-center ">
          {dummyproducts.map((product) => (
            <div
              key={product.id}
              className=" h-fit w-fit flex flex-col  items-center gap-y-1 mt-8  mb-10"
            >
              <div className=" relative overflow-hidden h-60 w-60">
                <Image
                  src={product.url}
                  alt=""
                  className=" h-full w-full object-cover "
                  fill
                />
              </div>
              <div className=" text-xl font-semibold mt-1">{product.name}</div>
              <div className="text-xl  font-semibold">{product.price}</div>
              <Button
                className=" w-full mt-1"
                onClick={() => {
                  // setquantity(quantity + 1);
                  addCartItemhandler(
                    String(product.id),
                    product.name,
                    product.price,
                    quantity
                  );
                  // handleQuantityChange(product.id, quantity);
                }}
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
