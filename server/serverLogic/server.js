const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = (module.exports.io = require("socket.io")(http));
const port = process.env.PORT || 3000;
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// configure swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Chat App API",
      description: "API used to manage Chat App related data",
      contact: {
        name: "Jana"
      },
      servers: ["http://localhost:3000"]
    }
  },
  apis: ["../Routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// db reated
const db = require("../db");

app.use(cors());
app.options("*", cors());
app.use(express.json());

// routers
const router = require("../Routes/router");
const authRouter = require("../Routes/AuthRoute");
const chatuserRouter = require("../Routes/ChatUserRoute");
const fileUploadRouter = require("../Routes/FileUploadRoute");
const messagesRouter = require("../Routes/MessagesRoute");
// routes
app.use(router);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chatuser", chatuserRouter);
app.use("/api/v1/fileupload", fileUploadRouter);
app.use("/api/v1/messages", messagesRouter);

const socketManager = require("./socketManager");

// socket logic
io.on("connection", socketManager);

// error handling
app.use((req, res, next) => {
  const err = new Error("Not Found");
  res.status(404);
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

// db
(async () => {
  try {
    await db.sequelize.sync();
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map(err => err.message);
      console.error("Validation errors: ", errors);
    } else {
      throw error;
    }
  }
})();

/**
 * server gets started on the defined port
 * when server is started, we are also clearing redisClient data, so chat history gets deleted as well
 */
http.listen(port, () => {
  console.log(
    `Express server listening on port ${port} and worker ${process.pid}`
  );
});
