"use client";

import { useEffect, useRef, useState } from "react";

/* ════════════════════════════════════════════
   DRAWING HELPERS
   ════════════════════════════════════════════ */

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
    const method = i === 0 ? "moveTo" : "lineTo";
    ctx[method](x + r * Math.cos(angle), y + r * Math.sin(angle));
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawMountain(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + w / 2, y - h);
  ctx.lineTo(x + w, y);
  ctx.closePath();
  ctx.fill();
}

function drawHouse(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, roofColor: string, wallColor: string) {
  ctx.fillStyle = wallColor;
  ctx.fillRect(x, y - h, w, h);
  ctx.fillStyle = roofColor;
  ctx.beginPath();
  ctx.moveTo(x - 4, y - h);
  ctx.lineTo(x + w / 2, y - h - h * 0.5);
  ctx.lineTo(x + w + 4, y - h);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#ffd700";
  ctx.fillRect(x + w * 0.35, y - h * 0.6, w * 0.15, w * 0.15);
  ctx.fillRect(x + w * 0.55, y - h * 0.6, w * 0.15, w * 0.15);
}

function drawGround(ctx: CanvasRenderingContext2D, w: number, groundY: number, h: number, color1: string, color2: string) {
  const grad = ctx.createLinearGradient(0, groundY, 0, groundY + h);
  grad.addColorStop(0, color1);
  grad.addColorStop(1, color2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, groundY, w, h);
}

function drawStickman(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, armAngle: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.5 * scale;
  ctx.lineCap = "round";
  const s = scale;
  // head
  ctx.beginPath();
  ctx.arc(x, y - 35 * s, 8 * s, 0, Math.PI * 2);
  ctx.fill();
  // body
  ctx.beginPath();
  ctx.moveTo(x, y - 27 * s);
  ctx.lineTo(x, y - 5 * s);
  ctx.stroke();
  // legs
  ctx.beginPath();
  ctx.moveTo(x, y - 5 * s);
  ctx.lineTo(x - 8 * s, y + 10 * s);
  ctx.moveTo(x, y - 5 * s);
  ctx.lineTo(x + 8 * s, y + 10 * s);
  ctx.stroke();
  // arms
  ctx.beginPath();
  ctx.moveTo(x, y - 20 * s);
  ctx.lineTo(x - 14 * s * Math.cos(armAngle), y - 20 * s - 14 * s * Math.sin(armAngle));
  ctx.moveTo(x, y - 20 * s);
  ctx.lineTo(x + 14 * s * Math.cos(armAngle), y - 20 * s - 14 * s * Math.sin(armAngle));
  ctx.stroke();
  ctx.restore();
}

function drawUnicorn(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, legPhase: number, facing: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale * facing, scale);
  const s = 1;
  // body
  ctx.fillStyle = "#e8e0f0";
  ctx.beginPath();
  ctx.ellipse(0, -15 * s, 30 * s, 16 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  // neck
  ctx.fillStyle = "#e8e0f0";
  ctx.beginPath();
  ctx.moveTo(22 * s, -25 * s);
  ctx.lineTo(30 * s, -50 * s);
  ctx.lineTo(38 * s, -48 * s);
  ctx.lineTo(28 * s, -20 * s);
  ctx.closePath();
  ctx.fill();
  // head
  ctx.beginPath();
  ctx.ellipse(34 * s, -54 * s, 10 * s, 8 * s, -0.3, 0, Math.PI * 2);
  ctx.fill();
  // horn
  ctx.fillStyle = "#ffd700";
  ctx.beginPath();
  ctx.moveTo(38 * s, -60 * s);
  ctx.lineTo(42 * s, -78 * s);
  ctx.lineTo(36 * s, -60 * s);
  ctx.closePath();
  ctx.fill();
  // eye
  ctx.fillStyle = "#2a1a3a";
  ctx.beginPath();
  ctx.arc(38 * s, -55 * s, 2.5 * s, 0, Math.PI * 2);
  ctx.fill();
  // mane (rainbow)
  const maneColors = ["#ff4466", "#ff8844", "#ffdd44", "#44dd66", "#4488ff", "#8844ff"];
  for (let i = 0; i < 6; i++) {
    ctx.strokeStyle = maneColors[i];
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo((25 - i * 2) * s, (-40 + i * 3) * s);
    ctx.quadraticCurveTo((20 - i * 3) * s, (-50 + i * 2) * s, (15 - i * 2) * s, (-35 + i * 4) * s);
    ctx.stroke();
  }
  // tail (rainbow)
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = maneColors[i];
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-28 * s, (-15 + i * 2) * s);
    ctx.quadraticCurveTo((-40 - i * 3) * s, (-25 + i * 5) * s, (-45 - i * 2) * s, (-10 + i * 4) * s);
    ctx.stroke();
  }
  // legs
  ctx.strokeStyle = "#d8d0e0";
  ctx.lineWidth = 4 * s;
  ctx.lineCap = "round";
  const legOff = Math.sin(legPhase) * 8;
  const legOff2 = Math.sin(legPhase + Math.PI) * 8;
  // front legs
  ctx.beginPath();
  ctx.moveTo(15 * s, 0);
  ctx.lineTo((15 + legOff) * s, 22 * s);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(20 * s, 0);
  ctx.lineTo((20 + legOff2) * s, 22 * s);
  ctx.stroke();
  // back legs
  ctx.beginPath();
  ctx.moveTo(-15 * s, 0);
  ctx.lineTo((-15 + legOff2) * s, 22 * s);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-20 * s, 0);
  ctx.lineTo((-20 + legOff) * s, 22 * s);
  ctx.stroke();
  // hooves
  ctx.fillStyle = "#aaa";
  [15 + legOff, 20 + legOff2, -15 + legOff2, -20 + legOff].forEach((lx) => {
    ctx.beginPath();
    ctx.ellipse(lx * s, 23 * s, 3 * s, 2 * s, 0, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function drawRainbowArc(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, startAngle: number, endAngle: number, alpha: number) {
  const colors = ["#ff4466", "#ff8844", "#ffdd44", "#44dd66", "#4488ff", "#8844ff"];
  ctx.save();
  ctx.globalAlpha = alpha;
  colors.forEach((c, i) => {
    ctx.strokeStyle = c;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(x, y, r - i * 7, startAngle, endAngle);
    ctx.stroke();
  });
  ctx.restore();
}

function drawParticles(ctx: CanvasRenderingContext2D, particles: { x: number; y: number; r: number; color: string; alpha: number }[]) {
  particles.forEach((p) => {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, size: number, color: string, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.font = `bold ${size}px monospace`;
  ctx.textAlign = "center";
  ctx.fillText(text, x, y);
  ctx.restore();
}

/* ════════════════════════════════════════════
   SCENE RENDERERS
   ════════════════════════════════════════════ */

function renderScene1(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  // sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
  skyGrad.addColorStop(0, "#1a1a3e");
  skyGrad.addColorStop(0.6, "#2d2d5e");
  skyGrad.addColorStop(1, "#3a4a3a");
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // stars
  const seed = [0.1, 0.3, 0.5, 0.15, 0.7, 0.85, 0.45, 0.62, 0.28, 0.92, 0.38, 0.78];
  seed.forEach((s, i) => {
    drawStar(ctx, s * w, (seed[(i + 3) % seed.length]) * h * 0.5, 1.5 + (i % 3), 0.3 + Math.sin(t * 3 + i) * 0.2);
  });

  const groundY = h * 0.72;

  // mountains
  drawMountain(ctx, w * 0.05, groundY, w * 0.35, h * 0.3, "#2a3a2a");
  drawMountain(ctx, w * 0.25, groundY, w * 0.4, h * 0.38, "#1e2e1e");
  drawMountain(ctx, w * 0.55, groundY, w * 0.35, h * 0.25, "#2a3a2a");
  drawText(ctx, "Esja", w * 0.45, groundY - h * 0.32, 14, "#ffffff", 0.3);

  // ground
  drawGround(ctx, w, groundY, h - groundY, "#2a4a2a", "#1a3a1a");

  // flowers
  const flowers = ["🌷", "🌻", "🌸", "🌺"];
  flowers.forEach((f, i) => {
    ctx.font = "16px serif";
    ctx.fillText(f, w * 0.15 + i * w * 0.18, groundY + 18);
  });

  // unicorn: stays right side
  const unicornX = w * 0.65;
  const unicornY = groundY - 2;
  drawUnicorn(ctx, unicornX, unicornY, 1.0, 0, -1);

  // steinar: walks from left to unicorn
  if (t < 0.5) {
    // walking phase
    const walkT = t / 0.5;
    const sX = lerp(w * -0.05, unicornX - 60, Math.min(walkT, 1));
    const armAngle = Math.sin(walkT * 20) * 0.4 + 0.3;
    drawStickman(ctx, sX, unicornY + 10, 1.2, armAngle, "#ffffff");
    if (walkT > 0.7) {
      // hearts
      const heartAlpha = (walkT - 0.7) / 0.3;
      drawText(ctx, "♥", sX + 30, unicornY - 40, 20, "#ff6688", heartAlpha * Math.sin(t * 10) * 0.5 + 0.5);
      drawText(ctx, "♥", sX + 45, unicornY - 55, 14, "#ff6688", heartAlpha * Math.sin(t * 10 + 1) * 0.5 + 0.5);
    }
  } else if (t < 0.75) {
    // mounting phase - steinar rises up
    const mountT = (t - 0.5) / 0.25;
    const sX = unicornX;
    const sY = lerp(unicornY + 10, unicornY - 45, mountT);
    drawStickman(ctx, sX, sY, 1.2, 0.8, "#ffffff");
    drawText(ctx, "♥ ♥ ♥", unicornX, unicornY - 70, 16, "#ff6688", 0.8);
  } else {
    // mounted! celebration
    const celT = (t - 0.75) / 0.25;
    drawStickman(ctx, unicornX, unicornY - 45, 1.2, Math.PI * 0.4 + Math.sin(celT * 15) * 0.3, "#ffffff");
    drawText(ctx, "READY!", unicornX + 50, unicornY - 80, 18 + Math.sin(celT * 8) * 3, "#ffd700", 0.6 + celT * 0.4);
    // sparkles
    for (let i = 0; i < 8; i++) {
      const angle = celT * 4 + i * 0.8;
      const dist = 40 + celT * 30;
      drawStar(ctx, unicornX + Math.cos(angle) * dist, unicornY - 30 + Math.sin(angle) * dist * 0.6, 2, celT * 0.7);
    }
  }

  // scene title
  drawText(ctx, "Chapter I: The Meeting", w / 2, h * 0.92, 16, "#88ccff", 0.4);
}

function renderScene2(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  // sky transitions from dusk to sunset
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
  skyGrad.addColorStop(0, t < 0.5 ? "#1a1a3e" : `hsl(${lerp(240, 30, (t - 0.5) * 2)}, 40%, ${lerp(15, 25, t)}%)`);
  skyGrad.addColorStop(0.5, t < 0.5 ? "#2d2d5e" : `hsl(${lerp(240, 20, (t - 0.5) * 2)}, 50%, ${lerp(20, 40, t)}%)`);
  skyGrad.addColorStop(1, "#2a3a2a");
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // stars (fade out as sun comes)
  const starAlpha = Math.max(0, 1 - t * 2);
  for (let i = 0; i < 15; i++) {
    drawStar(ctx, ((i * 97 + 33) % 100) / 100 * w, ((i * 53 + 17) % 50) / 100 * h, 1.5, starAlpha * (0.3 + Math.sin(t * 5 + i) * 0.15));
  }

  const groundY = h * 0.72;

  // scrolling mountains (parallax)
  const mScroll = t * w * 2;
  for (let i = 0; i < 6; i++) {
    const mx = (i * w * 0.4 - mScroll * 0.3) % (w * 2.4) - w * 0.4;
    drawMountain(ctx, mx, groundY, w * 0.35, h * (0.2 + (i % 3) * 0.08), `hsl(${150 + i * 10}, 20%, ${15 + i * 3}%)`);
  }

  // ground
  drawGround(ctx, w, groundY, h - groundY, "#2a4a2a", "#1a3a1a");

  // scrolling houses
  for (let i = 0; i < 5; i++) {
    const hx = (i * w * 0.3 - mScroll * 0.6) % (w * 1.5) - w * 0.2;
    const hh = 40 + (i % 3) * 15;
    drawHouse(ctx, hx, groundY, 45, hh, `hsl(${i * 60}, 50%, 40%)`, `hsl(${i * 60 + 20}, 30%, 60%)`);
  }

  // scrolling flowers
  for (let i = 0; i < 10; i++) {
    const fx = (i * w * 0.15 - mScroll * 0.8) % (w * 1.5) - w * 0.1;
    ctx.font = "14px serif";
    ctx.fillText(["🌷", "🌻", "🌸", "🌺"][i % 4], fx, groundY + 16);
  }

  // street signs scrolling past
  const signs = ["HÁHOLT", "ÞRENGSLAVEGUR", "MOSFELLSBAKARÍ", "ÁLAFOSS"];
  const signIdx = Math.min(Math.floor(t * signs.length), signs.length - 1);
  const signAlpha = 1 - ((t * signs.length) % 1);
  drawText(ctx, signs[signIdx], w * 0.2, groundY + 40, 12, "#aaddaa", Math.max(0, signAlpha));

  // unicorn galloping with steinar
  const unicornX = w * 0.55;
  const unicornY = groundY - 2;
  const gallop = Math.sin(t * 60) * 6;
  drawUnicorn(ctx, unicornX, unicornY + gallop, 1.1, t * 30, 1);
  drawStickman(ctx, unicornX, unicornY - 45 + gallop, 1.2, Math.PI * 0.35 + Math.sin(t * 30) * 0.15, "#ffffff");

  // rainbow trail behind
  const trailLen = Math.min(t * 3, 1);
  if (trailLen > 0) {
    const colors = ["#ff4466", "#ff8844", "#ffdd44", "#44dd66", "#4488ff", "#8844ff"];
    colors.forEach((c, i) => {
      ctx.save();
      ctx.globalAlpha = trailLen * 0.5;
      ctx.strokeStyle = c;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(unicornX - 40, unicornY - 10 + i * 5 + gallop);
      ctx.quadraticCurveTo(
        unicornX - 80 - trailLen * 100, unicornY - 30 + i * 6 + gallop,
        unicornX - 120 - trailLen * 150, unicornY + 10 + i * 4 + gallop
      );
      ctx.stroke();
      ctx.restore();
    });
  }

  // sparkle particles
  for (let i = 0; i < 12; i++) {
    const px = unicornX - 50 - Math.random() * 100 * trailLen;
    const py = unicornY - 20 + Math.random() * 40 + gallop;
    drawStar(ctx, px, py, 1.5, Math.random() * 0.4 * trailLen);
  }

  // sun appearing in later part
  if (t > 0.5) {
    const sunT = (t - 0.5) * 2;
    const sunY = lerp(h * 0.5, h * 0.15, sunT);
    ctx.save();
    ctx.globalAlpha = sunT * 0.8;
    ctx.fillStyle = "#ffcc44";
    ctx.shadowColor = "#ffaa00";
    ctx.shadowBlur = 40;
    ctx.beginPath();
    ctx.arc(w * 0.85, sunY, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  drawText(ctx, "Chapter II: The Ride", w / 2, h * 0.92, 16, "#ff88cc", 0.4);
}

function renderScene3(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  // sky: sunset → night → space
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
  if (t < 0.3) {
    skyGrad.addColorStop(0, `hsl(260, 40%, ${lerp(20, 10, t / 0.3)}%)`);
    skyGrad.addColorStop(1, `hsl(30, 50%, ${lerp(30, 15, t / 0.3)}%)`);
  } else {
    skyGrad.addColorStop(0, `hsl(260, 60%, ${lerp(10, 5, (t - 0.3) / 0.7)}%)`);
    skyGrad.addColorStop(1, `hsl(260, 40%, ${lerp(15, 8, (t - 0.3) / 0.7)}%)`);
  }
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // stars get brighter as we ascend
  const starBright = Math.min(1, t * 2);
  for (let i = 0; i < 30; i++) {
    const sx = ((i * 73 + 11) % 100) / 100 * w;
    const sy = ((i * 47 + 29) % 100) / 100 * h;
    drawStar(ctx, sx, sy, 1 + (i % 3) * 0.5, starBright * (0.2 + Math.sin(t * 4 + i) * 0.15));
  }

  const groundY = h * 0.75;

  // ground shrinks down as we fly up
  if (t < 0.7) {
    const gScale = 1 - t;
    const gY = lerp(groundY, h + 50, t * 1.2);

    // mountains
    ctx.save();
    ctx.translate(w / 2, gY);
    ctx.scale(gScale + 0.3, gScale + 0.3);
    ctx.translate(-w / 2, 0);
    drawMountain(ctx, w * 0.1, 0, w * 0.3, h * 0.25, "#2a3a2a");
    drawMountain(ctx, w * 0.3, 0, w * 0.35, h * 0.32, "#1e2e1e");
    drawMountain(ctx, w * 0.55, 0, w * 0.3, h * 0.2, "#2a3a2a");
    drawGround(ctx, w * 2, 0, h * 0.5, "#2a4a2a", "#1a3a1a");
    drawText(ctx, "MOSFELLSBÆR", w / 2, 30, 14, "#88cc88", 0.5 * gScale);

    // tiny houses
    for (let i = 0; i < 4; i++) {
      drawHouse(ctx, w * 0.2 + i * 60, 0, 30, 25, `hsl(${i * 70}, 40%, 40%)`, `hsl(${i * 70}, 25%, 55%)`);
    }
    ctx.restore();
  }

  // rainbow trail from ground up
  if (t > 0.05) {
    const trailT = Math.min(1, (t - 0.05) / 0.5);
    const colors = ["#ff4466", "#ff8844", "#ffdd44", "#44dd66", "#4488ff", "#8844ff"];
    colors.forEach((c, i) => {
      ctx.save();
      ctx.globalAlpha = trailT * 0.6;
      ctx.strokeStyle = c;
      ctx.lineWidth = 8 - i;
      ctx.beginPath();
      const startY = Math.min(h, lerp(groundY, h + 100, t));
      const endY = lerp(groundY - 20, h * 0.15, t);
      ctx.moveTo(w / 2 - 15 + i * 6, startY);
      ctx.quadraticCurveTo(
        w / 2 - 30 + i * 10 + Math.sin(t * 5 + i) * 20,
        (startY + endY) / 2,
        w / 2 + Math.sin(t * 3) * 10,
        endY + 50
      );
      ctx.stroke();
      ctx.restore();
    });
  }

  // unicorn + steinar flying up
  const flyX = w / 2 + Math.sin(t * 8) * 30;
  const flyY = lerp(groundY - 10, h * 0.18, Math.min(1, t * 1.3));
  const tilt = Math.sin(t * 6) * 0.1;
  ctx.save();
  ctx.translate(flyX, flyY);
  ctx.rotate(tilt);
  ctx.translate(-flyX, -flyY);
  drawUnicorn(ctx, flyX, flyY, lerp(1, 0.8, t), t * 20, 1);
  drawStickman(ctx, flyX, flyY - 45, lerp(1.2, 1, t), Math.PI * 0.4, "#ffffff");
  ctx.restore();

  // sparkle burst around them
  const sparkleCount = Math.floor(t * 20);
  for (let i = 0; i < sparkleCount; i++) {
    const angle = (i / sparkleCount) * Math.PI * 2 + t * 3;
    const dist = 50 + Math.sin(t * 5 + i) * 20;
    drawStar(ctx, flyX + Math.cos(angle) * dist, flyY - 20 + Math.sin(angle) * dist * 0.5, 2, 0.3 + Math.sin(t * 8 + i) * 0.2);
  }

  // text at the end
  if (t > 0.8) {
    const fadeT = (t - 0.8) / 0.2;
    drawText(ctx, "G O N E", w / 2, h * 0.45, 28 + fadeT * 8, "#ffd700", fadeT * 0.8);
    drawText(ctx, "into the stars", w / 2, h * 0.52, 14, "#aaaaff", fadeT * 0.5);
  }

  drawText(ctx, "Chapter III: The Ascension", w / 2, h * 0.92, 16, "#ffdd88", 0.4);
}

/* ════════════════════════════════════════════
   STICKY CANVAS SCENE
   ════════════════════════════════════════════ */

function CanvasScene({
  render,
  scrollHeight,
  title,
  subtitle,
}: {
  render: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;
  scrollHeight: string;
  title: string;
  subtitle: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tick = () => {
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      if (scrollable > 0) {
        const raw = Math.max(0, Math.min(1, -rect.top / scrollable));
        progressRef.current = raw;
        setProgress(raw);
      }
      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      ctx.clearRect(0, 0, cw, ch);
      render(ctx, cw, ch, progressRef.current);
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [render]);

  return (
    <div ref={containerRef} style={{ height: scrollHeight }} className="relative">
      <div className="sticky top-0 h-screen">
        {/* Progress UI */}
        <div className="absolute top-4 left-4 right-4 sm:left-6 sm:right-6 z-20">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs sm:text-sm font-bold text-white/60">{title}</p>
            <p className="text-white/20 text-xs font-mono">{Math.round(progress * 100)}%</p>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-white/30 rounded-full transition-all duration-75" style={{ width: `${progress * 100}%` }} />
          </div>
          <p className="text-white/15 text-[10px] sm:text-xs mt-1 italic">{subtitle}</p>
        </div>

        <canvas ref={canvasRef} className="w-full h-full" />

        {progress < 0.05 && (
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/20 text-xs animate-bounce">↓ scroll to animate ↓</p>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   QUOTE BREAK
   ════════════════════════════════════════════ */

function QuoteBreak({ quote, author }: { quote: string; author: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <section ref={ref} className="min-h-[60vh] flex items-center justify-center px-4">
      <div className={`max-w-3xl text-center transition-all duration-1000 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <p className="text-2xl sm:text-4xl md:text-5xl font-bold text-white/80 leading-tight mb-6">&ldquo;{quote}&rdquo;</p>
        <p className="text-white/25 text-sm italic">{author}</p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   MAIN
   ════════════════════════════════════════════ */

export default function Home() {
  return (
    <main className="min-h-screen bg-[#06060a] text-white">
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight mb-4">
          <span className="rainbow-text">Steinar Freyr</span><br />
          <span className="text-white/90">Kjartansson</span>
        </h1>
        <p className="text-lg sm:text-2xl text-white/40 mb-2">The Unicorn Rider of Mosfellsbær</p>
        <p className="text-white/15 text-sm max-w-md mt-4">A scroll-driven canvas saga in three chapters</p>
        <p className="absolute bottom-8 text-white/20 text-sm animate-bounce">↓</p>
      </section>

      {/* Scene 1 */}
      <CanvasScene
        render={renderScene1}
        scrollHeight="500vh"
        title="Chapter I: The Meeting"
        subtitle="Steinar approaches the unicorn in a field outside Mosfellsbær"
      />

      <QuoteBreak quote="To be, or not to be — that is the password." author="— William Shakespeare (IT department)" />

      {/* Scene 2 */}
      <CanvasScene
        render={renderScene2}
        scrollHeight="500vh"
        title="Chapter II: The Ride"
        subtitle="Through the streets at full gallop, leaving rainbows in his wake"
      />

      <QuoteBreak quote="One small step for man, one giant leap for a man on a unicorn." author="— Neil Armstrong (Mosfellsbær observatory)" />

      {/* Scene 3 */}
      <CanvasScene
        render={renderScene3}
        scrollHeight="500vh"
        title="Chapter III: The Ascension"
        subtitle="What goes up... doesn't always come down"
      />

      <QuoteBreak quote="The only thing we have to fear is running out of kleina." author="— Franklin D. Roosevelt (Bónus loyalty member)" />

      {/* Finale */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <p className="text-6xl sm:text-8xl mb-8">🦄</p>
        <h2 className="text-3xl sm:text-5xl font-black rainbow-text mb-6">Long live Steinar Freyr.</h2>
        <p className="text-white/30 text-lg mb-1">Long live the unicorn.</p>
        <p className="text-white/30 text-lg mb-8">Long live Mosfellsbær.</p>
        <p className="text-white/10 text-xs mt-4">🌈 This page is blessed. Your device now runs 12% faster. 🌈</p>
      </section>

      <footer className="border-t border-white/5 py-6 px-4 text-center text-white/10 text-xs">
        <p>100% factual. 🦄 &copy; 2026 Unicorn Preservation Society of Mosfellsbær</p>
      </footer>
    </main>
  );
}
