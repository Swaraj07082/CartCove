"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import loginicon from "../../public/account-circle-fill.svg";
import crossicon from "../../public/close-large-fill.svg";
import homeicon from "../../public/home-2-line.svg";
import searchicon from "../../public/search-2-line.svg";
import shoppingcarticon from "../../public/shopping-cart-line.svg";
import usericon from "../../public/user-line.svg";
import whitehomeicon from "../../public/white-home-2-line.svg";
import whitesearchicon from "../../public/white-search-2-line.svg";
import whitecarticon from "../../public/white-shopping-cart-line.svg";
import whiteusericon from "../../public/white-user-line.svg";
import { ModeToggle } from "./ModeToggle";
import NavbarSheet from "./NavbarSheet";
import {
  HomeIcon,
  Menu,
  MenuIcon,
  SearchIcon,
  ShoppingCart,
  User,
} from "lucide-react";

export default function Navbar() {
  const { theme } = useTheme();

  console.log(theme);

  const tl = useRef(gsap.timeline({ paused: true }));

  useGSAP(() => {
    gsap.from(".nav-1", {
      opacity: 0,
      y: 50,
      delay: 0.2,
      stagger: 0.15,
      ease: "bounce.out",
    });

    tl.current.to(".main", {
      left: 0,
      delay: 0.5,
      duration: 0.4,
    });

    tl.current.from(".togglemenu", {
      x: -100,
      opacity: 0,
      duration: 0.4,
      stagger: 0.3,
      ease: "back.out",
    });

    tl.current.from(".loginicon", {
      x: -100,
      opacity: 0,
      duration: 0.4,
      stagger: 0.3,
      ease: "elastic.out",
    });
  }, [tl]);

  return (
    <>
      <div className="flex    justify-between  items-center px-10 max-md:px-3 py-3 shadow-md ">
        <ul className=" flex gap-x-12 p-5  max-md:gap-x-6 max-[375px]:gap-x-3 ">
          <li className="nav-1 text-3xl max-sm:text-2xl ">
            <Link href={"/"}>CartCove</Link>
          </li>

          <li className="nav-1">
            <ModeToggle />
          </li>
        </ul>

        <ul className="flex gap-x-9 p-5 max-md:gap-x-5  max-[375px]:gap-x-3  ">
          <Link href={"/"}>
            {/* <Image
               className="nav-1 pt-2 hover:scale-125  max-md:hidden"
               src={theme == "light" ? homeicon : whitehomeicon}
               height={20}
               width={20}
               alt=""
            /> */}
            <HomeIcon className="nav-1 hover:scale-125  max-md:hidden" />
          </Link>
          <Link href={"/search"}>
            {/* <Image
              className="nav-1 pt-2 hover:scale-125  max-md:hidden"
              src={theme == "light" ? searchicon : whitesearchicon}
              height={20}
              width={20}
              alt=""
            /> */}
            <SearchIcon className="nav-1  hover:scale-125  max-md:hidden" />
          </Link>
          <Link href={"/cart"}>
            {/* <Image
              className="nav-1 pt-2 hover:scale-125  max-md:hidden"
              src={theme == "light" ? shoppingcarticon : whitecarticon}
              height={20}
              width={20}
              alt=""
            /> */}
            <ShoppingCart className="nav-1  hover:scale-125  max-md:hidden" />
          </Link>
          <Link href={"/dashboard"}>
            {/* <Image
              className="nav-1 pt-2 hover:scale-125  max-md:hidden"
              src={theme == "light" ? usericon : whiteusericon}
              height={20}
              width={20}
              alt=""
            /> */}
            <User className="nav-1 hover:scale-125  max-md:hidden" />
          </Link>
          <NavbarSheet />
        </ul>
      </div>
    </>
  );
}
