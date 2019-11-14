import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text } from '@tarojs/components'
import { AtDivider, AtTag, AtIcon } from 'taro-ui'
import Utils from '@/utils/utils'
import './index.scss'
import * as actions from '@/actions/global'

type PageDispatchProps = {
  onClear?: () => void
} 
type PageOwnProps = {
  list: string[]
}
const initialState = {value: '', _list: []}
type PageState = typeof initialState
type IProps =  PageOwnProps & PageDispatchProps
interface SearchHistory {
  props: IProps,
  state: Readonly <PageState>
}
@connect(state => state.globalData, {...actions})
class SearchHistory extends Component {
  state: Readonly <PageState> = initialState
  // defaultProps 可以被定义为组件类的一个属性，用以为类设置默认的属性。这对于未定义（undefined）的属性来说有用，而对于设为空（null）的属性并没用。
  static defaultProps = {
    list: []
  }

  onChange (value) {
    this.setState({
      value: value
    })
  }

  async onClick ({name, active}: {name: string, active: boolean}) {
    let _checkValue = name
    try {
      await Utils.textRiskIdentification({content: _checkValue})
    } catch (err) {_checkValue = '玩具'}
    Taro.navigateTo({
      url: `/pages/goods-list/goods-list?title=超级搜索&q=${_checkValue}`
    })
  }

  clearHandle () {
    this.props.onClear && this.props.onClear()
  }
  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }
  render () {
    const {list} = this.props
    if (list.length === 0) {
      return (
        <View className='search-history--nomsg'>
          <AtIcon prefixClass='iconfont' value='meiyoushuju1' size='60' color='#969696'></AtIcon>
          <View><Text className='search-history--nomsg__tips'>更多大额优惠券等你来搜~</Text></View>
        </View>
      )
    }
    return (
      <View className='search-history'>
        <View className='search-history__hd'>
          <View className='search-history__hd__title'>
            <Text>历史搜索</Text>
          </View>
          <View className='search-history__hd__closebtn'>
            <AtIcon prefixClass='iconfont' value='delete' size='18' color='#666666' onClick={this.clearHandle}></AtIcon>
          </View>
        </View>
        <View className='search-history__list'>
        {
          list.map((item, index) => (
            <View className='search-history__list__tag' key={index}>
              <AtTag
                name={item}
                type='primary'
                circle 
                onClick={this.onClick.bind(this)}
              >
                {item}
              </AtTag>
            </View>
          ))
        }
        </View>
      </View>
    )
  }
}
export default SearchHistory as ComponentClass<IProps, PageState>
