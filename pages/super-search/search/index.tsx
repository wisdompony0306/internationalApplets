import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import SuperBridge from '@/superBridge'
import {API_GOODS_ADD_SEARCH_RECORD} from '@/constants/api'
import './index.scss'
import utils from '@/utils/utils';
const initialState = {
  value: '',
  isFocus: true
}
const initialProps = {
  onSearch: (value: string) => {}
}
type State = Readonly <typeof initialState>
type Props = Readonly <typeof initialProps>
// interface Search {
//   props: Props,
//   state: State
// }
class Search extends Component {
  readonly state: State = initialState
  readonly props: Props = initialProps
  // defaultProps 可以被定义为组件类的一个属性，用以为类设置默认的属性。这对于未定义（undefined）的属性来说有用，而对于设为空（null）的属性并没用。
  static defaultProps = {}
  onChange (value) {
    this.setState({
      value: value
    })
  }
  onActionClick () {
    const {value} = this.state
    if (!utils.trim(value)) {
      SuperBridge.toast({title: '请输入查询内容哦~'})
      return
    }
    SuperBridge.post({
      url: API_GOODS_ADD_SEARCH_RECORD,
      data: {
        q: value,
        searchType: 1
      },
      _options: {
        showError: false
      }
    })
    this.props.onSearch(value)
  }
  componentDidShow () {
    this.setState({
      isFocus: true
    })
  }
  render () {
    const {value, isFocus} = this.state
    return (
      <View className='search__search'>
        {/* 搜索栏 */}
        <AtSearchBar
          actionName='搜好券'
          value={value}
          onChange={this.onChange.bind(this)}
          onActionClick={this.onActionClick}
          focus={isFocus}
          onConfirm={this.onActionClick}
        />
      </View>
    )
  }
}
export default Search as ComponentClass<Props, State>
