module.exports = (sequelize, DataTypes) => {
  const Designation = sequelize.define(
    "Designation",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "designation", // Explicitly map to 'department' table in MySQL
      timestamps: false, // Disable automatic timestamps
    }
  );
  return Designation;
};
