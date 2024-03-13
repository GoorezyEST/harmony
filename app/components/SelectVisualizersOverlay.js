import React from "react";
import styles from "@/styles/modules/select-visualizers-overlay.module.css";
import { useGlobal } from "@/context/GlobalContext";
import { VisualizersData } from "@/VisualizersData";
import { useRouter } from "next/navigation";

function SelectVisualizersOverlay() {
  const { userFiles, userVisualizer, setUserVisualizer, setUserSongs } =
    useGlobal();
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
    } else {
      // Handle case where not all files have visualizers selected
      // For example, show an error message or prompt users to select visualizers for all files
    }
  }

  return (
    <section className={styles.wrapper}>
      <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>
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
        <input type="submit" className={styles.container_cta} />
      </form>
    </section>
  );
}

export default SelectVisualizersOverlay;
