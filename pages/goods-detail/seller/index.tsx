import { ComponentClass } from "react";
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'

const defaultProps = {
  data: {
    shopIcon: null
  }
}
const initialState = {}
type IProps = {
  data: any
}
type IState = Readonly <typeof initialState>

class Gallery extends Component {
  readonly props: Readonly<IProps> = defaultProps
  readonly state: IState = initialState
  static defaultProps = defaultProps

  render () {
    const { data } = this.props
    const { } = this.state
    return (
      <View className='goods-detail-seller'>
        <View className='goods-detail-seller__hd'>
          <Image className='goods-detail-seller__hd-img' src={data.shopIcon}/>
          <Text className='goods-detail-seller__hd-text'>{data.sellerNick}</Text>
        </View>
        <View className='goods-detail-seller__bd'>
          <Text>宝贝描述</Text>
        </View>
      </View>
    )
  }
}
export default Gallery as ComponentClass<IProps, IState>
