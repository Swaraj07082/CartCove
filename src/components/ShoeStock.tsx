import React from "react";
import dummyshoe from "../../public/Dummyshoes.json";
import Image from "next/image";
import icon from "../../public/shoe2.jpg";
export default function ShoeStock() {
  return (
    <div className=" bg-white flex flex-col pt-10">
      <div className="flex  text-black justify-between items-center px-20">
        <p className=" text-3xl font-semibold">Stock Now</p>
        <p className=" underline underline-offset-4">View All Stock</p>
      </div>

      <div className=" grid grid-cols-4 pl-20 gap-y-10 justify-center items-center   h-full bg-white   text-white w-full">
        {/* <div className="  h-28 w-28 border border-red-600 solid"></div>
        <div className=" h-28 w-28 border border-red-600 solid"></div>
        <div className=" h-28 w-28 border border-red-600 solid"></div> */}
        <div className=" h-fit w-fit">
          <Image
            src="https://thesusoutdoors.com/cdn/shop/files/WinterBlack.png?v=1699307987&width=720"
            alt=""
            height={280}
            width={280}
          />
          <div className=" text-black">Anyday rain boot in black</div>
          <div className="text-black">Rs.18,600.00</div>
        </div>

        <div className="h-fit w-fit">
          <Image
            src="https://thesusoutdoors.com/cdn/shop/files/WinterBeige.png?v=1699307925&width=720"
            alt=""
            height={280}
            width={280}
          />
        </div>

        <div className=" h-fit w-fit">
          <Image
            src="https://thesusoutdoors.com/cdn/shop/files/green-rainboot.png?v=1699516046&width=720"
            alt=""
            height={280}
            width={280}
          />
        </div>

        <div className=" h-fit w-fit">
          <Image
            src="https://thesusoutdoors.com/cdn/shop/files/sustainable-rainboot_2cbf1511-cf01-462d-bf56-6187d957cac8.png?v=1686555865&width=720"
            alt=""
            height={280}
            width={280}
          />
        </div>

        <div className=" h-fit w-fit">
          <Image
            src="https://thesusoutdoors.com/cdn/shop/files/WinterBlack.png?v=1699307987&width=720"
            alt=""
            height={280}
            width={280}
          />
        </div>
      </div>
    </div>
  );
}
