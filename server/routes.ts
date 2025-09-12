import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBirthdayCustomizationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Birthday customization routes
  
  // Get default birthday customization
  app.get("/api/birthday", async (req, res) => {
    try {
      const customization = await storage.getDefaultBirthdayCustomization();
      res.json(customization);
    } catch (error) {
      console.error("Error fetching birthday customization:", error);
      res.status(500).json({ error: "Failed to fetch birthday customization" });
    }
  });

  // Get specific birthday customization by ID
  app.get("/api/birthday/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const customization = await storage.getBirthdayCustomization(id);
      
      if (!customization) {
        return res.status(404).json({ error: "Birthday customization not found" });
      }
      
      res.json(customization);
    } catch (error) {
      console.error("Error fetching birthday customization:", error);
      res.status(500).json({ error: "Failed to fetch birthday customization" });
    }
  });

  // Create new birthday customization
  app.post("/api/birthday", async (req, res) => {
    try {
      const result = insertBirthdayCustomizationSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid birthday customization data", 
          details: result.error.issues 
        });
      }
      
      const customization = await storage.createBirthdayCustomization(result.data);
      res.status(201).json(customization);
    } catch (error) {
      console.error("Error creating birthday customization:", error);
      res.status(500).json({ error: "Failed to create birthday customization" });
    }
  });

  // Update birthday customization
  app.patch("/api/birthday/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = insertBirthdayCustomizationSchema.partial().safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid birthday customization data", 
          details: result.error.issues 
        });
      }
      
      const customization = await storage.updateBirthdayCustomization(id, result.data);
      
      if (!customization) {
        return res.status(404).json({ error: "Birthday customization not found" });
      }
      
      res.json(customization);
    } catch (error) {
      console.error("Error updating birthday customization:", error);
      res.status(500).json({ error: "Failed to update birthday customization" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);

  return httpServer;
}
