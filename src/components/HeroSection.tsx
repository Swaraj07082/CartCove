"use client";

import Image from "next/image";
import React, { useRef } from "react";
import heroimage from "../../public/heroshoe.jpg";
import nikeshoe from "../../public/nikeshoe.jpg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function HeroSection() {
  useGSAP(() => {
    gsap.from(".staystylish", {
      opacity: 0,
      y: 100,
      duration: 1,
      delay: 1.7,
      ease: "bounce.out",
    });

    gsap.from(".withsneakers", {
      opacity: 0,
      y: 100,
      duration: 1,
      delay: 2.2,
      ease: "bounce.out",
    });
  });

  return (
    <div className="bg-black pb-12">
      {/* <Image src={nikeshoe} alt=" " height={80} width={580} className=" mr-14 mt-20  "  /> */}
      <div className=" leading-[250px] text-white ml-10 font-semibold  ">
        <div className="staystylish text-[200px]  ">Stay Stylish</div>

        <div className=" withsneakers text-[200px]">With Sneakers.</div>
      </div>
    </div>
  );
}
