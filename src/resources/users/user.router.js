const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { wrapAsync } = require('../../utils/wrap-async');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    const userData = req.body;
    const user = User.fromRequest(userData);
    await usersService.save(user);

    // map user fields to exclude secret fields like "password"
    res.status(200).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    const userData = req.body;

    const user = await usersService.update(id, userData);

    // map user fields to exclude secret fields like "password"
    res.status(200).json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    await usersService.delete(id);
    // map user fields to exclude secret fields like "password"
    res.status(204).send();
  })
);

router.route('/:id').get(
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    const user = await usersService.get(id);

    res.status(200).json(User.toResponse(user));
  })
);

module.exports = router;
