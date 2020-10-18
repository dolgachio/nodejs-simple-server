const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const { errorMiddleware } = require('./utils/error-middleware');
const { loggingMiddleware } = require('./utils/logging-middleware');
const {
  uncaughtExceptionHandler,
  unhandledRejectionHandler
} = require('./utils/exception-handlers');

process.on('uncaughtException', uncaughtExceptionHandler);
process.on('unhandledRejection', unhandledRejectionHandler);

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(loggingMiddleware);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
boardRouter.use('/:boardId/tasks', taskRouter);
app.use('/boards', boardRouter);

app.use(errorMiddleware);

module.exports = app;
