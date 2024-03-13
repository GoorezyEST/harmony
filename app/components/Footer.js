import React from "react";
import styles from "@/styles/modules/footer.module.css";

function Footer() {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>HARMONY</h1>
          <div className={styles.sub_title}>
            <hr />
            <p>MUSIC VISUALIZER</p>
            <hr />
          </div>
        </div>
        <div className={styles.credits}>
          <p>Developed by Franco Espinosa</p>
          <p>Get in touch with me: francoespinosa.dev@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
