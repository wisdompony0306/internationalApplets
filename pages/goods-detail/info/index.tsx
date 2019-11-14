import { ComponentClass } from "react";
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import Utils from '@/utils/utils'
import './index.scss'
import TbIcon from '@/assets/img/tb.png'
import TmallIcon from '@/assets/img/tmall.png'

const defaultProps = {
  data: {
    goodsTitle: ''
  }
}
const initialState = {}
type IProps = {
  data: any
}
type IState = Readonly <typeof initialState>

class Info extends Component {
  readonly props: Readonly<IProps> = defaultProps
  readonly state: IState = initialState
  static defaultProps = defaultProps

  render () {
    const { data } = this.props
    const { } = this.state
    const _couponAmount = data.couponAmountString || data.couponAmount || 0
    const discountPrice = _couponAmount ? Math.round((parseFloat(data.zkFinalPrice) - parseFloat(_couponAmount + ''))* 100) / 100 : data.zkFinalPrice
    const originPrice = _couponAmount ? data.zkFinalPrice : data.reservePrice
    const _volume = data.volume && Utils.simplifyNumber(data.volume)
    return (
      <View className='goods-detail-info'>
        {/* 商品名称 */}
        <View className='goods-detail-info__title'>
          <Image className='goods-detail-info__title-img' src={TmallIcon}/>
          <Text className='goods-detail-info__title-text' numberOfLines={2} selectable>{data.goodsTitle}</Text>
        </View>
        {/* 商品价格 */}
        <View className='goods-detail-info__price'>
          <View className='price'>
            <Text className='price-discount'>券后￥{discountPrice}</Text>
            <Text className='price-origin'>￥{originPrice} </Text>
          </View>
          <Text className='volume'>已售{_volume}</Text>
          <Text className='provcity'>{data.provcity}</Text>
        </View>
      </View>
    )
  }
}
export default Info as ComponentClass<IProps, IState>
