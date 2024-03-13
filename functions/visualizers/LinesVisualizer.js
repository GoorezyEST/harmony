export function LinesVisualizer(
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
    barHeight = dataArray[i] * 1.425;

    // Save current canvas state for transformations
    ctx.save();

    // Move to center of canvas
    ctx.translate(canvasReference.width / 2, canvasReference.height / 2);

    // Rotate each bar for a circular pattern
    ctx.rotate(i + (Math.PI * 0.5) / bufferLength);

    let brightness = i / 8; // Calculate brightness based on bar index
    brightness = Math.max(25, Math.min(brightness, 85)); // Clamp brightness between 25 and 85

    // Set fill style for the bar with hue gradient and calculated brightness
    ctx.fillStyle = `hsl(${hueColor}, 90%, ${brightness}%)`;

    // Draw the bar
    ctx.fillRect(0, 0, barWidth, barHeight / 1.25);

    // Move to the next bar position
    x += barWidth;

    // Restore previous canvas state
    ctx.restore();
  }
}
