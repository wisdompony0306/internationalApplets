import Taro from '@tarojs/taro'
import SuperBridge from '@/superBridge'
import { API_USER_LOGIN } from '@/constants/api'
const SESSION_3RD = 'session_3rd'
const USER_VIEW = 'userView'
const CODE_SUCCESS = 'SUCCESS'
const CODE_AUTH_EXPIRED = '600'

// 更新本地存储
function updateStorage(data = {}) {
  return Promise.all([
    SuperBridge.setStorage({ key: SESSION_3RD, data: data['session3rd'] || null }),
    SuperBridge.setStorage({ key: USER_VIEW, data: data['userView'] || null})
  ])
}

/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
// export default async function fetch(options) {
//   const { url, payload, method = 'POST', showError = true, autoLogin = true, tryagain = false, showLoading = false, content = '加载中...' } = options



//   const token = await SuperBridge.getStorage({key: SESSION_3RD}) || ''
//   const header = {
//     // 用户session信息
//     'X-WX-3RD-Session': token,
//     // 请求接口环境
//     'ENV-TYPE': process.env.TARO_ENV
//   }
//   showLoading && Taro.showLoading({title: content})
//   if (method === 'POST') {
//     header['content-type'] = 'application/json'
//   }
//   return Taro.request({
//     url,
//     method,
//     data: payload,
//     header
//   }).then(async (res) => {
//     const { code, body } = res.data
//     if (code !== CODE_SUCCESS) {
//       if (code === CODE_AUTH_EXPIRED) await updateStorage({})
//       if (['100001', '100002', '100005', '100006', '100007'].includes(code)) {
//         // 二次登录态验证失败 code 置换 session 后依然返回登录态验证失败
//         if (tryagain) {
//           Promise.reject(res.data)
//           return
//         } 
//         SuperBridge.login()
//           .then((res) => fetch({url: API_USER_LOGIN, payload: {code: res.code}, showError: false}))
//           .then((res) => {
//             return fetch(Object.assign(options, {tryagain: true}))
//           })
//       } else {
//         showLoading && Taro.hideLoading()
//         return Promise.reject(res.data)
//       }
//     } else {
//       showLoading && Taro.hideLoading()
//       if (url === API_USER_LOGIN) await updateStorage(body)
//       return Promise.resolve(body)
//     }
//   }).catch((err) => {
//     console.log(url)
//     showLoading && Taro.hideLoading()
//     const defaultMsg = err.code === CODE_AUTH_EXPIRED ? '登录失效' : '请求异常'
//     showError && Taro.showToast({title: err && err.errorMsg || defaultMsg, icon: 'none'})
//     if (err.code === CODE_AUTH_EXPIRED && autoLogin) {
//       Taro.navigateTo({
//         url: '/pages/user-login/user-login'
//       })
//     }

//     return Promise.reject({ message: defaultMsg, ...err })
//   })
// }


export default function fetch(options) {
  const { url, payload, method = 'POST', showError = true, autoLogin = true, tryagain = false, showLoading = false, content = '加载中...' } = options
  const token = SuperBridge.getStorageSync({key: SESSION_3RD}) || ''
  const header = {
    // 用户session信息
    'X-WX-3RD-Session': token,
    // 请求接口环境
    'ENV-TYPE': process.env.TARO_ENV
  }
  showLoading && SuperBridge.showLoading({title: content})
  if (method === 'POST') {
    header['content-type'] = 'application/json'
  }
  return new Promise((resolve, reject) => {
    Taro.request({url, method, data: payload, header}).then((res) => {
      showLoading && SuperBridge.hideLoading()
      
      if (res.statusCode < 200 || res.statusCode > 300) {
        showError && SuperBridge.alert({content: ErrorCode.ERR_CONNECTION_REFUSED.msg})
        reject(res)
        return
      }

      const { code, body, msg} = res.data

      if (code === 'SUCCESS') {
        if (url === API_USER_LOGIN) updateStorage(body).then(() => resolve(body))
        else resolve(body)
      } else {
        if (['100001', '100002', '100005', '100006', '100007'].includes(code)) {
          // 二次登录态验证失败 code 置换 session 后依然返回登录态验证失败
          if (tryagain) {
            reject({code: code, msg})
            return
          }
          // 可能是session过期等原因，获取最新 code
          SuperBridge.login()
            .then((res) => fetch(Object.assign({}, options, {url: API_USER_LOGIN, payload: {code: res.code}, showLoading: true, tryagain: true})))
            .then((res) => {
              return fetch(Object.assign({}, options, {tryagain: true}))
                .then((res) => resolve(res))
                .catch((err) => reject(err))
            })
        } else {
          showError && Taro.showToast({title: res.data.msg, duration: 2000, icon: 'none'})
          // if (err.code === CODE_AUTH_EXPIRED && autoLogin) {
          //   Taro.navigateTo({
          //     url: '/pages/user-login/user-login'
          //   })
          // }
          reject({code: res.data.code, msg: res.data.msg})
        }
      }
    })
  })
}