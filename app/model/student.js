module.exports = (app) => {
  const { STRING, INTEGER, BIGINT,DOUBLE, TEXT, DATE } = app.Sequelize
  const Student = app.model.define("student", {
    id: { type: INTEGER, primaryKey: true },
    student_id: BIGINT,
    user_id: BIGINT,
    name:STRING(10),
    phone:STRING(11),
    sex:INTEGER,
    age:INTEGER,
    address:STRING(255),
    cover:STRING(255),
  })

  return Student
}
