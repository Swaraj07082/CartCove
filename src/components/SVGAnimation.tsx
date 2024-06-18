"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { MouseEvent } from "react";

export default function SVGAnimation() {
  // document.getElementById('string')

  var path = `M 10 50 Q 95 50 1500 50`;
  var finalpath = `M 10 50 Q 95 50 1500 50`;

  // cant use this because this runs before the component is mounted on the DOM , so will return null
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const pathElement = pathRef.current;

    container?.addEventListener("mousemove", (e) => {
      console.log(e);

      path = `M 10 50 Q ${e.offsetX} ${e.offsetY} 1500 50`;
      //    pathElement.setAttribute("d", path)
      gsap.to(pathElement, {
        attr: { d: path },
        duration: 0.3,
        ease: "power3.out",
      });
    });

    container?.addEventListener("mouseleave", () => {
      gsap.to(pathElement, {
        attr: { d: finalpath },
        duration: 0.5,
        ease: "elastic.out",
      });
    });

    // Clean up the event listener on component unmount
    return () => {
      container?.removeEventListener("mousemove", () => {});
    };
  }, []);

  return (
    <>
      {/* <div
      ref={containerRef}
      id="string"
      className="bg-black h-[200px] w-full 
      <svg width="190" height="200" className=" w-full bg-black  ">
        <path
          ref={pathRef}
          d="M 10 100 Q 95 100 1500 100"
          stroke="white"
          fill="transparent"
        />
      </svg>
    </div> */}

      <div ref={containerRef} id="string" className="bg-black h-[100px] w-full">
        <svg width="190" height="100" className=" w-full bg-black">
          <path
            ref={pathRef}
            d="M 10 50 Q 95 50 1500 50"
            stroke="white"
            fill="transparent"
          />
        </svg>
      </div>
    </>
  );
}
