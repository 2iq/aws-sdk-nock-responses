const nock = require('nock');
const ecr = require('./ecr.js');

module.exports = {

  ecr: ecr(nock),
  ecrResponses: ecr(nock),
};
