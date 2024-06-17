import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";

import menuicon from "../../public/menu-2-fill.svg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import crossicon from "../../public/close-large-fill.svg"
import Image  from "next/image";

export function MenuToggle() {



  useGSAP(()=>{

    var tl = gsap.timeline()

    tl.to(".main",{
      left:0,
      delay:1,
      duration:0.6
    })


    tl.from(".togglemenu",{
      x:-100,
      opacity:0,
      duration:0.5,
      stagger:0.3,
      ease:"back.out"
    })
  })
  
  return (
  <div className="main bg-[#69696947] h-full w-[40%] absolute left-[-40%] " >

<div className=" float-end p-5 pt-8">
<Image src={crossicon} height={30} width={30} alt="" />
</div>

<ul className="  text-3xl flex flex-col  items-end justify-between gap-y-7 pt-32">
  <li  className="togglemenu">New</li>
  <li  className="togglemenu">Rain</li>
  <li  className="togglemenu">Snow</li>
  <li  className="togglemenu">All Weather</li>
  <li  className="togglemenu">Shop All</li>
</ul>


  </div>
    
  );
}
