import { db } from "../../../lib/database/db";
import { tasks } from "../../../lib/database/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { verifyToken } from "../../../lib/authentication/auth";
import { cookies } from "next/headers"; // Correct cookie import

// 🔹 Define types for request payloads
interface TaskCreateRequest {
  title: string;
  description?: string;
  priority?: string | number;
  dueDate?: string;
  projectId?: number;
  categoryId?: number;
}

interface TaskUpdateRequest {
  id: number;
  completed: boolean;
}

//  GET tasks for the logged-in user
export async function GET(): Promise<NextResponse> {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await verifyToken(token);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userTasks = await db.select().from(tasks).where(eq(tasks.userId, user.userId));
    return NextResponse.json(userTasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

//  CREATE a new task
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await verifyToken(token);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body: TaskCreateRequest = await req.json();
    const { title, description, priority: rawPriority, dueDate: rawDueDate, projectId, categoryId } = body;

    if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });

    let dueDate: Date | null = null;
    if (rawDueDate) {
      dueDate = new Date(rawDueDate);
      if (isNaN(dueDate.getTime())) return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    const priorityMap: Record<string, number> = { low: 1, medium: 2, high: 3 };
    let priority: number | null = null;
    if (rawPriority) {
      priority = typeof rawPriority === "string" ? priorityMap[rawPriority.toLowerCase()] ?? null : Number(rawPriority);
      if (!priority || priority < 1 || priority > 3) return NextResponse.json({ error: "Invalid priority" }, { status: 400 });
    }

    const [newTask] = await db
      .insert(tasks)
      .values({ title, description, priority, dueDate, userId: user.userId, projectId, categoryId })
      .returning();

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

//  UPDATE task completion
export async function PUT(req: Request): Promise<NextResponse> {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await verifyToken(token);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body: TaskUpdateRequest = await req.json();
    const { id, completed } = body;

    if (typeof completed !== "boolean" || !id) return NextResponse.json({ error: "Invalid data" }, { status: 400 });

    const taskId = Number(id);
    if (isNaN(taskId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const [existing] = await db.select().from(tasks).where(eq(tasks.id, taskId));
    if (!existing || existing.userId !== user.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const [updated] = await db.update(tasks).set({ completed }).where(eq(tasks.id, taskId)).returning();

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

//  DELETE a task
export async function DELETE(req: Request): Promise<NextResponse> {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await verifyToken(token);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const taskId = Number(id);
    if (isNaN(taskId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const [existing] = await db.select().from(tasks).where(eq(tasks.id, taskId));
    if (!existing || existing.userId !== user.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    await db.delete(tasks).where(eq(tasks.id, taskId));

    return NextResponse.json({ message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ error: "Server error", details: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}