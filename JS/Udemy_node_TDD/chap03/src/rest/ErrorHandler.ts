import { NextFunction, Request, Response } from "express";

export function errorHandler(error: Error, request: Request, response: Response, next: NextFunction): void {
  response.status(400).json({ name: error.name, message: error.message})
} 