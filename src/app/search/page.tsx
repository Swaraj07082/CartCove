"use client";

import { SheetDemo } from "@/components/Sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductType } from "../dashboard/product/page";
import {
  addCartItem,
  updateCartItemQuantity,
} from "../features/cart/cartSlice";
import { RootState } from "../redux/store";

gsap.registerPlugin(ScrollTrigger);

export const Sort = [
  {
    sortid: 1,
    text: "By Price - Low to High",
  },
  {
    sortid: 2,
    text: "By Price - High to Low",
  },
  { sortid: 3, text: "A to Z" },
  {
    sortid: 4,
    text: "Z to A",
  },
];

export interface SortType {
  sortid: number;
  text: string;
}

const filtereddata = (
  products: ProductType[],
  query: string,
  value: number,
  sort: string,
  setsort: React.Dispatch<React.SetStateAction<string>>,
  category: string
) => {
  var newproducts;
  if (category == "") {
    newproducts = products.filter(
      (item) =>
        item.name
          .toLowerCase()
          .split(" ")
          .join("")
          .includes(query.toLowerCase().split(" ").join("")) &&
        item.price < value
    );
  } else {
    newproducts = products.filter(
      (item) =>
        item.name
          .toLowerCase()
          .split(" ")
          .join("")
          .includes(query.toLowerCase().split(" ").join("")) &&
        item.price < value &&
        item.category == category
    );
  }

  if (sort === "byprice-lowtohigh") {
    newproducts.sort((a, b) => a.price - b.price);
    return newproducts;
  } else if (sort === "byprice-hightolow") {
    newproducts.sort((a, b) => b.price - a.price);
    return newproducts;
  } else if (sort === "atoz") {
    newproducts.sort((a, b) => a.name.localeCompare(b.name));
    return newproducts;
  } else if (sort === "ztoa") {
    newproducts.sort((a, b) => b.name.localeCompare(a.name));
    return newproducts;
  } else {
    return newproducts;
  }
};

export default function Page() {
  const [product, setProduct] = useState<ProductType[]>([]);

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

  const [value, setvalue] = useState<number>(200000);
  console.log(value);
  const [query, setquery] = useState<string>("");
  console.log(query);

  const [sort, setsort] = useState<string>("");
  console.log(sort);

  const [category, setcategory] = useState<string>("");
  console.log(category);

  const [quantity, setquantity] = useState<number>(1);

  const Dispatch = useDispatch();

  console.log(quantity);

  const cartItems = useSelector((state: RootState) => state.cart);

  console.log(cartItems);

  const handleQuantityChange = (id: string, quantity: number) => {
    Dispatch(updateCartItemQuantity({ id, quantity }));
  };

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

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <SheetDemo
            value={value}
            setvalue={setvalue}
            sort={sort}
            setsort={setsort}
            category={category}
            setcategory={setcategory}
          />
        </div>
        <div className="mb-6">
          <Input
            placeholder="Search products..."
            value={query}
            onChange={(e) => setquery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtereddata(product, query, value, sort, setsort, category)?.map(
            (product) => (
              <div
                key={product.id}
                className=" transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2  overflow-hidden"
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
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold">
                      ${product.price}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => {
                        addCartItemhandler(
                          product.id,
                          product.name,
                          product.price,
                          quantity,
                          product.url
                        );

                        toast({
                          title: "Item Added to Cart",
                          duration: 1500,
                        });
                      }}
                      disabled={product.stock === 0}
                    >
                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </Button>
                  </div>
                </div>
              </div>
            )
          )}
          {filtereddata(product, query, value, sort, setsort, category).at(0) ==
          null ? (
            <>
              <h1 className=" text-2xl ">NO ITEMS AVAILABLE</h1>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
