import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Access Denied",
      details: "Missing authorization token",
      status: "error",
      statusCode: 401,
    });
    return;
  }

  try {
    req.user = jwt.verify(token, env.JWT_SECRET) as {
      userId: string;
    };
    next();
  } catch {
    res.status(403).json({
      message: "Invalid Token",
      details: "Please re-login",
      status: "error",
      statusCode: 403,
    });
  }
};
