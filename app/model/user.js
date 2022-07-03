const bcrypt = require('bcryptjs');
module.exports = (app) => {
  const { STRING,BIGINT, INTEGER, DOUBLE, TEXT, DATE } = app.Sequelize;
  const User = app.model.define('stacy_user', {
    userId: { type: BIGINT, primaryKey: true },
    userName: STRING(100),
    password: STRING(64),
    target: INTEGER,
    targetCity: STRING(255),
    maxMoney: INTEGER,
    stayDate: DATE,
    sex: INTEGER,
    birthDate: DATE,
    phone:  STRING(11),
    email:  STRING(20),
    occupation:  STRING(10),
    workPlace:  STRING(255),
    profile:  STRING(255),
    photo:  TEXT,
    created_at: DATE,
    updated_at: DATE,
    deleted_at: DATE,

  });

  return User;
};
