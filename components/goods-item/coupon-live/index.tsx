// 好券直播 商品item
import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import './index.scss'
import Utils from '@/utils/utils';

const initProps: {goods?: Goods, onClick:(goods:any) => any} = { goods: undefined, onClick: () => {} }
type IProps = typeof initProps
type IState = {}
class CardGoodsItem extends Component {
  // defaultProps 可以被定义为组件类的一个属性，用以为类设置默认的属性。这对于未定义（undefined）的属性来说有用，而对于设为空（null）的属性并没用。
  readonly props: Readonly <IProps> = initProps
  static defaultProps = initProps

  // 跳转到商品详情页
  handleClick = (goods) => {
    this.props.onClick(goods)
  }

  // 获取分享信息
  getShareMsg = (goods) => {
    return {
      goodsId: goods.goodsId,
      couponAmount: goods.couponAmount || 0,
      url: goods.couponShareUrl || goods.clickUrl
    }
  }

  render () {
    const {goods} = this.props
    if (!goods) return;
    const {couponAmount, volume, zkFinalPrice, goodsId} = goods
    const discountPrice = Math.round((parseFloat(zkFinalPrice) - parseFloat(couponAmount + '' || '0'))* 100) / 100
    const _volume = Utils.simplifyNumber(volume)
    const shareMsg = this.getShareMsg(goods)
    // const _userType = userType ? '天猫' : null
    return (
      <View className='goods-item goods-item--coupon' onClick={this.handleClick.bind(this, shareMsg)}>
        <View className='goods-item--coupon__left'>
          {goods.goodsImageUrl && <Image lazyLoad className='goods-item--coupon__left-item-img' src={goods.goodsImageUrl} />}
        </View>
        <View className='goods-item--coupon__content'>
          <View className='goods-item--coupon__content__hd'>
            <Text className='goods-item--coupon__content__hd__title' numberOfLines={1}>
              {/* {_userType && <Text>天猫</Text>} */}
              {goods.goodsTitle}
            </Text>
            <Text className='goods-item--coupon__content__hd__desc'>{goods.goodsDescription}</Text>
          </View>
          <View className='goods-item--coupon__content__bd'>
            <View className='coupon'>
              <View className='coupon__left'><Text>券</Text></View>
              <View className='coupon__right'><Text>{goods.couponAmount}元</Text></View>
            </View>
            <Text className='volume'>已售{_volume}</Text>
          </View>
          <View className='goods-item--coupon__content__ft'>
            <Text className='real-price'>
              到手约
              <Text className='icon'>￥</Text>
              <Text className='em'>{discountPrice}</Text>
            </Text>
            <Text className='origin-price'>￥{zkFinalPrice}</Text>
            {/* <View className='realPrice'><Text>到手约 {discountPrice}</Text></View> */}
          </View>
        </View>
      </View>
    )
  }
}
export default CardGoodsItem as ComponentClass<IProps, IState>
