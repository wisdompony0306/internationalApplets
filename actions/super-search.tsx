import {
  // 获取 好物推荐 - 商品列表
  GET_RECOMMEND_GOODS_LIST
} from '@/constants/super-search'
import { createAction } from '@/utils/redux'
import {API_TBK_GOODS_GET_COUPON} from '@/constants/api'


// 获取 好物推荐 - 商品列表
export const dispatchGetRecommendGoodsList = (payload: goodsListReq) => {
  if (!payload.q) payload.q = ''
  if (!payload.adzoneId) payload.adzoneId = 100356400077
  if (!payload.materialId) payload.materialId = 6707
  if (!payload.pageNo) payload.pageNo = 1
  if (!payload.pageSize) payload.pageSize = 20
  if (!payload.sort) payload.sort = 'tk_total_sales_des'
  return createAction({
    url: API_TBK_GOODS_GET_COUPON,
    type: GET_RECOMMEND_GOODS_LIST,
    method: 'post',
    payload
  })
}
