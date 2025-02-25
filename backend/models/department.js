module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    "Department",
    {
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      name: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
    },
    {
      tableName: "department", // Explicitly map to 'department' table in MySQL
      timestamps: false, // Disable automatic timestamps
    }
  );

  return Department;
};
