const http = require("http");
const config = require("./config.json");

const upstreamBase = config.upstream;

const server = http.createServer((req, res) => {
  let upstream = http.request(
    {
      host: upstreamBase,
      path: req.url,
      method: req.method,
      headers: req.headers,
      data: req.data,
    },
    (resp) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Authorization,Content-Type"
      );
      resp.pipe(res);
    }
  );

  req.pipe(upstream);
});

server.listen(8081, () => {
  console.log(`Server is running on http://127.0.0.1:8081`);
});
