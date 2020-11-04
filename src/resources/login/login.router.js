const router = require('express').Router();
const { wrapAsync } = require('../../utils/wrap-async');
const loginService = require('./login.service');

router.route('/').post(
  wrapAsync(async (req, res) => {
    const userData = req.body;
    const tokenResult = await loginService.login(userData);

    res.json(tokenResult);
  })
);

module.exports = router;
