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

function drawFirework(ctx: CanvasRenderingContext2D, cx: number, cy: number, age: number, color: string, seed: number) {
  const particleCount = 40;
  const maxR = 120 + seed * 60;
  const gravity = age * age * 80;

  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2 + seed;
    const speed = 0.6 + ((i * 7 + seed * 13) % 10) / 10 * 0.8;
    const r = age * maxR * speed;
    const px = cx + Math.cos(angle) * r + Math.sin(seed * 3 + i) * age * 15;
    const py = cy + Math.sin(angle) * r + gravity;
    const alpha = Math.max(0, 1 - age * 1.2) * (0.6 + Math.sin(i + age * 10) * 0.4);
    const size = lerp(4, 1, age);

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(px, py, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // trailing spark
    if (age < 0.7) {
      ctx.save();
      ctx.globalAlpha = alpha * 0.3;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      const trailR = r * 0.7;
      ctx.moveTo(cx + Math.cos(angle) * trailR + Math.sin(seed * 3 + i) * age * 10, cy + Math.sin(angle) * trailR + gravity * 0.6);
      ctx.lineTo(px, py);
      ctx.stroke();
      ctx.restore();
    }
  }

  // center flash at birth
  if (age < 0.15) {
    const flashAlpha = (1 - age / 0.15) * 0.8;
    ctx.save();
    ctx.globalAlpha = flashAlpha;
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = color;
    ctx.shadowBlur = 60;
    ctx.beginPath();
    ctx.arc(cx, cy, 8 * (1 - age / 0.15), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawShockwave(ctx: CanvasRenderingContext2D, cx: number, cy: number, age: number) {
  const r = age * 300;
  const alpha = Math.max(0, 1 - age) * 0.6;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = lerp(8, 1, age);
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  // inner rainbow ring
  const colors = ["#ff4466", "#ff8844", "#ffdd44", "#44dd66", "#4488ff"];
  colors.forEach((c, i) => {
    ctx.globalAlpha = alpha * 0.4;
    ctx.strokeStyle = c;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r * (0.85 + i * 0.03), 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.restore();
}

function renderScene3(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  // PHASES:
  // 0.00 - 0.45: ascending
  // 0.45 - 0.50: shaking, glowing, about to blow
  // 0.50 - 0.55: EXPLOSION + white flash
  // 0.55 - 1.00: fireworks show

  const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
  if (t < 0.5) {
    const dark = Math.min(1, t / 0.45);
    skyGrad.addColorStop(0, `hsl(260, ${lerp(40, 70, dark)}%, ${lerp(20, 4, dark)}%)`);
    skyGrad.addColorStop(1, `hsl(260, ${lerp(30, 50, dark)}%, ${lerp(15, 6, dark)}%)`);
  } else {
    skyGrad.addColorStop(0, "#0a0a14");
    skyGrad.addColorStop(1, "#0d0d1a");
  }
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // stars
  const starBright = Math.min(1, t * 2.5);
  for (let i = 0; i < 40; i++) {
    const sx = ((i * 73 + 11) % 100) / 100 * w;
    const sy = ((i * 47 + 29) % 100) / 100 * h;
    drawStar(ctx, sx, sy, 1 + (i % 3) * 0.5, starBright * (0.15 + Math.sin(t * 4 + i) * 0.1));
  }

  const groundY = h * 0.75;
  const explodeX = w / 2;
  const explodeY = h * 0.3;

  // ===== ASCENDING PHASE =====
  if (t < 0.5) {
    const ascendT = t / 0.45;

    // ground shrinking
    if (ascendT < 1.2) {
      const gScale = Math.max(0, 1 - ascendT * 0.8);
      const gY = lerp(groundY, h + 80, ascendT);
      ctx.save();
      ctx.translate(w / 2, gY);
      ctx.scale(gScale + 0.2, gScale + 0.2);
      ctx.translate(-w / 2, 0);
      drawMountain(ctx, w * 0.1, 0, w * 0.3, h * 0.25, "#2a3a2a");
      drawMountain(ctx, w * 0.3, 0, w * 0.35, h * 0.32, "#1e2e1e");
      drawMountain(ctx, w * 0.55, 0, w * 0.3, h * 0.2, "#2a3a2a");
      drawGround(ctx, w * 2, 0, h * 0.5, "#2a4a2a", "#1a3a1a");
      drawText(ctx, "MOSFELLSBÆR", w / 2, 30, 14, "#88cc88", 0.4 * gScale);
      for (let i = 0; i < 4; i++) {
        drawHouse(ctx, w * 0.2 + i * 60, 0, 30, 25, `hsl(${i * 70}, 40%, 40%)`, `hsl(${i * 70}, 25%, 55%)`);
      }
      ctx.restore();
    }

    // rainbow trail
    const trailT = Math.min(1, ascendT);
    const colors = ["#ff4466", "#ff8844", "#ffdd44", "#44dd66", "#4488ff", "#8844ff"];
    colors.forEach((c, i) => {
      ctx.save();
      ctx.globalAlpha = trailT * 0.6;
      ctx.strokeStyle = c;
      ctx.lineWidth = 8 - i;
      ctx.beginPath();
      const startY = Math.min(h + 20, lerp(groundY, h + 100, ascendT));
      const endY = lerp(groundY - 20, explodeY, Math.min(1, ascendT));
      ctx.moveTo(w / 2 - 15 + i * 6, startY);
      ctx.quadraticCurveTo(w / 2 - 20 + i * 8 + Math.sin(t * 5 + i) * 15, (startY + endY) / 2, w / 2 + Math.sin(t * 3) * 8, endY + 50);
      ctx.stroke();
      ctx.restore();
    });

    // unicorn + steinar flying up
    const flyX = w / 2 + Math.sin(t * 8) * 30;
    const flyY = lerp(groundY - 10, explodeY, Math.min(1, ascendT));

    // pre-explosion shake (last 10% of ascent)
    let shakeX = 0, shakeY = 0;
    if (t > 0.40) {
      const shakeT = (t - 0.40) / 0.10;
      const intensity = shakeT * 12;
      shakeX = Math.sin(t * 120) * intensity;
      shakeY = Math.cos(t * 97) * intensity;

      // growing glow around them
      ctx.save();
      ctx.globalAlpha = shakeT * 0.5;
      const glowR = 30 + shakeT * 50;
      const glowGrad = ctx.createRadialGradient(flyX + shakeX, flyY + shakeY - 20, 0, flyX + shakeX, flyY + shakeY - 20, glowR);
      glowGrad.addColorStop(0, "#ffffff");
      glowGrad.addColorStop(0.3, "#ffd700");
      glowGrad.addColorStop(0.7, "#ff6600");
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(flyX + shakeX - glowR, flyY + shakeY - 20 - glowR, glowR * 2, glowR * 2);
      ctx.restore();
    }

    const tilt = Math.sin(t * 6) * 0.1;
    ctx.save();
    ctx.translate(flyX + shakeX, flyY + shakeY);
    ctx.rotate(tilt);
    ctx.translate(-(flyX + shakeX), -(flyY + shakeY));
    drawUnicorn(ctx, flyX + shakeX, flyY + shakeY, lerp(1, 0.85, ascendT), t * 20, 1);
    drawStickman(ctx, flyX + shakeX, flyY + shakeY - 45, lerp(1.2, 1, ascendT), Math.PI * 0.4, "#ffffff");
    ctx.restore();

    // sparkle orbit
    const sparkleCount = Math.floor(ascendT * 15);
    for (let i = 0; i < sparkleCount; i++) {
      const angle = (i / sparkleCount) * Math.PI * 2 + t * 3;
      const dist = 40 + Math.sin(t * 5 + i) * 15;
      drawStar(ctx, flyX + Math.cos(angle) * dist + shakeX, flyY - 20 + Math.sin(angle) * dist * 0.5 + shakeY, 2, 0.4);
    }
  }

  // ===== EXPLOSION FLASH =====
  if (t >= 0.50 && t < 0.58) {
    const flashT = (t - 0.50) / 0.08;
    // white flash
    ctx.save();
    ctx.globalAlpha = Math.max(0, 1 - flashT * 1.5) * 0.9;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.restore();

    // shockwave
    drawShockwave(ctx, explodeX, explodeY, flashT);
  }

  // ===== FIREWORKS SHOW =====
  if (t >= 0.50) {
    const showT = (t - 0.50) / 0.50; // 0→1 over the firework show

    // firework definitions: [delay, x, y, color, seed]
    const fireworks: [number, number, number, string, number][] = [
      // first burst — center, the explosion itself
      [0.00, 0.50, 0.30, "#ffd700", 1.0],
      [0.00, 0.50, 0.30, "#ff4466", 2.3],
      // spreading show
      [0.10, 0.25, 0.25, "#ff4466", 3.1],
      [0.15, 0.75, 0.20, "#44ddff", 4.7],
      [0.22, 0.40, 0.15, "#ffdd44", 5.2],
      [0.28, 0.60, 0.35, "#ff88ff", 6.8],
      [0.33, 0.20, 0.40, "#44ff88", 7.3],
      [0.38, 0.80, 0.18, "#ff6644", 8.1],
      [0.43, 0.50, 0.20, "#88aaff", 9.5],
      [0.48, 0.35, 0.30, "#ffaa44", 10.2],
      [0.52, 0.65, 0.25, "#ff44aa", 11.7],
      [0.56, 0.15, 0.22, "#44ffdd", 12.3],
      [0.60, 0.85, 0.32, "#ddff44", 13.6],
      [0.64, 0.50, 0.15, "#ff4444", 14.1],
      [0.64, 0.50, 0.15, "#ffffff", 14.8],
      [0.68, 0.30, 0.35, "#aa88ff", 15.2],
      [0.72, 0.70, 0.22, "#ffdd88", 16.7],
      // grand finale burst
      [0.80, 0.50, 0.30, "#ffd700", 17.0],
      [0.80, 0.35, 0.25, "#ff4466", 17.5],
      [0.80, 0.65, 0.25, "#44ddff", 18.0],
      [0.80, 0.50, 0.18, "#ff88ff", 18.5],
      [0.82, 0.20, 0.30, "#44ff88", 19.0],
      [0.82, 0.80, 0.30, "#ff6644", 19.5],
      [0.82, 0.50, 0.40, "#ffdd44", 20.0],
      [0.85, 0.40, 0.20, "#ffffff", 20.5],
      [0.85, 0.60, 0.20, "#ffd700", 21.0],
    ];

    fireworks.forEach(([delay, fx, fy, color, seed]) => {
      const age = showT - delay;
      if (age > 0 && age < 0.35) {
        drawFirework(ctx, fx * w, fy * h, age / 0.35, color, seed);
      }
    });

    // falling sparkle dust (accumulates over time)
    const dustCount = Math.floor(showT * 80);
    for (let i = 0; i < dustCount; i++) {
      const seed = i * 137.508;
      const dx = (Math.sin(seed) * 0.5 + 0.5) * w;
      const born = (i / 80);
      const dAge = showT - born;
      if (dAge > 0 && dAge < 0.5) {
        const dy = (Math.cos(seed * 0.7) * 0.3 + 0.2) * h + dAge * 200;
        const da = Math.max(0, 1 - dAge * 3) * 0.4;
        const colors = ["#ffd700", "#ff4466", "#44ddff", "#ff88ff", "#44ff88"];
        ctx.save();
        ctx.globalAlpha = da;
        ctx.fillStyle = colors[i % colors.length];
        ctx.beginPath();
        ctx.arc(dx + Math.sin(dAge * 5 + seed) * 10, dy, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // text fades in during the show
    if (showT > 0.3) {
      const textAlpha = Math.min(1, (showT - 0.3) / 0.3);
      drawText(ctx, "L E G E N D A R Y", w / 2, h * 0.55, 20 + showT * 10, "#ffd700", textAlpha * 0.7);
    }
    if (showT > 0.6) {
      const textAlpha = Math.min(1, (showT - 0.6) / 0.3);
      drawText(ctx, "Steinar Freyr Kjartansson", w / 2, h * 0.62, 16, "#ffffff", textAlpha * 0.6);
      drawText(ctx, "has left the atmosphere", w / 2, h * 0.67, 14, "#aaaaff", textAlpha * 0.4);
    }
  }

  drawText(ctx, "Chapter III: The Ascension", w / 2, h * 0.94, 16, "#ffdd88", 0.3);
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
   FLAPPY UNICORN
   ════════════════════════════════════════════ */

const GAME_W = 400;
const GAME_H = 500;
const PIPE_W = 52;
const PIPE_GAP = 130;
const GRAVITY = 0.45;
const FLAP_VEL = -7;
const PIPE_SPEED = 2.5;
const UNICORN_SIZE = 24;

type Pipe = { x: number; topH: number; scored: boolean };
type GameState = "idle" | "playing" | "dead";

function getHighScores(): { name: string; score: number }[] {
  try {
    const raw = localStorage.getItem("flappy-unicorn-scores");
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveHighScore(score: number) {
  const scores = getHighScores();
  scores.push({ name: "Player", score });
  scores.sort((a, b) => b.score - a.score);
  const top5 = scores.slice(0, 5);
  localStorage.setItem("flappy-unicorn-scores", JSON.stringify(top5));
  return top5;
}

function FlappyUnicorn() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    gameState: GameState;
    y: number;
    vel: number;
    pipes: Pipe[];
    score: number;
    frame: number;
    bestScores: { name: string; score: number }[];
    flashTimer: number;
  }>({
    gameState: "idle",
    y: GAME_H / 2,
    vel: 0,
    pipes: [],
    score: 0,
    frame: 0,
    bestScores: [],
    flashTimer: 0,
  });
  const rafRef = useRef<number>(0);
  const [, forceRender] = useState(0);

  useEffect(() => {
    stateRef.current.bestScores = getHighScores();
    forceRender((n) => n + 1);
  }, []);

  const resetGame = () => {
    const s = stateRef.current;
    s.y = GAME_H / 2;
    s.vel = 0;
    s.pipes = [];
    s.score = 0;
    s.frame = 0;
    s.flashTimer = 0;
    s.gameState = "playing";
  };

  const flap = () => {
    const s = stateRef.current;
    if (s.gameState === "idle" || s.gameState === "dead") {
      resetGame();
      startLoop();
      return;
    }
    if (s.gameState === "playing") {
      s.vel = FLAP_VEL;
    }
  };

  const startLoop = () => {
    cancelAnimationFrame(rafRef.current);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const loop = () => {
      const s = stateRef.current;
      if (s.gameState !== "playing" && s.gameState !== "dead") return;

      if (s.gameState === "playing") {
        s.frame++;
        s.vel += GRAVITY;
        s.y += s.vel;

        // spawn pipes
        if (s.frame % 90 === 0) {
          const topH = 60 + Math.random() * (GAME_H - PIPE_GAP - 120);
          s.pipes.push({ x: GAME_W, topH, scored: false });
        }

        // move pipes
        s.pipes.forEach((p) => { p.x -= PIPE_SPEED; });
        s.pipes = s.pipes.filter((p) => p.x > -PIPE_W);

        // score
        s.pipes.forEach((p) => {
          if (!p.scored && p.x + PIPE_W < GAME_W * 0.25) {
            p.scored = true;
            s.score++;
            s.flashTimer = 8;
          }
        });

        // collision
        const ux = GAME_W * 0.25;
        const uy = s.y;
        const ur = UNICORN_SIZE / 2;

        if (uy - ur < 0 || uy + ur > GAME_H) {
          s.gameState = "dead";
          s.bestScores = saveHighScore(s.score);
          forceRender((n) => n + 1);
        }

        for (const p of s.pipes) {
          if (ux + ur > p.x && ux - ur < p.x + PIPE_W) {
            if (uy - ur < p.topH || uy + ur > p.topH + PIPE_GAP) {
              s.gameState = "dead";
              s.bestScores = saveHighScore(s.score);
              forceRender((n) => n + 1);
              break;
            }
          }
        }

        if (s.flashTimer > 0) s.flashTimer--;
      }

      // === DRAW ===
      // bg sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, GAME_H);
      sky.addColorStop(0, "#1a1a3e");
      sky.addColorStop(1, "#2a4a3a");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, GAME_W, GAME_H);

      // stars
      for (let i = 0; i < 12; i++) {
        ctx.save();
        ctx.globalAlpha = 0.3 + Math.sin(s.frame * 0.05 + i * 2) * 0.15;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(((i * 37 + 13) % GAME_W), ((i * 53 + 7) % (GAME_H * 0.5)), 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ground
      ctx.fillStyle = "#2a4a2a";
      ctx.fillRect(0, GAME_H - 2, GAME_W, 2);

      // pipes
      s.pipes.forEach((p) => {
        // top pipe
        const topGrad = ctx.createLinearGradient(p.x, 0, p.x + PIPE_W, 0);
        topGrad.addColorStop(0, "#2d8a4e");
        topGrad.addColorStop(0.5, "#4ade80");
        topGrad.addColorStop(1, "#2d8a4e");
        ctx.fillStyle = topGrad;
        ctx.fillRect(p.x, 0, PIPE_W, p.topH);
        // top pipe cap
        ctx.fillStyle = "#22763e";
        ctx.fillRect(p.x - 3, p.topH - 18, PIPE_W + 6, 18);
        ctx.strokeStyle = "#1a5a30";
        ctx.lineWidth = 1;
        ctx.strokeRect(p.x - 3, p.topH - 18, PIPE_W + 6, 18);

        // bottom pipe
        const botY = p.topH + PIPE_GAP;
        ctx.fillStyle = topGrad;
        ctx.fillRect(p.x, botY, PIPE_W, GAME_H - botY);
        // bottom pipe cap
        ctx.fillStyle = "#22763e";
        ctx.fillRect(p.x - 3, botY, PIPE_W + 6, 18);
        ctx.strokeStyle = "#1a5a30";
        ctx.strokeRect(p.x - 3, botY, PIPE_W + 6, 18);
      });

      // unicorn player
      const ux = GAME_W * 0.25;
      const uy = s.y;
      const tilt = Math.max(-0.5, Math.min(0.6, s.vel * 0.06));
      ctx.save();
      ctx.translate(ux, uy);
      ctx.rotate(tilt);
      // body
      ctx.fillStyle = "#e8e0f0";
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      // horn
      ctx.fillStyle = "#ffd700";
      ctx.beginPath();
      ctx.moveTo(14, -4);
      ctx.lineTo(24, -14);
      ctx.lineTo(12, -2);
      ctx.closePath();
      ctx.fill();
      // eye
      ctx.fillStyle = "#2a1a3a";
      ctx.beginPath();
      ctx.arc(10, -3, 2, 0, Math.PI * 2);
      ctx.fill();
      // mane
      const maneColors = ["#ff4466", "#ffdd44", "#44dd66", "#4488ff", "#8844ff"];
      maneColors.forEach((c, i) => {
        ctx.strokeStyle = c;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-4 - i * 2, -6 + i);
        ctx.quadraticCurveTo(-10 - i * 3, -12 + i * 2 + Math.sin(s.frame * 0.3 + i) * 3, -14 - i * 2, -4 + i * 2);
        ctx.stroke();
      });
      // tail
      maneColors.slice(0, 3).forEach((c, i) => {
        ctx.strokeStyle = c;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-14, i * 2);
        ctx.quadraticCurveTo(-22 - i * 2, -4 + i * 3 + Math.sin(s.frame * 0.25 + i) * 3, -20 - i, 4 + i * 2);
        ctx.stroke();
      });
      // wing flap
      const wingY = s.vel < 0 ? -8 : -2;
      ctx.fillStyle = "rgba(200, 190, 230, 0.6)";
      ctx.beginPath();
      ctx.ellipse(-2, wingY, 10, 5, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // score flash
      if (s.flashTimer > 0) {
        ctx.save();
        ctx.globalAlpha = s.flashTimer / 8;
        ctx.fillStyle = "#ffd700";
        ctx.fillRect(0, 0, GAME_W, GAME_H);
        ctx.restore();
      }

      // score display
      ctx.save();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 36px monospace";
      ctx.textAlign = "center";
      ctx.shadowColor = "#000";
      ctx.shadowBlur = 6;
      ctx.fillText(String(s.score), GAME_W / 2, 50);
      ctx.restore();

      // death screen
      if (s.gameState === "dead") {
        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, GAME_W, GAME_H);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 28px monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", GAME_W / 2, GAME_H / 2 - 30);
        ctx.font = "bold 20px monospace";
        ctx.fillStyle = "#ffd700";
        ctx.fillText(`Score: ${s.score}`, GAME_W / 2, GAME_H / 2 + 5);
        ctx.font = "14px monospace";
        ctx.fillStyle = "#aaaaaa";
        ctx.fillText("click / tap to retry", GAME_W / 2, GAME_H / 2 + 35);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  };

  // draw idle screen on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const sky = ctx.createLinearGradient(0, 0, 0, GAME_H);
    sky.addColorStop(0, "#1a1a3e");
    sky.addColorStop(1, "#2a4a3a");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, GAME_W, GAME_H);
    // unicorn idle
    ctx.font = "48px serif";
    ctx.textAlign = "center";
    ctx.fillText("🦄", GAME_W / 2, GAME_H / 2 - 20);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 22px monospace";
    ctx.fillText("FLAPPY UNICORN", GAME_W / 2, GAME_H / 2 + 30);
    ctx.fillStyle = "#aaa";
    ctx.font = "13px monospace";
    ctx.fillText("click / tap to start", GAME_W / 2, GAME_H / 2 + 55);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const scores = stateRef.current.bestScores;
  const topScore = scores.length > 0 ? scores[0].score : 0;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Title with trophy */}
      <div className="text-center">
        {topScore > 0 ? (
          <p className="text-2xl sm:text-3xl font-black text-yellow-400 mb-1">
            🏆 {topScore} 🏆
          </p>
        ) : (
          <p className="text-2xl sm:text-3xl font-black text-white/40 mb-1">
            🦄 Flappy Unicorn 🦄
          </p>
        )}
        <p className="text-white/20 text-xs">
          {topScore > 0 ? "Can you beat the high score?" : "Click to play"}
        </p>
      </div>

      {/* Game canvas */}
      <canvas
        ref={canvasRef}
        width={GAME_W}
        height={GAME_H}
        onClick={flap}
        onTouchStart={(e) => { e.preventDefault(); flap(); }}
        className="rounded-2xl border-2 border-white/10 cursor-pointer hover:border-white/20 transition-colors max-w-full"
        style={{ width: Math.min(GAME_W, 360), height: Math.min(GAME_H, 450) }}
      />

      {/* High scores */}
      {scores.length > 0 && (
        <div className="w-full max-w-xs">
          <p className="text-white/30 text-xs font-bold tracking-wider uppercase mb-2 text-center">High Scores</p>
          <div className="space-y-1">
            {scores.map((s, i) => (
              <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-1.5 text-sm">
                <span className="text-white/40 font-mono w-6">{i === 0 ? "🏆" : `#${i + 1}`}</span>
                <span className="text-white/60 font-bold">{s.score} pts</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
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
        scrollHeight="700vh"
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

      {/* Flappy Unicorn Game */}
      <section className="py-16 sm:py-24 px-4 border-t border-white/5">
        <FlappyUnicorn />
      </section>

      <footer className="border-t border-white/5 py-6 px-4 text-center text-white/10 text-xs">
        <p>100% factual. 🦄 &copy; 2026 Unicorn Preservation Society of Mosfellsbær</p>
      </footer>
    </main>
  );
}
