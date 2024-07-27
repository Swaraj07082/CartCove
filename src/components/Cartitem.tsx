"use client";
import Image from "next/image";
import photo from "../../public/camera.jpg";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import deletephoto from "../../public/delete-bin-7-fill.svg";
import { number } from "zod";
import { Card } from "./ui/card";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import {
  removeCartItem,
  updateCartItemQuantity,
} from "@/app/features/cart/cartSlice";
import { toast } from "./ui/use-toast";

interface ItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartitemProps {
  id: string;
  name: string;
  price: number;

  quantity: number;

  // items: ItemType[];
}
export default function Cartitem({
  id,
  name,
  price,
  quantity,
}: // count,
// setcount,
// items,
CartitemProps) {
  const [disable, setdisabled] = useState<boolean>(false);
  const [quantitycounter, setquantitycounter] = useState<number>(quantity);

  useEffect(() => {
    quantitycounter === 1 ? setdisabled(true) : setdisabled(false);
  }, [quantitycounter]);

  // console.log(items.quantity)

  const Dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart);

  console.log(cartItems);

  const existingCartItem = cartItems.find((item) => item.id === id);
  return (
    <>
      <div className="flex justify-between max-md:items-center max-lg:flex-col max-lg:gap-y-10 max-sm:gap-y-5 max-lg:items-start px-10 pt-10 max-[1100px]:gap-x-20 max-[1100px]:px-2  pb-6 rounded-lg shadow-md transition-transform duration-300 ease-in-out  group hover:shadow-xl hover:-translate-y-2 ">
        <div className="flex max-md:flex-col max-md:items-center    ">
          <div className=" border-red-50 border max-sm:w-20 max-sm:h-20  w-32 h-32  relative overflow-hidden solid ">
            <Image
              src={photo}
              fill
              className=" object-cover absolute rounded-md "
              alt=""
            />
          </div>

          <div className=" ml-10 flex flex-col justify-center max-md:pt-5  gap-y-3 items-center max-lg:text-center max-sm:text-[15px] ">
            <p>{name}</p>
            <p>{price}</p>
          </div>
        </div>

        <div className="  flex items-center   justify-center gap-x-5 max-md:ml-12">
          <div className=" flex gap-x-3  justify-center items-center">
            <Button
              className="button max-sm:w-7 max-sm:h-7 "
              onClick={() => {
                setquantitycounter(quantitycounter - 1);
                Dispatch(
                  updateCartItemQuantity({
                    id: id,
                    quantity: existingCartItem?.quantity - 1,
                  })
                );
              }}
              disabled={disable}
            >
              -
            </Button>
            <p className=" max-sm:text-[15px]">{quantity}</p>
            <Button
              className="button max-sm:w-7 max-sm:h-7 "
              onClick={() => {
                setquantitycounter(quantitycounter + 1);
                Dispatch(
                  updateCartItemQuantity({
                    id: id,
                    quantity: existingCartItem.quantity + 1,
                  })
                );
              }}
            >
              +
            </Button>
            {/* <div className="flex">
              <Cross1Icon />
              {quantity}{" "}
            </div> */}
          </div>

          <Image
            className="  hover:scale-125"
            src={deletephoto}
            alt=""
            height={20}
            width={20}
            onClick={() => {
              Dispatch(
                removeCartItem({
                  id: id,
                })
              );

              toast({
                title: "Item removed from the cart",
              });
            }}
          />
        </div>
      </div>
    </>
  );
}
