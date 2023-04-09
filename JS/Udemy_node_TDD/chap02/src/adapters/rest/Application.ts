import express from 'express';
import { Route } from './routes/Route';
import { errorHandler } from './middlewares/ErrorHandler';

export class Application {
  public app: express.Application = express();

  constructor(private routeList: Route[]) {
    this.appConfig();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.routeList.forEach((route) => route.mountRoute(this.app));
    this.app.use(errorHandler);
  }

  private appConfig(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  startServerOnPort(port: number): void {
    if (process.env.NODE_ENV !== 'test') {
      this.app.listen(port, () => {
        console.info(`Listening on port ${port}`)
      })
    }
  }
}
