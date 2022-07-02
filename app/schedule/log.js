module.exports = {
  schedule: {
    interval: "100000s", // 任务的间隔时间, 这个定义的10秒执行一次
    type: "all", // 指定所有的 worker都需要执行
  },

  async task(ctx) {
    // 这里编写我们要执行的任务代码, 我们这里就打印一下当前时间的试试

    console.log("任务执行 : " + new Date().toString())
  },

}
