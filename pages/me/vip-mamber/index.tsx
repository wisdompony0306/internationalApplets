import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCard, AtGrid } from 'taro-ui'
import SuperBridge from '@/superBridge'
import './index.scss'

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
  static externalClasses = ['vip-member-class']
  clickHandle(item, index) {
    SuperBridge.toast({ title: ' VIP会员中心正在开发中, 敬请期待~' })
    return;
    // SuperBridge.navigateTo({url: `/pages/order-list/order-list?status=${item.status}`})
  }
  render() {
    return (
      <View className='vip-member-class vip-member'>
        <AtCard
          title='VIP会员中心'
          extra='查看更多'
        >
          <AtGrid hasBorder={false} columnNum={4} mode={'square'} onClick={this.clickHandle} data={
            [
              {
                iconInfo: {
                  prefixClass: 'iconfont',
                  value: 'shouyi',
                  size: 24
                },
                value: '收益报表'
              },
              {
                iconInfo: {
                  prefixClass: 'iconfont',
                  value: 'fensidingdan',
                  size: 24
                },
                value: '粉丝订单'
              },
              {
                iconInfo: {
                  prefixClass: 'iconfont',
                  value: '86',
                  size: 24
                },
                value: '团队粉丝'
              },
              {
                iconInfo: {
                  prefixClass: 'iconfont',
                  value: 'recharge-index',
                  size: 24
                },
                value: '钱包'
              }
            ]
          } />
        </AtCard>
      </View>
    )
  }
}
export default SwiperBanner as ComponentClass<PageOwnProps, PageState>
