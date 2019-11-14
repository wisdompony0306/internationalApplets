import { ComponentClass } from "react";
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'
import EndPic from './assets/endpic.png'

const defaultProps = {list: []}
const initialState = { current: 0 }
type IProps = {
  list: string[]
}
type IState = Readonly <typeof initialState>

class Gallery extends Component {
  readonly props: Readonly<IProps> = defaultProps
  readonly state: IState = initialState
  static defaultProps = defaultProps

  render () {
    const { list } = this.props
    const { } = this.state
    const _list = [...list, EndPic]
    return (
      <View className='goods-detail-photo_desc'>
        <View className='goods-detail-photo_desc__hd'><Text>商品详情</Text></View>
        <View className='goods-detail-photo_desc__bd'>
          {_list.map((item, index) => (<Image className='goods-detail-photo_desc__bd-img' src={item} key={index}></Image>))}
        </View>
      </View>
    )
  }
}
export default Gallery as ComponentClass<IProps, IState>
