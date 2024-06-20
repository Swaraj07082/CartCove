"use client";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import searchicon from "../../public/search-2-line.svg";
import Image from "next/image";
import homeicon from "../../public/home-2-line.svg";
import usericon from "../../public/user-line.svg";
import shoppingcarticon from "../../public/shopping-cart-line.svg";
import logo from "../../public/Rimberio.png";
import { ModeToggle } from "./ModeToggle";
import { useTheme } from "next-themes";
import menuicon from "../../public/menu-2-fill.svg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import crossicon from "../../public/close-large-fill.svg";
import loginicon from "../../public/account-circle-fill.svg";

export default function Navbar() {
  const { theme } = useTheme();
  // console.log(theme);

  //   The useState and useRef hooks in React serve different purposes and have distinct characteristics, making them suitable for different scenarios. Here’s a detailed comparison to illustrate why useState is used in certain cases and useRef in others:

  // useState
  // Purpose: Manages state in a functional component.
  // Reactivity: Causes the component to re-render when the state changes.
  // Usage: Ideal for data that affects the rendering of the component. For example, user inputs, toggles, fetched data, etc.
  // Example:
  // jsx
  // Copy code
  // const [count, setCount] = useState(0);
  // useRef
  // Purpose: Provides a way to access and persist a value between renders without causing re-renders.
  // Reactivity: Does not cause the component to re-render when the value changes.
  // Usage: Ideal for storing mutable values that do not directly affect the rendering, such as DOM references, timers, or any other instance variables that need to persist across renders.
  // Example:
  // jsx
  // Copy code
  // const countRef = useRef(0);
  // Key Differences
  // Re-rendering:

  // useState triggers a re-render of the component when the state is updated.
  // useRef does not trigger a re-render when its current value is updated.
  // Use Cases:

  // Use useState when you need the component to respond to changes in the value (e.g., updating UI based on user input).
  // Use useRef for values that need to persist across renders but do not affect the UI (e.g., storing a reference to a DOM element, keeping track of a timer ID).
  // Example Scenario
  // Consider a simple counter component:

  // With useState:

  // jsx
  // Copy code
  // function Counter() {
  //   const [count, setCount] = useState(0);

  //   const increment = () => {
  //     setCount(count + 1);
  //   };

  //   return (
  //     <div>
  //       <p>Count: {count}</p>
  //       <button onClick={increment}>Increment</button>
  //     </div>
  //   );
  // }
  // With useRef (Not recommended for UI state):

  // jsx
  // Copy code
  // function Counter() {
  //   const countRef = useRef(0);

  //   const increment = () => {
  //     countRef.current += 1;
  //     console.log(countRef.current); // Updates the value but won't cause a re-render
  //   };

  //   return (
  //     <div>
  //       <p>Count: {countRef.current}</p> {/* This won't update on increment */}
  //       <button onClick={increment}>Increment</button>
  //     </div>
  //   );
  // }
  // In the useRef example, clicking the increment button updates the countRef.current value, but the component does not re-render, so the displayed count does not change.

  // Conclusion
  // Use useState when you need to manage state that affects the rendering of the component.
  // Use useRef for values that need to persist across renders but do not influence the UI or cause re-renders.

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
      <div className="flex   justify-between bg-white text-black items-center px-10 max-md:px-3 py-3  ">
        {/* if we need to use fixed with justify we need to specify left and right */}
        <ul className=" flex gap-x-12 p-5  max-md:gap-x-6 max-[375px]:gap-x-3 ">
          <Image
            src={menuicon}
            className=" lg:hidden"
            height={20}
            width={20}
            alt=""
            onClick={() => {
              tl.current.play();
            }}
          />
          <li className="nav-1 text-3xl max-sm:text-2xl ">CartCove</li>

          <li className="nav-1">
            <ModeToggle />
          </li>
          {/* 
          <li className="nav-1 max-md:15px pt-2 hover:underline cursor-pointer  max-lg:hidden hover:scale-110">
            MAN
          </li>
          <li className="nav-1 max-md:15px hover:scale-110 pt-2 hover:underline cursor-pointer max-lg:hidden">
            WOMAN
          </li>
          <li className="nav-1 pt-2  max-md:15px hover:underline hover:scale-110 cursor-pointer max-lg:hidden">
            KIDS
          </li> */}
        </ul>

        <ul className="flex gap-x-9 p-5 max-md:gap-x-5  max-[375px]:gap-x-3  ">
          <Image
            className="nav-1 pt-2 hover:scale-125"
            src={homeicon}
            height={20}
            width={20}
            alt=""
          />
          <Image
            className="nav-1 pt-2 hover:scale-125"
            src={searchicon}
            height={20}
            width={20}
            alt=""
          />
          <Image
            className="nav-1 pt-2 hover:scale-125"
            src={shoppingcarticon}
            height={20}
            width={20}
            alt=""
          />
          <Image
            className="nav-1 pt-2 hover:scale-125"
            src={usericon}
            height={20}
            width={20}
            alt=""
          />
        </ul>
      </div>

      <div className="main bg-[#69696947] h-full w-[40%] absolute left-[-40%] ">
        <div className=" float-end p-5 pt-8">
          <Image
            src={crossicon}
            height={30}
            width={30}
            alt=""
            onClick={() => {
              tl.current.reverse();
            }}
          />
        </div>

        <ul className="  text-3xl flex flex-col  items-end justify-between gap-y-7 pt-40">
          <li className="togglemenu">New</li>
          <li className="togglemenu">Rain</li>
          <li className="togglemenu">Snow</li>
          <li className="togglemenu">All Weather</li>
          <li className="togglemenu">Shop All</li>
          <li className=" flex justify-center items-center gap-x-4 sm:hidden">
            <Image
              src={loginicon}
              width={50}
              height={50}
              alt=""
              className="loginicon"
            />
            <p className="text-3xl togglemenu ">Log in</p>
          </li>
        </ul>
      </div>
    </>
  );
}
