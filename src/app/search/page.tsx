"use client";
import { GenericSelect } from "@/components/GenericSelect";
import products from "../../../public/Dummyshoes.json";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { SheetDemo } from "@/components/Sheet";

const filters = [1, 2];

const category = ["cat1", "cat2"];

export default function Page() {
  const [value, setvalue] = useState<string>("1000");
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
            <SheetDemo />
          </p>
        <Input type="text" placeholder="Search by name..." className="w-[93%] my-5 "/>
        </div>
        <div className="grid grid-cols-4 justify-center items-center">
          {products.map((product) => (
            <div
              key={product.id}
              className=" h-fit w-fit flex flex-col  items-center gap-y-1 mt-8  mb-10"
            >s
              <div className="relative overflow-hidden h-60 w-60">
                <Image
                  src={product.url}
                  alt=""
                  fill
                  className=" object-cover"
                />
              </div>
              <div className=" text-xl font-semibold mt-1">{product.name}</div>
              <div className="text-xl  font-semibold">{product.price}</div>
              <Button className=" w-full mt-1">Add to Cart</Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
