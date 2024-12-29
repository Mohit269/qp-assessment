import express, { Request, Response } from "express";
import  supabase  from "./config/supabase";
import router from "./routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);


// Start the server
const startApp = async () => {
  try {
    supabase;
    console.log("Database initialized successfully.");
    
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
  } catch (err) {
    console.error("Failed to start the server:", err);
    process.exit(1); 
  }
};

startApp();
