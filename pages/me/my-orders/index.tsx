import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {AtCard, AtGrid} from 'taro-ui'
import './index.scss'
import SuperBridge from '@/utils/super-bridge';

type PageOwnProps = {}
type PageState = {}

class SwiperBanner extends Component {
  static options = {
    addGlobalClass: true
  }
  readonly props: Readonly<PageOwnProps> = {}
  readonly state: Readonly<PageOwnProps> = {}
  // defaultProps 可以被定义为组件类的一个属性，用以为类设置默认的属性。这对于未定义（undefined）的属性来说有用，而对于设为空（null）的属性并没用。
  static defaultProps = {}
  // 利用 externalClasses 定义段定义若干个外部样式类 这个特性从小程序基础库版本 1.9.90 开始支持
  static externalClasses = ['my-orders-class']

  clickHandle(item, index) {
    SuperBridge.toast({title: ' 订单系统正在开发中, 敬请期待~'})
    // SuperBridge.navigateTo({url: `/pages/order-list/order-list?status=${item.status}`})
  }

  render () {
    return (
      <View className='my-orders-class my-orders'>
        <AtCard
          title='我的订单'
          extra='查看全部'
        >
          <AtGrid hasBorder={false} columnNum={4} mode={'square'} onClick={this.clickHandle} data={
            [
              {
                iconInfo: {
                  prefixClass: 'iconfont',
                  value: 'quanbudingdan',
                  size: 24
                },
                value: '全部订单',
                status: 0
              },
              {
                iconInfo: {
                  prefixClass: 'iconfont',
                  value: 'wuliu',
                  size: 24
                },
                value: '已付款',
                status: 1
              },
              {
                iconInfo: {
                  prefixClass: 'iconfont',
                  value: 'yijiesuan',
                  size: 24
                },
                value: '已结算',
                status: 2
              },
              {
                iconInfo: {
                  prefixClass: 'iconfont',
                  value: 'lajitong',
                  size: 24
                },
                value: '已失效',
                status: 3
              }
            ]
          } />
        </AtCard>
      </View>
    )
  }
}
export default SwiperBanner as ComponentClass<PageOwnProps, PageState>
