const express = require('express');
const infoController = require('../controllers/infoController');
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.use(requireAuth);

router
  .route('/')
  .get(infoController.getInfo)
  .post(infoController.postInfo)
  .patch(infoController.updateInfo)
  .delete(infoController.deleteInfo);

  router
  .route('/:id')
  .patch(infoController.updateInfo)
  .delete(infoController.deleteInfo);

module.exports = router;
