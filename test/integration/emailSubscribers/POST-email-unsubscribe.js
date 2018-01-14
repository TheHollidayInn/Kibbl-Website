require('../../test-helpers');
const EmailSubscribers = require('../../../models/emailSubscribers');
const URL_TESTING = '/api/v1/subscriptions/unsubscribe';

describe('EmailSubscribers: Post /subscriptions/unsubscribe', () => {
  const email = 'test@test.com';
  const location = 'location';

  it('errors when email is not provided', async () => {
    const response = await request(server).post(URL_TESTING);
    expect(response.status).to.eql(400);
    expect(response.body.err).to.eql('Email required');
  });

  it('errors when subscription is not found', async () => {
    const response = await request(server).post(URL_TESTING).send({email});
    expect(response.status).to.eql(404);
    expect(response.body.err).to.eql('Subscription not found');
  });

  it('unsubscribes a user', async () => {
    await request(server)
      .post('/api/v1/subscriptions')
      .send({
        email,
        location,
      });

    const response = await request(server).post(URL_TESTING).send({email});

    expect(response.body.subscriber.active).to.eql(false);
    await EmailSubscribers.remove({}).exec();
  });

  it('errors when subscription is inactive already', async () => {
    await request(server)
      .post('/api/v1/subscriptions')
      .send({
        email,
        location,
      });

    await request(server).post(URL_TESTING).send({email});
    const response = await request(server).post(URL_TESTING).send({email});

    expect(response.status).to.eql(401);
    expect(response.body.err).to.eql('Subscription is inactive');
    await EmailSubscribers.remove({}).exec();
  });
});
