const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// const authentication = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', jokesRouter);

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  });

server.get("/", (req, res) => {
    res.send(`<h2>Welcome To My Module 3 Spring Challenge</h2>`);
});

module.exports = server;
