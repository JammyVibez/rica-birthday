
import { type BirthdayCustomization, type InsertBirthdayCustomization, birthdayCustomizations } from "@shared/schema";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, sql } from "drizzle-orm";
import { createClient } from "@supabase/supabase-js";

export interface IStorage {
  getBirthdayCustomization(id: string): Promise<BirthdayCustomization | undefined>;
  getDefaultBirthdayCustomization(): Promise<BirthdayCustomization>;
  createBirthdayCustomization(customization: InsertBirthdayCustomization): Promise<BirthdayCustomization>;
  updateBirthdayCustomization(id: string, customization: Partial<InsertBirthdayCustomization>): Promise<BirthdayCustomization | undefined>;
}

export class SupabaseStorage implements IStorage {
  private db;
  private supabase;
  private isInitialized = false;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is required for database connection");
    }
    
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
    }
    
    const client = postgres(process.env.DATABASE_URL, { 
      max: 1,
      ssl: 'require'
    });
    this.db = drizzle(client);
    
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
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
      throw new Error(`Database connection failed: ${error.message}`);
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
      const defaultId = "00000000-0000-0000-0000-000000000001"; // Use a proper UUID format for default
      let result = await this.db
        .select()
        .from(birthdayCustomizations)
        .where(eq(birthdayCustomizations.id, defaultId))
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
        animePlaylist: [] as Array<{title: string, artist: string, youtubeUrl: string, description: string}>,
        memoryEntries: [] as Array<{id: string, date: string, content: string}>,
        hiddenMessages: [
          {
            id: "welcome",
            title: "Welcome Message", 
            message: "Rica, I hope this little digital book brings a smile to your face. Every page was made with care, thinking of you.",
            unlocked: false
          },
          {
            id: "special",
            title: "Something Special",
            message: "You have this amazing way of making ordinary moments feel magical. Thank you for being you.",
            unlocked: false
          }
        ] as Array<{id: string, title: string, message: string, unlocked: boolean}>,
        favoriteThings: {
          colors: ["Soft pastels", "Sakura pink", "Sky blue"],
          foods: ["[Add her favorites]", "[Sweet treats]", "[Comfort foods]"],
          animes: ["Angel Beats!", "[Other favorites]", "[To be discovered]"],
          songs: ["My Soul, Your Beats!", "[Her playlist]", "[Songs that remind me of her]"],
          activities: ["[Things she enjoys]", "[Our shared interests]", "[New adventures to try]"]
        },
        futureSurprises: [
          {
            id: "1",
            title: "Monthly Letter",
            message: "Rica, it's been another amazing month getting to know you better. Here's what made me smile this month...",
            date: new Date().toLocaleDateString(),
            revealed: false
          },
          {
            id: "2", 
            title: "Random Thoughts",
            message: "I was thinking about you today and realized how much brighter my days have become since we started talking. Thank you for being you! 💖",
            date: new Date().toLocaleDateString(),
            revealed: false
          }
        ] as Array<{id: string, title: string, message: string, date: string, revealed: boolean}>,
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
          id: defaultId
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
          animePlaylist: insertCustomization.animePlaylist || [],
          memoryEntries: insertCustomization.memoryEntries || [],
          hiddenMessages: insertCustomization.hiddenMessages || [],
          favoriteThings: insertCustomization.favoriteThings || {
            colors: [],
            foods: [],
            animes: [],
            songs: [],
            activities: []
          },
          futureSurprises: insertCustomization.futureSurprises || [],
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

  // Helper method to upload files to Supabase Storage
  async uploadFile(file: Buffer, fileName: string, contentType: string): Promise<string | null> {
    try {
      const { data, error } = await this.supabase.storage
        .from('birthday-gallery')
        .upload(fileName, file, {
          contentType,
          upsert: true
        });

      if (error) {
        console.error("[Storage] Error uploading file:", error);
        return null;
      }

      // Get public URL
      const { data: urlData } = this.supabase.storage
        .from('birthday-gallery')
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error("[Storage] Error uploading file:", error);
      return null;
    }
  }
}

export const storage = new SupabaseStorage();
