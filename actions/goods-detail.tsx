import {
  TBK_GOODS_GETINFO,
  TBK_GOODS_CONVERT,
  TBK_GOODS_TPWD_CREATE,
  TBK_GOODS_UPDATE_INFO
} from '@/constants/goods-detail'
import { createAction } from '@/utils/redux'
import {API_TBK_GOODS_GETINFO, API_TBK_GOODS_CONVERT, API_TBK_GOODS_TKWD_CREATE} from '@/constants/api'


export const dispatchGoodsGetInfo = ({goodsId, platform = 2}: {goodsId: number, platform: number}) => {
  return createAction({
    url: API_TBK_GOODS_GETINFO,
    type: TBK_GOODS_GETINFO,
    method: 'post',
    payload: {
      goodsIds: goodsId + '',
      platform
    }
  })
}

export const dispatchGoodsConvert = ({goodsId, adzoneId = 100356400077, platform = 1}: {goodsId: number, adzoneId: number, platform: number}) => {
  return createAction({
    url: API_TBK_GOODS_CONVERT,
    type: TBK_GOODS_CONVERT,
    method: 'post',
    payload: {
      goodsId: goodsId + '',
      adzoneId,
      platform
    }
  })
}

export const dispatchGoodsTpwdCreate = ({url, logo, text, ext}: {url: string, logo: string, text: string, ext: string}) => {
  return createAction({
    url: API_TBK_GOODS_TKWD_CREATE,
    type: TBK_GOODS_TPWD_CREATE,
    method: 'post',
    payload: {
      url,
      logo,
      text,
      ext
    }
  })
}
export const dispatchUpdateGoodsInfo = (payload) => {
  return {
    type: TBK_GOODS_UPDATE_INFO,
    payload
  }
}
