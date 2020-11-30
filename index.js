const nock = require('nock');
const ecr = require('./ecr.js');

module.exports = {
  nock: nock,
  isDone: () => nock.isDone(),

  ecr: ecr(nock),
  ecrResponses: ecr(nock),
};
