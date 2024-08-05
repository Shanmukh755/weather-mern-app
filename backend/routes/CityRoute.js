const express = require('express')
const router = express.Router()
const cityController = require('../controller/CityController')

router.post('/', cityController.getCityWeather)
router.get('/city', cityController.getSearchHistory)

module.exports = router