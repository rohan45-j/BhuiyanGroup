const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error handling", req.url, err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  });

  // Support CloudLinux Phusion Passenger socket, custom port or standard port
  if (typeof PhusionPassenger !== "undefined") {
    server.listen("passenger");
  } else if (process.env.PORT) {
    server.listen(process.env.PORT);
  } else {
    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  }
}).catch((err) => {
  console.error("Next.js initialization error:", err);
  process.exit(1);
});
