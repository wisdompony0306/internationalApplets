import { ComponentClass } from 'react'
import { connect } from '@tarojs/redux'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {AtDrawer, AtTag, AtRadio, AtButton} from 'taro-ui'
import classNames from 'classnames'
import './index.scss'

type PageOwnProps = {
  list?: Goods[],
  onChange: (obj:any) => void
}
type PageState = {
  showSortModal: boolean,
  showFilterModal: boolean,
  sortItems: any,
  hasCoupon: boolean,
  shopFilterTagList: any[],
  shopTypeTagList: any[]
}
@connect(state => state.goodsList)
class SwiperBanner extends Component {
  static options = {
    addGlobalClass: true
  }
  readonly props: Readonly<PageOwnProps> = {
    list: [],
    onChange: () => {}
  }
  readonly state: Readonly<PageState> = {
    showSortModal: false,
    showFilterModal: false,
    hasCoupon: false,
    sortItems: {
      value: 0,
      items: [
        { label: '人气排序', value: 0, sortVlaue: 'tk_total_sales_des' },
        { label: '价格由高到低', value: 1, sortVlaue: 'price_des' },
        { label: '价格由低到高', value: 2, sortVlaue: 'price_asc' },
        { label: '销量优先', value: 3, sortVlaue: 'total_sales_des' }
      ]
    },
    shopFilterTagList: [
      {
        name: '免运费',
        value: 'needFreeShipment',
        active: false
      },
      {
        name: '天猫商品',
        value: 'tmall',
        active: false
      },
      {
        name: '海外商品',
        value: 'overseas',
        active: false
      },
      {
        name: '消费者保障',
        value: 'needPrepay',
        active: false
      }
    ],
    shopTypeTagList: []
  }
  // defaultProps 可以被定义为组件类的一个属性，用以为类设置默认的属性。这对于未定义（undefined）的属性来说有用，而对于设为空（null）的属性并没用。
  static defaultProps = {
    list: [],
    onChange: () => {}
  }
  // 利用 externalClasses 定义段定义若干个外部样式类 这个特性从小程序基础库版本 1.9.90 开始支持
  static externalClasses = ['sort-tool-class']

  componentWillMount () {
    const {list} = this.props
    let shopTypeTagList:any[] = []
    let valueObj:any = {}
    list && list.map((item) => {
      if (shopTypeTagList.length < 15) {
        if (item.categoryName && !valueObj[item.categoryName]) {
          shopTypeTagList.push({ name: item.categoryName, cat: item.categoryId,active: false})
          valueObj[item.categoryName] = 1
        }
        if (item.levelOneCategoryName && !valueObj[item.levelOneCategoryName]) {
          shopTypeTagList.push({ name: item.levelOneCategoryName, cat: item.levelOneCategoryId, active: false})
          valueObj[item.levelOneCategoryName] = 1
        }
      }
    })
    this.setState({shopTypeTagList})
  }
  // 获取筛选排序对象
  getSortFilter = () => {
    const {hasCoupon, sortItems, shopFilterTagList, shopTypeTagList} = this.state
    let sortObj:goodsListReq = {
      hasCoupon,
      sort: sortItems.items[sortItems.value].sortVlaue,
    }
    shopFilterTagList.forEach((item) => {
      if (item.active) sortObj[item.value] = true
    })
    const findIndex = shopTypeTagList.findIndex((item) => item.active)
    if (findIndex !== -1) sortObj.cat = shopTypeTagList[findIndex].cat
    return sortObj
  }
  // 选择排序项
  handleSortChange = (value) => {
    const {sortItems} = this.state
    sortItems.value = value
    this.setState({sortItems, showSortModal: false}, () => {this.props.onChange(this.getSortFilter())})
  }
  // 选择优惠券
  handleCouponClick = () => {
    this.setState({hasCoupon: !this.state.hasCoupon, showSortModal: false}, () => {
      this.props.onChange(this.getSortFilter())
    })
  }
  // 筛选 - 确定
  handleFilterSubmitClick = () => {
    this.setState({showFilterModal: false})
    this.props.onChange(this.getSortFilter())
  }
  // 筛选 - 重置
  handleFilterResetClick = () => {
    let { shopTypeTagList, shopFilterTagList } = this.state
    shopTypeTagList = shopTypeTagList.map((item) => Object.assign({}, item, {active: false}))
    shopFilterTagList = shopFilterTagList.map((item) => Object.assign({}, item, {active: false}))
    this.setState({ shopTypeTagList, shopFilterTagList })
  }
  // 筛选
  handleFilterClick = () => {
    this.setState({
      showSortModal: false,
      showFilterModal: !this.state.showFilterModal
    })
  }
  // 选择商品服务 (多选)
  handleShopFilterItemClick (data) {
    const { shopFilterTagList } = this.state
    const findIndex = shopFilterTagList.findIndex(item => item.name === data.name)
    shopFilterTagList[findIndex].active = !shopFilterTagList[findIndex].active
    this.setState({ shopFilterTagList })
  }
  // 商品类目
  handleShopTypeItemClick (data) {
    let { shopTypeTagList } = this.state
    const findIndex = shopTypeTagList.findIndex(item => item.name === data.name)
    const _active = !shopTypeTagList[findIndex].active
    shopTypeTagList = shopTypeTagList.map((item) => Object.assign({...item, active: false}))
    shopTypeTagList[findIndex].active = _active
    this.setState({ shopTypeTagList })
  }

  render () {
    const {showSortModal, showFilterModal, sortItems, hasCoupon, shopTypeTagList} = this.state
    return (
      <View className='sort-tool-class sort-tool'>
        {/* 筛选栏 */}
        <View className='sort-tool__wrap'>
          <View className='sort-tool__wrap__left' onClick={() => {this.setState({showSortModal: !showSortModal})}}>
            <Text>人气排序</Text>
            <View className='sort-tool__wrap__left__icon iconfont iconfont-triangledownfill'></View>
            {/* <AtIcon prefixClass='iconfont' value='triangledownfill' size='10' color='#ff5400'></AtIcon> */}
          </View>
          <View className='sort-tool__wrap__right'>
            <View className='sort-tool__wrap__right__item sort-tool__wrap__right__item--first-child' onClick={this.handleCouponClick}>
              <View className={classNames('sort-tool__wrap__right__item__icon', 'iconfont', hasCoupon ? 'iconfont-squarecheckfill' : 'iconfont-squarecheck' )}></View>
              <Text>优惠券</Text>
            </View>
            {/* <View className='sort-tool__wrap__right__item'>
              <View className='sort-tool__wrap__right__item__icon iconfont iconfont-squarecheck'></View>
              <Text>超级返</Text>
            </View> */}
            <View className='sort-tool__wrap__right__item sort-tool__wrap__right__item--last-child' onClick={this.handleFilterClick}>
              <Text>筛选</Text>
              <View className='sort-tool__wrap__right__item__icon iconfont iconfont-filter'></View>
              <View className='sort-tool__wrap__right__item__col-line'></View>
            </View>
          </View>
        </View>

        {/* 人气排序 modal */}
        <View className={classNames('sort-tool__sort', showSortModal && 'sort-tool__sort--active')} onTouchMove={(e) => {e.stopPropagation()}}>
          <View className='sort-tool__sort__mask' onClick={() => {this.setState({showSortModal: !showSortModal})}}></View>
          <View className='sort-tool__sort__wrap'>
            <AtRadio
              options={sortItems.items}
              value={sortItems.value}
              onClick={this.handleSortChange.bind(this)}
            ></AtRadio>
          </View>
        </View>
        
        {/* 筛选 */}
        <AtDrawer
          className='sort-tool__filter'
          show={showFilterModal}
          width={Taro.pxTransform(550)}
          mask
          right
          onClose={() => {this.setState({showFilterModal: false})}}
        >
          <View className='sort-tool__filter__wrap'>
            <View className='sort-tool__filter__wrap__hd'><Text>筛选商品</Text></View>
            <View className='sort-tool__filter__wrap__bd'>
              {/* 价格区间 */}
              <View className='sort-tool__filter__wrap__bd__price-range'>

              </View>
              {/* 商家服务 */}
              <View className='sort-tool__filter__wrap__bd__item-title'><Text>商家服务</Text></View>
              <View className='sort-tool__filter__wrap__bd__shop-filter'>
                {this.state.shopFilterTagList.map((item, index) => (
                  <View className='sort-tool__filter__wrap__bd__shop-filter__item' key={index}>
                    <AtTag
                      type='primary'
                      size={'normal'}
                      name={item.name}
                      active={item.active}
                      onClick={this.handleShopFilterItemClick.bind(this)}
                    >{item.name}</AtTag>
                  </View>
                ))}
              </View>
              
              {/* 商品类目 */}
              {shopTypeTagList && <View className='sort-tool__filter__wrap__bd__item-title'><Text>商品类目</Text></View>}
              {shopTypeTagList && 
                <View className='sort-tool__filter__wrap__bd__shop-filter'>
                  {shopTypeTagList.map((item, index) => (
                    <View className='sort-tool__filter__wrap__bd__shop-filter__item' key={index}>
                      <AtTag
                        type='primary'
                        size={'normal'}
                        name={item.name}
                        active={item.active}
                        onClick={this.handleShopTypeItemClick.bind(this)}
                      >{item.name}</AtTag>
                    </View>
                  ))}
                </View>
              }
            </View>
            <View className='sort-tool__filter__wrap__ft'>
              <View className='sort-tool__filter__wrap__ft__btn'>
                <AtButton type='secondary' formType='reset' onClick={this.handleFilterResetClick}>重置</AtButton>
              </View>
              <View className='sort-tool__filter__wrap__ft__btn'>
                <AtButton type='primary' formType='submit' onClick={this.handleFilterSubmitClick}>确定</AtButton>
              </View>
            </View>
          </View>
          
        </AtDrawer>
      </View>
    )
  }
}
export default SwiperBanner as ComponentClass<PageOwnProps, PageState>
