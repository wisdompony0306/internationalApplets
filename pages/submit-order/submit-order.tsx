import { ComponentClass } from "react";
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@/actions/goods-list'
import './submit-order.scss'
import { bindOrder } from '@/utils/api'

import SearchBar from './SearchBar'
import GuideImg from './assets/guide.jpeg'
import SuperBridge from '@/utils/super-bridge';

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
  config: Config = {
    navigationBarTitleText: '订单追踪'
  }
  state: PageState = {
    loaded: false,
    loading: false
  }
  async searchHandle(tradeId) { 
    if (!/^[0-9]*$/g.test(tradeId)) {
      SuperBridge.toast({title: '订单号格式不正确'})
      return
    }
    await bindOrder({ tradeId })
    SuperBridge.toast({title: '订单绑定成功', icon: 'success', duration: 4})
  }
  render () {
    return (
      <View className={'submit-order'}>
        {/* 封面 */}
        <View className='submit-order__tips'>
          <Text>目前正在开发订单系统， 暂时只支持订单绑定，绑定成功的订单将会获得返利，具体返利金额，订单系统完善后即可显示。敬请期待~</Text>
        </View>
        <SearchBar submit-order-search-bar-class={'submit-order-search-bar'} onSearch={this.searchHandle}/>
        <Image className='submit-order__guide-img' src={GuideImg} mode='widthFix'/>
      </View>
    )
  }
}
export default GoodsDetail as ComponentClass