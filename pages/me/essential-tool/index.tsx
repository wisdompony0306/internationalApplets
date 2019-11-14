import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {AtCard, AtGrid} from 'taro-ui'
import './index.scss'
import SuperBridge from '@/superBridge'
import ZjIcon from './assets/zj.png'
import SignIcon from './assets/sign.png'
import HelpIcon from './assets/help.png'
import CollectIcon from './assets/collect.png'
import InviteFriends from './assets/inviteFriends.png'
import MemberIcon from './assets/member.png'

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
  static externalClasses = ['essential-tool-class']
  clickHandle (item, index) {
    console.log(item, index)
    SuperBridge.toast({ title: ' 必备工具正在开发中, 敬请期待~' })
    return;
    switch (item.value){
      case '成为会员':
        SuperBridge.navigateTo({url: `/pages/join-member/join-member`})
        break;
    }
  }
  render () {
    return (
      <View className='essential-tool-class essential-tool'>
        <AtCard
          title='必备工具'
          extra='查看更多'
        >
          <AtGrid hasBorder={false} columnNum={4} mode={'square'} onClick={this.clickHandle} data={
            [
              {
                image: MemberIcon,
                value: '成为会员'
              },
              {
                image: InviteFriends,
                value: '邀请好友'
              },
              {
                image: ZjIcon,
                value: '我的足迹'
              },
              {
                image: CollectIcon,
                value: '我的收藏'
              },
              {
                image: HelpIcon,
                value: '帮助中心'
              },
              {
                image: SignIcon,
                value: '每日签到'
              },
              {
                image: SignIcon,
                value: '自助补单'
              }
            ]
          } />
        </AtCard>
      </View>
    )
  }
}
export default SwiperBanner as ComponentClass<PageOwnProps, PageState>
