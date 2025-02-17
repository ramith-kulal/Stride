// app/api/auth/signup/route.ts
import { db } from "../../../lib/database/db";
import { users } from "../../../lib/database/schema";
import { hashPassword } from "../../../lib/authentication/auth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const { name, email, password } = await req.json();
      if (!name || !email || !password) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }
  
      // Check if user already exists
      const existingUser = await db.select().from(users).where(eq(users.email, email)).execute();
      if (existingUser.length > 0) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
      }
  
      // Hash the password
      const hashedPassword = await hashPassword(password);
  
      // Insert user into database
      const newUser = await db.insert(users).values({
        name,
        email,
        password: hashedPassword,
      }).returning();
  
      return NextResponse.json({ message: "User registered successfully", user: newUser[0] }, { status: 201 });
  
    } catch (error) {
      console.error("Signup Error:", error); // <-- Log error to console
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }