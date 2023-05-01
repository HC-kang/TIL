import { Application } from 'express';
import { Route } from './Route';
import { SecretsController } from './SecretsController';

export class SecretsRoute implements Route {
  constructor(private secretsController: SecretsController) {}

  mountRoute(application: Application): void {
    application
      .route('/api/v1/secrets/:urlId')
      .post(this.secretsController.storeSecret);
  }
}
