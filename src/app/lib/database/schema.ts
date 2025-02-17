import { pgTable, serial, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Projects Table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  userId: integer("user_id").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Categories Table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
});

// Tasks Table
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  priority: integer("priority").default(1), // 1 - Low, 2 - Medium, 3 - High
  dueDate: timestamp("due_date"),
  completed: boolean("completed").default(false), // To track task completion
  userId: integer("user_id").references(() => users.id).notNull(),
  projectId: integer("project_id").references(() => projects.id), // Task belongs to a project
  categoryId: integer("category_id").references(() => categories.id), // Task belongs to a category
  createdAt: timestamp("created_at").defaultNow(),
});
