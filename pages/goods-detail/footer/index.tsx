import { ComponentClass } from "react"
import { connect } from '@tarojs/redux'
import classNames from 'classnames'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Canvas, Swiper, SwiperItem, Image, Button } from '@tarojs/components'
import {AtButton, AtCurtain, AtActionSheet, AtActionSheetItem} from 'taro-ui'
import './index.scss'
import SuperBridge from "@/utils/super-bridge";
import {dispatchGoodsConvert, dispatchGoodsTpwdCreate} from '@/actions/goods-detail'

const defaultProps = {
  dispatchGoodsConvert: () => {},
  dispatchGoodsTpwdCreate: () => {}
}
const initialState = { isIphoneX: false, isOpenedShare: false, sharePath: null, shareActionSheeet: false }
type IProps = {
  detail?: Goods
  userInfo?: any
  dispatchGoodsConvert?: ({}: {goodsId: number, adzoneId?: number, platform?: number}) => any
  dispatchGoodsTpwdCreate?: ({}: {url: string, logo?: string, text?: string, ext?: string}) => any
}
type IState = Readonly <typeof initialState>

@(connect as any)(({goodsDetail, globalData}) => ({
  detail: goodsDetail.detail,
  userInfo: globalData.userInfo,
  shareTkUserId: globalData.shareTkUserId
}), {
  dispatchGoodsConvert,
  dispatchGoodsTpwdCreate
})
class Gallery extends Component {
  static options = {
    addGlobalClass: true
  }
  readonly props: Readonly<IProps> = defaultProps
  readonly state: IState = initialState
  static defaultProps = defaultProps
  // 利用 externalClasses 定义段定义若干个外部样式类 这个特性从小程序基础库版本 1.9.90 开始支持
  static externalClasses = ['goods-detail-footer-class']
  async componentWillMount() {
    const systemInfo = await Taro.getSystemInfoSync()
    if (systemInfo.model.includes('iPhone X')) {
      this.setState({isIphoneX: true})
    }
  }
  async getGoodsUrlWord () {
    const { detail } = this.props
    if (!detail) return
    let goodsUrlWord = detail.goodsUrlWord || null
    if (!goodsUrlWord) {
      const tbkUrl = detail.url || detail.couponShareUrl || detail.clickUrl
      if (tbkUrl) {
        const url = `${tbkUrl}${escape('&pid=100356400077')}`
        goodsUrlWord = await this.props.dispatchGoodsTpwdCreate({ url, text: detail.goodsTitle, logo: detail.goodsImageUrl })
      } else {
        const clickUrl = await this.props.dispatchGoodsConvert({ goodsId: detail.goodsId })
        const url = `${clickUrl}${escape('&pid=100356400077')}`
        goodsUrlWord = await this.props.dispatchGoodsTpwdCreate({ url, text: detail.goodsTitle, logo: detail.goodsImageUrl })
      }
    }
    return goodsUrlWord;
  }
  // 自购省
  async clickCouponHandle () {
    const { detail } = this.props
    if (!detail) return
    const goodsUrlWord = await this.getGoodsUrlWord()
    const _couponAmount = detail.couponAmountString || detail.couponAmount || 0
    const discountPrice = parseFloat(_couponAmount + '') ? Math.round((parseFloat(detail.zkFinalPrice) - parseFloat(_couponAmount + ''))* 100) / 100 : detail.zkFinalPrice
    const originPrice = parseFloat(_couponAmount + '') ? detail.zkFinalPrice : detail.reservePrice
    await SuperBridge.setClipboardData({ 
      data: [
        `${detail.goodsTitle}`,
        `【在售价】${originPrice}元`,
        `【券后价】${discountPrice}元`,
        `-----------------`,
        `复制这条信息，${goodsUrlWord}，到【手机淘宝】即可查看`
      ].join('\n'),
      showToast: false
    })
    Taro.showModal({
      title: '提示',
      content: '淘口令已复制，快去打开淘宝查看吧！',
      showCancel: false
    })
  }
  // 分享赚
  async clickShareHandle () {
    const {detail: goods, userInfo} = this.props
    const {sharePath} = this.state
    this.setState({isOpenedShare: true})
    !sharePath && SuperBridge.showLoading({title: '生成海报中...', mask: true})
    const result = await SuperBridge.getGoodsPoster({
      userInfo,
      goods,
      canvasId: 'posterCanvas'
    })
    this.setState({sharePath: result.tempFilePath})
    SuperBridge.hideLoading()
  }
  previewImage (path) {
    wx.previewImage({
      urls: [path]
    })
  }
  render () {
    const { } = this.props
    const { isIphoneX, isOpenedShare, sharePath, shareActionSheeet } = this.state
    return (
      <View className={classNames('goods-detail-footer-class goods-detail-footer', isIphoneX && 'goods-detail-footer--iphonex')} disable-scroll>
        {/* 左侧按钮 */}
        <View className='goods-detail-footer__left'>
          {/* 主页 */}
          <View className='goods-detail-footer__left-item goods-detail-footer__left-item--home'>
            <AtButton onClick={() => {Taro.switchTab({url: '/pages/home/home'})}}>
              <View className='goods-detail-footer__left-item-btn'>
                <View className='iconfont iconfont-home'></View>
                <Text className='text'>首页</Text>
              </View>
            </AtButton>
          </View>
        </View>
        {/* 右侧按钮 */}
        <View className='goods-detail-footer__right'>
          {/* 分享赚 */}
          <View className='goods-detail-footer__right-item goods-detail-footer__right-item--share'>
            <AtButton onClick={() => {this.setState({shareActionSheeet: true})}}>
              <View className='goods-detail-footer__right-item-btn'>
                <View className='iconfont iconfont-fenxiang'></View>
                <Text className='text'>分享赚</Text>
              </View>
            </AtButton>
          </View>
          {/* 自购返 */}
          <View className='goods-detail-footer__right-item goods-detail-footer__right-item--buyself'>
            <AtButton onClick={this.clickCouponHandle}>
              <View className='goods-detail-footer__right-item-btn'>
                <View className='iconfont iconfont-fanli'></View>
                <Text className='text'>自购省</Text>
              </View>
            </AtButton>
          </View>
        </View>

        {/* 分享海报 */}
        <AtCurtain
          className='goods-detail-footer__share-modal'
          isOpened={isOpenedShare}
          onClose={() => {this.setState({isOpenedShare: false})}}
        >
          <View className='goods-detail-footer__share-modal__wrap' onClick={this.previewImage.bind(this, sharePath)}>
            <View className='goods-detail-footer__share-modal__wrap-img'>{sharePath && <Image className='img' src={sharePath}/>}</View>
          </View>
        </AtCurtain>

        <AtActionSheet isOpened={shareActionSheeet} cancelText='取消' title='分享赚佣金,自购更省钱' onCancel={() => {this.setState({shareActionSheeet: false})}}>
          <AtActionSheetItem>
          < AtButton full onClick={this.clickShareHandle}>海报分享</AtButton>
          </AtActionSheetItem>
          <AtActionSheetItem>
            <AtButton full openType={'share'}>小程序分享</AtButton>
          </AtActionSheetItem>
        </AtActionSheet>

      </View>
    )
  }
}
export default Gallery as ComponentClass<IProps, IState>
