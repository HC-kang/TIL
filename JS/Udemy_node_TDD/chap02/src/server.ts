import { UniqidTokenGenerator } from './adapters/externalServices/UniqidTokenGenerator';
import { MongoSecretRepository } from './adapters/repositories/MongoSecretRepository';
import { Application } from './adapters/rest/Application';
import { SecretsByIdController } from './adapters/rest/controllers/SecretsByIdController';
import { SecretsController } from './adapters/rest/controllers/SecretsController';
import { Route } from './adapters/rest/routes/Route';
import { SecretsByIdRoute } from './adapters/rest/routes/SecretsByIdRoute';
import { SecretsRoute } from './adapters/rest/routes/SecretsRoute';
import { OneTimeSecretRetriever } from './domain/useCases/OneTimeSecretRetriever';
import { OneTimeSecretStorer } from './domain/useCases/OneTimeSecretStorer';

const secretRepository = new MongoSecretRepository();

const secretRetriever = new OneTimeSecretRetriever(secretRepository);
const secretsByIdController = new SecretsByIdController(secretRetriever);
const secretsByIdRoute = new SecretsByIdRoute(secretsByIdController);

const tokenGenerator = new UniqidTokenGenerator();
const secretStorer = new OneTimeSecretStorer(secretRepository, tokenGenerator);
const secretsController = new SecretsController(secretStorer);
const secretsRoute = new SecretsRoute(secretsController);

const routeList: Route[] = [];
routeList.push(secretsRoute);
routeList.push(secretsByIdRoute);

const application: Application = new Application(routeList);
application.startServerOnPort(parseInt(process.argv[1], 10) | 3000);

export default application;