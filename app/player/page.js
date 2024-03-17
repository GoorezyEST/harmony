"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/modules/player.module.css";
import { useGlobal } from "@/context/GlobalContext";
import { setUpPlayer } from "@/functions/SetUpPlayer";
import PlayIcon from "../components/icons/PlayIcon";
import { useRouter } from "next/navigation";
import AudioPauseIcon from "../components/icons/AudioPauseIcon";
import AudioPlayIcon from "../components/icons/AudioPlayIcon";
import AudioVolumeIcon from "../components/icons/AudioVolumeIcon";
import AudioMutedIcon from "../components/icons/AudioMutedIcon";

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
          setAudioIconBool(false);
          audioPlayerRef.current.play();
          return;
        }
        if (!audioPlayerRef.current.paused) {
          setAudioIconBool(true);
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

  const progressBarRef = useRef(null);

  function handleProgressBar(e) {
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;

    offsetX = Math.max(0, Math.min(offsetX, progressBar.clientWidth));

    const percent = offsetX / progressBar.clientWidth;

    if (audioPlayerRef.current.duration > 0) {
      audioPlayerRef.current.currentTime =
        percent * audioPlayerRef.current.duration;
      progressBar.value = percent;
    }
  }

  function handleDragStart(e) {
    e.preventDefault();
    document.addEventListener("mousemove", handleDragging);
    document.addEventListener("mouseup", handleDragEnd);
  }

  function handleDragging(e) {
    handleProgressBar(e);
  }

  function handleDragEnd(e) {
    handleProgressBar(e);
    document.removeEventListener("mousemove", handleDragging);
    document.removeEventListener("mouseup", handleDragEnd);
  }

  function handleTimeUpdated() {
    if (!audioPlayerRef.current.paused) {
      const audio = audioPlayerRef.current;
      const progressBar = progressBarRef.current;

      if (audio && progressBar) {
        const currentTime = audio.currentTime;
        const duration = audio.duration;

        // Check if duration is a finite number
        const percent = Number.isFinite(duration) ? currentTime / duration : 0;

        progressBar.value = percent;

        // Format and display current time as before
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        const formattedTime = `${minutes < 10 ? "0" : ""}${minutes}:${
          seconds < 10 ? "0" : ""
        }${seconds}`;
        setSongCurrentTime(formattedTime);
      }
    }
  }

  const [audioIconBool, setAudioIconBool] = useState(false);

  function toggleAudioState() {
    if (audioPlayerRef.current) {
      if (audioPlayerRef.current.paused) {
        audioPlayerRef.current.play();
        setAudioIconBool(false);
        return;
      }
      if (!audioPlayerRef.current.paused) {
        audioPlayerRef.current.pause();
        setAudioIconBool(true);
        return;
      }
    }
  }

  const [songCurrentTime, setSongCurrentTime] = useState(null);

  const [volume, setVolume] = useState(1);

  function handleVolumeChange(e) {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    if (audioPlayerRef.current) {
      audioPlayerRef.current.volume = newVolume;
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
            <kbd onClick={() => handleKbdClick("KeyQ")}>Q</kbd>
            <kbd onClick={() => handleKbdClick("KeyS")}>S</kbd>
            <kbd onClick={() => handleKbdClick("KeyH")}>H</kbd>
            <kbd onClick={() => handleKbdClick("KeyC")}>C</kbd>
            <kbd onClick={() => handleKbdClick("KeyP")}>P</kbd>
          </div>
          <canvas ref={canvasRef} className={styles.visualizer}></canvas>
          <div ref={glowRef} className={styles.visualizer_glow}></div>
          <div
            className={styles.controls}
            style={{ bottom: toggleControls ? "-68px" : "0px" }}
          >
            <div className={styles.custom_audio}>
              <button
                className={styles.custom_audio_btn}
                onClick={() => toggleAudioState()}
              >
                {audioIconBool && <AudioPlayIcon />}
                {!audioIconBool && <AudioPauseIcon />}
              </button>
              <div className={styles.custom_audio_time_cotainer}>
                <span>{songCurrentTime}</span>
              </div>
              <div className={styles.custom_audio_progress_container}>
                <progress
                  ref={progressBarRef}
                  className={styles.custom_audio_progress}
                  value="0"
                  max="1"
                  onClick={(e) => handleProgressBar(e)}
                  onMouseDown={(e) => handleDragStart(e)}
                ></progress>
              </div>
              <button className={styles.custom_audio_volume_cotainer}>
                {volume !== 0 ? <AudioVolumeIcon /> : <AudioMutedIcon />}
                <input
                  type="range"
                  max="1"
                  min="0"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </button>
            </div>
            <audio
              controls
              ref={audioPlayerRef}
              onTimeUpdate={() => handleTimeUpdated()}
            ></audio>
          </div>
        </section>
      )}
    </main>
  );
}

export default PlayerPage;
