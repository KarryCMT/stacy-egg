module.exports = (app) => {
  const { STRING, INTEGER, BIGINT,DOUBLE, TEXT, DATE } = app.Sequelize
  const Topic = app.model.define("topic", {
    id: { type: INTEGER, primaryKey: true },
    topic_id: BIGINT,
    user_id: BIGINT,
    topic_name:TEXT,
    topic_type:INTEGER,
    topic_category:INTEGER,
  })
  return Topic
}
