const http = require("http");
const fs = require("fs");
const path = require("path");

http
  .createServer((req, res) => {
    let filePath = path.join(
      __dirname,
      req.url === "/" ? "index.html" : req.url + ".html"
    );

    fs.readFile(filePath, (err, content) => {
      if (err) {
        // If the file is not found, serve the 404 page
        fs.readFile(path.join(__dirname, "404.html"), (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end("500 Internal Server Error");
            return;
          }
          res.writeHead(404);
          res.end(content);
        });
      } else {
        // Serve the requested file
        res.writeHead(200);
        res.end(content);
      }
    });
  })
  .listen(8080, () => {
    console.log("Server running on http://localhost:8080");
  });
