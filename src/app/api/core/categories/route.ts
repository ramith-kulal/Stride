import { db } from "../../../lib/database/db";
import { categories } from "../../../lib/database/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

// 🚀 GET all categories
export async function GET() {
  try {
    const allCategories = await db.select().from(categories);
    return NextResponse.json(allCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

// 🚀 CREATE a new category
export async function POST(req: Request) {
  try {
    const { name, userId } = await req.json();

    if (!name || !userId) {
      return NextResponse.json({ error: "Name and userId are required" }, { status: 400 });
    }

    // ✅ Prevent duplicate categories for the same user
    const existingCategory = await db.select().from(categories).where(and(eq(categories.name, name), eq(categories.userId, userId)));
    if (existingCategory.length > 0) {
      return NextResponse.json({ error: "Category already exists for this user" }, { status: 400 });
    }

    const newCategory = await db.insert(categories).values({ name, userId }).returning();
    return NextResponse.json(newCategory[0], { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}

// 🚀 UPDATE a category
export async function PUT(req: Request) {
  try {
    const { id, name } = await req.json();

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: "Valid Category ID is required" }, { status: 400 });
    }

    const updatedCategory = await db.update(categories).set({ name }).where(eq(categories.id, Number(id))).returning();

    if (updatedCategory.length === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(updatedCategory[0]);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

// 🚀 DELETE a category
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: "Valid Category ID is required" }, { status: 400 });
    }

    const deletedCategory = await db.delete(categories).where(eq(categories.id, Number(id))).returning();

    if (deletedCategory.length === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
