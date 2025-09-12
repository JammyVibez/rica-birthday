import { type BirthdayCustomization, type InsertBirthdayCustomization, birthdayCustomizations } from "@shared/schema";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  getBirthdayCustomization(id: string): Promise<BirthdayCustomization | undefined>;
  getDefaultBirthdayCustomization(): Promise<BirthdayCustomization>;
  createBirthdayCustomization(customization: InsertBirthdayCustomization): Promise<BirthdayCustomization>;
  updateBirthdayCustomization(id: string, customization: Partial<InsertBirthdayCustomization>): Promise<BirthdayCustomization | undefined>;
}

export class MemStorage implements IStorage {
  private customizations: Map<string, BirthdayCustomization>;

  constructor() {
    this.customizations = new Map();
    
    // Create default customization
    const defaultId = "default";
    const defaultCustomization: BirthdayCustomization = {
      id: defaultId,
      recipientName: "Rica",
      authorName: "[Your Name]",
      favoriteColor: "[Your favorite color]",
      favoriteFlower: "[Your favorite flower]",
      favoriteFood: "[Your favorite food]",
      favoriteSong: "[Your favorite song]",
      animeReason: "[Add your reason here]",
      timelineEntries: Array.from({ length: 16 }, (_, i) => `[Add your memory from day ${i + 1} here]`) as string[],
      galleryItems: [] as Array<{imageUrl: string, caption: string}>,
      letterText: `Rica,

Happy Birthday. I don't have a gift wrapped in a box, but I wrapped this website with care — every page is a small piece of how you make my days better.

We've only known each other a short while, but you've already become someone I think about often. Your smile, your laugh, and the things you love (like Kanade) tell me who you are — gentle, strong, and quietly beautiful.

I hope this little book makes you smile. I made it because I wanted you to know you matter — more than you might realize.

Always,
[Your Name]`,
      colorTheme: "default",
      animationTheme: "default",
      audioFile: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.customizations.set(defaultId, defaultCustomization);
  }

  async getBirthdayCustomization(id: string): Promise<BirthdayCustomization | undefined> {
    return this.customizations.get(id);
  }

  async getDefaultBirthdayCustomization(): Promise<BirthdayCustomization> {
    return this.customizations.get("default")!;
  }

  async createBirthdayCustomization(insertCustomization: InsertBirthdayCustomization): Promise<BirthdayCustomization> {
    const id = randomUUID();
    const now = new Date();
    
    // Ensure required fields have default values
    const customization: BirthdayCustomization = { 
      id, 
      recipientName: insertCustomization.recipientName || "Rica",
      authorName: insertCustomization.authorName || "[Your Name]",
      favoriteColor: insertCustomization.favoriteColor || null,
      favoriteFlower: insertCustomization.favoriteFlower || null,
      favoriteFood: insertCustomization.favoriteFood || null,
      favoriteSong: insertCustomization.favoriteSong || null,
      animeReason: insertCustomization.animeReason || null,
      timelineEntries: (insertCustomization.timelineEntries as string[]) || [],
      galleryItems: (insertCustomization.galleryItems as Array<{imageUrl: string, caption: string}>) || [],
      letterText: insertCustomization.letterText || null,
      colorTheme: insertCustomization.colorTheme || "default",
      animationTheme: insertCustomization.animationTheme || "default",
      audioFile: insertCustomization.audioFile || null,
      createdAt: now, 
      updatedAt: now 
    };
    
    this.customizations.set(id, customization);
    return customization;
  }

  async updateBirthdayCustomization(id: string, updates: Partial<InsertBirthdayCustomization>): Promise<BirthdayCustomization | undefined> {
    const existing = this.customizations.get(id);
    if (!existing) return undefined;
    
    const updated: BirthdayCustomization = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    
    this.customizations.set(id, updated);
    return updated;
  }
}

export class DrizzleStorage implements IStorage {
  private db;
  private isInitialized = false;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is required for database connection");
    }
    
    const sql = neon(process.env.DATABASE_URL);
    this.db = drizzle(sql);
  }

  private async ensureInitialized(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      console.log("[Database] Checking database schema...");
      
      // Check if table exists by attempting a simple query
      await this.db.select().from(birthdayCustomizations).limit(1);
      
      console.log("[Database] Schema verified successfully");
      this.isInitialized = true;
    } catch (error: any) {
      console.log("[Database] Schema verification failed:", error.message);
      
      // If table doesn't exist, attempt to create it using db:push
      if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
        console.log("[Database] Attempting to create database schema...");
        
        try {
          // Use drizzle-kit push to create tables
          const { execSync } = require('child_process');
          execSync('npm run db:push', { 
            stdio: 'pipe',
            env: { ...process.env, NODE_ENV: 'development' }
          });
          
          console.log("[Database] Schema created successfully");
          this.isInitialized = true;
        } catch (pushError: any) {
          console.error("[Database] Failed to create schema:", pushError.message);
          throw new Error(`Database initialization failed: ${pushError.message}`);
        }
      } else {
        throw error;
      }
    }
  }

  async getBirthdayCustomization(id: string): Promise<BirthdayCustomization | undefined> {
    await this.ensureInitialized();
    
    try {
      const result = await this.db
        .select()
        .from(birthdayCustomizations)
        .where(eq(birthdayCustomizations.id, id))
        .limit(1);
      
      return result[0] || undefined;
    } catch (error) {
      console.error(`[Database] Error fetching birthday customization ${id}:`, error);
      throw error;
    }
  }

  async getDefaultBirthdayCustomization(): Promise<BirthdayCustomization> {
    await this.ensureInitialized();
    
    try {
      // First try to get existing default record
      let result = await this.db
        .select()
        .from(birthdayCustomizations)
        .where(eq(birthdayCustomizations.id, "default"))
        .limit(1);
      
      if (result.length > 0) {
        console.log("[Database] Retrieved existing default birthday customization");
        return result[0];
      }
      
      console.log("[Database] Creating default birthday customization record...");
      
      // If no default exists, create it
      const defaultCustomization: InsertBirthdayCustomization = {
        recipientName: "Rica",
        authorName: "[Your Name]",
        favoriteColor: "[Your favorite color]",
        favoriteFlower: "[Your favorite flower]",
        favoriteFood: "[Your favorite food]",
        favoriteSong: "[Your favorite song]",
        animeReason: "[Add your reason here]",
        timelineEntries: Array.from({ length: 16 }, (_, i) => `[Add your memory from day ${i + 1} here]`) as string[],
        galleryItems: [] as Array<{imageUrl: string, caption: string}>,
        letterText: `Rica,

Happy Birthday. I don't have a gift wrapped in a box, but I wrapped this website with care — every page is a small piece of how you make my days better.

We've only known each other a short while, but you've already become someone I think about often. Your smile, your laugh, and the things you love (like Kanade) tell me who you are — gentle, strong, and quietly beautiful.

I hope this little book makes you smile. I made it because I wanted you to know you matter — more than you might realize.

Always,
[Your Name]`,
        colorTheme: "default",
        animationTheme: "default",
        audioFile: null,
      };
      
      // Insert with specific ID for default record
      const inserted = await this.db
        .insert(birthdayCustomizations)
        .values({
          ...defaultCustomization,
          id: "default"
        })
        .returning();
      
      console.log("[Database] Default birthday customization created successfully");
      return inserted[0];
    } catch (error) {
      console.error("[Database] Error with default birthday customization:", error);
      throw error;
    }
  }

  async createBirthdayCustomization(insertCustomization: InsertBirthdayCustomization): Promise<BirthdayCustomization> {
    await this.ensureInitialized();
    
    try {
      const result = await this.db
        .insert(birthdayCustomizations)
        .values({
          ...insertCustomization,
          // Ensure defaults for required fields
          recipientName: insertCustomization.recipientName || "Rica",
          authorName: insertCustomization.authorName || "[Your Name]",
          colorTheme: insertCustomization.colorTheme || "default",
          animationTheme: insertCustomization.animationTheme || "default",
          timelineEntries: insertCustomization.timelineEntries || [],
          galleryItems: insertCustomization.galleryItems || [],
        })
        .returning();
      
      console.log(`[Database] Created new birthday customization with ID: ${result[0].id}`);
      return result[0];
    } catch (error) {
      console.error("[Database] Error creating birthday customization:", error);
      throw error;
    }
  }

  async updateBirthdayCustomization(id: string, updates: Partial<InsertBirthdayCustomization>): Promise<BirthdayCustomization | undefined> {
    await this.ensureInitialized();
    
    try {
      const result = await this.db
        .update(birthdayCustomizations)
        .set({
          ...updates,
          updatedAt: sql`now()`,
        })
        .where(eq(birthdayCustomizations.id, id))
        .returning();
      
      if (result[0]) {
        console.log(`[Database] Updated birthday customization with ID: ${id}`);
      } else {
        console.log(`[Database] Birthday customization with ID ${id} not found for update`);
      }
      
      return result[0] || undefined;
    } catch (error) {
      console.error(`[Database] Error updating birthday customization ${id}:`, error);
      throw error;
    }
  }
}

export const storage = new DrizzleStorage();
