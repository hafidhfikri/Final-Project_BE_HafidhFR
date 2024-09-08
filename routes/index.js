const router = require("express").Router();

router.use(require("./movies.route"));
router.use(require("./auth.route"));
router.use(require("./bookmarks.route"));

module.exports = router;