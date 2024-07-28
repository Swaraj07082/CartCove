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

  useGSAP(() => {
    gsap.from(".mainimage ", {
      x: -600,
      opacity: 0,
      duration: 1.5,
      delay: 1,
      ease: "bounce.out",
    });

    gsap.from(".latestproducts ", {
      x: -600,
      opacity: 0,
      duration: 1.5,
      delay: 1,
      ease: "bounce.out",
    });
    gsap.from(".more", {
      x: -600,
      opacity: 0,
      duration: 1.5,
      delay: 1,
      ease: "bounce.out",
    });

    gsap.from(".productimage", {
      // scale: 0,
      // rotate: 90,
      x: 1500,
      delay: 1,
      duration: 3.5,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
          trigger: ".container",
        scroller: "body",
        markers: true,
        start: "top 55%",
        end: "top -55%",
        scrub: 3,
        // pin:true
      },
    });
  });
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

        <div className="container grid grid-cols-4 place-items-center max-[1370px]:grid-cols-3 max-[1080px]:grid-cols-2 max-md:grid-cols-3 max-[731px]:grid-cols-2 max-[425px]:grid-cols-1 ">
          {dummyproducts.map((product) => (
            <div
              key={product.id}
              className="productimage h-fit w-fit flex flex-col  items-center gap-y-1 mt-8  mb-10"
            >
              <div className="  transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2  relative overflow-hidden h-60 w-60 max-md:h-40 max-md:w-40">
                <Image
                  src={product.url}
                  alt=""
                  className=" h-full w-full object-cover "
                  fill
                />
              </div>
              <div className=" text-xl font-semibold mt-2 max-md:text-[12px]">
                {product.name}
              </div>
              <div className="text-xl  font-semibold max-md:text-[12px]">
                ${product.price}
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

            // <div
            //   key={product.id}
            //   className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 max-w-sm "
            // >
            //   <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            //     <span className="sr-only">View Product</span>
            //   </Link>
            //   <Image
            //     src={product.url}
            //     alt="Product Image"
            //     // width={500}
            //     // height={400}
            //     fill
            //     className="object-cover h-44 w-full "
            //   />
            //   <div className="p-4 bg-background">
            //     <h3 className="text-xl font-bold">{product.name}</h3>
            //     {/* <p className="text-sm text-muted-foreground mb-4">
            //     A sleek and modern desk lamp to brighten up your workspace.
            //   </p> */}
            //     <div className="flex items-center justify-between">
            //       <h4 className="text-lg font-semibold">${product.price}</h4>
            //       <Button variant="outline">Add to Cart</Button>
            //     </div>
            //   </div>
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
}
