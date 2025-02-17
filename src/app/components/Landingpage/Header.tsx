"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Detects route changes

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get("token"); // Get JWT token from cookies
      setIsAuthenticated(!!token); // Update auth state
    };

    checkAuth();

    // Listen for storage changes (useful for multi-tab login/logout)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, [pathname]); // Runs when the route changes

  const handleLogout = () => {
    Cookies.remove("token"); // Remove token from cookies
    setIsAuthenticated(false);
    router.push("/auth/login"); // Redirect to login page
  };

  return (
    <>
      {/* Title (With White Underline) - Only for Large Screens */}
      <a
        href="#"
        className="absolute top-6 left-12 text-4xl font-extrabold text-white hidden lg:block z-[9999]"
      >
        Stride.
        <span className="block w-14 h-[2px] bg-white rounded-full mt-1"></span>
      </a>

      {/* Desktop Navbar */}
      <nav className="fixed top-12 left-1/2 transform -translate-x-1/2 w-[60%] max-w-xl bg-gray-950 text-white shadow-lg border border-gray-800 rounded-full backdrop-blur-lg z-[9999] hidden lg:flex justify-center px-6 py-2">
        <div className="flex items-center space-x-10 text-base font-medium">
          <a href="#features" className="hover:text-green-400 transition-all">Features</a>
          <a href="#about" className="hover:text-green-400 transition-all">About</a>
          <a href="#contact" className="hover:text-green-400 transition-all">Contact</a>
        </div>
      </nav>

      {/* Login/Logout (Top Right) */}
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="hidden lg:block fixed top-6 right-12 text-base font-medium text-white hover:text-red-400 transition-all z-[9999]"
        >
          Logout
        </button>
      ) : (
        <a
          href="/auth/login"
          className="hidden lg:block fixed top-6 right-12 text-base font-medium text-white hover:text-green-400 transition-all z-[9999]"
        >
          Login
        </a>
      )}

      {/* Mobile Navbar (Title & Icon Only) */}
      <div className="lg:hidden fixed top-6 left-4 right-4 flex justify-between items-center z-[9999]">
        <a href="#" className="text-3xl font-extrabold text-white">
          Stride.
          <span className="block w-14 h-[2px] bg-white rounded-full mt-1"></span>
        </a>

        {/* Hamburger Icon */}
        <button onClick={() => setIsOpen(!isOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="fixed top-[64px] left-1/2 transform -translate-x-1/2 w-[85%] max-w-xs text-white z-[9999] flex flex-col items-center py-3 space-y-3">
          <a href="#features" className="hover:text-green-400 transition-all" onClick={() => setIsOpen(false)}>Features</a>
          <a href="#about" className="hover:text-green-400 transition-all" onClick={() => setIsOpen(false)}>About</a>
          <a href="#contact" className="hover:text-green-400 transition-all" onClick={() => setIsOpen(false)}>Contact</a>
          {isAuthenticated ? (
            <button className="hover:text-red-400 transition-all" onClick={() => { handleLogout(); setIsOpen(false); }}>Logout</button>
          ) : (
            <>
              <a href="/auth/login" className="hover:text-green-400 transition-all" onClick={() => setIsOpen(false)}>Login</a>
              <a href="/auth/signup" className="px-3 py-1.5 bg-green-600 rounded-lg hover:bg-green-500 transition-all" onClick={() => setIsOpen(false)}>Sign Up</a>
            </>
          )}
        </div>
      )}
    </>
  );
}
