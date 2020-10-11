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

module.exports = router;
