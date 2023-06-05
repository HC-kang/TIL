import express from 'express';
import { Route } from './routes/Route';
import { errorHandler } from './middlewares/ErrorHandler';

export class Application {
  private expressApp: express.Application = express();

  constructor(private routeList: Route[]) {
    this.appConfig();
    this.mountRoutes();
  }

  private mountRoutes() {
    this.routeList.forEach((route) => route.mountRoute(this.expressApp));
    this.expressApp.use(errorHandler);
  }

  private appConfig() {
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: true }));
  }

  getExpressApplication(): express.Application {
    return this.expressApp;
  }
}
