const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const { wrapAsync } = require('../../utils/wrap-async');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const tasks = await tasksService.getAll();
    res.json(tasks);
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    const boardId = req.params.boardId;
    console.log(boardId);
    const taskData = req.body;
    const task = Task.fromRequest(taskData, boardId);

    await tasksService.save(task);

    res.status(200).json(task);
  })
);

router.route('/:id').get(
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    const task = await tasksService.get(id);

    res.status(200).json(task);
  })
);

router.route('/:id').delete(
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    await tasksService.delete(id);

    res.status(204).send();
  })
);

router.route('/:id').put(
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    const taskData = req.body;

    const task = await tasksService.update(id, taskData);

    res.status(200).json(task);
  })
);

module.exports = router;
