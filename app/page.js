"use client";

import styles from "@/styles/modules/home.module.css";
import UploadFiles from "./components/UploadFiles";
import Hero from "./components/Hero";
import Information from "./components/Information";
import Footer from "./components/Footer";

import { useGlobal } from "@/context/GlobalContext";
import SelectVisualizersOverlay from "./components/SelectVisualizersOverlay";
import { useEffect } from "react";

export default function Home() {
  const { userFiles, setUserFiles, setUserVisualizer, setUserSongs } =
    useGlobal();

  useEffect(() => {
    setUserFiles(null);
    setUserVisualizer({});
    setUserSongs(null);
  }, []);

  return (
    <main className={styles.wrapper}>
      {userFiles !== null && <SelectVisualizersOverlay />}
      <Hero />
      <UploadFiles />
      <Information />
      <Footer />
    </main>
  );
}
