import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes would go here if needed
  // Nothing to add for this static informational website

  const httpServer = createServer(app);

  return httpServer;
}
