require('../../test-helpers');
let integrationHelpers = require('../../integration-helpers');

let Feedback = require('../../../models/feedback');

describe('Comment: GET', () => {
  let userdata;

  before(function (done) {
    integrationHelpers.generateUser()
      .then(function(generatedUser) {
        userdata = generatedUser.userData;

        return request(server)
          .post('/api/v1/feedback')
          .send({
            text: 'test-text',
          })
          .set('x-access-token', userdata.token)
          .endAsync();
      })
      .then(() => {
        done();
      })
      .catch(function (error) {
        console.log("error", error)
        done();
      })
  });

  afterEach(function(done) {
    Feedback.remove({}, function() {
      done();
    });
  });

  it('gets a feedback for a user', (done) => {
    request(server)
      .get(`/api/v1/feedback`)
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        res.should.have.status(200);
        let feedback = res.body.feedback;
        feedback.length.should.eql(1);
        feedback[0].userID.should.eql(userdata.user._id);
        done();
      });
  });
});
