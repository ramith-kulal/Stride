import { NextResponse } from "next/server";
import { verifyToken } from "./app/lib/authentication/auth"; // Import token verification
    
export async function middleware(req) {
  console.log("Middleware is running for:", req.nextUrl.pathname);
   
  // Get token from cookies
  const token = req.cookies.get("token")?.value;
  console.log("Token from cookies:", token);

  const isAuthRoute = req.nextUrl.pathname.startsWith("/auth/login");

  // If no token and trying to access protected pages, redirect to /login
  if (!token && !isAuthRoute) {
    console.log(" No token found. Redirecting to login.");
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Verify the tokenAA
  const decodedToken = await verifyToken(token);
  console.log("🔵 Decoded token:", decodedToken);

  if (!decodedToken) {
    console.log(" Invalid token. Redirecting to login.");
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  console.log("Token verified, user is authenticated.");
  return NextResponse.next();
}

// Protect specific routes
export const config = {
  matcher: ["/dashboard/:path*"], // Apply middleware to protected routes
};
