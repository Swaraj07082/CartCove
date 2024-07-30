"use client";
import Image from "next/image";
import photo from "../../public/camera.jpg";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import deletephoto from "../../public/delete-bin-7-fill.svg";
import { number } from "zod";
import { Card } from "./ui/card";
import { Cross1Icon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import {
  removeCartItem,
  updateCartItemQuantity,
} from "@/app/features/cart/cartSlice";
import { toast } from "./ui/use-toast";
import { Trash2Icon } from "lucide-react";

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
      <div
        // key={item.id}
        className="flex items-center justify-between bg-background p-4 rounded-lg shadow-md"
      >
        <div className="flex items-center gap-4">
          <Image
            src={photo}
            alt={name}
            width={64}
            height={64}
            className="  rounded-md"
          />
          <div>
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-muted-foreground">Rs.{price}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
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
            <MinusIcon className="h-4 w-4" />
          </Button>
          <span>{quantity}</span>
          <Button
            variant="outline"
            size="icon"
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
            <PlusIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
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
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
