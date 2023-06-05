'use strict';

const test = require('tape');

const nilo = require('nilo');
const GET = require('wegweiser').GET;

const cass = require('../');

const testQuinnHandler = require('./test-quinn-handler');

class EchoResource {
  constructor(params, reqHeaders) {
    this.params = params;
    this.reqHeaders = reqHeaders;
  }

  sendDate() {
    return {
      date: this.reqHeaders.date,
      important: this.params.important === 'true'
    };
  }
}
nilo.Inject('params', 'headers')(EchoResource);
GET('/date/:important')(EchoResource.prototype.sendDate);

test('Support resource classes with @Inject', function(t) {
  t.plan(3);
  const dateHeader = new Date().toString();

  function verify(res) {
    t.equal(res.statusCode, 200, 'Returns 200');
    t.equal(res.bodyString, `{"date":"${dateHeader}","important":true}`, 'Correct body');
    t.equal(res.getHeader('content-type'), 'application/json; charset=utf-8', 'is json');
    t.end();
  }

  const app = cass(EchoResource);
  app.contextGraph.scan({
    getHeaders: nilo.Provides('headers')(nilo.Inject('request')(
      function(req) { return req.headers; }
    ))
  });
  testQuinnHandler(app, {
    method: 'GET',
    url: '/date/true',
    headers: { date: dateHeader }
  }).then(verify, t.end);
});
