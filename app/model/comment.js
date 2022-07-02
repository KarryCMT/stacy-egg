module.exports = (app) => {
    const { STRING, INTEGER, TEXT, DATE } = app.Sequelize
    const Comment = app.model.define("comment", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      openid: STRING(200),
      dynamic_id: STRING(200),
      comment_id:STRING(200),
      avatar_url: STRING(250),
      content: TEXT,
      nick_name: STRING(50),
    })
  
    return Comment
  }
  