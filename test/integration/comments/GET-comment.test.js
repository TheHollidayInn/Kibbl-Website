require('../../test-helpers');
let integrationHelpers = require('../../integration-helpers');

let Pet = require("../../../models/pets");
let Comment = require('../../../models/comments');

describe('Comment: GET', () => {
  let userdata;
  let pet;

  before(function (done) {
    integrationHelpers.generateUser()
      .then(function(generatedUser) {
        userdata = generatedUser.userData;
        pet = new Pet();
        return pet.save();
      })
      .then(function (petFound) {
        pet = petFound;
        request(server)
          .post('/api/v1/comments')
          .send({
            itemId: pet._id,
          })
          .set('x-access-token', userdata.token)
          .end((err, res) => {
            done();
          });
      })
      .catch(function (error) {
        console.log("error", error)
        done();
      })
  });

  afterEach(function(done) {
    Comment.remove({}, function() {
      done();
    });
  });

  it('gets a comments for an item', (done) => {
    request(server)
      .get(`/api/v1/comments?itemId=${pet._id}`)
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        res.should.have.status(200);
        let comments = res.body.comments;
        comments.length.should.eql(1);
        comments[0].referenceId.should.eql(''+pet._id);
        done();
      });
  });
});
