require("dotenv").config();

module.exports = {
  "development": {
    "username": "postgres",
    "password": "root",
    "database": "assignment2_development",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5432
  },
  "test": {
    "username": "postgres",
    "password": "root",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5432
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "port": process.env.DB_PORT
  }
};
