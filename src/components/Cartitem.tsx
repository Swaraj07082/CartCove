"use client";
import {
  removeCartItem,
  updateCartItemQuantity,
} from "@/app/features/cart/cartSlice";
import { RootState } from "@/app/redux/store";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
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
  url: string;
}
export default function Cartitem({
  id,
  name,
  price,
  quantity,
  url,
}: CartitemProps) {
  const [disable, setdisabled] = useState<boolean>(false);
  const [quantitycounter, setquantitycounter] = useState<number>(quantity);

  useEffect(() => {
    quantitycounter === 1 ? setdisabled(true) : setdisabled(false);
  }, [quantitycounter]);

  const Dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart);

  console.log(cartItems);

  const existingCartItem = cartItems.find((item) => item.id === id);
  return (
    <>
      <div className=" flex items-center hover:-translate-y-2 transition-transform duration-300 ease-in-out justify-between rounded-lg shadow-lg bg-background p-4 ">
        <div className="flex items-center gap-4">
          <Image
            src={url}
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
                duration: 1500,
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
