"use client";

import products from "../../../public/Dummyshoes.json";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { SheetDemo } from "@/components/Sheet";

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

const category = ["cat1", "cat2"];

interface ProductType {
  id: number;
  name: string;
  price: number;
  url: string;
  sizes: number[];
  category: string;
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
  const [product, setProduct] = useState<ProductType[]>(products);

  const [value, setvalue] = useState<number>(200000);
  console.log(value);
  const [query, setquery] = useState<string>("");
  console.log(query);

  const [sort, setsort] = useState<string>("");
  console.log(sort);

  const [category, setcategory] = useState("");
  console.log(category);

  // console.log(filtereddata(products, query, value, sort, setsort));
  return (
    <>
      {/* <div className="flex ">
        <div className="flex items-center pt-20 flex-col gap-y-3 h-screen shadow-2xl flex-1">
          <p>FILTERS</p>
          <GenericSelect sizes={filters} />
          <div>
          Max Price : {value}
          <Input
            type="range"
            min={1000}
            max={500000}
            value={value}
            onChange={(e) => {
              setvalue(e.target.value);
            }}
            />
            </div>
          <GenericSelect sizes={category}/>
        </div>

        <div className=" h-screen flex-[5]"></div>
      </div> */}

      <div className=" flex flex-col p-20">
        <div className="flex justify-start flex-col items-start gap-y-5  px-6">
          <p className=" text-3xl">PRODUCTS</p>
          <p className="text-3xl">
            <SheetDemo
              value={value}
              setvalue={setvalue}
              sort={sort}
              setsort={setsort}
              category={category}
              setcategory={setcategory}
            />
          </p>
          <Input
            type="text"
            placeholder="Search by name..."
            className="w-[93%] my-5 "
            value={query}
            onChange={(e) => {
              setquery(e.target.value);
            }}
          />
        </div>
        <div className="grid grid-cols-4 justify-center items-center">
          {filtereddata(products, query, value, sort, setsort, category)?.map(
            (product) => (
              <div
                key={product.id}
                className=" h-fit w-fit flex flex-col  items-center gap-y-1 mt-8  mb-10"
              >
                <div className="relative overflow-hidden h-60 w-60">
                  <Image
                    src={product.url}
                    alt=""
                    fill
                    className=" object-cover"
                  />
                </div>
                <div className=" text-xl font-semibold mt-1">
                  {product.name}
                </div>
                <div className="text-xl  font-semibold">{product.price}</div>
                <Button className=" w-full mt-1">Add to Cart</Button>
              </div>
            )
          )}
          {filtereddata(products, query, value, sort, setsort, category).at(
            0
          ) == null ? (
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
