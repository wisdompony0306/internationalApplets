import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import {AtGrid} from 'taro-ui'
import './index.scss'

type PageOwnProps = {}
type PageState = {}

class SwiperBanner extends Component {
  static options = {
    addGlobalClass: true
  }
  readonly props: Readonly<PageOwnProps> = {}
  readonly state: Readonly<PageOwnProps> = {}
  // defaultProps 可以被定义为组件类的一个属性，用以为类设置默认的属性。这对于未定义（undefined）的属性来说有用，而对于设为空（null）的属性并没用。
  static defaultProps = {}

  render () {
    return (
      <View className='income-grid'>
        <View className='at-row income-grid__wrap'>
          <View className='at-col income-grid__wrap--item'>
            <Text className='price'>￥0.00</Text>
            <Text className='title'>累计总收益</Text>
          </View>
          <View className='at-col income-grid__wrap--item'>
            <Text className='price'>￥0.00</Text>
            <Text className='title'>今日预估收益</Text>
          </View>
          <View className='at-col income-grid__wrap--item'>
            <Text className='price'>￥0.00</Text>
            <Text className='title'>可提现余额</Text>
          </View>
        </View>
      </View>
    )
  }
}
export default SwiperBanner as ComponentClass<PageOwnProps, PageState>
