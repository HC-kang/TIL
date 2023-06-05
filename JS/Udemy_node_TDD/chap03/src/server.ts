import { Application } from './infra/rest/Application';
import { Route } from './infra/rest/routes/Route';
import { SecretsByIdRoute } from './infra/rest/routes/SecretsByIdRoute';
import { OneTimeSecretRetriever } from './domain/services/OneTimeSecretRetriever';
import { MongoSecretRepository } from './infra/repositories/mongo/MongoSecretRepository';
import { SecretsController } from './infra/rest/controllers/SecretsController';
import { SecretsRoute } from './infra/rest/routes/SecretsRoute';
import { SecretStorer } from './domain/services/SecretStorer';
import { OneTimeSecretStorer } from './domain/services/OneTimeSecretStorer';
import { UniqidTokenGenerator } from './infra/externalServices/UniqidTokenGenerator';
import { SecretsByIdController } from './infra/rest/controllers/SecretsByIdController';

const secretRepository = new MongoSecretRepository();
const secretRetriever = new OneTimeSecretRetriever(secretRepository);
const secretsByIdController = new SecretsByIdController(secretRetriever);
const secretsByIdRoute = new SecretsByIdRoute(secretsByIdController);

const tokenGenerator = new UniqidTokenGenerator();
const secretStorer: SecretStorer = new OneTimeSecretStorer(secretRepository, tokenGenerator)
const secretsController = new SecretsController(secretStorer);
const secretsRoute = new SecretsRoute(secretsController);

const routeList: Route[] = [];
routeList.push(secretsByIdRoute);
routeList.push(secretsRoute);

const application = new Application(routeList);

const expressApplication = application.getExpressApplication();

export default expressApplication;
