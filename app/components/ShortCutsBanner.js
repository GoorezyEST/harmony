import Link from "next/link";
import React from "react";
import styles from "@/styles/modules/shortcuts-banner.module.css";

function ShortCutsBanner() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h2>Shortcuts</h2>
        <p>
          In Harmony you can controls some aspects while visualizing your music.
          You will see these shortcuts in the upper left corner of the screen,
          to know more about how our shortcuts work click below.
        </p>
        <Link href="/shortcuts">Our Shortcuts</Link>
      </div>
    </section>
  );
}

export default ShortCutsBanner;
