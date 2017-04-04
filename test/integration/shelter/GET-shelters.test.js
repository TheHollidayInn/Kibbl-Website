let moment = require('moment');

require('../../test-helpers');
let integrationHelpers = require('../../integration-helpers');
let Shelters = require("../../../models/shelters");

describe('shelters: Get', () => {
  let userdata;
  let eventType = 'type-event';
  let eventZipCode = '77777';
  let eventStartDate = new Shelters();
  let event;

  before(function (done) {
    integrationHelpers.generateUser()
      .then(function(generatedUser) {
        userdata = generatedUser.userData;

        event = new Shelters();
        event.type = eventType;
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
    Shelters.remove({}).exec();
  })

  it('returns shelters', (done) => {
    request(server)
      .get('/api/v1/shelters')
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.exist;
        done();
      });
  });

  it('returns empty when events with zipcode do not exist', (done) => {
    request(server)
      .get(`/api/v1/shelters?zipCode=randomZip`)
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.eql([]);
        done();
      });
  });

  it('fitlers shelters by location', (done) => {
    request(server)
      .get(`/api/v1/shelters?zipCode=${eventZipCode}`)
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.length.should.eql(1);
        done();
      });
  });

  it('returns empty when events with type do not exist', (done) => {
    request(server)
      .get(`/api/v1/shelters?type=randomType`)
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.eql([]);
        done();
      });
  });

  it('fitlers events by location', (done) => {
    request(server)
      .get(`/api/v1/shelters?type=${eventType}`)
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.length.should.eql(1);
        done();
      });
  });

  xit('returns empty when events are not in between dates', (done) => {
    let startDate = moment().add(2, 'days');
    let endDate = moment().add(4, 'days');

    request(server)
      .get(`/api/v1/shelters?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.eql([]);
        done();
      });
  });

  it('finds shelters near a coordinate', (done) => {
    let location = '29 champs elysée paris';

    request(server)
      .get(`/api/v1/shelters?location=${location}`)
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.length.should.eql(1);
        done();
      });
  });
});
