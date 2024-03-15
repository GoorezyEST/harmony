import React from "react";
import styles from "@/styles/modules/select-visualizers-overlay.module.css";
import { useGlobal } from "@/context/GlobalContext";
import { VisualizersData } from "@/VisualizersData";
import { useRouter } from "next/navigation";
import DiceIcon from "./icons/DiceIcon";

function SelectVisualizersOverlay() {
  const {
    setUserFiles,
    userFiles,
    userVisualizer,
    setUserVisualizer,
    setUserSongs,
  } = useGlobal();
  const router = useRouter();

  function handleVisualizerChange(file, visualizerName) {
    setUserVisualizer((prevState) => ({
      ...prevState,
      [file.name]: {
        visualizer: visualizerName,
        audio: file,
      },
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const arrFiles = Array.from(userFiles);

    // Check if visualizers are selected for all files
    const allFilesHaveVisualizers = arrFiles.every((file) =>
      userVisualizer.hasOwnProperty(file.name)
    );

    if (allFilesHaveVisualizers) {
      const arrSongs = [];

      arrFiles.forEach((file) => {
        arrSongs.push(userVisualizer[file.name]);
      });

      setUserSongs(arrSongs);
      router.push("/player");
    }
  }

  function handleUserCancel() {
    setUserFiles(null);
    setUserVisualizer({});
    setUserSongs(null);
  }

  const randomizeVisualizersSelection = () => {
    const arrFiles = Array.from(userFiles);

    const filesToRandomize = arrFiles.filter(
      (file) => !userVisualizer.hasOwnProperty(file.name)
    );

    filesToRandomize.forEach((file) => {
      setUserVisualizer((prevState) => ({
        ...prevState,
        [file.name]: {
          visualizer: VisualizersData[Math.trunc(Math.random() * 5)].name,
          audio: file,
        },
      }));
    });
  };

  return (
    <section className={styles.wrapper}>
      <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>
        <button
          type="button"
          className={styles.cta_randomize}
          onClick={() => {
            randomizeVisualizersSelection();
          }}
        >
          <DiceIcon />
        </button>
        {userFiles !== null && (
          <ul>
            {Array.from(userFiles).map((file) => {
              return (
                <li key={file.name}>
                  <div className={styles.form_text}>
                    <span>Pick a visualizer for</span>
                    <p>{file.name}</p>
                  </div>
                  <div className={styles.form_visualizers}>
                    {VisualizersData.map((vis, i) => (
                      <div key={i}>
                        <input
                          required
                          type="radio"
                          value={vis.name}
                          name={`visualizer-${file.name}`}
                          id={`visualizer-${file.name}-${vis.name}`}
                          onChange={() =>
                            handleVisualizerChange(file, vis.name)
                          }
                          checked={
                            userVisualizer[file.name]?.visualizer === vis.name
                          }
                        />
                        <label htmlFor={`visualizer-${file.name}-${vis.name}`}>
                          <img src={vis.img} alt={vis.name} />
                        </label>
                      </div>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <div className={styles.cta_container}>
          <input
            type="submit"
            className={styles.cta_primary}
            value="Let's start"
          />
          <input
            type="button"
            className={styles.cta_secondary}
            value="Cancel"
            onClick={() => handleUserCancel()}
          />
        </div>
      </form>
    </section>
  );
}

export default SelectVisualizersOverlay;
