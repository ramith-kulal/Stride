import { db } from "../../../lib/database/db";
import { projects } from "../../../lib/database/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { verifyToken } from "../../../lib/authentication/auth"; // 🔹 Import token verification
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

// Define types for request body
interface CreateProjectRequest {
  name: string;
  description?: string;
}

interface UpdateProjectRequest {
  id: number;
  name?: string;
  description?: string;
}

interface DeleteProjectRequest {
  id: number;
}

// 🚀 GET all projects (Authenticated)
export async function GET(req: Request) {
  try {
    // 🔹 Extract token from cookies
    const cookies = new RequestCookies(req.headers);
    const token = cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token found in cookies" }, { status: 401 });
    }

    // 🔹 Verify the token
    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }

    // 🔹 Fetch projects **only for the authenticated user**
    const allProjects = await db.select().from(projects).where(eq(projects.userId, user.userId));

    return NextResponse.json(allProjects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects", details: (error as Error).message }, { status: 500 });
  }
}

// 🚀 CREATE a new project (Authenticated)
export async function POST(req: Request) {
  try {
    // 🔹 Extract and verify token
    const cookies = new RequestCookies(req.headers);
    const token = cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token found in cookies" }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }

    // 🔹 Parse request body
    const { name, description }: CreateProjectRequest = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Project name is required" }, { status: 400 });
    }

    // 🔹 Create project for the **authenticated user**
    const newProject = await db.insert(projects).values({ name, description, userId: user.userId }).returning();

    return NextResponse.json(newProject[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project", details: (error as Error).message }, { status: 500 });
  }
}

// 🚀 UPDATE a project (Authenticated)
export async function PUT(req: Request) {
  try {
    // 🔹 Extract and verify token
    const cookies = new RequestCookies(req.headers);
    const token = cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token found in cookies" }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }

    // 🔹 Parse request body
    const { id, name, description }: UpdateProjectRequest = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const numericId = Number(id);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    // 🔹 Ensure the project belongs to the **authenticated user**
    const existingProject = await db.select().from(projects).where(eq(projects.id, numericId));
    if (!existingProject.length || existingProject[0].userId !== user.userId) {
      return NextResponse.json({ error: "Unauthorized: Project does not belong to you" }, { status: 403 });
    }

    // 🔹 Update project
    const updatedProject = await db.update(projects).set({ name, description }).where(eq(projects.id, numericId)).returning();

    return NextResponse.json(updatedProject[0] ?? { error: "Project not found" }, { status: updatedProject.length ? 200 : 404 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project", details: (error as Error).message }, { status: 500 });
  }
}

// 🚀 DELETE a project (Authenticated)
export async function DELETE(req: Request) {
  try {
    // 🔹 Extract and verify token
    const cookies = new RequestCookies(req.headers);
    const token = cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token found in cookies" }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }

    // 🔹 Parse request body
    const { id }: DeleteProjectRequest = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const numericId = Number(id);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    // 🔹 Ensure the project belongs to the **authenticated user**
    const existingProject = await db.select().from(projects).where(eq(projects.id, numericId));
    if (!existingProject.length || existingProject[0].userId !== user.userId) {
      return NextResponse.json({ error: "Unauthorized: Project does not belong to you" }, { status: 403 });
    }

    // 🔹 Delete project
    const deleted = await db.delete(projects).where(eq(projects.id, numericId));

    return NextResponse.json({ message: deleted.rowCount ? "Project deleted" : "Project not found" }, { status: deleted.rowCount ? 200 : 404 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project", details: (error as Error).message }, { status: 500 });
  }
}