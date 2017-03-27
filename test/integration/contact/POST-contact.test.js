require('../../test-helpers');
let integrationHelpers = require('../../integration-helpers');

let Pet = require("../../../models/pets");
let Shelter = require("../../../models/shelters");
let Volunteer = require("../../../models/volunteerOpportunity");
let Event = require("../../../models/events");
let Favorite = require('../../../models/favorites');
let User = require('../../../models/user');

let Contact = require("../../../models/contact.js");
let Mailgun = require('../../../libraries/mailgun');

describe('Contact: POST', () => {
  let contactInfo = {
    petID: 'req.body.petId',
    firstName: 'req.body.firstName',
    lastName: 'req.body.lastName',
    email: 'req.body.email',
    message: 'req.body.message',
  };
  let userdata;

  before(function (done) {
    sinon.stub(Mailgun, 'sendMessages').returnsPromise().resolves({id: 'message-id'});

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

  after(function(done) {
    Mailgun.sendMessages.restore();

    Contact.remove()
      .then(function () {
        return Pet.remove();
      })
      .then(function () {
        return Shelter.remove();
      })
      .then(function () {
        return Volunteer.remove();
      })
      .then(function () {
        return Event.remove();
      })
      .then(function () {
        done();
      });
  });

  it('returns an error when user is not logged in', (done) => {
    request(server)
      .post('/api/v1/contacts')
      .send(contactInfo)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.message.should.eql('No token provided.');
        done();
      });
  });

  it('creates a contact message', (done) => {
    request(server)
      .post('/api/v1/contacts')
      .set('x-access-token', userdata.token)
      .send(contactInfo)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data.exist;
        Mailgun.sendMessages.callCount.should.equal(1);
        done();
      });
  });

  it('creates a contact message with event', (done) => {
    let pet = new Event();
    pet.save()
      .then((petSaved) => {
        return request(server)
          .post('/api/v1/contacts')
          .send({
            type: 'event',
            itemId: petSaved._id,
          })
          .set('x-access-token', userdata.token)
          .endAsync();
      })
      .then((res) => {
        res.should.have.status(201);
        let favorite = res.body.data;
        favorite.eventId.should.eql(pet._id+'');
        favorite.userID.should.equal(userdata.user._id);
        Mailgun.sendMessages.callCount.should.equal(2);
        done();
      });
  });

  it('creates a contact message with volunteer', (done) => {
    let pet = new Volunteer();
    pet.save()
      .then((petSaved) => {
        return request(server)
          .post('/api/v1/contacts')
          .send({
            type: 'volunteer',
            itemId: petSaved._id,
          })
          .set('x-access-token', userdata.token)
          .endAsync();
      })
      .then((res) => {
        res.should.have.status(201);
        let favorite = res.body.data;
        favorite.volunteerId.should.eql(pet._id+'');
        favorite.userID.should.equal(userdata.user._id);
        Mailgun.sendMessages.callCount.should.equal(3);
        done();
      });
  });

  it('creates a contact message with shelter', (done) => {
    let pet = new Volunteer();
    pet.save()
      .then((petSaved) => {
        return request(server)
          .post('/api/v1/contacts')
          .send({
            type: 'shelter',
            itemId: petSaved._id,
          })
          .set('x-access-token', userdata.token)
          .endAsync();
      })
      .then((res) => {
        res.should.have.status(201);
        let favorite = res.body.data;
        favorite.shelterId.should.eql(pet._id+'');
        favorite.userID.should.equal(userdata.user._id);
        Mailgun.sendMessages.callCount.should.equal(4);
        done();
      });
  });

  it('prevents user from sending more than 10 messages a month', (done) => {
    let user = User
      .update({_id: userdata.user._id}, {$set: {'limits.monthlyContacts': 10}})
      .exec()
      .then((user) => {
        request(server)
          .post('/api/v1/contacts')
          .set('x-access-token', userdata.token)
          .send(contactInfo)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.message.exist;
            Mailgun.sendMessages.callCount.should.equal(0);
            done();
          });
      });
  });
});
