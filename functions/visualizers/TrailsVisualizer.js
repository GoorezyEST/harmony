export function TrailsVisualizer(
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

    // Rotate bars in the opposite direction by reversing the rotation angle
    let angle = -i * 16;

    ctx.rotate(angle);

    let brightness = i / 8; // Calculate brightness based on bar index
    brightness = Math.max(25, Math.min(brightness, 85)); // Clamp brightness between 25 and 85
    // Set fill style for the bar with hue gradient and calculated brightness
    ctx.fillStyle = `hsl(${hueColor}, 90%, ${brightness}%)`;

    ctx.fillRect(0, 0, barWidth / 2, barHeight);
    ctx.fillRect(0, 0, barWidth / 4, barHeight);

    ctx.beginPath();

    ctx.arc(0, barHeight, barHeight / 60, 0, Math.PI * 2);

    ctx.fill();

    x += barWidth;

    ctx.restore();
  }
}
