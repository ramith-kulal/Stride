"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
    
export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  // React Query Mutation for Login
  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/auth/login", formData, { withCredentials: true });
      return response.data;
    },
    onSuccess: ({ user, token }) => {
      setUser(user, token);
      router.push("/");
    },
    onError: () => {
      setError("Invalid credentials. Please try again.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-wrap">
      {/* Left Side - Login Form */}
      <div className="flex w-full flex-col md:w-1/2">
        <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
          <a href="#" className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900">
            Stride.
          </a>
        </div>

        <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
          <p className="text-left text-3xl font-bold">Welcome Back</p>
          <p className="mt-2 text-left text-gray-500">Log in to manage your tasks efficiently.</p>

          {/* Login Form */}
          <form
            className="flex flex-col pt-3 md:pt-8"
            onSubmit={(e) => {
              e.preventDefault();
              setError("");
              loginMutation.mutate();
            }}
          >
            {error && <p className="text-red-500">{error}</p>}

            {/* Email Field */}
            <div className="flex flex-col pt-4">
              <input
                type="email"
                name="email"
                className="w-full border-b-2 border-gray-300 px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col pt-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full border-b-2 border-gray-300 px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {/* Eye Icon for Toggle */}
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? "👁️" : "🙈"}
              </button>
            </div>

            {/* Submit Button */}
            <button type="submit" className="mt-6 w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2">
              {loginMutation.isPending ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Signup Link */}
          <div className="py-12 text-center">
          <p className="whitespace-nowrap text-gray-600">
  Don&#39;t have an account?
  <a href="/auth/signup" className="underline-offset-4 font-semibold text-gray-900 underline">
    Sign up here.
  </a>
</p>


          </div>
        </div>
      </div>

      {/* Right Side - Image & Motivational Text */}
      <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
        {/* Motivational Text */}
        <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
        <p className="mb-8 text-3xl font-semibold leading-10">
  &quot;Success starts with planning. Stay ahead, stay organized with Stride.&quot;
</p>

          <p className="mb-4 text-3xl font-semibold">Stride Team</p>
          <p className="mb-7 text-sm opacity-70">Your Personal Task Management System</p>
        </div>

        {/* Image - Loaded from /public */}
        <Image
          src="/images/image.png"
          alt="Login Page Illustration"
          width={1600}
          height={900}
          quality={100}
          className="w-full h-full object-cover opacity-90"
        />
      </div>
    </div>
  );
}
