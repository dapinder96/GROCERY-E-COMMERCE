// models/country.js
module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
  }, {
    tableName: 'country', // Explicitly specify the table name as 'country'
    timestamps: false // If your table doesn't have createdAt/updatedAt columns
  });

  Country.associate = function(models) {
    Country.hasMany(models.State, { foreignKey: 'country_id' });
  };

  return Country;
};
