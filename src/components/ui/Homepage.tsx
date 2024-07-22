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
import Link from "next/link";
import { toast } from "./use-toast";
import { ToastAction } from "./toast";
import { useSession } from "next-auth/react";

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

  const session = useSession();
  console.log(session);
  return (
    <div className=" mx-24 flex flex-col gap-y-10 mt-10 max-md:mx-10">
      <div className=" w-full h-64">
        <Image
          src={cameraimage}
          alt=""
          className=" h-full w-full object-cover"
        />
      </div>

      <div>
        <div className=" flex  items-center justify-between">
          <p className=" text-3xl hover:underline hover:underline-offset-4 max-md:text-xl">
            LATEST PRODUCTS
          </p>
          <Link href={"/search"}>
            <p className=" text-sm font-semibold hover:scale-110 max-md:text-[12px]">
              MORE
            </p>
          </Link>
        </div>

        <div className=" grid grid-cols-4 place-items-center max-[1370px]:grid-cols-3 max-[1080px]:grid-cols-2 max-md:grid-cols-3 max-[731px]:grid-cols-2 max-[425px]:grid-cols-1 ">
          {dummyproducts.map((product) => (
            <div
              key={product.id}
              className=" h-fit w-fit flex flex-col  items-center gap-y-1 mt-8  mb-10"
            >
              <div className=" relative overflow-hidden h-60 w-60 max-md:h-40 max-md:w-40">
                <Image
                  src={product.url}
                  alt=""
                  className=" h-full w-full object-cover "
                  fill
                />
              </div>
              <div className=" text-xl font-semibold mt-1 max-md:text-[12px]">
                {product.name}
              </div>
              <div className="text-xl  font-semibold max-md:text-[12px]">
                {product.price}
              </div>
              <Button
                className=" w-full mt-1 button max-md:text-[12px] max-md:w-fit"
                onClick={() => {
                  // setquantity(quantity + 1);
                  addCartItemhandler(
                    String(product.id),
                    product.name,
                    product.price,
                    quantity
                  );
                  toast({
                    title: "Item Added to Cart",
                  });
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
