import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtIcon } from 'taro-ui'
import {GoodsList} from '@/components'
import './index.scss'

type PageOwnProps = {onChange: (any) => any, list: Goods[]}
const pageState = {
  tabDataSource: [
    {
      title: '综合',
      materialId: 3756
    },
    {
      title: '女装',
      materialId: 3767
    },
    {
      title: '家居家装',
      materialId: 3758
    },
    {
      title: '数码家电',
      materialId: 3759
    },
    {
      title: '鞋包配饰',
      materialId: 3762
    },
    {
      title: '美妆个护',
      materialId: 3763
    },
    {
      title: '男装',
      materialId: 3764
    },
    {
      title: '内衣',
      materialId: 3765
    },
    {
      title: '母婴',
      materialId: 3760
    },
    {
      title: '食品',
      materialId: 3761
    },
    {
      title: '运动户外',
      materialId: 3766
    }
  ],
  current: 0
}
type PageState = typeof pageState

class SwiperBanner extends Component {
  readonly props: Readonly<PageOwnProps> = {
    onChange: () => {},
    list: []
  }
  readonly state: Readonly<PageState> = pageState
  // defaultProps 可以被定义为组件类的一个属性，用以为类设置默认的属性。这对于未定义（undefined）的属性来说有用，而对于设为空（null）的属性并没用。
  static defaultProps = {
    onChange: () => {},
    list: []
  }
  // 标签页切换点击事件
  tabClickHandle (tabIndex) {
    this.setState({current: tabIndex})
    this.props.onChange(this.state.tabDataSource[tabIndex])
  }
  render () {
    const {list} = this.props
    return (
      <View className='goods-coupon-live'>
        <View className='goods-coupon-live__hd'>
          <AtIcon prefixClass='iconfont' value='qiang' size='20'/>
          <Text>·</Text>
          <Text>好券直播</Text>
        </View>
        <View className='goods-coupon-live__bd'>
          <AtTabs
            current={this.state.current}
            scroll
            tabList={this.state.tabDataSource}
            onClick={this.tabClickHandle}
          />
          <View className='goods-coupon-live__bd__list'>
            <GoodsList type='coupon-live' list={list}/>
          </View>
        </View>
      </View>
    )
  }
}
export default SwiperBanner as ComponentClass<PageOwnProps, PageState>
