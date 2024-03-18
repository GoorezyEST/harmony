import React from "react";
import styles from "@/styles/modules/not-supported.module.css";

function NotSupported() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h2>Error</h2>
        <p>
          We are sorry to inform you that Harmony can't run in your device due
          to screen size issues.
        </p>
        <p>
          If your screen is wider than 1024 pixels and you are seeing this
          error, try refreshing the website by pressing F5.{" "}
        </p>
      </div>
    </section>
  );
}

export default NotSupported;
