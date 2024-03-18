import React from "react";
import styles from "@/styles/modules/player-no-files.module.css";
import Link from "next/link";

function PlayerNoFiles() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h2>Uups...</h2>
        <p>
          It looks like you're trying to play music before uploading it. Please
          go back to the home page and upload your music, once you select the
          visualziers you will be redirected automatically.
        </p>
        <Link href="/">Back to home</Link>
      </div>
    </section>
  );
}

export default PlayerNoFiles;
