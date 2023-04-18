import supertest from "supertest";
import server from "../../src/server";

const request = supertest(server);

describe('Get secrets integration Test', () => {
  it('should return an error when the urlId provided is too short', async () => {
    const response = await request.get('/api/v1/secrets/2short');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: 'UrlIdValidationError',
      message: 'UrlId is too short',
    });
  });
  it('should return an error when the secret does not exist in the system', async () => {
    const response = await request.get('/api/v1/secrets/1234123412341234123412341234');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      name: 'SecretNotFoundError',
      message: 'Secret was not found in the system',
    });
  });
  xit('should retrieve a secret from the system', () => {});
});
