"use client";
import Spline from "@splinetool/react-spline";

export default function Home() {
  return (
    <main className="h-screen w-full bg-black flex flex-col md:flex-row items-center justify-center px-6 md:px-10 relative">
      {/* Left Side - Motivational Text */}
      <div className="text-white text-center md:text-left md:w-1/2 z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Unlock Your <span className="text-green-400">Potential</span> with Stride
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          Stay <span className="text-green-400">focused</span>, achieve more, and make every task count. 
          Stride is your perfect companion for seamless task management.
        </p>

        {/* 🚀 Go to Dashboard Button */}
        <a
          href="/dashboard"
          className="inline-block px-6 py-3 text-lg font-semibold text-black bg-green-400 rounded-full shadow-lg hover:bg-green-500 transition-all"
        >
           Access Dashboard
        </a>
      </div>

      {/* Right Side - Spline 3D Model */}
      <div className="md:w-[500px] md:h-[500px] w-full h-full absolute md:static flex items-center justify-center -z-10 md:z-0">
        <Spline scene="https://prod.spline.design/mISI5lApG7ggPLrX/scene.splinecode" />
      </div>
    </main>
  );
}
