import { ComponentClass } from "react";
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getWindowHeight } from '@/utils/style'
import * as actions from '@/actions/goods-list'
import './me.scss'
import Account from './account'
import IncomeGrid from './income-grid'
import MyOrders from './my-orders'
import VipMember from './vip-mamber'
import EssentialTool from './essential-tool'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  loaded: boolean,
  loading: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps
interface GoodsDetail {
  props: IProps,
  readonly state: Readonly<PageState>
}

@connect(state => state.goodsList, {...actions})
class GoodsDetail extends Component{
  config: Config = {
    navigationBarTitleText: '个人中心',
    // enablePullDownRefresh: true
  }
  readonly state: Readonly<PageState> = {
    loaded: false,
    loading: false
  }
  render () {
    return (
      <View className='me'>
        <ScrollView
          scrollY
          className='me__wrap'
          style={{ height: getWindowHeight(true) }}
        >
          {/* 用户基础信息 */}
          <Account my-account-class='me__wrap__account'/>

          {/* 收益金额 */}
          <IncomeGrid />

          {/* 我的订单 */}
          <MyOrders my-orders-class='me__wrap__my-orders' />

          {/* VIP会员中心 */}
          <VipMember vip-member-class='me__wrap__vip-member'/>

          {/* 必备工具 */}
          <EssentialTool essential-tool-class='me__wrap__essential-tool'/>
        </ScrollView>
      </View>
    )
  }
}
export default GoodsDetail as ComponentClass