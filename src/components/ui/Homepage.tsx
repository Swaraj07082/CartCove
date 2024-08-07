"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import { ProductType } from "@/app/dashboard/product/page";
import { Card, CardContent } from "./card";

export default function Homepage() {
  gsap.registerPlugin(ScrollTrigger);

  const [quantity, setquantity] = useState<number>(1);

  const cartItems = useSelector((state: RootState) => state.cart);
  const Dispatch = useDispatch();

  const addCartItemhandler = (
    id: string,
    name: string,
    price: number,
    quantity: number,
    url: string
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
          url: url,
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

  const [product, setProduct] = useState<ProductType[]>([]);
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    const getproducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();

      const { products } = data;
      console.log(products);

      setProduct(products);
    };

    getproducts();
  }, []);

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <Image
                  src="https://voyado.com/wp-content/uploads/2022/08/beauty-ecommerce-products.jpg"
                  width="550"
                  height="550"
                  alt="Hero Product"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                />
              </div>
              <div className="flex flex-col items-start space-y-4">
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Elevate Your Style with Our Premium Collection
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Discover the perfect blend of fashion and quality in our
                  carefully curated collection of apparel and accessories.
                </p>
                <Link
                  href="/search"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Featured Products
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our top-selling items that are sure to elevate your
                  wardrobe.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-4">
                <Card>
                  <Image
                    src="https://shop.studioinnate.com/wp-content/uploads/2021/03/2k-front-Heavy-T-Shirt-By-Studio-Innate.jpg"
                    width="300"
                    height="300"
                    alt="Product 1"
                    className="mx-auto aspect-square overflow-hidden rounded-t-xl object-cover"
                  />
                </Card>
              </div>
              <div className="grid gap-4">
                <Card>
                  <Image
                    src="https://assets.ajio.com/medias/sys_master/root/20230825/stKQ/64e85782afa4cf41f588f2e3/-473Wx593H-466495358-black-MODEL.jpg"
                    width="300"
                    height="300"
                    alt="Product 2"
                    className="mx-auto aspect-square overflow-hidden rounded-t-xl object-cover"
                  />
                </Card>
              </div>
              <div className="grid gap-4">
                <Card>
                  <Image
                    src="https://i.ebayimg.com/thumbs/images/g/6GUAAOSw03Jlxo6I/s-l640.jpg"
                    width="300"
                    height="300"
                    alt="Product 3"
                    className="mx-auto aspect-square overflow-hidden rounded-t-xl object-cover"
                  />
                </Card>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Discover More of Our Collection
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Browse our full range of apparel and accessories to find the
                perfect items for your style.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm">
              <Link
                href="/search"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Shop All Products
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
