import { ComponentClass } from "react";
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'

const defaultProps = {}
const initialState = {}
type IProps = {}
type IState = Readonly <typeof initialState>

class Gallery extends Component {
  readonly props: Readonly<IProps> = defaultProps
  readonly state: IState = initialState
  static defaultProps = defaultProps
  // 利用 externalClasses 定义段定义若干个外部样式类 这个特性从小程序基础库版本 1.9.90 开始支持
  static externalClasses = ['headline-news-class']

  render () {
    const { } = this.props
    const { } = this.state
    return (
      <View className='headline-news headline-news-class'>
        <View className='headline-news__left'>
          <AtIcon prefixClass='iconfont' value='today-icon' size='20' color='#F00'></AtIcon>
        </View>
        <View className='headline-news__content'>
          <Swiper
            className='headline-news__content__swiper'
            interval={2000}
            vertical={true}
            circular
            autoplay
          >
            {['为回馈新老会员,佣金返利额度再次提高', '淘宝渠道授权通知'].map((title, index) => (
              <SwiperItem className='headline-news__content__swiper-item' key={index}>
                <View className='notice-type'><Text className='text'>[公告]</Text></View>
                <View className='notice-title'><Text className='text' numberOfLines={2}>{title}</Text></View>
              </SwiperItem>
            ))}
          </Swiper>
        </View>
      </View>
    )
  }
}
export default Gallery as ComponentClass<IProps, IState>
