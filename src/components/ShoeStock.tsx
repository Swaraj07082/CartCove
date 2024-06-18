import React from "react";
import dummyshoe from "../../public/Dummyshoes.json";
import Image from "next/image";
import icon  from "../../public/shoe2.jpg"
export default function ShoeStock() {
  return (
    <div className= " bg-black flex flex-col pt-10">
      <div className="flex  text-white justify-between items-center px-20">
        <p className=" text-3xl font-semibold">Stock Now</p>
        <p className=" underline underline-offset-4">View All Stock</p>
      </div>

      <div className=" flex   h-full bg-black justify-center items-center  text-white w-full">
        {/* <div className="  h-28 w-28 border border-red-600 solid"></div>
        <div className=" h-28 w-28 border border-red-600 solid"></div>
        <div className=" h-28 w-28 border border-red-600 solid"></div> */}
        <Image src={icon} alt="" height={200} width={200} />

        <Image src={icon} alt="" height={200} width={200} />
        <Image src={icon} alt="" height={200} width={200} />

      </div>
    </div>
  );
}
