"use client";
import gsap from "gsap";
import React from "react";

export default function CursorAnimation() {
  window.addEventListener("mousemove", function (e) {
    console.log(e);
    gsap.to(".cursor", {
      x: e.x,
      y: e.y,
      ease: "power1.out",
    });
  });
  return (
    <div
      onMouseMove={(e) => {
        console.log(e);
      }}
      className="cursor h-3 w-3 rounded-[50%] bg-green-900"
    ></div>
  );
}
