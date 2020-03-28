const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = (module.exports.io = require("socket.io")(http));
const port = process.env.PORT || 3000;

const router = require("./router");
app.use(router);
const socketManager = require("./socketManager");

// socket logic
io.on("connection", socketManager);

/**
 * server gets started on the defined port
 * when server is started, we are also clearing redisClient data, so chat history gets deleted as well
 */
http.listen(port, () => {
  console.log(
    `Express server listening on port ${port} and worker ${process.pid}`
  );
});
