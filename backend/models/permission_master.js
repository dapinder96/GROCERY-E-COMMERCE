module.exports = (sequelize, DataTypes) => {
  const PermissionMaster = sequelize.define(
    "PermissionMaster",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      permission_name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "permission_master", // Explicitly map to 'department' table in MySQL
      timestamps: false, // Disable automatic timestamps
    }
  );
  return PermissionMaster;
};

