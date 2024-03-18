"use client";

import styles from "@/styles/modules/home.module.css";
import UploadFiles from "./UploadFiles";
import Hero from "./Hero";
import Information from "./Information";
import Footer from "./Footer";

import { useGlobal } from "@/context/GlobalContext";
import SelectVisualizersOverlay from "./SelectVisualizersOverlay";
import { useEffect } from "react";
import ShortCutsBanner from "./ShortCutsBanner";

export default function HomePage() {
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
      <ShortCutsBanner />
      <Information />
      <Footer />
    </main>
  );
}
