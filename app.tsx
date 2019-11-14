import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider, connect } from '@tarojs/redux'
import Home from './pages/home/home'
import configStore from './store'

import './app.scss'
import utils from './utils/utils';
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()
class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/home/home',
      'pages/super-search/super-search',
      'pages/goods-list/goods-list',
      'pages/goods-detail/goods-detail',
      'pages/me/me',
      'pages/submit-order/submit-order',
      'pages/order-list/order-list',
      'pages/join-member/join-member'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '淘好券',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#666",
      selectedColor: "#b4282d",
      backgroundColor: "#fafafa",
      borderStyle: 'black',
      list: [
        {
          pagePath: "pages/home/home",
          iconPath: "./assets/tab-bar/home.png",
          selectedIconPath: "./assets/tab-bar/home-active.png",
          text: "首页"
        }, 
        {
          pagePath: "pages/super-search/super-search",
          iconPath: "./assets/tab-bar/search.png",
          selectedIconPath: "./assets/tab-bar/search-active.png",
          text: "搜索"
        },
        {
          pagePath: "pages/me/me",
          iconPath: "./assets/tab-bar/me.png",
          selectedIconPath: "./assets/tab-bar/me-active.png",
          text: "个人中心"
        }
      ]
    }
  }
  state = {
    showTpwd: false
  }

  componentWillMount() {}

  componentDidMount() {
    this.updateHandle()
  }

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 版本更新机制
  updateHandle = () => {
    const updateManager = Taro.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        Taro.showToast({ title: '发现新版本咯', icon: 'none' })
      }
    })

    updateManager.onUpdateReady(function () {
      Taro.showModal({
        title: '更新提示',
        content: '新版本已经准备就绪，稍后将会重启应用，请坐稳扶好',
        confirmText: '确定'
      }).then(() => {
        updateManager.applyUpdate()
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      Taro.showModal({
        title: '更新失败',
        content: '由于网络原因,应用更新失败,建议您重启应用进行更新!',
        confirmText: '我已了解'
      })
    })
  }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
