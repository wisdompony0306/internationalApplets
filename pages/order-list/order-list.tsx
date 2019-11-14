import { ComponentClass } from "react";
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './order-list.scss'

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
  state: PageState
}

@connect(state => state.goodsList, {})
class GoodsDetail extends Component{
  config: Config = {
    navigationBarTitleText: '我的订单',
    enablePullDownRefresh: true
  }
  state: PageState = {
    loaded: false,
    loading: false
  }
  render () {
    return (
      <View><Text>Text</Text></View>
    )
  }
}
export default GoodsDetail as ComponentClass