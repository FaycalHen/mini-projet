'use strict';

const test = require('tape');
const GET = require('wegweiser').GET;

const cass = require('../');

const testQuinnHandler = require('./test-quinn-handler');

test('render hello world', function(t) {
  t.plan(6);

  function renderHelloWorld() {
    return 'Hello, World!';
  }
  GET('/')(renderHelloWorld);

  function renderHelloName(req, params) {
    return `Hello, ${params.name}!`;
  }
  GET('/:name')(renderHelloName);

  function verify(responses) {
    responses.forEach(function(res) {
      t.equal(res.statusCode, 200, 'Returns 200');
      t.equal(res.getHeader('content-type'), 'application/json; charset=utf-8', 'is json');
    });
    t.equal(responses[0].bodyString, '"Hello, World!"', 'Correct body');
    t.equal(responses[1].bodyString, '"Hello, Quinn!"', 'Correct body');
    t.end();
  }

  const app = cass(renderHelloWorld, renderHelloName);
  Promise.all([
    testQuinnHandler(app),
    testQuinnHandler(app, { method: 'GET', url: '/Quinn' })
  ]).then(verify, t.end);
});
