import { ComponentClass } from "react";
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as globalActions from '@/actions/global'
import * as actions from '@/actions/super-search'
import withLogin from "@/decorator/withLogin";

import { getWindowHeight } from '@/utils/style'
import {Loading} from '@/components'
import Utils from '@/utils/utils'
import SuperBridge from '@/superBridge'
import {tpwdConvert} from '@/utils/api'
import { API_GOODS_ADD_SEARCH_RECORD } from '@/constants/api'

import Search from './search'
import History from './history'
import Recommend from './recommend'
import './super-search.scss'


type PageStateProps = {
  searchHistory: string[],
  list: Goods[]
}

type PageDispatchProps = {
  dispatchAddSearchHistory: (val: string) => void,
  dispatchClearSearchHistory: () => void,
  dispatchGetRecommendGoodsList: (any) => any
} 

type PageOwnProps = {}

const initialState = {loaded: false, loading: false, searchHistory: [], recommendList: []}
type PageState = typeof initialState

type IProps = PageStateProps & PageDispatchProps & PageOwnProps
interface SuperSearch {
  props: IProps,
  state: Readonly <PageState>
}
@withLogin()
@connect(state => Object.assign({}, state.globalData, state.superSearch), {...globalActions, ...actions})
class SuperSearch extends Component{
  state: Readonly <PageState> = initialState
  config: Config = {
    navigationBarTitleText: '超级搜',
    enablePullDownRefresh: true
  }

  async componentWillMount () {
    const { searchHistory } = this.props
    this.setState({searchHistory: [...searchHistory]})
    const q = ((Object.prototype.toString.call(searchHistory) === '[object Array]') && searchHistory.length !== 0) ? searchHistory[0] : '女装';
    await this.props.dispatchGetRecommendGoodsList({q})
    this.setState({loaded: true})
  }
  // TODO 尽量不要在这一层调用setState
  componentDidMount () {}
  async componentDidShow () {
    const data = await SuperBridge.getClipboardData()
    console.log(data)
    let searchData = Utils.getKeyWord(data.data)
    console.log(searchData)
    if (searchData.tpword !== null){
      const res = await tpwdConvert({passwordContent: searchData.tpword, getGoodsInfo: true})
      searchData.keyword = res.goodsTitle
    }
  
    searchData.keyword !== null && Taro.showModal({
      title: `智能搜索优惠券`,
      content: `你是否搜索以下产品: ${searchData.keyword}`,
      confirmText: '去搜索'
    }).then(({confirm}) => {
      SuperBridge.setClipboardData({data: '', showToast: false})
      if (confirm) {
        SuperBridge.post({
          url: API_GOODS_ADD_SEARCH_RECORD,
           data: {q: searchData.keyword, searchType: 2},
          _options: {
            showError: false
          }
        })
        Taro.navigateTo({
          url: `/pages/goods-list/goods-list?title=超级搜索&q=${searchData.keyword}`
        })
      }
    })
  }
  componentWillReceiveProps(nextProps) {}
  loadRecommend () {}
  async onPullDownRefresh() {
    const { searchHistory } = this.props
    const q = ((Object.prototype.toString.call(searchHistory) === '[object Array]') && searchHistory.length !== 0) ? searchHistory[0] : '女装';
    await this.props.dispatchGetRecommendGoodsList({q})
    Taro.stopPullDownRefresh()
  }
  // 搜索
  async onSearch(value) {
    let _checkValue = value
    try {
      await Utils.textRiskIdentification({content: _checkValue})
      this.props.dispatchAddSearchHistory(_checkValue)
      this.setState({searchHistory: this.props.searchHistory})
    } catch (err) { _checkValue = '玩具' }
    Taro.navigateTo({
      url: `/pages/goods-list/goods-list?title=超级搜索&q=${_checkValue}`
    })
  }
  // 清空历史记录
  clearSearchHistory() {
    this.setState({searchHistory: []})
    this.props.dispatchClearSearchHistory()
  }

  onShareAppMessage (object) {
    return {
      title: '省钱购物优惠券助手，助你省钱的小程序',
      path: '/pages/home/home'
    }
  }

  render () {
    if (!this.state.loaded) {
      return <Loading />
    }
    return (
      <View className='search'>
        {/* 搜索栏 */}
        <Search onSearch={this.onSearch}/>
        <ScrollView
          scrollY
          className='search__wrap'
          onScrollToLower={this.loadRecommend}
          style={{ height: getWindowHeight(true) }}
        >
          {/* 历史记录 */}
          <History list={this.props.searchHistory} onClear={this.clearSearchHistory}/>
          {/* 好物推荐 */}
          <Recommend type={'coupon'} list={this.props.list}/>
        </ScrollView>
      </View>
    )
  }
}

export default SuperSearch as ComponentClass