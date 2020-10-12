const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const { wrapAsync } = require('../../utils/wrap-async');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const boards = await boardsService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(boards);
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    const boardData = req.body;
    const board = Board.fromRequest(boardData);
    await boardsService.save(board);

    // map board fields to exclude secret fields like "password"
    res.status(200).json(board);
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
