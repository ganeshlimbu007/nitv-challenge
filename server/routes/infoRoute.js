const express = require('express');
const infoController = require('../controllers/infoController');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

router.route('/').get(infoController.getInfo);
router.use(requireAuth);

router.route('/').post(infoController.postInfo);

router
  .route('/:id')
  .patch(infoController.updateInfo)
  .delete(infoController.deleteInfo);

module.exports = router;
