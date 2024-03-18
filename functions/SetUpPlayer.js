import { EvzelynVisualizer } from "./visualizers/EvzelynVisualizer";
import { LeafsVisualizer } from "./visualizers/LeafsVisualizer";
import { LinesVisualizer } from "./visualizers/LinesVisualizer";
import { ParticlesVisualizer } from "./visualizers/ParticlesVisualizer";
import { TrailsVisualizer } from "./visualizers/TrailsVisualizer";

export const setUpPlayer = (
  audioReference,
  canvasReference,
  innerWidth,
  innerHeight,
  UserParameters,
  containerReference,
  glowEffectRef
) => {
  const ctx = canvasReference.getContext("2d");
  const songsQueue = UserParameters.length - 1;

  canvasReference.width = innerWidth;
  canvasReference.height = innerHeight;

  let currentSong = 0;
  let animationRequest;

  // Create audio context and analyzer outside the function
  const audioContext = new AudioContext();
  let audioSource;
  let analyser = audioContext.createAnalyser();

  //Variable to store the hue color
  let hueColor = 230;

  function playNextSong() {
    // Set audio source from selected file
    if (UserParameters[currentSong] && UserParameters[currentSong].audio) {
      audioReference.src = URL.createObjectURL(
        UserParameters[currentSong].audio
      );
    }

    audioReference.load(); // Load the audio file
    audioReference.play(); // Start playing the audio

    // Check if audio source is already connected
    if (!audioSource) {
      audioSource = audioContext.createMediaElementSource(audioReference);
      audioSource.connect(analyser);
    }
    analyser.connect(audioContext.destination);

    // Configure analyzer for frequency data
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Variables for drawing visualizer bars
    const barWidth = canvasReference.width / bufferLength;
    let barHeight;
    let x;

    // Animation loop for continuous visualization
    function animate() {
      let userVisualizer;
      if (UserParameters[currentSong].visualizer) {
        userVisualizer = retrieveVisualization(
          UserParameters[currentSong].visualizer
        );
      }

      x = 0;
      // Clear canvas for new frame
      ctx.clearRect(0, 0, canvasReference.width, canvasReference.height);
      // Get frequency data from analyzer
      analyser.getByteFrequencyData(dataArray);

      //Value to store the totalIntensity
      const totalIntensity = retrieveTotalIntensisty(bufferLength, dataArray);

      //Modifiyng the glow of the div
      glowEffectRef.style.boxShadow = `0 0 ${totalIntensity * 2}px ${
        (totalIntensity * 2) / 2
      }px hsl(${hueColor}, 90%, 60%, 0.8)`;

      //If the audio is not playing or undefined show standard background
      if (audioReference !== undefined || audioReference.paused) {
        containerReference.style.background = `radial-gradient(
        circle,
        hsl(0, 0%, 12%) 25%,
        hsl(0, 0%, 10%) 50%,
        hsl(0, 0%, 8%) 75%,
        hsl(0, 0%, 6%) 100%
      )`;
      }

      //If the audio is playing and not undefined show hue color background
      if (audioReference !== undefined && !audioReference.paused) {
        containerReference.style.background = `radial-gradient(circle, hsl(${hueColor}, 90%, 12%) 25%, hsl(${hueColor}, 90%, 10%) 50%,
    hsl(${hueColor}, 90%, 8%) 75%,
    hsl(${hueColor}, 90%, 6%) 100%)`;
      }

      //Add 0.25 to the hueColor each iteration
      if (hueColor === 360) {
        hueColor = 0;
      } else {
        hueColor += 0.25;
      }

      // Draw visualizer
      userVisualizer(
        bufferLength,
        x,
        barWidth,
        barHeight,
        dataArray,
        ctx,
        canvasReference,
        hueColor
      );
      // Schedule next animation frame
      animationRequest = requestAnimationFrame(animate);
    }

    // Start the animation
    animate();
  }

  playNextSong();

  audioReference.addEventListener("ended", () => {
    if (currentSong < songsQueue) {
      currentSong++;
      playNextSong();
      console.log("Next song triggered");
    } else {
      console.log("No more sounds");
    }
  });

  // Event listener for window resize
  window.addEventListener("resize", () => {
    // Update canvas dimensions
    canvasReference.width = window.innerWidth;
    canvasReference.height = window.innerHeight;
  });
};

//Function to retrieve the total instensity used to the glow animation
function retrieveTotalIntensisty(bufferLength, dataArray) {
  let totalIntensity = 0;

  for (let i = 0; i < bufferLength; i++) {
    totalIntensity += dataArray[i] * 1.25;
  }

  return (totalIntensity /= bufferLength);
}

function retrieveVisualization(param) {
  switch (true) {
    case param === "EvzelynVisualizer":
      return EvzelynVisualizer;
    case param === "LeafsVisualizer":
      return LeafsVisualizer;
    case param === "LinesVisualizer":
      return LinesVisualizer;
    case param === "ParticlesVisualizer":
      return ParticlesVisualizer;
    case param === "TrailsVisualizer":
      return TrailsVisualizer;
    default:
      return LeafsVisualizer;
  }
}
