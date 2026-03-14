import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // Email Configuration
  // Note: To send real emails, you'll need to provide SMTP credentials in .env
  const transporter = nodemailer.createTransport({
    // Example using a common service. For production, use environment variables.
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // API routes
  app.post("/api/contact", async (req, res) => {
    const { name, contact, message } = req.body;
    const targetEmail = "jonifarcvania1234@gmail.com";

    console.log(`Received contact form from ${name} (${contact})`);

    // In a real scenario with credentials, we would send the email here:
    /*
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: targetEmail,
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nContact: ${contact}\n\nMessage:\n${message}`,
      });
      res.json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, message: "Failed to send email" });
    }
    */

    // For now, we simulate success and log the intent
    console.log(`SIMULATED EMAIL SENT TO: ${targetEmail}`);
    console.log(`CONTENT: Name: ${name}, Contact: ${contact}, Message: ${message}`);
    
    res.json({ 
      success: true, 
      message: "Message received! (Simulation: In a production environment with SMTP keys, this would be sent to jonifarcvania1234@gmail.com)" 
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
