const express = require('express');
const router = express.Router();

const video=require('../controllers/videos')
const callbacks=require('../controllers/callback')

router.get('/videos',video.getVideos)
// router.get('/getImage',video.getImages)
router.get('/singlevideo/:id',video.getSingleVideo)
router.get('/search',video.searchVideos)
router.get('/random',video.getRandomVideo)
// router.post('/callback',callbacks.callback)
module.exports = router;
