import React from "react";
import styles from "@/styles/modules/shorcuts-page.module.css";
import Footer from "../components/Footer";
import Link from "next/link";

const ShortcutsData = [
  {
    key: "P",
    title: "Play/Pause",
    info: "By clicking or pressing the P key, you can pause or resume audio playback.",
  },
  {
    key: "C",
    title: "Toggle Control",
    info: "By clicking or pressing the C key you can hide/show the audio player at the bottom of the screen.",
  },
  {
    key: "H",
    title: "Hide Shortcuts",
    info: "By clicking or pressing the H key you can hide/show the list of shorcuts in the upper left corner of the screen.",
  },
  {
    key: "S",
    title: "Skip Song",
    info: "By clicking or pressing the S key you can skip the current audio track and move to the next one in the queue.",
  },
  {
    key: "Q",
    title: "Quit Player",
    info: "By clicking or pressing the Q key you can exit the application and return to the Harmony main menu.",
  },
];

function ShortcutsPage() {
  return (
    <main className={styles.global_wrapper}>
      <Link href="/" className={styles.marquee}>
        <span>-&gt;&nbsp;&nbsp;BACK TO HOME&nbsp;&nbsp;&lt;-</span>
      </Link>
      <section className={`${styles.wrapper} ${styles.hero_wrapper}`}>
        <div className={`${styles.container} ${styles.hero_container}`}>
          <h1>Our Shortcuts</h1>
        </div>
      </section>
      <section className={`${styles.wrapper} ${styles.shortcut_wrapper}`}>
        {ShortcutsData.map((shortcut, index) => (
          <div
            className={`${styles.container} ${styles.shortcut_container}`}
            key={index}
          >
            <kbd>{shortcut.key}</kbd>
            <h2>{shortcut.title}</h2>
            <p>{shortcut.info}</p>
          </div>
        ))}
      </section>
      <Footer />
    </main>
  );
}

export default ShortcutsPage;
