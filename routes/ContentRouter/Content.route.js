const express = require('express')
const { GetAllVideos } = require('./Content.controller')

const router = express.Router()

router.get('/get-videos',GetAllVideos)


module.exports = router