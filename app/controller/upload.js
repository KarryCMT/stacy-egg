const BaseController = require("./base")
const path = require("path")
const fs = require("fs")
class UploadController extends BaseController {
  //上传图片
  async uploadImage() {
    const { ctx, service } = this
    //获取文件
    const file = ctx.request.files[0]
    //读取文件 Buffer格式
    let newfile = fs.readFileSync(file.filepath)
    //设置上传路径
    const dirPath = __dirname.replace(/controller/g, "")
    //设置时间戳
    let time = Date.now()
    //base路径
    let basePath = "/public/avatar/upload/" + time + path.basename(file.filename)
    //设置文件路径
    const filePath = path.join(dirPath, basePath)
    //写入文件
    fs.writeFile(filePath, newfile, "binary", (err) => {
      console.log(err)
    })
    ctx.cleanupRequestFiles();
    //处理完成的文件链接
    // let url = 'https://lengnuanit.top' + basePath
    let url = ctx.request.origin + basePath

    // console.log(url);
    //返回前端
    this.Success({url,msg:'上传成功'})
  }
  // 上传文件
  async uploadFile() {
    const { ctx, service } = this
    //获取文件
    const file = ctx.request.files[0]
    //读取文件 Buffer格式
    let newfile = fs.readFileSync(file.filepath)
    //设置上传路径
    const dirPath = __dirname.replace(/controller/g, "")
    //设置时间戳
    let time = Date.now()
    //base路径
    let basePath = "/public/file/upload/" + time + path.basename(file.filename)
    //设置文件路径
    const filePath = path.join(dirPath, basePath)
    //写入文件
    fs.writeFile(filePath, newfile, "binary", (err) => {
      console.log(err)
    })
    ctx.cleanupRequestFiles();
    //处理完成的文件链接
    let url = 'https://lengnuanit.top' + basePath
    // let url = ctx.request.origin + basePath
    // console.log(url);
    //返回前端
    ctx.body = {
      code: 200,
      msg: "上传文件成功",
      data: {
        code: 200,
        url: url,
      },
    }
  }
}
module.exports = UploadController
