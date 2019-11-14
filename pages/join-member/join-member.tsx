import { ComponentClass } from "react";
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Utils from '@/utils/utils'
import './join-member.scss'
import withLogin from '@/decorator/withLogin'
import withParams from '@/decorator/withParams'

type PageStateProps = {
  userInfo: any
}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  loaded: boolean,
  loading: boolean,
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps
interface JoinMember {
  props: IProps,
  state: PageState
}

@withLogin()
@withParams()
@(connect as any)(({globalData}) => ({
  userInfo: globalData.userInfo,
  params: globalData.params
}),{})
class JoinMember extends Component{
  config: Config = {
    navigationBarTitleText: '成为会员',
    enablePullDownRefresh: true
  }
  state: PageState = {
    loaded: false,
    loading: false
  }
  render () {
    const {userInfo} = this.props
    const {} = this.state
    const param = {
      // tkUserId: userInfo && userInfo.tkUserId,
      tkUserId: 23,
      inviterCode: 'T3BWHE'
    }
    console.log(`"渠道": \nhttps://coupon.demongao.com/channel?tkUserId=23}`)
    console.log(`"会员": \nhttps://coupon.demongao.com/member?tkUserId=23`)
    return (
      <View>
        <Text>{`http://127.0.0.1:8080/${Utils.urlEncode(param)}`}</Text>
      </View>
    )
  }
}
export default JoinMember as ComponentClass