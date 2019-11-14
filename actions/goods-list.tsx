import {
  // 商品搜索 - 超级搜索(通用物料搜索API（导购）)
  SEARCH_GOODS_LIST
} from '@/constants/goods-list'
import { createAction } from '@/utils/redux'
import {API_DG_OPTIMUS_MATERIAL, API_DG_MATERIAL_OPTIONAL} from '@/constants/api'

// 商品搜索 - 超级搜索(通用物料搜索API（导购）)
export const dispatchSearchGoodsList = (payload: goodsListReq) => {
  // {q = '', adzoneId = 100356400077, materialId = 6707, pageNo = 1, pageSize = 20, hasCoupon = false}
  if (!payload.q) payload.q = ''
  if (!payload.adzoneId) payload.adzoneId = 100356400077
  if (!payload.materialId) payload.materialId = 6707
  if (!payload.pageNo) payload.pageNo = 1
  if (!payload.pageSize) payload.pageSize = 20
  if (!payload.sort) payload.sort = 'tk_total_sales_des'
  return createAction({
    url: payload.q ? API_DG_MATERIAL_OPTIONAL : API_DG_OPTIMUS_MATERIAL,
    type: SEARCH_GOODS_LIST,
    method: 'post',
    payload
  })
}
