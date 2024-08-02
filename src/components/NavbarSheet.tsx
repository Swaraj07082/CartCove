import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import menuicon from "../../public/menu-2-fill.svg";
import { MenuIcon } from "lucide-react";

export default function NavbarSheet() {
  return (
    <>
      <div className=" md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            {/* <Image src={menuicon} alt="" height={20} width={20} /> */}
            <MenuIcon/>
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
