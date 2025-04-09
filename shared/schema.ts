import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  product: text("product"),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
  isReviewed: boolean("is_reviewed").notNull().default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  isAdmin: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  phone: true,
  email: true,
  product: true,
  message: true,
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type LoginCredentials = z.infer<typeof loginSchema>;
