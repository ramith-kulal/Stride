import React from "react";
import Header from "./components/Landingpage/Header";
import Footer from "./components/Landingpage/Footer";
import HeroSection from "./components/Landingpage/HeroSection";
import Features from "./components/Landingpage/Features";
import CTA from "./components/Landingpage/CTA";
import Community from "./components/Landingpage/Community";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

     
      <HeroSection/>
      <Features/>
      <CTA/>
      <Community/>
      <Footer/>
       {/* Hero Section
      <section className="flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-4xl font-bold">Welcome to Stride</h1>
        <p className="mt-4 text-gray-400">Securely manage and store your passwords with ease.</p>
      </section>

      <
      <section id="features" className="py-16 text-center">
        <h2 className="text-3xl font-semibold">Features</h2>
        <p className="mt-2 text-gray-400">Discover how Stride makes password management easier.</p>
      </section>

   
      <section id="about" className="py-16 text-center">
        <h2 className="text-3xl font-semibold">About Us</h2>
        <p className="mt-2 text-gray-400">Stride is designed to keep your passwords safe and secure.</p>
      </section>

      <footer className="py-6 text-center bg-gray-900">
        <p className="text-gray-400">© 2025 Stride. All rights reserved.</p>
      </footer> */}
    </div>
  );
}
