import {
  // 聚划算拼团
  GET_GOODS_PIN_LIST,
  // 获取好券直播商品列表
  GET_GOODS_COUPON_LIVE,
} from '@/constants/home'
import { createAction } from '@/utils/redux'
import {API_DG_OPTIMUS_MATERIAL} from '@/constants/api'

// 聚划算拼团
export const dispatchPin = () => {
  const payload = {
    'adzoneId': 100356400077,
    'materialId': 4071,
    'pageNo': 1,
    'pageSize': 12
  }
  return createAction({
    url: API_DG_OPTIMUS_MATERIAL,
    type: GET_GOODS_PIN_LIST,
    method: 'post',
    payload
  })
}

// 获取好券直播商品列表
export const dispatchGclList = (payload: goodsListReq) => {
  return createAction({
    url: API_DG_OPTIMUS_MATERIAL,
    type: GET_GOODS_COUPON_LIVE,
    method: 'post',
    payload: {
      adzoneId: 100356400077,
      materialId: 4071,
      pageNo: 1,
      pageSize: 12,
      ...payload
    }
  })
}