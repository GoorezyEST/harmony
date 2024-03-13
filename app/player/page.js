"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/modules/player.module.css";
import { useGlobal } from "@/context/GlobalContext";
import { setUpPlayer } from "@/functions/SetUpPlayer";
import PlayIcon from "../components/icons/PlayIcon";
import { useRouter } from "next/navigation";

function PlayerPage() {
  const { userSongs } = useGlobal();

  const [visualizationStarted, setVisualizationStarted] = useState(false);

  const audioPlayerRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const glowRef = useRef(null);

  function startPlaying() {
    setVisualizationStarted(true);

    if (
      userSongs !== null &&
      audioPlayerRef !== null &&
      canvasRef !== null &&
      containerRef !== null &&
      glowRef !== null &&
      window !== undefined
    ) {
      setUpPlayer(
        audioPlayerRef.current,
        canvasRef.current,
        window.innerWidth,
        window.innerHeight,
        userSongs,
        containerRef.current,
        glowRef.current
      );
    }
  }

  const router = useRouter();

  const [toggleControls, setToggleControls] = useState(false);
  const [hideUI, setHideUI] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    function handleKeyPress(e) {
      console.log(e.code);
      if (e.code === "KeyC") {
        setToggleControls((prev) => !prev);
        return;
      }
      if (e.code === "KeyH") {
        setHideUI((prev) => !prev);
        return;
      }
      if (e.code === "KeyP") {
        if (audioPlayerRef.current !== null) {
          if (audioPlayerRef.current.paused) {
            audioPlayerRef.current.play();
            return;
          }
          if (!audioPlayerRef.current.paused) {
            audioPlayerRef.current.pause();
            return;
          }
        }
        return;
      }
      if (e.code === "KeyS") {
        if (audioPlayerRef.current !== null) {
          const audioTag = audioPlayerRef.current;
          audioTag.currentTime = audioTag.duration;
        }
        return;
      }
      if (e.code === "KeyQ") {
        setShowConfirmation(true);
        return;
      }
      return;
    }

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  function handleKbdClick(key) {
    if (key === "KeyC") {
      setToggleControls((prev) => !prev);
      return;
    }
    if (key === "KeyH") {
      setHideUI((prev) => !prev);
      return;
    }
    if (key === "KeyP") {
      if (audioPlayerRef.current !== null) {
        if (audioPlayerRef.current.paused) {
          audioPlayerRef.current.play();
          return;
        }
        if (!audioPlayerRef.current.paused) {
          audioPlayerRef.current.pause();
          return;
        }
      }
      return;
    }
    if (key === "KeyS") {
      if (audioPlayerRef.current !== null) {
        const audioTag = audioPlayerRef.current;
        audioTag.currentTime = audioTag.duration;
      }
      return;
    }
    if (key === "KeyQ") {
      setShowConfirmation(true);
      return;
    }
    return;
  }

  function handleUserQuit(dec) {
    if (dec === "y") {
      router.replace("/");
      return;
    }
    if (dec === "n") {
      setShowConfirmation(false);
      return;
    }
  }

  return (
    <main className={styles.wrapper} ref={containerRef}>
      {userSongs.length === 0 ? (
        <p>No files</p>
      ) : (
        <section>
          {!visualizationStarted && (
            <div className={styles.play_overlay}>
              <p>
                Click the play button to begin with the <span>Harmony</span>{" "}
                experience
              </p>
              <button onClick={startPlaying} className={styles.play_btn}>
                <PlayIcon />
              </button>
            </div>
          )}
          {showConfirmation && (
            <div className={styles.quit_overlay}>
              <div className={styles.quit_overlay_content}>
                <p>Are you sure that you want to quit?</p>
                <div>
                  <button
                    onClick={() => handleUserQuit("y")}
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--white)",
                    }}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleUserQuit("n")}
                    style={{
                      backgroundColor: "var(--white)",
                      color: "var(--black)",
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
          <div
            className={styles.shortcuts}
            style={{
              opacity: hideUI ? 0 : 1,
              visibility: hideUI ? "hidden" : "visible",
            }}
          >
            <kbd onClick={() => handleKbdClick("KeyC")}>C</kbd>
            <kbd onClick={() => handleKbdClick("KeyP")}>P</kbd>
            <kbd onClick={() => handleKbdClick("KeyH")}>H</kbd>
            <kbd onClick={() => handleKbdClick("KeyS")}>S</kbd>
            <kbd onClick={() => handleKbdClick("KeyQ")}>Q</kbd>
          </div>
          <canvas ref={canvasRef} className={styles.visualizer}></canvas>
          <div ref={glowRef} className={styles.visualizer_glow}></div>
          <div
            className={styles.controls}
            style={{ bottom: toggleControls ? "-68px" : "0px" }}
          >
            <audio controls ref={audioPlayerRef}></audio>
          </div>
        </section>
      )}
    </main>
  );
}

export default PlayerPage;
