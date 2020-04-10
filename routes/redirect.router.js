const express = require('express');
const router = express.Router();
const RedirectController = require('@controllers/redirect.controller');

router.get('/email_confirmation/:uid/:token', RedirectController.redirectWithParams('/api/auth'));

module.exports = router;