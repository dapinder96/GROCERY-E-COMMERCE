const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const models = require('./models');

// Import routes
const countryRoutes = require('./routes/countryRoutes');
const stateRoutes = require('./routes/stateRoutes');
const designationRoutes = require('./routes/designationRoutes');
const categoryRoutes = require('./routes/categorgyRoutes');
const userRoutes = require('./routes/userRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const regionRoutes = require('./routes/regionRoutes');
const permissionMasterRoutes = require('./routes/permissionMasterRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Error: ' + err));

// Sync database with { alter: true } to prevent table recreation
sequelize.sync({ alter: true })
  .then(() => console.log('DB synchronized'))
  .catch(err => console.error('Sync error: ' + err));

// Example test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Using API routes
app.use('/api/countries', countryRoutes);
app.use('/api', stateRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/user', userRoutes);
app.use('/api', rolesRoutes);
app.use('/api', regionRoutes);
app.use('/designations', designationRoutes);
app.use('/permission_masters', permissionMasterRoutes);
// Set up the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;