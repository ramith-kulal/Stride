import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { JWTPayload } from "jose";

// Define the user payload structure
interface AuthenticatedUser {
  userId: number;
  email: string;
}

// Secure the key
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

// Hash Password
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

// Compare Password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate JWT Token
export async function generateToken(user: AuthenticatedUser): Promise<string> {
    return await new SignJWT(user as unknown as JWTPayload) // Cast to JWTPayload
      .setProtectedHeader({ alg: "HS256" }) // Algorithm: HS256
      .setIssuedAt() // Add issued timestamp
      .setExpirationTime("7d") // Token expires in 7 days
      .sign(SECRET_KEY); // Sign with secret key
}

// Verify JWT Token
export async function verifyToken(token: string ): Promise<AuthenticatedUser | null> {
    try {
      const { payload } = await jwtVerify<JWTPayload>(token, SECRET_KEY);
      return payload as unknown as AuthenticatedUser; // Type assertion to ensure correct structure
    } catch {
      return null;
    }
}