"use client";
import Image from "next/image";
import photo from "../../public/camera.jpg";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import deletephoto from "../../public/delete-bin-7-fill.svg";

export default function Cartitem() {
  const [count, setcount] = useState<number>(1);
  const [disable, setdisabled] = useState<boolean>(false);

  useEffect(() => {
    count === 1 ? setdisabled(true) : setdisabled(false);
  }, [count]);

  return (
    <>
      <div className="flex justify-between px-10 pt-10 pb-6">
        <div className="flex">
          <div className=" border-red-50 border  w-32 h-32 relative overflow-hidden solid">
            <Image src={photo} fill className=" object-cover" alt="" />
          </div>

          <div className=" ml-10 flex flex-col justify-center gap-y-3 items-center ">
            <p>Name</p>
            <p>Price</p>
          </div>
        </div>

        <div className="  flex items-center justify-center gap-x-5">
          <div className=" flex gap-x-3 justify-center items-center">
            <Button
              onClick={() => {
                setcount(count - 1);
              }}
              disabled={disable}
            >
              -
            </Button>
            {count}
            <Button
              onClick={() => {
                setcount(count + 1);
              }}
            >
              +
            </Button>
          </div>

          <Image src={deletephoto} alt="" height={20} width={20} />
        </div>
      </div>
    </>
  );
}
