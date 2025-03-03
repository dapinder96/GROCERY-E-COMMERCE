// controllers/countryController.js
const { Country } = require('../models');

// Controller to add countries
exports.addCountries = async (req, res) => {
  try {
    const countries = req.body;

    if (!Array.isArray(countries) || countries.length === 0) {
      return res.status(400).json({ message: 'You must provide an array of countries' });
    }

    // Bulk create countries
    const newCountries = await Country.bulkCreate(countries);
    res.status(201).json(newCountries); // Return the newly created countries
  } catch (error) {
    res.status(500).json({ message: 'Error adding countries', error });
  }
};

// Controller to get all countries
exports.getCountries = async (req, res) => {
  try {
    const countries = await Country.findAll(); // Fetch all countries
    res.status(200).json(countries); // Return the list of countries
  } catch (error) {
    res.status(500).json({ message: 'Error fetching countries', error });
  }
};
