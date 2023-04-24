import { Secret } from "./domain/models/Secret";
import { SecretRetriever } from "./services/SecretRetriever";
import { UrlId } from "./domain/models/UrlId";
import { Application } from "./infra/rest/Application";
import { Route } from "./infra/rest/Route";
import { SecretsByIdController } from "./infra/rest/SecretsByIdController";
import { SecretsByIdRoute } from "./infra/rest/SecretsByIdRoute";
import { OneTimeSecretRetriever } from "./services/OneTimeSecretRetriever";
import { MongoSecretRepository } from "./infra/repositories/MongoSecretRepository";

const secretRepository = new MongoSecretRepository();
const secretRetriever = new OneTimeSecretRetriever(secretRepository);
const secretsByIdController = new SecretsByIdController(secretRetriever);
const secretsByIdRoute = new SecretsByIdRoute(secretsByIdController);

const routeList: Route[] = [];
routeList.push(secretsByIdRoute);

const application = new Application(routeList);

const expressApplication = application.getExpressionApplication();

export default expressApplication;
