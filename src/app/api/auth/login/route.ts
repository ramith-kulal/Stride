import { NextResponse } from "next/server";
import { db } from "../../../lib/database/db";
import { users } from "../../../lib/database/schema";
import { verifyPassword, generateToken } from "../../../lib/authentication/auth";
import { eq } from "drizzle-orm";

// Define the expected request body structure
interface LoginRequest {
  email: string;
  password: string;
}

// Define the expected user structure from DB
interface User {
  id: number;
  email: string;
  password: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email, password }: LoginRequest = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Find user
    const user: User[] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .execute();

    if (user.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user[0].password);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT Token
    const token = await generateToken({ userId: user[0].id, email: user[0].email });

    // Set token in cookies
    const response = NextResponse.json({ message: "Login successful" });
    response.headers.set(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`
    );

    return response;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Server error", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Server error", details: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
