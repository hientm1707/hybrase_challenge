const express = require('express');
const aiController = require('../controllers/aiController');
const router = express.Router();

router.post('/retrieve', aiController.retrieveInfo);

module.exports = router;