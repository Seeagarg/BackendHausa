const {addVideoToWatchlist,getWatchlistForUser} =require('./userAction.controller')

const router = require("express").Router();

router.post("/add", addVideoToWatchlist);
router.get('/get-watchlist/:ani',getWatchlistForUser)
module.exports = router;



