"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function CTA() {
  const router = useRouter();

  return (
    <section className="bg-black text-white py-20 px-6 relative flex items-center justify-center overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Heading & Content */}
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Boost Your <span className="text-green-400">Productivity</span>
        </h2>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Join <span className="text-green-400 font-semibold">50,000+</span> users managing their tasks efficiently with
          <span className="text-green-400"> Stride</span>. Stay on track and achieve your goals faster.
        </p>
        
        {/* Signup Button */}
        <button
          onClick={() => router.push("/auth/signup")}
          className="mt-6 bg-green-500 text-black px-8 py-3 rounded-md text-lg font-medium hover:bg-green-400 transition"
        >
          Sign Up for Free
        </button>
        <p className="text-sm text-gray-400 mt-2">No credit card required. Get started in seconds!</p>
      </div>

      {/* Background Image (Faded & Merged with Text) */}
      <div className="absolute inset-0 flex justify-center items-center">
        <Image
          src="/images/graph.png"
          alt="Productivity Graph"
          width={600}
          height={500}
          className="opacity-10 md:opacity-15 scale-125 md:scale-150"
        />
      </div>
    </section>
  );
}
