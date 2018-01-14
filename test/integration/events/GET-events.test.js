let moment = require('moment');

require('../../test-helpers');
let integrationHelpers = require('../../integration-helpers');
let Event = require("../../../models/events");

describe('Events: Get', () => {
  let userdata;
  let eventType = 'type-event';
  let eventZipCode = '77777';
  let eventStartDate = new Date();
  let event;

  before(function (done) {
    integrationHelpers.generateUser()
      .then(function(generatedUser) {
        userdata = generatedUser.userData;

        event = new Event();
        event.type = eventType;
        event.date = eventStartDate;
        event.loctionDetails.zipCode = eventZipCode;
        event.locationCoords = { type: 'Point', coordinates: [-179.0, 0.0] };

        return event.save();
      })
      .then(function(generatedUser) {
        done();
      })
      .catch(function (error) {
        console.log("error", error)
        done();
      })
  });

  after(() => {
    Event.remove({}).exec();
  })

  it('returns events', (done) => {
    request(server)
      .get('/api/v1/events')
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.exist;
        done();
      });
  });

  it('returns empty when events with zipcode do not exist', (done) => {
    request(server)
      .get(`/api/v1/events?zipCode=randomZip`)
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.eql([]);
        done();
      });
  });

  it('fitlers events by location', (done) => {
    request(server)
      .get(`/api/v1/events?zipCode=${eventZipCode}`)
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.length.should.eql(1);
        done();
      });
  });

  it('returns empty when events with type do not exist', (done) => {
    request(server)
      .get(`/api/v1/events?type=randomType`)
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.eql([]);
        done();
      });
  });

  it('fitlers events by location', (done) => {
    request(server)
      .get(`/api/v1/events?type=${eventType}`)
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.length.should.eql(1);
        done();
      });
  });

  it('returns empty when events are not in between dates', (done) => {
    let startDate = moment().add(2, 'days');
    let endDate = moment().add(4, 'days');

    request(server)
      .get(`/api/v1/events?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.eql([]);
        done();
      });
  });

  it('fitlers events by date', (done) => {
    let startDate = moment().subtract(2, 'days');
    let endDate = moment().add(4, 'days');

    request(server)
      .get(`/api/v1/events?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        console.log(res.body.data)
        res.should.have.status(200);
        res.body.data.length.should.eql(1);
        done();
      });
  });

  it('finds events near a coordinate', (done) => {
    let location = '29 champs elysée paris';

    request(server)
      .get(`/api/v1/events?location=${location}`)
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.length.should.eql(1);
        done();
      });
  });
});
