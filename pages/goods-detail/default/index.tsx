import { ComponentClass } from "react";
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'

const defaultProps = {}
const initialState = { current: 0 }
type IProps = {}
type IState = Readonly <typeof initialState>

class Gallery extends Component {
  readonly props: Readonly<IProps> = defaultProps
  readonly state: IState = initialState
  static defaultProps = defaultProps
  // 利用 externalClasses 定义段定义若干个外部样式类 这个特性从小程序基础库版本 1.9.90 开始支持
  static externalClasses = ['my-orders-class']

  render () {
    const { } = this.props
    const { } = this.state
    return (
      <View className=''>
        
      </View>
    )
  }
}
export default Gallery as ComponentClass<IProps, IState>
