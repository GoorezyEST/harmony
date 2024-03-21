import React, { useEffect, useRef } from "react";
import styles from "@/styles/modules/upload-files.module.css";
import UploadIcon from "./icons/UploadIcon";

import { useGlobal } from "@/context/GlobalContext";

function UploadFiles() {
  // Accessing userFiles and setUserFiles from GlobalContext
  const { userFiles, setUserFiles } = useGlobal();
  const inputRef = useRef(null);

  // Effect to set input files if userFiles is null
  useEffect(() => {
    if (userFiles === null) {
      const dt = new DataTransfer();
      const input = inputRef.current;
      input.files = dt.files;
    }
  }, [userFiles]);

  // Function to handle files uploaded by the user
  const filesUploaded = (files) => {
    setUserFiles(files);
  };

  // Function to handle drag over event
  const dragHandler = (e) => {
    e.preventDefault();
  };

  // Function to handle drop event
  const dropHandler = (e) => {
    e.preventDefault();
    inputRef.current.files = e.dataTransfer.files;

    const changeEvent = new Event("change", { bubbles: true });
    inputRef.current.dispatchEvent(changeEvent);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <label
          className={styles.drop_area}
          htmlFor="file-input"
          onDragOver={(e) => dragHandler(e)}
          onDrop={(e) => dropHandler(e)}
        >
          <UploadIcon />
          <input
            id="file-input"
            ref={inputRef}
            type="file"
            multiple
            accept="audio/*"
            onChange={(e) => filesUploaded(e.target.files)}
          />
        </label>
        <p className={styles.drop_text}>
          Drag and drop or click in the container to upload your audio
        </p>
      </div>
    </section>
  );
}

export default UploadFiles;
