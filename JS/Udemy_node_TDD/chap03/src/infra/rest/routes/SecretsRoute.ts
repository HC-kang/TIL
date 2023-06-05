import { Application } from "express";
import { Route } from "./Route";
import { SecretsController } from '../controllers/SecretsController';

export class SecretsRoute implements Route {
  constructor(private secretsController: SecretsController) {}

  mountRoute(application: Application): void {
    application.route('/api/v1/secrets').post(this.secretsController.storeSecret);
  }
}