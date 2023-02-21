const app = require('../app'); // replace with the name of your API file
const request = require('supertest');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const base_url = "http://127.0.0.1:3000"
chai.use(chaiHttp);

describe('API tests', function () {
  // Test GET request
  it('should return all players when GET /players', function (done) {
    chai
      .request(base_url)
      .get('/players')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Test POST request
  it('should add a new player when POST /players', function (done) {
    const newPlayer = {
      name: 'Stephen Curry',
      team: 'Warriors'
    };
    chai
      .request(base_url)
      .post('/addplayers')
      .send(newPlayer)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body[0]).to.be.an('object');
        expect(res.body.pop()).to.include(newPlayer);
        done();
      });
  });

  // Test PUT request
  it('should update a player when PUT /players/:id', function (done) {
    const updatedPlayer = {
      name: 'LeBron James',
      team: 'Lakers'
    };
    chai
      .request(base_url)
      .put('/players/1')
      .send(updatedPlayer)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.include(updatedPlayer);
        done();
      });
  });

  // Test DELETE request
  it('should delete a player when DELETE /players/:id', function (done) {
    chai
      .request(base_url)
      .delete('/players/1')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});

