import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import {AtAvatar, AtButton} from 'taro-ui'
import {dispatchUpdateUserInfo} from '@/actions/global'
import './index.scss'
import UpgradeIcon from './assets/upgrade.png'
import SuperBridge from '@/utils/super-bridge';
import { connect } from '@tarojs/redux';
import withLogin from '@/decorator/withLogin';

type PageOwnProps = {
  userInfo?: UserInfo,
  dispatchUpdateUserInfo?: (payload: any) => any
}
type PageState = {}
@withLogin()
@connect((state) => state.globalData, {dispatchUpdateUserInfo})
class SwiperBanner extends Component {
  static options = {
    addGlobalClass: true
  }
  readonly props: Readonly<PageOwnProps> = {
    dispatchUpdateUserInfo: () => {}
  }
  readonly state: Readonly<PageState> = {}
  // defaultProps 可以被定义为组件类的一个属性，用以为类设置默认的属性。这对于未定义（undefined）的属性来说有用，而对于设为空（null）的属性并没用。
  static defaultProps = {}
  static externalClasses = ['my-account-class']

  async handleGetUserInfo(event) {
    const userInfoMsg = event.detail
    if (userInfoMsg.errMsg !== 'getUserInfo:ok') {
      SuperBridge.alert({content: '省钱购物优惠券助手不会将您的信息提供给第三方，仅用于个人信息展示', confirmText: '知道了'})
      return
    }
    try {
      SuperBridge.showLoading({title: '登录中...'})
      this.props.dispatchUpdateUserInfo && await this.props.dispatchUpdateUserInfo(userInfoMsg)
      SuperBridge.toast({icon: 'success', title: '登录成功'})
    } catch (err) {
      SuperBridge.toast({title: '登录失败请重试', duration: 2})
    } finally {
      SuperBridge.hideLoading()
    }
  }

  render () {
    const {userInfo} = this.props
    return (
      <View className='me__account my-account-class'>
        {/* 用户头像 */}
        <View className='me__account__avatar'>
          {process.env.TARO_ENV !== 'weapp' ?
            <Image lazyLoad className='me__account__avatar--img' src='http://kcpcdn.demongao.com/userImg/default.png' /> :
            <AtAvatar className='me__account__avatar--img' size='normal' circle openData={{ type: 'userAvatarUrl'}	}/>
          }
          <View className='me__account__avatar--tips'>
            <AtButton openType={'getUserInfo'} lang={'zh_CN'} onGetUserInfo={this.handleGetUserInfo}>
              {(!userInfo || !userInfo.user || !userInfo.user || !userInfo.user.tkUserId) ?'微信登录' : '同步信息'}
            </AtButton>
          </View>
        </View>
        {/* 用户昵称 */}
        <View className='me__account__content'>
          <View className='userinfo'>
            {process.env.TARO_ENV !== 'weapp' ?
              <Text className='nick'>游客</Text>:
              <View className='nick'><open-data type='userNickName'></open-data></View>
            }
            <Text className='grade'>普通用户</Text>
          </View>
          <View className='invitecode'>
            <Text>邀请码：{(userInfo && userInfo.user && userInfo.user.tkUserId) || '微信登录后可获得'}</Text>
          </View>
        </View>
        {/* 我要升级 */}
        <View className='me__account__right' onClick={() => {Taro.navigateTo({url: '/pages/submit-order/submit-order'})}}>
          <View className='upgrade'>
            {/* <View className='upgrade--icon iconfont iconfont-choicenessfill'></View> */}
            <Image className='upgrade--icon' lazyLoad src={UpgradeIcon}/>
            {/* <AtIcon className='upgrade--icon' prefixClass='iconfont' value='choicenessfill' size='16' color='#F00'></AtIcon> */}
            <Text className='upgrade--txt'>提交订单</Text>
          </View>
        </View>
      </View>
    )
  }
}
export default SwiperBanner as ComponentClass<PageOwnProps, PageState>
