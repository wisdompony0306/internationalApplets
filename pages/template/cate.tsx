import { ComponentClass } from "react";
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@/actions/goods-list'
import './goods-detail.scss'

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

@connect(state => state.goodsList, {...actions})
class GoodsDetail extends Component{
  state: PageState = {
    loaded: false,
    loading: false
  }
  render () {
    return <View><Text>Text</Text></View>
  }
}
export default GoodsDetail as ComponentClass