export function SetUpVisualizer(
  audio,
  hueColor,
  containerReference,
  glowEffectRef,
  bufferLength,
  dataArray
) {
  let totalIntensity = 0;

  for (let i = 0; i < bufferLength; i++) {
    totalIntensity += dataArray[i] * 1.25;
  }

  totalIntensity /= bufferLength;

  //Add a box-shadow to generate the glow effect based on the intensity
  glowEffectRef.style.boxShadow = `0 0 ${totalIntensity * 2}px ${
    (totalIntensity * 2) / 2
  }px hsl(${hueColor}, 0%, 60%, 0.8)`;

  //If the audio is paused set the default background
  if (audio !== undefined && audio.paused) {
    containerReference.style.background = standardBackground;
  }

  //If the audio is not paused set the background color to be in synto with the sound
  if (audio !== undefined && !audio.paused) {
    //Modify the background color to be in synto with the sound
    containerReference.style.background = `radial-gradient(
        circle,
        hsl(${hueColor}, 90%, 12%) 25%,
        hsl(${hueColor}, 90%, 10%) 50%,
        hsl(${hueColor}, 90%, 8%) 75%,
        hsl(${hueColor}, 90%, 6%) 100%
        )`;
  }
}
