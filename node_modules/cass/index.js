'use strict';

const json = require('quinn/respond').json;
const createRouter = require('wegweiser');
const createGraph = require('nilo');

function createErrorHandler(serialize) {
  function errorHandler(req, error) {
    let body,
        statusCode = 500,
        headers = {};

    if (error.isBoom && error.output) {
      statusCode = error.output.statusCode;
      headers = error.output.headers;
      body = error.output.payload;
    } else {
      body = {
        statusCode: 500,
        error: 'Internal Server Error',
        message: 'Something went wrong'
      };
    }

    const res = serialize(body);
    res.statusCode = statusCode;
    for (const name of Object.keys(headers)) {
      res.setHeader(name, headers[name]);
    }
    return res;
  }

  return errorHandler;
}

function cass() {
  const router = createRouter.apply(null, arguments);
  const graph = createGraph();
  const contextGraph = createGraph();

  const staticScope = graph.createScope();
  const errorHandler = createErrorHandler(json);

  function resolveResponse(res) {
    if (res === undefined) return;
    return json(res);
  }

  function app(req) {
    const resolved = router.resolve(req);
    if (resolved === undefined) { return Promise.resolve(); }

    const params = resolved.params,
          handler = resolved.handler;

    const contextScope = contextGraph.createScope(staticScope)
      .set('request', req)
      .set('params', params);

    let resPromise;
    if (handler.ctor) {
      resPromise = new Promise(function(resolve) {
        const instance = contextScope.construct(handler.ctor);
        return resolve(instance[handler.key](req, params));
      });
    } else {
      resPromise = new Promise(function(resolve) {
        return resolve(handler(req, params));
      });
    }

    return resPromise
      .then(resolveResponse)
      .catch(errorHandler.bind(null, req));
  }

  app.graph = graph;
  app.contextGraph = contextGraph;

  return app;
}

module.exports = cass;
cass['default'] = cass;
cass['createErrorHandler'] = createErrorHandler;
