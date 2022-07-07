const router = require('express').Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.getAllArticles);
router.get('/:articleID', blogController.getSingleArticle);
router.post('/', blogController.search);

module.exports = router;