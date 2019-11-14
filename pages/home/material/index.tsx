import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import { postcss } from '@/utils/style'
import { AtIcon } from 'taro-ui'
import couponImg from './assets/icon-heme-Coupon.png'
import hqzbImg from './assets/hqzb.png'
import ppqImg from './assets/ppq.png'
import yhhImg from './assets/yhh.png'
import thImg from './assets/th.png'
import clfImg from './assets/clf.png'
import './index.scss'

type PageOwnProps = {}
type PageState = {}

class SwiperBanner extends Component {
  readonly props: Readonly<PageOwnProps> = {}
  readonly state: Readonly<PageOwnProps> = {}
  // defaultProps 可以被定义为组件类的一个属性，用以为类设置默认的属性。这对于未定义（undefined）的属性来说有用，而对于设为空（null）的属性并没用。
  static defaultProps = {}

  clickHandle = (item) => {
    let url = `/pages/goods-list/goods-list?title=${item.title}&materialId=${item.materialId}`
    if (item.materialType) url = `${url}&materialType=${item.materialType}`;
    Taro.navigateTo({url})
  }
  render () {
    const list = [
      {
        title: '好券直播',
        icon: hqzbImg,
        color: '#F00',
        bgColor: '#efefef',
        materialId: 3756,
        materialType: 'hqzb'
      },
      {
        title: '大额券榜',
        icon: couponImg,
        color: '#F00',
        bgColor: '#efefef',
        materialId: 9660,
        materialType: 'deq'
      },
      {
        title: '品牌尖货',
        icon: ppqImg,
        color: '#F00',
        bgColor: '#efefef',
        materialId: 3786,
        materialType: 'ppq'
      },
      {
        title: '有好货',
        icon: yhhImg,
        color: '#F00',
        bgColor: '#efefef',
        materialId: 4092
      },
      {
        title: '潮流范',
        icon: clfImg,
        color: '#F00',
        bgColor: '#efefef',
        materialId: 4093
      },
      {
        title: '特惠',
        icon: thImg,
        color: '#F00',
        bgColor: '#efefef',
        materialId: 4093
      }
    ]
    return (
      <View className='home-material'>
        <View className='home-material__wrapper'>
          <ScrollView
            className='scrollview'
            scrollX={true}
          >
            {list.map((item, index) => (
              <View 
                key={index}
                className='scrollview__item'
                onClick={this.clickHandle.bind(this, item)}
              >
                <View className='scrollview__item--icon' style={postcss({backgroundColor: item.bgColor})}>
                  <Image lazyLoad className='scrollview__item--icon-img' src={item.icon}/>
                </View>
                <View className='scrollview__item-title'><Text>{item.title}</Text></View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    )
  }
}
export default SwiperBanner as ComponentClass<PageOwnProps, PageState>
