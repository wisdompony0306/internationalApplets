import Taro from '@tarojs/taro'
import fetch from '@/utils/request'
import Utils from '@/utils/utils'
import {getQrcodePoster} from '@/utils/api'
class SuperBridge {
  // fetch
  static post = ({url, data, _options = {}}) => {
    const options = Object.assign({
      showLoading: false, // 等待框
      content: '加载中...', // 等待文案
      showError: true, // 错误提示
      autoLogin: false // 是否是用户登录相关
    }, _options)
    return fetch({
      url,
      method: 'post',
      payload: data,
      ...options
    })
  }
  // 登录
  static login = async () => {
    if (process.env.TARO_ENV === 'weapp') return Taro.login({ timeout: 4000 })
    if (process.env.TARO_ENV === 'alipay') {
      return new Promise((resolve, reject) => {
        my.getAuthCode({
          scopes: 'auth_base',
          success: (res) => {
            console.log(res)
            resolve({code: res.authCode, errMsg: res.authErrorScope})
          },
          fail: (err) => {
            reject(err)
          }
        })
      })
    }
  }
  // 设置剪切板
  static setClipboardData ({data, tips='内容已复制', showToast = true }) {
    return new Promise((resolve, reject) => { 
      if (process.env.TARO_ENV === 'alipay') {
        my.setClipboard({
          text: data,
          success: () => {
            resolve();
          }
        });
      } else { 
        Taro.setClipboardData({
          data,
          success: () => {
            showToast && Taro.showToast({title: tips, icon: 'success'})
            !showToast && Taro.hideToast()
            resolve()
          }
        })
      }
    })
  }

  static getClipboardData() {
    return Taro.getClipboardData()
  }

  // 文本风险识别
  static textRiskIdentification ({content}) {
    return new Promise((resolve,reject) => {
      if (process.env.TARO_ENV === 'alipay') {
        my.textRiskIdentification({
          content,
          type: ['keyword', '1', '2', '3'],
          success: (res) => {
            console.info(res)
            const {result} = res
            if (Object.prototype.toString.call(result) === '[object Array]'){
              result.forEach(({type, score}) => {
                console.info(type)
                if (type === 'keyword') return reject()
                if (score > 90) return reject()
              })
              return resolve()
            } else {
              if (res.score > 90) return reject()
              else return resolve()
            }
          },
          fail: (err) => {
            return reject()
          },
        });
      } else {
        return resolve()
      }
    })
  }

  // 设置本地存储
  static setStorage ({ key, data }) { 
    return new Promise((resolve, reject) => { 
      process.env.TARO_ENV !== 'alipay' && Taro.setStorage({ key, data }).then((res) => resolve(res)).catch((err) => reject(err));
      if (process.env.TARO_ENV === 'alipay') {
        my.setStorage({
          key,
          data,
          success: () => { resolve()},
          fail: (err) => { reject(err)}
        });
      }
    })
  }

  // 获取本地存储数据
  static getStorage ({key}) { 
    return new Promise((resolve, reject) => {
      if (process.env.TARO_ENV !== 'alipay') {
        Taro.getStorage({ key })
          .then((res) => resolve(res.data))
          .catch((err) => resolve(null));
      }
      if (process.env.TARO_ENV === 'alipay') {
        my.getStorage({
          key,
          success: (res) => resolve(res.data),
          fail: (err) => resolve(null)
        });
      }
    })
  }

  // 获取本地存储同步版本
  static getStorageSync = ({key}) =>{
    return Taro.getStorageSync(key)
  }

  // 获取图片信息。网络图片需先配置download域名才能生效。
  static getImageInfo(src) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src,
        success(res) {
          resolve(res)
        },
        fail(err) {
          console.error(`getImageInfo失败:${src}`, err)
          reject(err)
        }
      })
    })
  }

  // 写入文件
  static writeFile (path, params) {
    const writeFile = ({filePath, data, encoding = 'base64'}) => {
      return new Promise((resolve, reject) => {
        fileSystemManager.writeFile({
          filePath,
          data,
          encoding,
          success () {
            resolve()
          },
          fail (err) {
            console.error('文件写入失败', err)
            reject()
          }
        })
      })
    }
    let fileSystemManager = wx.getFileSystemManager()
    let dirPath = path.substr(0, path.lastIndexOf('/'))
    return new Promise((resolve, reject) => {
      this.mkdir(dirPath).then(res => {
        console.log(`params`, params)
        getQrcodePoster(params).then(data => {
          writeFile({filePath: path, data}).then(res => {
            resolve()
          })
        })
      })
    })
  }

  // 显示加载中
  static showLoading({title = '加载中...', mask = true} = {title: '加载中...', mask: true}) {
    Taro.showLoading({title, mask})
  }
  // 隐藏Loading
  static hideLoading() {
    Taro.hideLoading()
  }

  // 检查当前文件是否已存在
  static checkFileAccess (path) {
    return new Promise((resolve, reject) => {
      let fileSystemManager = wx.getFileSystemManager()
      fileSystemManager.access({
        path,
        success () {
          // console.log('文件存在', path)
          reject()
        },
        fail() {
          // console.log('文件不存在', path, err)
          resolve()
        }
      })
    })
  }

  // 创建文件地址
  static async mkdir (dirPath) {
    let mkdirSync = ({dirPath}) => {
      return new Promise((resolve, reject) => {
        let fileSystemManager = wx.getFileSystemManager()
        fileSystemManager.mkdir({
          dirPath,
          recursive: true,
          success () {
            console.log('创建文件夹成功', dirPath)
            resolve()
          },
          fail (err) {
            console.log('创建文件夹失败:', err)
            reject('创建文件夹失败:', err)
          }
        })
      })
    }
    let dirPathArr = dirPath.substr(dirPath.indexOf(`${wx.env.USER_DATA_PATH}`) + wx.env.USER_DATA_PATH.length + 1).split('/')
    let _dirPath = `${wx.env.USER_DATA_PATH}`
    for (let i = 0, length = dirPathArr.length; i < length; i++) {
      _dirPath += `/${dirPathArr[i]}`
      // console.log(`mkdirSync: 处理第${i}个`, _dirPath)
      try {
        await this.checkFileAccess(_dirPath)
        await mkdirSync({dirPath: _dirPath})
      } catch (err) {}
    }
    // console.log('mkdirSync: 处理完成')
    return Promise.resolve()
  }

  // 获取图书分享海报
  static async getGoodsPoster ({userInfo, goods, canvasId = 'posterCanvas'}) {
    // 绘制圆形图片
    const drawRoundImg = ({ctx, x, y, width, path}) => {
      // 清空画布信息把之前所有画布信息生成图片再次画入画布中
      ctx.fillRect(0, 0, 0, 0)
      ctx.save()
      ctx.beginPath()
      ctx.arc(x + 25, y + 25, width / 2, 0, 2 * Math.PI)
      ctx.clip()
      ctx.drawImage(path, x, y, width, width)
      ctx.restore()
      ctx.draw(true)
    }
    // 绘制矩形
    const drawRect = ({ctx, x, y, width, height, bg}) => {
      ctx.save()
      ctx.beginPath()
      ctx.setFillStyle(bg)
      ctx.fillRect(x, y, width, height)
      ctx.restore()
      ctx.draw(true)
    }
    /**
  * 
  * @param {CanvasContext} ctx canvas上下文
  * @param {number} x 圆角矩形选区的左上角 x坐标
  * @param {number} y 圆角矩形选区的左上角 y坐标
  * @param {number} w 圆角矩形选区的宽度
  * @param {number} h 圆角矩形选区的高度
  * @param {number} r 圆角的半径
  */
    const roundRect = ({ctx, x, y, width, height, r}) => {
      // 开始绘制
      ctx.beginPath()
      // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
      // 这里是使用 fill 还是 stroke都可以，二选一即可
      ctx.setFillStyle('transparent')
      // ctx.lineCap = 'round'
      // ctx.lineWidth = r
      // ctx.shadowOffsetX = 0
      // ctx.shadowOffsetY = 0
      // ctx.shadowBlur = 20
      // ctx.setStrokeStyle('transparent')
      // 左上角
      ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

      // border-top
      ctx.moveTo(x + r, y)
      ctx.lineTo(x + width - r, y)
      ctx.lineTo(x + width, y + r)
      // 右上角
      ctx.arc(x + width - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

      // border-right
      ctx.lineTo(x + width, y + height - r)
      ctx.lineTo(x + width - r, y + height)
      // 右下角
      ctx.arc(x + width - r, y + height - r, r, 0, Math.PI * 0.5)

      // border-bottom
      ctx.lineTo(x + r, y + height)
      ctx.lineTo(x, y + height - r)
      // 左下角
      ctx.arc(x + r, y + height - r, r, Math.PI * 0.5, Math.PI)

      // border-left
      ctx.lineTo(x, y + r)
      ctx.lineTo(x + r, y)
      // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
      ctx.fill()
      // ctx.stroke()
      ctx.closePath()
      // 剪切
      ctx.clip()
      ctx.setFillStyle('#ffffff')
      ctx.fill()
    }
    // 绘制圆角矩形
    const drawRoundRect = ({ctx, x, y, width, height, bg, borderColor, shadowColor, LineRound = 30}) => {
      ctx.save()
      ctx.beginPath()
      ctx.lineCap = 'round'
      ctx.lineWidth = LineRound
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.shadowBlur = 20
      ctx.shadowColor = shadowColor
      // ctx.setShadow(0, 0, 20, shadowColor)
      ctx.moveTo(x + LineRound / 2, y + LineRound / 2)
      ctx.lineTo(width + x - LineRound / 2, y + LineRound / 2) // ctx.lineTo(340, y)
      ctx.lineTo(width + x - LineRound / 2, height + y - LineRound / 2) // ctx.lineTo(340, 600)
      ctx.lineTo(x + LineRound / 2, height + y - LineRound / 2) // ctx.lineTo(x, 600)
      ctx.lineTo(x + LineRound / 2, y + LineRound / 2)
      ctx.closePath()
      ctx.setStrokeStyle(bg)
      ctx.stroke()
      ctx.setFillStyle(bg)
      ctx.shadowBlur = 0
      ctx.shadowColor = '#edeef2'
      ctx.fill()
      ctx.restore()
      ctx.draw(true)
    }

    // 绘制文字
    const drawText = ({ctx, x, y, text, fontSize = 12, bold = false, color = '#111111', textAlign = 'left', verticalAlign = 'normal', maxWidth}) => {
      // ctx.setFontSize(fontSize)
      // ctx.setFillStyle(color)
      // ctx.font = `${bold ? 'bold ' : ''}${fontSize}px`
      ctx.font = `${fontSize}px sans-serif`
      // ctx.font = 'italic bold 40px cursive'
      ctx.fillStyle = color
      ctx.setTextAlign(textAlign)
      ctx.setTextBaseline(verticalAlign)
      if (maxWidth) {
        let chr = text.split("")
        let arrStr = []
        let str = ''
        let w = 0
        // chr.forEach((item) => {
        for (let i = 0, length = chr.length; i< length; i++){
          const item = chr[i];
          const itemWidth = ctx.measureText(item).width
          if ((w + itemWidth) < maxWidth) {
            str = str + item
            w = w + itemWidth
          } else if ((w + itemWidth) === maxWidth){
            str = str + item
            arrStr.push(str)
            str = ''
            w = 0
          } else {
            arrStr.push(str)
            str = item
            w = 0
            if (arrStr.length >= 2) {
              let str = arrStr[1]
              arrStr[1] = str.substring(0, str.length - 4) + '...'
              break;
            }
          }
        }
        if (w <= maxWidth && str !== '' && arrStr.length < 2) {
          arrStr.push(str)
        }
        arrStr.forEach((text, index) => {
          ctx.fillText(text, x, y + index * fontSize * 1.2, maxWidth)
        })
      }
      else ctx.fillText(text, x, y)
    }
    

    if (!userInfo) return Promise.reject()
    const {goodsId, goodsTitle, authorName, goodsImageUrl, couponAmountString, couponAmount, zkFinalPrice, reservePrice, volume} = goods
    const _couponAmount = couponAmountString || couponAmount || 0
    const discountPrice = parseFloat(_couponAmount + '') ? Math.round((parseFloat(zkFinalPrice) - parseFloat(_couponAmount + ''))* 100) / 100 : zkFinalPrice
    const originPrice = parseFloat(_couponAmount + '') ? zkFinalPrice : reservePrice
    const _volume = volume && Utils.simplifyNumber(volume)
    // const {path: headPath} = await SuperBridge.getImageInfo(Utils.http2https(avatarUrl))
    let goodsImagePath = null
    try {
      const {path} = await SuperBridge.getImageInfo(goodsImageUrl)
      goodsImagePath = path
    } catch(err) {
      return Promise.reject(err)
    }
    const canvasWidth = 600 // 画布宽度
    const canvasHeight = 900 // 画布高度
    const padding = 30
    return new Promise((resolve, reject) => {
      const ewm = `${wx.env.USER_DATA_PATH}/tkUserId${userInfo.tkUserId}/goodsId${goodsId}.png`
      this.writeFile(ewm, {goodsId})
      .then(() => {
        let ctx = wx.createCanvasContext(canvasId)
        // 获取对称点x坐标
        const getRightX = (width) => {
          return canvasWidth - canvasWidth / 2 - width - padding
        }
        // 绘制画布背景
        // drawRect({ctx, x: 0, y: 0, width: canvasWidth, height: canvasHeight, bg: '#ffffff'})
        // 绘制卡片
        // drawRoundRect({ ctx, x: 0, y: 0, width: canvasWidth, height: canvasHeight, bg: 'red', shadowColor: '#dddddd' })
        roundRect({ctx, x: 0, y: 0, width: canvasWidth, height: canvasHeight, r: 15})
        // 绘制商品图片
        const goodsImageDetail = {
          path: goodsImagePath,
          width: canvasWidth - 20,
          height: canvasWidth - 20,
          y: 10,
        }
        ctx.drawImage(goodsImageDetail.path, (canvasWidth - goodsImageDetail.width) / 2, goodsImageDetail.y, goodsImageDetail.width, goodsImageDetail.height)
        // 绘制商品名称
        drawText({ctx, fontSize: 36, color: '#333333', verticalAlign: 'middle', text: `${goodsTitle}`, x: padding, y: goodsImageDetail.y + goodsImageDetail.height + 40, maxWidth: canvasWidth - 2*padding})
        
        drawText({
          ctx,
          fontSize: 28,
          color: '#333333',
          verticalAlign: 'middle',
          text: `券后价`,
          x: padding,
          y: goodsImageDetail.y + goodsImageDetail.height + 40 + (36 * 1.2 * 2) + 10, 
          maxWidth: 84
        })
        
        drawText({
          ctx, 
          fontSize: 28, 
          color: '#ff5400', 
          verticalAlign: 'middle', 
          text: `￥${discountPrice}`, 
          x: padding + 28 * 3, 
          y: goodsImageDetail.y + goodsImageDetail.height + 40 + (36 * 1.2 * 2) + 10, 
          maxWidth: 28 * 4
        })
        
        drawText({
          ctx, 
          fontSize: 24, 
          color: '#999999', 
          verticalAlign: 'middle', 
          text: `原价￥${originPrice}`, 
          x: padding + 28 * 3 + 28 * 4,
          y: goodsImageDetail.y + goodsImageDetail.height + 40 + (36 * 1.2 * 2) + 10, 
        })

        _volume && drawText({
          ctx, 
          fontSize: 28, 
          color: '#666666', 
          verticalAlign: 'middle',
          textAlign: 'right', 
          text: `已售${_volume}`, 
          x: canvasWidth - padding,
          y: goodsImageDetail.y + goodsImageDetail.height + 40 + (36 * 1.2 * 2) + 10, 
        })
        
        const ewmDetail = {
          path: ewm,
          width: 120,
          height: 120
        }
        ctx.drawImage(ewmDetail.path, canvasWidth - padding - ewmDetail.width, goodsImageDetail.y + goodsImageDetail.height + 40 + (36 * 1.2 * 2) + 10 + (28*1.2), ewmDetail.width, ewmDetail.height)
        drawText({
          ctx, 
          fontSize: 26,
          color: '#666666',
          verticalAlign: 'middle',
          textAlign: 'left', 
          text: `微信内长按二维码领取优惠券`, 
          x: padding,
          y: goodsImageDetail.y + goodsImageDetail.height + 40 + (36 * 1.2 * 2) + 10 + (28*1.2) + (ewmDetail.height + 26) / 2
        })
        // 头部边界
        // drawRect({ctx, x: 50, y: 180, width: cardPoint.width, height: 1, bg: 'green'}) // 头部
        // drawRect({ctx, x: 50, y: 480, width: cardPoint.width, height: 1, bg: 'yellow'}) // 中部

        // // 左边界
        // drawRect({ctx, x: 50, y: 100, width: cardPoint.width, height: 1, bg: 'red'}) // 起点 y:100
        // // 右边界
        // drawRect({ctx, x: 50, y: 600, width: cardPoint.width, height: 1, bg: 'red'}) // 终点 y:600
        // // 上边界
        // drawRect({ctx, x: 50, y: 100, width: 1, height: cardPoint.height, bg: 'red'}) // 起点 x:50
        // // 下边界
        // drawRect({ctx, x: 350, y: 100, width: 1, height: cardPoint.height, bg: 'red'}) // 起点 x:350
        // 推荐人
        // drawText({ctx, fontSize: 14, color: '#666666', verticalAlign: 'middle', text: `${nickName}推荐`, x: padding, y: 140})
        // 书名
        // drawText({ctx, fontSize: 18, color: '#000000', textAlign: 'center', verticalAlign: 'middle', text: bookName, x: canvasWidth / 2, y: 400})
        // 作者
        // drawText({ctx, fontSize: 14, color: '#111111', textAlign: 'center', verticalAlign: 'middle', text: authorName, x: canvasWidth / 2, y: 425})
        // 书语Lite
        // drawText({ctx, fontSize: 14, color: '#666666', verticalAlign: 'bottom', text: '书语Lite', x: padding, y: 480 + 25 + ewmDetail.height})

        // 绘制头像
        // drawRoundImg({ctx, x: getRightX(50), y: 115, width: 50, path: headPath})
        ctx.draw(true, setTimeout(() => {
          const {pixelRatio} = Taro.getSystemInfoSync()
          this.canvasToTempFilePath({x: 0, y: 0, width: canvasWidth, height: canvasHeight, canvasId})
          .then(res => resolve(res))
          .catch(err => reject(err))
          // wx.canvasToTempFilePath({
          //   x: 0,
          //   y: 0,
          //   width: 400,
          //   height: 700,
          //   destWidth: 400 * pixelRatio,
          //   destHeight: 700 * pixelRatio,
          //   canvasId,
          //   success: (res) => {
          //     wx.hideLoading()
          //     console.log(res)
          //     return Promise.resolve(res.tempFilePath)
          //     // wx.previewImage({
          //     //   urls: [res.tempFilePath]
          //     // })
          //   },
          //   fail: (res) => {
          //     wx.hideLoading()
          //     wx.showToast({
          //       title: '生成失败',
          //       icon: 'none'
          //     })
          //   }
          // })
        }, 200))
      }).catch((err) => {
        return reject(err)
      })
    })
  }

  // 保存canvas生成图片
  static canvasToTempFilePath ({x, y, width, height, canvasId}) {
    const {pixelRatio} = Taro.getSystemInfoSync()
    return new Promise((resolve, reject) => {
      wx.canvasToTempFilePath({
        x,
        y,
        width,
        height,
        destWidth: width * pixelRatio,
        destHeight: height * pixelRatio,
        canvasId,
        success: (res) => resolve(res),
        fail: (res) => reject(res)
      })
    })
    
  }

  // 自定义单选象确认框
  static alert({content = '', title = '', confirmText = '确定', confirmColor = '#63a8ea'}) {
    return new Promise((resolve, reject) => {
      Taro.showModal({
        title,
        content,
        showCancel: false,
        confirmText,
        confirmColor,
        complete: function (res) {
          if (res.confirm) {
            resolve(res)
          } else if (res.cancel) {
            reject(res)
          }
        }
      })
    })
  }

  // toast 封装
  static toast({title, icon = 'none', image = '', duration = 1, mask = false}, complete = () => {}) {
    return new Promise((resolve, reject) => {
      Taro.showToast({
        title,
        icon, // 图标，有效值 "success", "loading", "none"
        duration: parseInt(duration * 1000),
        mask,
        success: () => {
          resolve()
        },
        fail: () => {
          reject()
        },
        complete: () => {
          complete()
        }
      })
    })
  }

  /**
   * 
   */
  static navigateTo({url}) {
    Taro.navigateTo({url})
  }
}
export default SuperBridge