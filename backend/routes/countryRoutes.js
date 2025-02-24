// routes/countryRoutes.js
const express = require('express');
const countryController = require('../controllers/countryController'); // Import the country controller
const router = express.Router();

// Route to add new countries
router.post('/add-countries', countryController.addCountries);

// Route to get all countries
router.get('/countries', countryController.getCountries);

module.exports = router;

