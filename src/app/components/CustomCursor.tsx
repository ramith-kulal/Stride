"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true); // Ensure cursor is visible when moving
    };

    const hideCursor = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseout", hideCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseout", hideCursor);
    };
  }, []);

  return (
    <>
      {/* Big Cursor */}
      <div
        className={`fixed w-12 h-12 rounded-full border-2 border-green-400 pointer-events-none transition-transform duration-150 ease-out mix-blend-difference z-[9999] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `translate(${position.x - 24}px, ${position.y - 24}px)`,
        }}
      ></div>

      {/* Small Cursor */}
      <div
        className={`fixed w-3 h-3 rounded-full bg-green-400 pointer-events-none transition-transform duration-75 z-[9999] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `translate(${position.x - 6}px, ${position.y - 6}px)`,
        }}
      ></div>
    </>
  );
}
