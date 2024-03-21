"use client";

import { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import NotSupported from "./components/NotSupported";

export default function Home() {
  // State variable to manage whether the page is allowed to render based on window size
  const [isAllowed, setIsAllowed] = useState(true);

  // Effect hook to handle window resize event and update state accordingly
  useEffect(() => {
    // Function to handle resize event
    const handleResize = () => {
      // Checking if window width is less than 1024 pixels
      if (window.innerWidth < 1024) {
        // If true, setting isAllowed state to false
        setIsAllowed(false);
      }
    };

    // Calling handleResize function when component mounts
    handleResize();

    // Adding event listener for resize event
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Dependency array to ensure effect runs only once on component mount

  // Conditional rendering based on isAllowed state
  return <>{isAllowed ? <HomePage /> : <NotSupported />}</>;
}
