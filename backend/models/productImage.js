module.exports = (sequelize, DataTypes) => {
    const ProductImage = sequelize.define('ProductImage', {
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      product_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
      },
      image_url: { 
        type: DataTypes.STRING, 
        allowNull: false 
      }
    }, {
      tableName: 'product_image',
      timestamps: false
    });
  
    return ProductImage;
  };
  
