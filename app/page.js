"use client";

import { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import NotSupported from "./components/NotSupported";

export default function Home() {
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsAllowed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <>{isAllowed ? <HomePage /> : <NotSupported />}</>;
}
