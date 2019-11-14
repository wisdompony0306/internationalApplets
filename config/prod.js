const isH5 = process.env.CLIENT_ENV === 'h5'

const HOST = '"https://coupon.demongao.com/api"'
const HOST_M = '"https://coupon.demongao.com/api"'

// XXX 搭了个 proxy 用于演示 prod 环境的 H5
const HOST_H5 = '"http://jsnewbee.com/taro-yanxuan/api"'
const HOST_M_H5 = '"http://jsnewbee.com/taro-yanxuan/api-m"'

module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
    HOST: isH5 ? HOST_H5 : HOST,
    HOST_M: isH5 ? HOST_M_H5 : HOST_M
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        },
        // 小程序端样式引用本地资源内联配置
        url: {
          enable: true,
          config: {
            limit: 10240 // 文件大小限制
          }
        }
      }
    }
  },
  h5: {
    publicPath: '/coupon'
  }
}
