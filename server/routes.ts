import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { loginSchema, insertContactSubmissionSchema } from "@shared/schema";
import MemoryStore from "memorystore";

const MemStore = MemoryStore(session);

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up session management
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "ekomaja-secret-key",
      resave: false,
      saveUninitialized: false,
      store: new MemStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    })
  );

  // Initialize passport for authentication
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure passport local strategy
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user) {
          return done(null, false, { message: "Invalid username" });
        }
        
        // In a real application, you'd compare hashed passwords
        if (user.password !== password) {
          return done(null, false, { message: "Invalid password" });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  // Serialize and deserialize user for session management
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Auth middleware
  const isAuthenticated = (req: Request, res: Response, next: Function) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Not authenticated" });
  };

  const isAdmin = (req: Request, res: Response, next: Function) => {
    if (req.isAuthenticated() && (req.user as any)?.isAdmin) {
      return next();
    }
    res.status(403).json({ message: "Not authorized" });
  };

  // AUTH ROUTES
  app.post("/api/auth/login", (req, res, next) => {
    try {
      const result = loginSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid request data" });
      }

      passport.authenticate("local", (err: any, user: any, info: any) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({ message: info.message || "Authentication failed" });
        }
        req.logIn(user, function(err) {
          if (err) {
            return next(err);
          }
          return res.json({ 
            id: user.id, 
            username: user.username, 
            isAdmin: user.isAdmin 
          });
        });
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout(function(err) {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/session", (req, res) => {
    if (req.isAuthenticated()) {
      const user = req.user as any;
      return res.json({
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin
      });
    }
    res.status(401).json({ message: "Not authenticated" });
  });

  // CONTACT SUBMISSIONS ROUTES
  app.post("/api/contact", async (req, res, next) => {
    try {
      const result = insertContactSubmissionSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid request data",
          errors: result.error.errors
        });
      }
      
      const contactSubmission = await storage.createContactSubmission(result.data);
      res.status(201).json(contactSubmission);
    } catch (error) {
      next(error);
    }
  });

  // Admin-only routes
  app.get("/api/admin/contact-submissions", isAuthenticated, isAdmin, async (req, res, next) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      next(error);
    }
  });

  app.put("/api/admin/contact-submissions/:id/review", isAuthenticated, isAdmin, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { isReviewed } = req.body;
      
      if (typeof isReviewed !== 'boolean') {
        return res.status(400).json({ message: "isReviewed must be a boolean" });
      }
      
      const updated = await storage.updateContactSubmission(id, isReviewed);
      
      if (!updated) {
        return res.status(404).json({ message: "Contact submission not found" });
      }
      
      res.json(updated);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/admin/contact-submissions/:id", isAuthenticated, isAdmin, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const deleted = await storage.deleteContactSubmission(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Contact submission not found" });
      }
      
      res.json({ message: "Contact submission deleted successfully" });
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
