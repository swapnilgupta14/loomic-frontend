"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Classic Neko Cat Cursor Follower
 * Based on the iconic 1980s desktop pet
 * Features pixel art sprites and classic animations
 */

type NekoState = "idle" | "alert" | "scratch" | "walk" | "run";

type Direction = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw";

export function CursorFollower() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Physics state
  const positionRef = useRef({ x: 100, y: 100 });
  const targetRef = useRef({ x: 100, y: 100 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const stateRef = useRef<NekoState>("idle");
  const directionRef = useRef<Direction>("se");
  const frameRef = useRef(0);
  const animFrameRef = useRef<number | undefined>(undefined);
  const idleTimeRef = useRef(0);
  const scratchTimeRef = useRef(0);

  const NEKO_SIZE = 32;

  useEffect(() => {
    setMounted(true);
    positionRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    targetRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  }, []);

  // Draw pixel art neko on canvas
  const drawNeko = (
    ctx: CanvasRenderingContext2D,
    state: NekoState,
    direction: Direction,
    frame: number
  ) => {
    ctx.clearRect(0, 0, NEKO_SIZE, NEKO_SIZE);

    // Get theme color
    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--clr-primary")
      .trim();
    const hsl = primaryColor.match(/\d+/g) || ["85", "75", "55"];
    const catColor = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
    const darkColor = `hsl(${hsl[0]}, ${hsl[1]}%, ${Math.max(0, parseInt(hsl[2]) - 30)}%)`;

    ctx.imageSmoothingEnabled = false;

    const scale = NEKO_SIZE / 16; // Scale up pixel art
    ctx.scale(scale, scale);

    // Helper to draw a pixel
    const pixel = (x: number, y: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    };

    // Draw based on state
    if (state === "idle" || state === "alert") {
      // Sitting cat - face direction based on where cursor is
      const faceRight = ["e", "ne", "se"].includes(direction);

      if (faceRight) {
        // Cat facing right
        // Ears
        pixel(3, 2, darkColor);
        pixel(4, 1, darkColor);
        pixel(5, 2, darkColor);

        // Head
        for (let x = 3; x <= 8; x++) {
          pixel(x, 3, darkColor);
        }
        for (let x = 3; x <= 7; x++) {
          for (let y = 4; y <= 5; y++) {
            pixel(x, y, "white");
          }
        }
        pixel(2, 4, darkColor);
        pixel(8, 4, darkColor);
        pixel(2, 5, darkColor);
        pixel(8, 5, darkColor);

        // Eye
        pixel(5, 4, darkColor);
        if (state === "alert") pixel(5, 5, darkColor);

        // Nose
        pixel(6, 6, "#FF69B4");
        pixel(7, 6, "#FF69B4");
      } else {
        // Cat facing left
        // Ears
        pixel(10, 2, darkColor);
        pixel(11, 1, darkColor);
        pixel(12, 2, darkColor);

        // Head
        for (let x = 7; x <= 12; x++) {
          pixel(x, 3, darkColor);
        }
        for (let x = 8; x <= 12; x++) {
          for (let y = 4; y <= 5; y++) {
            pixel(x, y, "white");
          }
        }
        pixel(7, 4, darkColor);
        pixel(13, 4, darkColor);
        pixel(7, 5, darkColor);
        pixel(13, 5, darkColor);

        // Eye
        pixel(10, 4, darkColor);
        if (state === "alert") pixel(10, 5, darkColor);

        // Nose
        pixel(8, 6, "#FF69B4");
        pixel(9, 6, "#FF69B4");
      }

      // Body (centered)
      for (let y = 8; y <= 11; y++) {
        for (let x = 4; x <= 11; x++) {
          pixel(x, y, catColor);
        }
      }
      pixel(3, 9, catColor);
      pixel(12, 9, catColor);
      pixel(3, 10, catColor);
      pixel(12, 10, catColor);

      // Paws (visible when sitting)
      pixel(5, 12, darkColor);
      pixel(6, 12, darkColor);
      pixel(6, 13, darkColor);
      pixel(9, 12, darkColor);
      pixel(10, 12, darkColor);
      pixel(9, 13, darkColor);

      // Tail
      const tailSide = faceRight ? 2 : 12;
      pixel(tailSide, 10, darkColor);
      pixel(tailSide + (faceRight ? -1 : 1), 11, darkColor);
      pixel(tailSide + (faceRight ? -2 : 2), 12, darkColor);
    } else if (state === "scratch") {
      // Cat scratching ear - sitting position with paw raised
      // Ears
      pixel(3, 2, darkColor);
      pixel(4, 1, darkColor);
      pixel(5, 2, darkColor);
      pixel(10, 2, darkColor);
      pixel(11, 1, darkColor);
      pixel(12, 2, darkColor);

      // Head outline
      for (let x = 4; x <= 11; x++) {
        pixel(x, 3, darkColor);
      }
      pixel(3, 4, darkColor);
      pixel(12, 4, darkColor);
      pixel(3, 5, darkColor);
      pixel(12, 5, darkColor);

      // Face - white fill
      for (let x = 4; x <= 11; x++) {
        for (let y = 4; y <= 5; y++) {
          pixel(x, y, "white");
        }
      }

      // Eyes closed (scratching feels good!)
      pixel(5, 5, darkColor);
      pixel(6, 5, darkColor);
      pixel(9, 5, darkColor);
      pixel(10, 5, darkColor);

      // Nose
      pixel(7, 6, "#FF69B4");
      pixel(8, 6, "#FF69B4");

      // Body
      for (let y = 8; y <= 11; y++) {
        for (let x = 4; x <= 11; x++) {
          pixel(x, y, catColor);
        }
      }
      pixel(3, 9, catColor);
      pixel(12, 9, catColor);
      pixel(3, 10, catColor);
      pixel(12, 10, catColor);

      // Left paw visible
      pixel(5, 12, darkColor);
      pixel(6, 12, darkColor);
      pixel(6, 13, darkColor);

      // Right paw raised to scratch ear (animated)
      const scratchOffset = Math.floor(frame) % 2;
      pixel(11 + scratchOffset, 6, darkColor);
      pixel(11 + scratchOffset, 7, darkColor);
      pixel(12 + scratchOffset, 7, darkColor);

      // Tail wiggle
      const tailWag = Math.floor(frame) % 2;
      pixel(2, 10 + tailWag, darkColor);
      pixel(1, 11 + tailWag, darkColor);
    } else if (state === "walk" || state === "run") {
      // Jumping cat - side view with hopping motion
      // Face the direction of movement: east = right, west = left
      const faceRight = direction === "e" || direction === "ne" || direction === "se";
      const legCycle = Math.floor(frame) % 4;
      const isRunning = state === "run";

      // Jump height - cat bounces up and down
      let jumpY = 0;
      if (legCycle === 0 || legCycle === 3) {
        jumpY = 0; // On ground
      } else if (legCycle === 1) {
        jumpY = -1; // Rising
      } else {
        jumpY = -2; // Peak of jump
      }

      // Base positions with jump offset
      const bodyY = 7 + jumpY;
      const headY = 4 + jumpY;
      const earY = 3 + jumpY;

      // Ear (pointing up when moving)
      if (faceRight) {
        pixel(3, earY, darkColor);
        pixel(4, earY - 1, darkColor);
        pixel(5, earY, darkColor);
      } else {
        pixel(10, earY, darkColor);
        pixel(11, earY - 1, darkColor);
        pixel(12, earY, darkColor);
      }

      // Head (side profile)
      if (faceRight) {
        // Facing right (moving right/east)
        for (let x = 3; x <= 6; x++) {
          pixel(x, headY, darkColor);
          pixel(x, headY + 1, "white");
        }
        pixel(2, headY, darkColor);
        pixel(7, headY, darkColor);
        pixel(2, headY + 1, darkColor);
        pixel(7, headY + 1, darkColor);
        pixel(5, headY, darkColor); // Eye
        pixel(6, headY + 2, "#FF69B4"); // Nose
      } else {
        // Facing left (moving left/west)
        for (let x = 9; x <= 12; x++) {
          pixel(x, headY, darkColor);
          pixel(x, headY + 1, "white");
        }
        pixel(8, headY, darkColor);
        pixel(13, headY, darkColor);
        pixel(8, headY + 1, darkColor);
        pixel(13, headY + 1, darkColor);
        pixel(10, headY, darkColor); // Eye
        pixel(9, headY + 2, "#FF69B4"); // Nose
      }

      // Body (stretched when running)
      const bodyLength = isRunning ? 7 : 6;
      for (let y = bodyY; y <= bodyY + 2; y++) {
        for (let x = 4; x < 4 + bodyLength; x++) {
          pixel(x, y, catColor);
        }
      }

      // Jumping animation - 4 frame hop cycle
      // Legs tucked during jump, extended on ground
      const legY = bodyY + 3;
      if (legCycle === 0 || legCycle === 3) {
        // On ground - legs visible and extended
        pixel(6, legY, darkColor);
        pixel(6, legY + 1, darkColor);
        pixel(7, legY, darkColor);
        pixel(7, legY + 1, darkColor);
        pixel(8, legY, darkColor);
        pixel(8, legY + 1, darkColor);
      } else if (legCycle === 1) {
        // Starting jump - legs pushing off
        pixel(6, legY, darkColor);
        pixel(7, legY, darkColor);
        pixel(8, legY, darkColor);
        pixel(6, legY + 1, darkColor);
        pixel(8, legY + 1, darkColor);
      } else {
        // In air - legs tucked under body
        pixel(6, legY, darkColor);
        pixel(7, legY, darkColor);
        pixel(8, legY, darkColor);
      }

      // Tail (wags when moving)
      const tailWag = legCycle < 2 ? 0 : 1;
      const tailX = faceRight ? 4 : 10;
      pixel(tailX, bodyY + tailWag, darkColor);
      pixel(tailX + (faceRight ? -1 : 1), bodyY - 1 + tailWag, darkColor);
      pixel(tailX + (faceRight ? -2 : 2), bodyY - 2 + tailWag, darkColor);
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
  };

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      idleTimeRef.current = 0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Main animation loop
  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      const pos = positionRef.current;
      const target = targetRef.current;
      const vel = velocityRef.current;

      // Calculate distance
      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Update idle time
      idleTimeRef.current += delta;
      scratchTimeRef.current += delta;

      // Always determine direction to face the cursor
      const angle = Math.atan2(dy, dx);
      const directions: Direction[] = ["e", "se", "s", "sw", "w", "nw", "n", "ne"];
      // Convert angle (-PI to PI) to direction index (0-7)
      let angleNormalized = angle;
      if (angleNormalized < 0) angleNormalized += Math.PI * 2;
      const dirIndex = Math.round((angleNormalized / (Math.PI * 2)) * 8) % 8;
      directionRef.current = directions[dirIndex];

      // State machine
      if (distance < 48) {
        // Apply stronger friction when close
        vel.x *= 0.75;
        vel.y *= 0.75;

        if (Math.abs(vel.x) < 0.2 && Math.abs(vel.y) < 0.2) {
          vel.x = 0;
          vel.y = 0;

          if (idleTimeRef.current > 2 && scratchTimeRef.current > 3) {
            stateRef.current = "scratch";
            if (scratchTimeRef.current > 5) {
              scratchTimeRef.current = 0;
            }
          } else if (idleTimeRef.current > 1) {
            stateRef.current = "idle";
          } else {
            stateRef.current = "alert";
          }
        } else {
          stateRef.current = "walk";
        }
      } else {
        scratchTimeRef.current = 0;

        if (distance > 300) {
          stateRef.current = "run";
          const maxSpeed = 4.5;
          const acceleration = 0.12;
          vel.x += (dx / distance) * acceleration;
          vel.y += (dy / distance) * acceleration;

          const speed = Math.sqrt(vel.x ** 2 + vel.y ** 2);
          if (speed > maxSpeed) {
            vel.x = (vel.x / speed) * maxSpeed;
            vel.y = (vel.y / speed) * maxSpeed;
          }
        } else {
          stateRef.current = "walk";
          const maxSpeed = 1.8;
          const acceleration = 0.06;
          vel.x += (dx / distance) * acceleration;
          vel.y += (dy / distance) * acceleration;

          const speed = Math.sqrt(vel.x ** 2 + vel.y ** 2);
          if (speed > maxSpeed) {
            vel.x = (vel.x / speed) * maxSpeed;
            vel.y = (vel.y / speed) * maxSpeed;
          }
        }
      }

      // Update position
      pos.x += vel.x;
      pos.y += vel.y;

      // Keep on screen
      pos.x = Math.max(NEKO_SIZE / 2, Math.min(window.innerWidth - NEKO_SIZE / 2, pos.x));
      pos.y = Math.max(NEKO_SIZE / 2, Math.min(window.innerHeight - NEKO_SIZE / 2, pos.y));

      // Update DOM position
      if (containerRef.current) {
        containerRef.current.style.left = `${pos.x}px`;
        containerRef.current.style.top = `${pos.y}px`;
      }

      // Update animation frame
      const speed = Math.sqrt(vel.x ** 2 + vel.y ** 2);
      const frameSpeed =
        stateRef.current === "run"
          ? 8
          : stateRef.current === "walk"
            ? 4
            : stateRef.current === "scratch"
              ? 6
              : 2;

      if (speed > 0.1 || stateRef.current === "scratch") {
        frameRef.current += frameSpeed * delta;
      } else {
        frameRef.current += 2 * delta;
      }

      // Draw
      drawNeko(ctx, stateRef.current, directionRef.current, Math.floor(frameRef.current));

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div
        ref={containerRef}
        className="fixed pointer-events-none z-50"
        style={{
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      >
        <canvas
          ref={canvasRef}
          width={NEKO_SIZE}
          height={NEKO_SIZE}
          className="drop-shadow-lg"
          style={{
            imageRendering: "pixelated",
          }}
        />

        {/* Shadow */}
        <div className="absolute top-[28px] left-1/2 -translate-x-1/2 w-[24px] h-[8px] rounded-full bg-black/20 blur-sm opacity-60" />
      </div>
    </>
  );
}
