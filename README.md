# docker-node-http-proxy
A simple HTTP proxy running in Node.js within a Docker container.

## Usage

### Set your proxies in `proxies.json`

```json
[
  {
    "target": "https://google.com",
    "changeOrigin": true,
    "pathFilter": "/google**",
    "followRedirects": true,
    "prependPath": true,
    "ignorePath": true
  }
]
```

See all the supported options in [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#options).

### Run the container

```shell
$ npm run docker:run
```

### Requests now are proxied in the HTTP 80 port

```shell
$ curl -i http://localhost/google
```

## Customizing

You can use `http-proxy-middleware`'s advanced options creating more middlewares in `index.js`:

```javascript
// ## ADD YOUR CUSTOM PROXIES HERE ##
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://www.example.org/api',
    changeOrigin: true,
    pathFilter: '/api/proxy-only-this-path',
    pathRewrite: function (path, req) { return path.replace('/api', '/base/api') }
  })
);
```

## Testing outside the container

```shell
$ npm run dev
```