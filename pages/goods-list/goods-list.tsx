import { ComponentClass } from 'react'
import { connect } from '@tarojs/redux'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { AtButton, AtIcon } from 'taro-ui'
import { Tag, Loading, GoodsList } from '@/components'
import { getWindowHeight } from '@/utils/style'
import * as actions from '@/actions/goods-list'
import classNames from 'classnames'
import './goods-list.scss'
import SortTool from './sort-tool'
import SubMaterialTool from './sub-material-tool'
import withShare from '@/decorator/withShare'
import withLogin from '@/decorator/withLogin';

type PageStateProps = {
  goodsList: {
    list: Goods[][]
  },
  list: any,
  searchQList: Goods[]
}

type PageDispatchProps = {
  dispatchSearchGoodsList: ({}:goodsListReq) => any
}

type PageOwnProps = {}

type PageState = {
  loaded: boolean,
  loading: boolean,
  pageNo: number,
  pageSize: number,
  hasMore: boolean,
  // 物料推荐栏目分类
  materialType: string,
  q: string,
  materialId?: number,
  title: string,
  sortData?: goodsListReq,
  scrollTop: any,
  // 商品展示类型
  goodsItemType?: string,
  isShowGoBack: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface GoodsListPage {
  props: IProps;
  state: PageState
}
@withLogin()
@connect(state => state.goodsList, {...actions})
class GoodsListPage extends Component{
  config: Config = {
    navigationBarTitleText: '超级搜索',
    navigationBarBackgroundColor: '#ea4940',
    navigationBarTextStyle: 'white',
    // navigationStyle: 'custom'
  }
  
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      loading: false,
      pageNo: 1,
      pageSize: 20,
      hasMore: true,
      q: '',
      materialId: 2836,
      title: '淘好券',
      scrollTop: null,
      materialType: '',
      goodsItemType: 'card',
      isShowGoBack: false
    }
    const {title, q, materialId, materialType, goodsItemType} = this.$router.params
    this.setState({
      materialType,
      title,
      q,
      materialId: parseFloat(materialId),
      goodsItemType: goodsItemType || this.state.goodsItemType
    })
  }

  componentWillMount() {
    const {title} = this.state
    Taro.setNavigationBarTitle({title: title})
    this.loadGdoosList({isStart: true})
  }
  componentDidMount () {}
  componentWillReceiveProps (nextProps) {}
  // scrollerView 滚动监听
  scrollHandle(e) {
    const { isShowGoBack} = this.state
    const { scrollTop } = e.detail
    const windowHeight = Taro.getSystemInfoSync().windowHeight
    if (scrollTop > windowHeight) !isShowGoBack && this.setState({isShowGoBack: true})
    else isShowGoBack && this.setState({isShowGoBack: false})
  }
  // 返回顶部
  goBackHandle () {
    this.setState({scrollTop: 0}, () => {this.setState({scrollTop: null})})
  }
  // 获取筛选商品列表
  reLoadGoodsList(sortData) {
    this.setState({sortData, scrollTop: 0}, () => {
      this.loadGdoosList({isStart: true})
    })
  }
  // 获取商品列表
  loadGdoosList ({isStart}: {isStart: boolean, sortData?: goodsListReq}) {
    const {hasMore, loading} = this.state
    if (!hasMore || loading) return
    isStart && Taro.showLoading({title: '加载中...'})
    this.setState({
      pageNo: isStart ? 1 : this.state.pageNo + 1,
      loading: true
    }, () => {
      const {q, materialId, pageNo, pageSize, sortData} = this.state
      let payload: goodsListReq = materialId ? {pageNo, pageSize, materialId} : {pageNo, pageSize}
      if (q) payload.q = q;
      payload = {...payload, ...sortData}
      this.props.dispatchSearchGoodsList(payload).then(res => {
        this.setState({ loaded: true, loading: false, scrollTop: null})
        if (res.list.length === 0 && pageNo !== 1) this.setState({ hasMore: false })
        isStart && Taro.hideLoading()
      }).catch(() => {
        this.setState({ loading: false, scrollTop: null })
        isStart && Taro.hideLoading()
      })
    })
  }
  // 跳转到商品详情页
  handleClick = (goods) => {
    let url = `/pages/goods-detail/goods-detail?goodsId=${goods.goodsId}`
    if (goods.clickUrl) url = `${url}&clickUrl=${encodeURIComponent(goods.clickUrl)}`
    if (goods.couponShareUrl) url = `${url}&couponShareUrl=${encodeURIComponent(goods.couponShareUrl)}`
    Taro.navigateTo({url})
  }
  // 上拉加载
  loadRecommend = () => {this.loadGdoosList({isStart: false})}
  // 分享
  onShareAppMessage (object) {
    const {q, materialId, title} = this.state
    let urlQuery = ''
    if (q) urlQuery = `q=${q}`
    else urlQuery = `materialId=${materialId}`
    
    return {
      title: '省钱购物优惠券助手，助你省钱的小程序',
      path: `/pages/goods-list/goods-list?title=${title}&${urlQuery}`
    }
  }

  render() {
    const { list } = this.props
    const {q, loading, scrollTop, materialId, materialType, goodsItemType, isShowGoBack} = this.state
    const showSortTool = !!q
    const showSubMaterialTool = !q && materialType
    if (!this.state.loaded) {
      return <Loading />
    }
    return (
      <View className='goods-list'>
        {/* 筛选工具栏 - 超级搜索(物料搜索api)*/}
        {showSortTool && <SortTool sort-tool-class='goods-list__sort-tool' onChange={this.reLoadGoodsList}/>}
        {/* 筛选工具 - 物料推荐api */}
        {showSubMaterialTool && <SubMaterialTool sub-material-tool-class='goods-list__sub-material-tool' onChange={this.reLoadGoodsList} materialType={materialType} materialId={materialId}/>}
        {/* 商品列表 */}
        <ScrollView
          scrollY
          className={classNames('goods-list__wrap', showSortTool && 'goods-list__wrap--sort-tool', showSubMaterialTool && 'goods-list__wrap--sub-material-tool')}
          lowerThreshold={200}
          scrollTop={scrollTop}
          onScrollToLower={this.loadRecommend}
          onScroll={this.scrollHandle}
          style={{ height: getWindowHeight(true) }}
          enableBackToTop
          scrollWithAnimation
          scroll-animation-duration={200}
        >
          <View className='goods-list__wrap__list'>
            <GoodsList type={goodsItemType} list={list}></GoodsList>
          </View>
          {loading && <Loading />}
        </ScrollView>
        {isShowGoBack && <AtButton className='go-back' onClick={this.goBackHandle}><AtIcon prefixClass='iconfont' value='huojian' size='24px' color='#999999' /></AtButton>}
      </View>
    )
  }
}
export default GoodsListPage as ComponentClass<IProps, PageState>
