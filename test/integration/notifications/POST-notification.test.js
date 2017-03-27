require('../../test-helpers');
let integrationHelpers = require('../../integration-helpers');

let Notification = require("../../../models/notifications");
let User = require("../../../models/user");
let Volunteer = require("../../../models/volunteerOpportunity");

describe('Notification: POST', () => {
  let contactInfo = {
    shelterId: 'req.body.shelterId',
  };
  let userdata;

  before(function (done) {
    // server = require('../../../app');
    integrationHelpers.generateUser()
      .then(function(generatedUser) {
        userdata = generatedUser.userData;
        done();
      })
      .catch(function (error) {
        console.log("error", error)
        done();
      })
  });

  afterEach(function(done) {
    Notification.remove({}, function() {
      done();
    });
  });

  it('returns an error when user is not logged in', (done) => {
    request(server)
      .post('/api/v1/notifications')
      .send(contactInfo)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.message.should.eql('No token provided.');
        done();
      });
  });

  it('creates a notification', (done) => {
    request(server)
      .post('/api/v1/notifications')
      .set('x-access-token', userdata.token)
      .send(contactInfo)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data.exist;
        done();
      });
  });

  it('prevents user from subscribing to more than 10 a month', (done) => {
    User
      .update({_id: userdata.user._id}, {$set: {'limits.subs': 10}})
      .exec()
      .then((user) => {
        let pet = new Volunteer();
        return pet.save();
      })
      .then((petSaved) => {
        return request(server)
          .post('/api/v1/notifications')
          .set('x-access-token', userdata.token)
          .send({
            type: 'shelter',
            itemId: petSaved._id,
          })
          .endAsync();
      })
      .then((res) => {
        res.should.have.status(401);
        res.body.message.should.eql('You have reached your limit of 10 subscriptions.');
        done();
      });
  });
});
