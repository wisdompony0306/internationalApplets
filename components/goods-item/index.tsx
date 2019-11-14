import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text, Image } from '@tarojs/components'
import Utils from '@/utils/utils'
import CardGoodsItem from './card'
import CouponGoodsItem from './coupon'
import CouponLiveGoodsItem from './coupon-live'
import PinGoodsItem from './pin'
import './index.scss'

const initProps: {type?: string, goods?: Goods, tkUserId: any} = {
  type: 'default',
  goods: undefined,
  tkUserId: undefined
}
type IProps = typeof initProps
type IState = {}
@connect(({globalData}) => ({
  tkUserId: globalData.tkUserId
}))
class GoodsItem extends Component {
  // defaultProps 可以被定义为组件类的一个属性，用以为类设置默认的属性。这对于未定义（undefined）的属性来说有用，而对于设为空（null）的属性并没用。
  readonly props: Readonly <IProps> = initProps
  static defaultProps = initProps

  handleClick = (payload) => {
    const {goods, tkUserId} = this.props
    let url = `/pages/goods-detail/goods-detail${Utils.urlEncode({
      ...payload,
      tkUserId,
      couponInfo: goods && goods.couponInfo || null
    })}`
    Taro.navigateTo({url})
  }
  render () {
    const {goods, type} = this.props
    if (!goods) return;
    if (type === 'card') return (<CardGoodsItem goods={goods} onClick={this.handleClick}/>)
    // 好券直播
    if (type === 'coupon-live') return (<CouponLiveGoodsItem goods={goods} onClick={this.handleClick}/>)
    // 好券清单
    if (type === 'coupon') return (<CouponGoodsItem goods={goods} onClick={this.handleClick}/>)
    // 聚划算拼团
    if (type === 'pin') return (<PinGoodsItem goods={goods} onClick={this.handleClick}/>)
    return(
      <View className='goods-item'>
        <View className='goods-item__hd'>
          {goods.goodsImageUrl && <Image lazyLoad className='goods-item__hd-item-img' src={goods.goodsImageUrl} />}
        </View>
      </View>
    )
  }
}
export default GoodsItem as ComponentClass<IProps, IState>
