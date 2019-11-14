import { ComponentClass } from "react"
import { connect } from '@tarojs/redux'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, ScrollView, Canvas } from '@tarojs/components'
import { Loading } from '@/components'
import Utils from '@/utils/utils'
import { getWindowHeight } from '@/utils/style'
import {addGoodsClickRecord} from './api'
import {dispatchGoodsGetInfo, dispatchUpdateGoodsInfo, dispatchGoodsConvert, dispatchGoodsTpwdCreate} from '@/actions/goods-detail'
import Gallery from './gallery'
import Info from './info'
import Coupon from './coupon'
// import Seller from './seller'
import PhotoDesc from './photo-desc'
import Footer from './footer'
import './goods-detail.scss'
import withLogin from '@/decorator/withLogin'
import withParams from '@/decorator/withParams'
import SuperBridge from "@/utils/super-bridge";

type PageStateProps = {
  detail: Goods,
  userInfo: any,
  shareTkUserId: any
}

type PageDispatchProps = {
  dispatchGoodsGetInfo: ({goodsId: number}) => any
  dispatchUpdateGoodsInfo: (goods: Goods) => any
  dispatchGoodsConvert: ({}: {goodsId: number, adzoneId?: number, platform?: number}) => any
  dispatchGoodsTpwdCreate: ({}: {url: string, logo?: string, text?: string, ext?: string}) => any
}

type PageOwnProps = {}

type PageState = {
  loaded: boolean,
  loading: boolean,
  goods?: Goods
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps
interface GoodsDetail {
  props: IProps,
  readonly state: Readonly<PageState>
}

@withLogin()
@(connect as any)(({goodsDetail, globalData}) => ({
  detail: goodsDetail.detail,
  userInfo: globalData.userInfo,
  shareTkUserId: globalData.shareTkUserId
}), {
  dispatchGoodsGetInfo,
  dispatchUpdateGoodsInfo,
  dispatchGoodsConvert,
  dispatchGoodsTpwdCreate
})
class GoodsDetail extends Component{
  config: Config = {
    navigationBarTitleText: '商品详情'
  }
  readonly state: Readonly<PageState> = {
    loaded: false,
    loading: false
  }
  async componentWillMount () {
    const {scene, ...goods} = this.$router.params
    let shareTkUserId = null
    let goodsId = null
    if (scene) {
      const params: any = Utils.stringToParams(scene)
      goodsId = params.gid
      shareTkUserId = params.suid
    } else {
      shareTkUserId = goods.shareTkUserId
      goodsId = goods.goodsId
    }
    if (!goodsId) {
      Taro.showModal({
        title: '提示',
        content: '抱歉~ 你所查看的商品可能已下架~',
        showCancel: false
      })
      .then(({confirm}) => {
        if (confirm) {
          Taro.switchTab({url: '/pages/home/home'})
        }
      })
      return
    }
    goodsId && await this.props.dispatchGoodsGetInfo({ goodsId })
    await this.props.dispatchUpdateGoodsInfo({...this.props.detail, ...goods})
    this.setState({ loaded: true })
    process.env.TARO_ENV === 'weapp' && goodsId && addGoodsClickRecord({goodsId: parseInt(goodsId), shareTkUserId, goodsType: 1})
  }

  // 领券
  async getCoupon () {
    const { detail } = this.props
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

  // 获取分享信息
  getShareMsg = (goods) => {
    const {userInfo} = this.props
    let shareMsg:any = {
      goodsId: goods.goodsId,
      couponAmount: goods.couponAmount || 0,
      url: goods.couponShareUrl || goods.clickUrl
    }
    if (goods.discountPrice) shareMsg.discountPrice = goods.discountPrice
    if (goods.originPrice) shareMsg.originPrice = goods.originPrice
    if (userInfo && userInfo.tkUserId) shareMsg.shareTkUserId = userInfo.tkUserId
    return shareMsg
  }

  onShareAppMessage () {
    const { detail } = this.props
    const shareMsg = this.getShareMsg(detail)
    return {
      title: `【${detail.goodsTitle}】仅需${detail.zkFinalPrice}元!`,
      path: `/pages/goods-detail/goods-detail${Utils.urlEncode(shareMsg)}`
    }
  }

  render () {
    const {detail} = this.props
    const {loaded} = this.state
    if (!loaded || !detail) return (<Loading />)
    const galleryList = [detail.goodsImageUrl, ...detail.goodsSmallImages]
    // const {seller} = detail.taobaoGoodsDetailView
    return (
      <View className='goods-detail' disable-scroll>
        <ScrollView
          scrollY
          className='goods-detail__wrap'
          style={{height: getWindowHeight(true)}}
        >
          {/* 商品大图 */}
          <Gallery list={galleryList}/>
          {/* 商品价格信息 */}
          <Info data={detail}/>
          {/* 商品优惠券信息 */}
          <Coupon data={detail} onClick={this.getCoupon}/>
          {/* 商铺信息 */}
          {/* {seller && <Seller data={seller}/>} */}
          {/* 商品图片 */}
          <PhotoDesc list={detail.goodsSmallImages}/>
        </ScrollView>
        {/* 底部工具栏 */}
        <Footer goods-detail-footer-class='goods-detail-footer'/>
        {/* 画布 用来绘制分享海报 */}
        <View className="canvas-box">
          <Canvas style='width:2400px;height:2800px;' canvasId='posterCanvas' />
        </View>
      </View>
    )
  }
}
export default GoodsDetail as ComponentClass