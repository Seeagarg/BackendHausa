const { callbackNotify } = require("./callback.controller");

const router = require("express").Router();

router.post("/", callbackNotify);
router.get("/", (req, res) => {
  console.log(" REQ QUERY ", req.query);
});

module.exports = router;
