module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define(
    "Region",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      state_id: { type: DataTypes.INTEGER }
    },
    {
      tableName: "region",
      timestamps: true
    }
  );

  Region.associate = function (models) {
    Region.belongsTo(models.State, { foreignKey: "state_id" });
  };

  return Region;
};

