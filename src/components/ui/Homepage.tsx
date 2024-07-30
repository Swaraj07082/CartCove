"use client";
import Image from "next/image";
import React, { useState } from "react";
import cameraimage from "../../../public/camera.jpg";
import { Button } from "./button";
import dummyproducts from "../../../public/Dummyshoes.json";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  addCartItem,
  updateCartItemQuantity,
} from "@/app/features/cart/cartSlice";
import Link from "next/link";
import { toast } from "./use-toast";
import { ToastAction } from "./toast";
import { useSession } from "next-auth/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Homepage() {
  gsap.registerPlugin(ScrollTrigger);

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

  // useGSAP(() => {
  //   gsap.from(".mainimage ", {
  //     x: -600,
  //     opacity: 0,
  //     duration: 1.5,
  //     delay: 1,
  //     ease: "bounce.out",
  //   });

  //   gsap.from(".latestproducts ", {
  //     x: -600,
  //     opacity: 0,
  //     duration: 1.5,
  //     delay: 1,
  //     ease: "bounce.out",
  //   });
  //   gsap.from(".more", {
  //     x: -600,
  //     opacity: 0,
  //     duration: 1.5,
  //     delay: 1,
  //     ease: "bounce.out",
  //   });

  //   gsap.from(".productimage", {
  //     // scale: 0,
  //     // rotate: 90,
  //     x: 1500,
  //     delay: 0.5,
  //     duration: 2,
  //     stagger: 0.2,
  //     ease: "power2.out",
  //     scrollTrigger: {
  //       trigger: ".container",
  //       scroller: "body",
  //       markers: true,
  //       start: "top 55%",
  //       end: "top -1%",
  //       scrub: 2,
  //       // pin:true
  //     },
  //   });
  // });
  return (
    <div className=" mx-24 flex flex-col gap-y-10 mt-10 max-md:mx-10">
      <div className=" w-full h-64 ">
        <Image
          src={cameraimage}
          alt=""
          className="mainimage h-full w-full object-cover rounded-lg shadow-lg"
        />
      </div>

      <div>
        <div className=" flex  items-center justify-between">
          <p className="latestproducts text-3xl hover:underline hover:underline-offset-4 max-md:text-xl">
            LATEST PRODUCTS
          </p>
          <Link href={"/search"}>
            <p className=" more text-sm font-semibold hover:scale-110 max-md:text-[12px]">
              MORE
            </p>
          </Link>
        </div>

        <div className="mt-5 container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dummyproducts.map((product) => (
            <div
              key={product.id}
              className="productimage rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={product.url}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                {/* <p className="text-gray-500 mb-4">{product.}</p> */}
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold">
                    ${product.price}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => {
                      addCartItemhandler(
                        String(product.id),
                        product.name,
                        product.price,
                        quantity
                      );

                      toast({
                        title: "Item Added to Cart",
                      });
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {/* {filtereddata(product, query, value, sort, setsort, category).at(0) ==
          null ? (
            <>
              <h1 className=" text-2xl ">NO ITEMS AVAILABLE</h1>
            </>
          ) : (
            <></>
          )} */}
        </div>
      </div>
    </div>
  );
}
