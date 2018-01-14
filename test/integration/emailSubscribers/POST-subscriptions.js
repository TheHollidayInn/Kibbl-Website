require('../../test-helpers');
const EmailSubscribers = require('../../../models/emailSubscribers');

describe('EmailSubscribers: Post /subscriptions', () => {
  after(async () => {
    await EmailSubscribers.remove({}).exec();
  });

  it('errors when email or location is not provided', async () => {
    const response = await request(server).post('/api/v1/subscriptions');
    expect(response.status).to.eql(400);
    expect(response.body.err).to.eql('Email and Location required');
  });

  it('subscribes a user', async () => {
    const location = 'location';
    const email = 'test@email.com';

    const response = await request(server)
      .post('/api/v1/subscriptions')
      .send({
        email,
        location,
      });

    const subscriber = response.body.subscriber;
    expect(response.status).to.eql(201);
    expect(subscriber.email).to.eql(email);
    expect(subscriber.location).to.eql(location);
    expect(subscriber.active).to.eql(true);
  });
});
