import { NextResponse } from "next/server";
import { db } from "../../../lib/database/db";
import { tasks, projects } from "../../../lib/database/schema";
import { sql } from "drizzle-orm";
import { verifyToken } from "../../../lib/authentication/auth";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Extract token from cookies
    const token = (await cookies()).get("token")?.value;
    console.log("🔍 Extracted Token:", token);

    if (!token) {
      console.log("❌ No token found in cookies");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify token
    const decodedToken = await verifyToken(token);
    if (!decodedToken || !decodedToken.userId) {
      console.log("❌ Token verification failed");
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decodedToken.userId;
    console.log("👤 Authenticated User ID:", userId);

    // Fetch total tasks count
    const totalTasksResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(tasks)
      .where(sql`user_id = ${userId}`);

    const totalTasks = Number(totalTasksResult[0]?.count || 0);

    // Fetch completed tasks count
    const completedTasksResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(tasks)
      .where(sql`user_id = ${userId} AND completed = true`);

    const completedTasks = Number(completedTasksResult[0]?.count || 0);

    // Calculate pending tasks
    const pendingTasks = totalTasks - completedTasks;

    // Fetch total projects count
    const totalProjectsResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(projects)
      .where(sql`user_id = ${userId}`);

    const totalProjects = Number(totalProjectsResult[0]?.count || 0);

    return NextResponse.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      totalProjects,
    });

  } catch (error) {
    console.error("❌ Error fetching dashboard data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
