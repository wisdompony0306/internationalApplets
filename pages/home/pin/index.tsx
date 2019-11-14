import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { HomeTitle } from '@/components'
import Utils from '@/utils/utils'
import './index.scss'

type PageOwnProps = {
  list: Array<Array<Goods>>,
  banner: {
    picUrls: any
  }
}

export default class Pin extends Component<PageOwnProps> {
  readonly props: Readonly<PageOwnProps> = {
    banner: {
      picUrls: []
    },
    list: []
  }
  static defaultProps = {
    banner: {},
    list: []
  }

  // 获取分享信息
  getShareMsg = (goods) => {
    const {jddPrice, origPrice} = goods
    const discountPrice = Math.round((parseFloat(jddPrice + ''))* 100) / 100
    const originPrice = origPrice
    return {
      goodsId: goods.goodsId,
      couponAmount: goods.couponAmount || 0,
      discountPrice,
      originPrice,
      url: goods.couponShareUrl || goods.clickUrl
    }
  }
  // 跳转到商品详情页
  handleClick = (goods) => {
    const shareMsg = this.getShareMsg(goods)
    let url = `/pages/goods-detail/goods-detail${Utils.urlEncode(shareMsg)}`
    Taro.navigateTo({url})
  }

  //
  bannerClickHandle = (item) => {
    const url = `/pages/goods-list/goods-list?title=${item.title}&materialId=${item.materialId}`
    Taro.navigateTo({url})
  }
  
  render () {
    const { banner: { picUrls = [] }, list } = this.props
    return (
      <View className='home-pin'>
        <View className='home-pin__banner'>
          {picUrls.map((item, index) => (
            <View key={index} className='home-pin__banner-item' onClick={this.bannerClickHandle.bind(this, item)}>
              <Image
                lazyLoad
                className='home-pin__banner-item-img'
                src={item.url}
                mode='widthFix'
              />
            </View>
          ))}
        </View>
        
        <HomeTitle
          title='聚划算拼团'
          link={`/pages/goods-list/goods-list?title=聚划算拼团&materialId=4071&goodsItemType=pin`}
        />
        <View className='home-pin__wrap'>
          <Swiper
            className='home-pin__swiper'
            autoplay
            indicatorDots
            indicatorActiveColor='rgb(178, 42, 49)'
          >
            {list.map((group, index) => (
              
              <SwiperItem
                key={index}
                className='home-pin__swiper-item'
              >
                {group.map(item => (
                  <View key={item.goodsId} className='home-pin__item' onClick={this.handleClick.bind(this, item)}>
                    <Image
                      lazyLoad
                      className='home-pin__item-img'
                      src={item.goodsImageUrl}
                    />
                    <View className='home-pin__item-info'>
                      <Text className='home-pin__item-price'>{`拼团价¥${item.jddPrice}`}</Text>
                      <Text className='home-pin__item-origin'>¥{item.origPrice}</Text>
                    </View>
                    <View className='home-pin__item-num'>
                      <Text className='home-pin__item-num-txt'>{item.jddNum}人团</Text>
                    </View>
                  </View>
                ))}
              </SwiperItem>
            ))}
          </Swiper>
        </View>
      </View>
    )
  }
}
