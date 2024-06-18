"use client";
import React from "react";
import arrowicon from "../../public/arrow-right-line.svg";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function SlideTextAnimation() {
  useGSAP(() => {
    gsap.to(".movingtext", {
      transform: "translateX(-300%)",
      duration: 18,
      repeat: -1,
      ease: "none",
    });

    // gsap.to('.marque',{
    //     transform: "translateX(-200%)",
    //     repeat: -1,
    //     duration: 14,
    //     ease: "none",
    // })
  });
  return (
    <div className="marque whitespace-nowrap bg-[#d9ff06]  w-full h-20 font-bold text-3xl flex items-center gap-x-20 ">
      <p className="movingtext ">FIND VARIETY OF SHOES WITH THE LATEST TREND</p>
      <p className="movingtext ">FIND VARIETY OF SHOES WITH THE LATEST TREND</p>
      <p className="movingtext ">FIND VARIETY OF SHOES WITH THE LATEST TREND</p>
      <p className="movingtext ">FIND VARIETY OF SHOES WITH THE LATEST TREND</p>
      <p className="movingtext ">FIND VARIETY OF SHOES WITH THE LATEST TREND</p>

      <p className="movingtext ">FIND VARIETY OF SHOES WITH THE LATEST TREND</p>

      <p className="movingtext ">FIND VARIETY OF SHOES WITH THE LATEST TREND</p>

      <p className="movingtext ">FIND VARIETY OF SHOES WITH THE LATEST TREND</p>

      <p className="movingtext ">FIND VARIETY OF SHOES WITH THE LATEST TREND</p>

      <p className="movingtext ">FIND VARIETY OF SHOES WITH THE LATEST TREND</p>

      <p className="movingtext ">FIND VARIETY OF SHOES WITH THE LATEST TREND</p>
    </div>
  );
}
