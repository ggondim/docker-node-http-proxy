const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const proxies = require('./proxies');

const app = express();

function onError(err, req, res, target) {
  console.error(`ERROR from ${req.originalUrl} to ${target}: ${err}`);
}

function onProxyReq(proxyReq, req, res) {
  console.log(`PROXY ${req.originalUrl} to ${proxyReq.path}`);
}

proxies.forEach(proxy => app.use(createProxyMiddleware({
  ...proxy,
  on: {
    error: onError,
    proxyReq: onProxyReq,
  }
})));

// ## ADD YOUR CUSTOM PROXIES HERE ##

app.listen(3080);