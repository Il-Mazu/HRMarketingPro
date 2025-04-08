import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Try to serve the app on port 5000, but fall back to other ports if necessary
  // this serves both the API and the client.
  const tryPorts = [5000, 5001, 5002, 5003, 3000, 8080];
  
  // Function to try starting the server on different ports
  const tryStartServer = (portIndex: number) => {
    if (portIndex >= tryPorts.length) {
      log('Failed to start server on any port');
      process.exit(1);
      return;
    }
    
    const port = tryPorts[portIndex];
    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    })
    .on('listening', () => {
      log(`serving on port ${port}`);
    })
    .on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        log(`Port ${port} is in use, trying next port...`);
        tryStartServer(portIndex + 1);
      } else {
        log(`Error starting server: ${err.message}`);
        throw err;
      }
    });
  };
  
  // Start trying ports
  tryStartServer(0);
})();
