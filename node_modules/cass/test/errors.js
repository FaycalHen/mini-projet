'use strict';

const test = require('tape');
const respond = require('quinn/respond');
const Boom = require('boom');
const GET = require('wegweiser').GET;

const cass = require('../');

const testQuinnHandler = require('./test-quinn-handler');

test('throw error', function(t) {
  t.plan(4);

  function throwError() {
    throw new Error('Something terrible!');
  }
  GET('/')(throwError);

  function verify(res) {
    t.equal(res.statusCode, 500, 'Returns 500');
    t.equal(res.getHeader('content-type'), 'application/json; charset=utf-8', 'is json');
    const body = JSON.parse(res.bodyString);
    t.equal(body.message, 'Something went wrong'); // hides the actual error
    t.equal(body.statusCode, 500);
    t.end();
  }

  testQuinnHandler(cass(throwError))
    .then(verify, t.end);
});

test('throw web error', function(t) {
  t.plan(4);

  function throwError() {
    throw Boom.create(422, 'Invalid thing');
  }
  GET('/')(throwError);

  function verify(res) {
    t.equal(res.statusCode, 422, 'Returns 422');
    t.equal(res.getHeader('content-type'), 'application/json; charset=utf-8', 'is json');
    const body = JSON.parse(res.bodyString);
    t.equal(body.message, 'Invalid thing');
    t.equal(body.statusCode, 422);
    t.end();
  }

  testQuinnHandler(cass(throwError))
    .then(verify, t.end);
});

test.skip('custom error handler', function(t) {
  t.plan(3);

  function throwError() {
    throw new TypeError('Bad thing');
  }
  GET('/')(throwError);

  function customErrorHandler(req, error) {
    return respond()
      .status(503)
      .body(`${error.name} while ${req.method}'ing ${req.url}`)
      .header('Content-Type', 'text/plain');
  }

  function verify(res) {
    t.equal(res.statusCode, 503, 'Returns 503');
    t.equal(res.getHeader('content-type'), 'text/plain', 'is text');
    t.equal(res.bodyString, "TypeError while GET'ing /foo");
    t.end();
  }

  const req = { url: '/foo', method: 'GET' };
  testQuinnHandler(cass({ errorHandler: customErrorHandler }, throwError), req)
    .then(verify, t.end);
});
