"use client";
import React from "react";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        {/* Logo & Description */}
        <h2 className="text-3xl font-extrabold text-white">Stride</h2>
        <p className="text-gray-400">
          Organize your tasks, collaborate seamlessly, and boost your productivity.
        </p>

        {/* Quick Links */}
        <div className="flex justify-center gap-6 text-lg font-medium">
          <a href="/features" className="hover:text-green-400 transition">Features</a>
          <a href="#" className="hover:text-green-400 transition">Pricing</a>
          <a href="#" className="hover:text-green-400 transition">Community</a>
          <a href="/support" className="hover:text-green-400 transition">Support</a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-4">
          <a href="https://github.com/Ramith-kulal" target="_blank" className="text-gray-400 hover:text-white transition text-2xl">
            <FaGithub />
          </a>
          <a href="#" target="_blank" className="text-gray-400 hover:text-white transition text-2xl">
            <FaDiscord />
          </a>
          <a href="https://twitter.com/Ramith_Kulal" target="_blank" className="text-gray-400 hover:text-white transition text-2xl">
            <FaXTwitter />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} Stride. All rights reserved. <br />
          Created by <a href="https://github.com/Ramithkulal" className="text-green-400 font-medium hover:underline">Ramith Kulal</a>
        </p>
      </div>
    </footer>
  );
}
