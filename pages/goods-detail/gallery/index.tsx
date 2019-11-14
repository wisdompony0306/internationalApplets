import { ComponentClass } from "react";
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'

const defaultProps = {
  list: ['https://img.alicdn.com/i4/2341003739/O1CN01oSRFj81dUVOT3yG9V_!!2341003739.jpg']
}
const initialState = { current: 0 }
type IProps = {
  list: string[]
}
type IState = Readonly <typeof initialState>

class Gallery extends Component {
  readonly props: Readonly<IProps> = defaultProps
  readonly state: IState = initialState
  static defaultProps = defaultProps

  handleChange = (e) => {
    const { current } = e.detail
    this.setState({ current })
  }

  render () {
    const { list } = this.props
    const { current } = this.state
    return (
      <View className='goods-detail-gallery'>
        <Swiper
          className='goods-detail-gallery__swiper'
          autoplay={false}
          current={current}
          onChange={this.handleChange}
        >
          {list.map((item, index) => (
            <SwiperItem
              key={index}
              className='goods-detail-gallery__swiper-item'
            >
              <Image
                lazyLoad
                className='goods-detail-gallery__swiper-item-img'
                src={item}
              />
            </SwiperItem>
          ))}
        </Swiper>
        {/* <View className='item-gallery__indicator'>
          <Text className='item-gallery__indicator-txt'>
            {`${current + 1}/${list.length}`}
          </Text>
        </View> */}
      </View>
    )
  }
}
export default Gallery as ComponentClass<IProps, IState>
