import { Application } from './infra/rest/Application';
import { Route } from './infra/rest/Route';
import { SecretsByIdController } from './infra/rest/SecretsByIdController';
import { SecretsByIdRoute } from './infra/rest/SecretsByIdRoute';
import { OneTimeSecretRetriever } from './services/OneTimeSecretRetriever';
import { MongoSecretRepository } from './infra/repositories/MongoSecretRepository';
import { SecretsController } from './infra/rest/SecretsController';
import { SecretsRoute } from './infra/rest/SecretsRoute';
import { SecretStorer } from './services/SecretStorer';
import { OneTimeSecretStorer } from './services/OneTimeSecretStorer';
import { TokenGenerator } from './services/TokenGenerator';

const secretRepository = new MongoSecretRepository();
const secretRetriever = new OneTimeSecretRetriever(secretRepository);
const secretsByIdController = new SecretsByIdController(secretRetriever);
const secretsByIdRoute = new SecretsByIdRoute(secretsByIdController);

const tokenGenerator: TokenGenerator = {
  generateToken: function (): string {
    throw new Error('Function not implemented.');
  }
}
const secretStorer: SecretStorer = new OneTimeSecretStorer(secretRepository, tokenGenerator)
const secretsController = new SecretsController(secretStorer);
const secretsRoute = new SecretsRoute(secretsController);

const routeList: Route[] = [];
routeList.push(secretsByIdRoute);
routeList.push(secretsRoute);

const application = new Application(routeList);

const expressApplication = application.getExpressApplication();

export default expressApplication;
