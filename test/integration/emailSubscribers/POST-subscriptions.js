require('../../test-helpers');
const EmailSubscribers = require('../../../models/emailSubscribers');

describe('EmailSubscribers: Post /subscriptions', () => {
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

    await EmailSubscribers.remove({}).exec();
  });

  it('Errors if user is already subscribed', async () => {
    const location = 'location';
    const email = 'test@email.com';

    await request(server)
      .post('/api/v1/subscriptions')
      .send({
        email,
        location,
      });
    const response = await request(server)
      .post('/api/v1/subscriptions')
      .send({
        email,
        location,
      });

    expect(response.status).to.eql(401);
    expect(response.body.err).to.eql('Subscription already exists');

    await EmailSubscribers.remove({}).exec();
  });

  it.only('Resubscribes a user', async () => {
    const location = 'location';
    const email = 'test@email.com';

    await request(server)
      .post('/api/v1/subscriptions')
      .send({
        email,
        location,
      });
    await request(server)
      .post('/api/v1/subscriptions/unsubscribe')
      .send({
        email,
      });
    const response = await request(server)
      .post('/api/v1/subscriptions')
      .send({
        email,
        location,
      });

    expect(response.status).to.eql(201);
    expect(response.body.subscriber.active).to.eql(true);

    await EmailSubscribers.remove({}).exec();
  });
});
