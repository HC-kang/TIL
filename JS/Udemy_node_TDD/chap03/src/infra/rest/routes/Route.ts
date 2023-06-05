import { Application } from "express";

export interface Route {
  mountRoute(application: Application): void;
}