module.exports = (app) => {
  const { STRING, INTEGER, BIGINT,DOUBLE, TEXT, DATE } = app.Sequelize
  const Course = app.model.define("course", {
    id: { type: INTEGER, primaryKey: true },
    course_id: BIGINT,
    user_id: BIGINT,
    name:STRING(10),
    remark:STRING(255),
  })

  return Course
}
