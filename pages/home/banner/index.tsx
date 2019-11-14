import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'

type PageOwnProps = {
  list?: any
}
type PageState = {}

class SwiperBanner extends Component {
  readonly props: Readonly<PageOwnProps> = {
    list: [],
  }
  static defaultProps = {
    list: []
  }
  clickHandle = (item) => {
    const url = `/pages/goods-list/goods-list?title=${item.title}&materialId=${item.materialId}`
    Taro.navigateTo({url})
  }
  render () {
    const { list } = this.props
    return (
      <View className='home-banner'>
        <Swiper
          className='home-banner__swiper'
          circular
          autoplay
          indicatorDots={false}
          indicatorActiveColor='rgb(178, 42, 49)'
          // TODO 目前 H5、RN 暂不支持 previousMargin、nextMargin
          // previousMargin
          // nextMargin
        >
          {list.map(item => (
            <SwiperItem
              key={item.rank}
              className='home-banner__swiper-item'
            >
              <Image
                lazyLoad
                className='home-banner__swiper-item-img'
                src={item.img}
                onClick={this.clickHandle.bind(this,item)}
              />
            </SwiperItem>
          ))}
        </Swiper>
      </View>
    )
  }
}
export default SwiperBanner as ComponentClass<PageOwnProps, PageState>
