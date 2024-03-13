export function LeafsVisualizer(
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
    barHeight = dataArray[i] * 1.175;

    ctx.save();

    ctx.translate(canvasReference.width / 2, canvasReference.height / 2);

    ctx.rotate(i * 4);

    let brightness = i / 8; // Calculate brightness based on bar index
    brightness = Math.max(25, Math.min(brightness, 85)); // Clamp brightness between 25 and 85
    // Set fill style for the bar with hue gradient and calculated brightness
    ctx.fillStyle = `hsl(${hueColor}, 90%, ${brightness}%)`;

    ctx.fillRect(0, 0, barWidth, barHeight);

    x += barWidth;

    ctx.restore();
  }
}
