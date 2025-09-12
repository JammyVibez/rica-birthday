
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, json, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const birthdayCustomizations = pgTable("birthday_customizations", {
  id: uuid("id").primaryKey().defaultRandom(),
  recipientName: text("recipient_name").notNull().default("Rica"),
  authorName: text("author_name").notNull().default("[Your Name]"),
  
  // About Rica page data
  favoriteColor: text("favorite_color").default("[Your favorite color]"),
  favoriteFlower: text("favorite_flower").default("[Your favorite flower]"),
  favoriteFood: text("favorite_food").default("[Your favorite food]"),
  favoriteSong: text("favorite_song").default("[Your favorite song]"),
  
  // Anime corner
  animeReason: text("anime_reason").default("[Add your reason here]"),
  
  // Timeline entries (16 days)
  timelineEntries: json("timeline_entries").$type<string[]>().default(sql`'[]'::json`),
  
  // Gallery
  galleryItems: json("gallery_items").$type<Array<{imageUrl: string, caption: string}>>().default(sql`'[]'::json`),
  
  // Anime Playlist
  animePlaylist: json("anime_playlist").$type<Array<{title: string, artist: string, youtubeUrl: string, description: string}>>().default(sql`'[]'::json`),
  
  // Memory Journal
  memoryEntries: json("memory_entries").$type<Array<{id: string, date: string, content: string}>>().default(sql`'[]'::json`),
  
  // Hidden Messages
  hiddenMessages: json("hidden_messages").$type<Array<{id: string, title: string, message: string, unlocked: boolean}>>().default(sql`'[]'::json`),
  
  // Favorite Things
  favoriteThings: json("favorite_things").$type<{
    colors: string[];
    foods: string[];
    animes: string[];
    songs: string[];
    activities: string[];
  }>().default(sql`'{"colors":[],"foods":[],"animes":[],"songs":[],"activities":[]}'::json`),
  
  // Future Surprises
  futureSurprises: json("future_surprises").$type<Array<{id: string, title: string, message: string, date: string, revealed: boolean}>>().default(sql`'[]'::json`),
  
  // Letter content
  letterText: text("letter_text"),
  
  // Theme settings
  colorTheme: text("color_theme").default("default"),
  animationTheme: text("animation_theme").default("default"),
  
  // Audio file path
  audioFile: text("audio_file"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertBirthdayCustomizationSchema = createInsertSchema(birthdayCustomizations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertBirthdayCustomization = z.infer<typeof insertBirthdayCustomizationSchema>;
export type BirthdayCustomization = typeof birthdayCustomizations.$inferSelect;
