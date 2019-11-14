import Taro from '@tarojs/taro'
export const trim = (x: string) => {
  return x.replace(/^\s+|\s+$/gm, '')
}
/**
  * 对象转url参数
  * @param {*} data
  * @param {*} isPrefix
  */
 export const urlEncode = (data, isPrefix = true) => {
  isPrefix = isPrefix ? isPrefix : false
  let prefix = isPrefix ? '?' : ''
  let _result:String[] = []
  for (let key in data) {
    if (!key) continue;
    let value = data[key]
    // 去掉为空的参数
    if (['', undefined, null].includes(value)) {
      continue
    }
    if (value.constructor === Array) {
      value.forEach(_value => {
        _result.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(_value))
      })
    } else {
      _result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
    }
  }
  return _result.length ? prefix + _result.join('&') : ''
}

export const setClipboardData = ({data }) => {
  return new Promise((resolve, reject) => { 
    if (process.env.TARO_ENV === 'alipay') {
      my.setClipboard({
        text: data,
        success: () => {
          resolve();
        }
      });
    } else { 
      Taro.setClipboardData({data})
    }
  })
}
// 文本风险识别
export const textRiskIdentification = ({content}) => {
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

export const setStorage = ({ key, data }) => { 
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
export const getStorage = ({key}) => { 
  return new Promise((resolve, reject) => {
    process.env.TARO_ENV !== 'alipay' && Taro.getStorage({ key }).then((res: any) => resolve(res.data)).catch((err) => reject(err));
    if (process.env.TARO_ENV === 'alipay') {
      my.getStorage({
        key,
        success: (res) => {
          resolve(res.data)
        },
        fail: (err) => { reject(err.errorMessage)}
      });
    }
  })
}
export const getStorageSync = async ({key}) => {
  const val = await getStorage({key})
  return val
  // if (process.env.TARO_ENV !== 'alipay') {
  //   Taro.getStorage({ key })
  //     .then((res: any) => {return res.data})
  //     .catch((err) => {return null});
  // } else if (process.env.TARO_ENV === 'alipay') {
  //   my.getStorage({
  //     key,
  //     success: (res) => {
  //       return res.data
  //     },
  //     fail: (err) => { return null}
  //   });
  // }
}
export const simplifyNumber = (n) => {
  let str = n.toString()
  let num = parseInt(n)
  // 万处理
  if (num / 10000 >= 1) {
    return `${Math.ceil(num / 100) / 100}万`
    // if (num % 10000 / 100 >= 1) {
    //   return `${(parseInt(str) / 10000).toString().match(/^\d+(?:\.\d{0,2})?/)}万`
    // } else {
    //   return `${(parseInt(str) / 10000).toString().match(/^\d+/)}万`
    // }
  }
  // 千处理
  // if (num / 1000 >= 1) {
  //   if (num % 1000 / 100 >= 1) {
  //     return `${(parseInt(str) / 1000).toString().match(/^\d+(?:\.\d{0,1})?/)}k`
  //   } else {
  //     return `${(parseInt(str) / 1000).toString().match(/^\d+/)}k`
  //   }
  // }
  return n
}
// 获取搜索关键词
export const getKeyWord = (data) => {
  // let matchObj = null
  let tpword = /￥(.*)￥/.exec(data);
  // let keyword = /【(.*?)】/.exec(data);

  return {
    tpword: (tpword && `￥${tpword[1]}￥`) || null,
    keyword: trim(data) || null
  }
}

// http 转 https
export const http2https = (str) => {
  return str.replace(/^(http):\/\//, 'https://')
}

// 字符串转obj
export const stringToParams = (str) => {
  let obj:any = {}
  str = decodeURIComponent(str)
  let paramsArr = str.split('&')
  paramsArr.forEach(item => {
    const [key, value] = item.split('=')
    obj[key] = value
  })
  return obj
}

export default {
  setClipboardData,
  setStorage,
  getStorage,
  getStorageSync,
  textRiskIdentification,
  trim,
  urlEncode,
  simplifyNumber, // 数字简化 => 0-999, 1k-9.9k, 1w - 9.9w
  // 获取搜索关键词
  getKeyWord,
  //  http 转 https
  http2https,
  stringToParams
}