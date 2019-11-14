import SuperBridge from './super-bridge'
import {API_GOODS_TPWD_CONVERT, API_GOODS_WX_QRCODE_POSTER, API_TBK_ORDER_BIND} from './../constants/api'
/**
 * 淘口令转链
 * @param param0 
 */
export const tpwdConvert = ({passwordContent, adzoneId = 100356400077, getGoodsInfo = false}) => {
  return SuperBridge.post({
    url: API_GOODS_TPWD_CONVERT,
    data: {
      passwordContent,
      adzoneId,
      getGoodsInfo
    },
    _options: {
      showLoading: false,
      showError: false
    }
  })
}

// 获取小程序码
export const getQrcodePoster = ({goodsId}) => {
  return new Promise((resolve, reject) => {
    SuperBridge.post({
      url: API_GOODS_WX_QRCODE_POSTER,
      data: {
        goodsId: parseInt(goodsId)
      },
      _options: {
        showLoading: false,
        showError: false
      }
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}
/**
 * 绑定订单
 */
/**
 * 
 * @param {} tradeId: 订单号 
 */
export const bindOrder = ({tradeId}) => {
  return SuperBridge.post({
    url: API_TBK_ORDER_BIND,
    data: {
      tradeId,
      goodsType: 1// 商品类型 1：淘宝 2：京东 3：拼多多
    },
    _options: {
      showLoading: true,
      showError: true
    }
  })
}