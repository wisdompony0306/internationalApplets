import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text } from '@tarojs/components'
import { AtDivider, AtTag, AtIcon } from 'taro-ui'
import {GoodsList} from '@/components'
import * as actions from '@/actions/global'
import './index.scss'

type PageStateProps = {}
type PageDispatchProps = {} 
type PageOwnProps = {
  type: string,
  list: Array<Goods>
}
const initialState = {}
type PageState = typeof initialState
type IProps = PageStateProps & PageDispatchProps & PageOwnProps
interface Search {
  props: IProps,
  state: Readonly <PageState>
}
@connect(state => Object.assign(state.globalData), {...actions})
class Search extends Component {
  state: Readonly <PageState> = initialState
  // defaultProps 可以被定义为组件类的一个属性，用以为类设置默认的属性。这对于未定义（undefined）的属性来说有用，而对于设为空（null）的属性并没用。
  static defaultProps = {
    type: 'coupon',
    list: []
  }

  render () {
    const {type, list} = this.props
    if (!list || (Object.prototype.toString.call(list) === '[object Array]' && list.length === 0)) return
    return (
      <View className='search-recommend'>
        <AtDivider className='search-recommend__hd'>
          <AtIcon prefixClass='iconfont' value='choicenessfill' size='24'></AtIcon>
          <Text className='search-recommend__hd__title'>好物推荐</Text>
        </AtDivider>
        <GoodsList type={type} list={list} />
      </View>
    )
  }
}
export default Search as ComponentClass<IProps, PageState>
