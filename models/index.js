const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
require('dotenv').config();

// Aiven typically requires SSL connections
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.ADMIN_USERNAME,
  process.env.ADMIN_PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DIALECT || 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // OK for development; avoid in production
      },
    },
    logging: false, // Optional: turn off logging if preferred
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Load models
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);

    db[model.name] = model;
  });

// Set associations if defined
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
