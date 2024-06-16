import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import searchicon from "../../public/search-2-line.svg";
import Image from "next/image";
import usericon from "../../public/user-line.svg";
import shoppingcarticon from "../../public/shopping-cart-line.svg";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <>
      <div className="flex justify-between ">
        <ul className="flex gap-x-12 p-5">
          <li>Logo</li>
          <li>New</li>
          <li>Rain</li>
          <li>Snow</li>
          <li>All Weather</li>
          <li>Shop ALL</li>
        </ul>

        <ul className="flex gap-x-9 p-5">
          <Image src={searchicon} height={20} width={20} alt="" />
          <Image src={usericon} height={20} width={20} alt="" />
          <Image src={shoppingcarticon} height={20} width={20} alt="" />
          <ModeToggle />
        </ul>
      </div>
    </>
  );
}
