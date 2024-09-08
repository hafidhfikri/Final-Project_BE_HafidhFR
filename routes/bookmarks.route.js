const router = require("express").Router();
const { showBookmark, addBookmark } = require("../controllers/bookmarksController");
const authorize = require("../middleware/authorize");

router.post("/bookmark/:idMovie", authorize, addBookmark);
router.post("/mybookmark", authorize, showBookmark);

module.exports = router;