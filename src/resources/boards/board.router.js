const router = require('express').Router();
const boardsService = require('./board.service');
const { wrapAsync } = require('../../utils/wrap-async');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const boards = await boardsService.getAll();

    res.json(boards);
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    const board = req.body;
    const savedBoard = await boardsService.save(board);

    res.status(200).json(savedBoard);
  })
);

router.route('/:id').get(
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    const board = await boardsService.get(id);

    res.status(200).json(board);
  })
);

router.route('/:id').delete(
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    await boardsService.delete(id);

    res.status(204).send();
  })
);

router.route('/:id').put(
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    const boardData = req.body;

    const board = await boardsService.update(id, boardData);

    res.status(200).json(board);
  })
);

module.exports = router;
