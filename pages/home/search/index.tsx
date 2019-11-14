import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

type PageOwnProps = {}
type PageState = {}

class SwiperBanner extends Component {
  readonly props: Readonly<PageOwnProps> = {}
  readonly state: Readonly<PageOwnProps> = {}
  // defaultProps 可以被定义为组件类的一个属性，用以为类设置默认的属性。这对于未定义（undefined）的属性来说有用，而对于设为空（null）的属性并没用。
  static defaultProps = {}

  handlePrevent () {
    Taro.switchTab({
      url: '/pages/super-search/super-search'
    })
  }
  render () {
    return (
      <View className='home__search'>
        <View className='home__search-wrap' onClick={this.handlePrevent}>
          {/* <Image lazyLoad className='home__search-img' src={searchIcon} /> */}
          <Text className='home__search-txt'>
            {`拼的多 省的多 海量拼购 聚实惠`}
          </Text>
        </View>
      </View>
    )
  }
}
export default SwiperBanner as ComponentClass<PageOwnProps, PageState>
