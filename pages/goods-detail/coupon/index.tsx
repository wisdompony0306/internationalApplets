import { ComponentClass } from "react";
import Taro, { Component } from '@tarojs/taro'
import classNames from 'classnames'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'

const defaultProps = {
  data: {
    couponAmountString: null,
    couponAmount: null
  },
  onClick: () => {}
}
const initialState = {}
type IProps = {
  data: any,
  onClick: () => any
}
type IState = Readonly <typeof initialState>

class Gallery extends Component {
  readonly props: Readonly<IProps> = defaultProps
  readonly state: IState = initialState
  static defaultProps = defaultProps

  render () {
    const { data } = this.props
    const { } = this.state
    const _couponAmount = data.couponAmountString || (data.couponAmount && data.couponAmount !== '0' && `${data.couponAmount}元`) || '暂无优惠券'
    
    return (
      <View className='goods-detail-coupon'>
        <View className='goods-detail-coupon__wrap' onClick={this.props.onClick}>
          <View className='goods-detail-coupon__wrap-icon'>
            <View className='goods-detail-coupon__wrap-icon--left'></View>
            <View className='goods-detail-coupon__wrap-icon--right'></View>
            {[1,2,3,4,5].map((item, index) => (
              <View className={classNames('goods-detail-coupon__wrap-icon--bubble', `goods-detail-coupon__wrap-icon--bubble-${item}`)} key={index}></View>
            ))}
          </View>
          <View className='goods-detail-coupon__wrap-left'>
            <Text className='coupon-amount'>{data.couponInfo || _couponAmount}</Text>
            <View>
              <Text className='coupon-text coupon-text--first'>D I S C O U N T</Text>
              <Text className='coupon-text'>C O U P O N</Text>
              </View>
          </View>
          <View className='goods-detail-coupon__wrap-center'>
            {[1,2,3,4,5,6,7].map((item, index) => (<View className='circle' key={index}></View>))}
          </View>
          <View className='goods-detail-coupon__wrap-right'>
            <Text>立即领券</Text>
          </View>
        </View>
      </View>
    )
  }
}
export default Gallery as ComponentClass<IProps, IState>
