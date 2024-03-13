import React from "react";
import styles from "@/styles/modules/hero.module.css";
import HarmonyIcon from "./icons/HarmonyIcon";

function Hero() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <HarmonyIcon />
        <div className={styles.title}>
          <h1>HARMONY</h1>
          <div className={styles.sub_title}>
            <hr />
            <p>MUSIC&nbsp;&nbsp;VISUALIZER</p>
            <hr />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
