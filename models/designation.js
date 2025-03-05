module.exports = (sequelize, DataTypes) => {
  const Designation = sequelize.define(
    "Designation",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.STRING, allowNull: false },
    },
    {}
  );
  return Designation;
};
