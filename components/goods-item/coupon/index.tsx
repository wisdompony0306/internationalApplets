import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Utils from '@/utils/utils'
import { AtTag } from 'taro-ui'
import './index.scss'

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
    const {couponInfo} = goods
    const couponInfoMatchReg = (couponInfo && Object.prototype.toString.call(couponInfo) === '[object String]' && couponInfo.match(/满([0-9.]+)元减([0-9.]+)元/)) || null
    const _couponAmount = (couponInfoMatchReg!== null && couponInfoMatchReg[2] && couponInfoMatchReg[2]) || 0
    return {
      goodsId: goods.goodsId,
      couponAmount: _couponAmount,
      url: goods.couponShareUrl || goods.clickUrl
    }
  }

  render () {
    const {goods} = this.props
    if (!goods) return;
    const {goodsTitle, goodsImageUrl, couponInfo, volume, zkFinalPrice, reservePrice} = goods
    const couponInfoMatchReg = (couponInfo && Object.prototype.toString.call(couponInfo) === '[object String]' && couponInfo.match(/满([0-9.]+)元减([0-9.]+)元/)) || null
    const _couponAmount = (couponInfoMatchReg!== null && couponInfoMatchReg[2] && couponInfoMatchReg[2]) || 0
    const discountPrice = _couponAmount ? Math.round((parseFloat(zkFinalPrice) - parseFloat(_couponAmount + ''))* 100) / 100 : zkFinalPrice
    const originPrice = _couponAmount ? zkFinalPrice : reservePrice
    const _volume = volume && Utils.simplifyNumber(volume)
    const shareMsg = this.getShareMsg(goods)
    return (
      <View className='goods-item goods-item--card' onClick={this.handleClick.bind(this, shareMsg)}>
        <View className='goods-item--card__hd'>
          {goodsImageUrl && <Image lazyLoad className='goods-item--card__hd-item-img' src={goodsImageUrl} />}
        </View>
        <View className='goods-item--card__bd'>
          <Text className='goods-item--card__bd__title' numberOfLines={1}>{goodsTitle}</Text>
          <View className='goods-item--card__bd__tag'>
            <View className='volume'>销量 {_volume}</View>
            {_couponAmount && <AtTag active={true} size='small' circle>￥{_couponAmount}元券</AtTag>}
          </View>
          <View className='goods-item--card__bd__price'>
            <View className='goods-item--card__bd__price--real-price'>
              <Text>到手约:</Text>
              <Text className='real-price-icon'>￥</Text>
              <Text className='real-price'>{discountPrice}</Text>
            </View>
            <View className='goods-item--card__bd__price--zk-final-price'>
              <Text className='zk-final-price'>￥{originPrice}</Text>
            </View>
          </View>
        </View>
        <View className='goods-item--card__ft'>

        </View>
      </View>
    )
  }
}
export default CardGoodsItem as ComponentClass<IProps, IState>
