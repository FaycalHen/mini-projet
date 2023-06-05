'use strict';

const concat = require('concat-stream');

function readStream(s) {
  return new Promise(function(resolve, reject) {
    s.on('error', reject);
    s.pipe(concat(resolve));
  });
}

function testQuinnHandler(handler, req) {
  req = req || { method: 'GET', url: '/' };
  return new Promise(function (resolve, reject) {
    resolve(handler(req));
  }).then(function(res) {
    if (res === undefined) return undefined;
    res.setEncoding('utf-8');
    return readStream(res)
      .then(function(body) {
        res.bodyString = body;
        return res;
      });
  });
}

module.exports = testQuinnHandler;
