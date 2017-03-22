require('../../test-helpers');
let integrationHelpers = require('../../integration-helpers');

let Pet = require("../../../models/pets");
let Comment = require('../../../models/comments');

describe('Comment: POST', () => {
  let userdata;
  let pet;

  before(function (done) {
    integrationHelpers.generateUser()
      .then(function(generatedUser) {
        userdata = generatedUser.userData;
        return  done();
      })
      .catch(function (error) {
        console.log("error", error)
        done();
      })
  });

  afterEach(function(done) {
    Comment.remove()
      .then(function () {
        return Pet.remove();
      })
      .then(function () {
        done();
      });
  });

  it('returns an error when user is not logged in', (done) => {
    request(server)
      .post(`/api/v1/comments`)
      .endAsync()
      .then((res) => {
        res.should.have.status(403);
        res.body.message.should.eql('No token provided.');
        done();
      });
  });

  it('comments on an item', (done) => {
    let pet = new Pet();
    pet.save()
      .then((petSaved) => {
        return request(server)
          .post('/api/v1/comments')
          .send({
            itemId: petSaved._id,
          })
          .set('x-access-token', userdata.token)
          .endAsync();
      })
      .then((res) => {
        res.should.have.status(201);
        let comment = res.body.comment;
        comment.referenceId.should.eql(pet._id+'');
        comment.userID.should.equal(userdata.user._id);
        done();
      });
  });
});
