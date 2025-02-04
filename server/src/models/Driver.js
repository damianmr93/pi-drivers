const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('driver', {
    id: {
      type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
   },
   name: {
    type: DataTypes.JSONB,
    allowNull: false,
   },    
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.JSONB,
      
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    isCreated: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, { timestamps: false });
};