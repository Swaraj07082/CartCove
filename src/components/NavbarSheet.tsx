import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import menuicon from "../../public/menu-2-fill.svg";
import Link from "next/link";

export default function NavbarSheet() {
  return (
    <>
      <div className=" md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            {/* <Button variant="outline">Open</Button> */}
            <Image src={menuicon} alt="" height={20} width={20} />
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-y-3">
            <SheetHeader className=" text-xl">
              <Link href={"/"}>Home</Link>
            </SheetHeader>
            <SheetHeader className=" text-xl">
              <Link href={"/search"}>Search</Link>
            </SheetHeader>
            <SheetHeader className=" text-xl">
              <Link href={"/cart"}>Cart</Link>
            </SheetHeader>
            <SheetHeader className=" text-xl">
              <Link href={"/dashboard"}>Dashboard</Link>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
