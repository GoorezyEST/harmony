export function ParticlesVisualizer(
  bufferLength,
  x,
  barWidth,
  barHeight,
  dataArray,
  ctx,
  canvasReference,
  hueColor
) {
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];

    ctx.save();

    ctx.translate(canvasReference.width / 2, canvasReference.height / 2);

    ctx.rotate(i * bufferLength * 4);

    let brightness = i / 8; // Calculate brightness based on bar index
    brightness = Math.max(25, Math.min(brightness, 85)); // Clamp brightness between 25 and 85

    // Set fill style for the bar with hue gradient and calculated brightness
    ctx.fillStyle = `hsl(${hueColor}, 90%, ${brightness}%)`;

    ctx.beginPath();

    ctx.arc(0, barHeight, barHeight / 60, 0, Math.PI * 2);
    ctx.arc(0, barHeight / 1.25, barHeight / 120, 0, Math.PI * 2);
    ctx.arc(0, barHeight / 1.5, barHeight / 180, 0, Math.PI * 2);

    ctx.fill();

    x += barWidth;

    ctx.restore();
  }
}
