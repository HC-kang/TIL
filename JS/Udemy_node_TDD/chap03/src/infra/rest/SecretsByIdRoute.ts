import { Application } from 'express';
import { SecretsByIdController } from './SecretsByIdController';
import { Route } from './Route';

export class SecretsByIdRoute implements Route {
  constructor(private secretsByIdController: SecretsByIdController) {}

  mountRoute(application: Application): void {
    application
      .route('/api/v1/secrets/:urlId')
      .get(this.secretsByIdController.retrieveSecret);
  }
}
