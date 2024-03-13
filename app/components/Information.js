import React from "react";
import styles from "@/styles/modules/information.module.css";

const listItems = [
  {
    title: "What is Harmony?",
    text: "With Harmony you can visualize your favorite songs with 2D patterns that synchronize to the rhythm of the music. Immerse yourself in a pleasurable visual experience and create a unique ambiance in your home.",
  },
  {
    title: "How does it work?",
    text: "To use Harmony all you need is an internet connection and a file/files with your favorite music. Then you only have to upload it and select which visualizer you want for each song and that's it. That's how simple it is to enjoy your favorite songs with Harmony.",
  },
  {
    title: "Useful tips",
    text: "Once you are visualizing your songs, you can show/hide the sound player with the button in the upper left corner of the screen or with the C key on the keyboard.",
  },
];

function Information() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <ul className={styles.list}>
          {listItems.map((item, index) => (
            <li className={styles.list_item} key={index}>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Information;
