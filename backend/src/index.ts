import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";

const app = express();

// Enable CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  const requsetHeaderOrigin = req.header("Origin");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Cache-Control, X-Requested-With");
  res.header("Access-Control-Allow-Origin", requsetHeaderOrigin);
});

app.use(json());

export default app;
