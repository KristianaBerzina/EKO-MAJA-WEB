import { users, type User, type InsertUser, type ContactSubmission, type InsertContactSubmission } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact submissions
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  updateContactSubmission(id: number, isReviewed: boolean): Promise<ContactSubmission | undefined>;
  deleteContactSubmission(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private userId: number;
  private submissionId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.userId = 1;
    this.submissionId = 1;
    
    // Create default admin user
    this.createUser({
      username: "admin",
      password: "admin123", // In a real app, this would be hashed
      isAdmin: true
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort((a, b) => {
      return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    });
  }

  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    return this.contactSubmissions.get(id);
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.submissionId++;
    const contactSubmission: ContactSubmission = {
      ...submission,
      id,
      submittedAt: new Date(),
      isReviewed: false
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }

  async updateContactSubmission(id: number, isReviewed: boolean): Promise<ContactSubmission | undefined> {
    const submission = await this.getContactSubmission(id);
    
    if (!submission) {
      return undefined;
    }
    
    const updatedSubmission: ContactSubmission = {
      ...submission,
      isReviewed
    };
    
    this.contactSubmissions.set(id, updatedSubmission);
    return updatedSubmission;
  }

  async deleteContactSubmission(id: number): Promise<boolean> {
    return this.contactSubmissions.delete(id);
  }
}

export const storage = new MemStorage();
