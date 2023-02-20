const assert = require('chai').assert;
const app = require('./app.js'); // replace with the name of your API file
const request = require('supertest');

describe('GET /players', () => {
  it('should return an array of players', (done) => {
    request(app)
      .get('/players')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        done();
      });
  });
});

// var assert = require('assert');
// describe('Array', function () {
//   describe('#indexOf()', function () {
//     it('should return -1 when the value is not present', function () {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });