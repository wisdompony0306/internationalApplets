import { 
  TBK_GOODS_GETINFO,
  TBK_GOODS_CONVERT,
  TBK_GOODS_TPWD_CREATE,
  TBK_GOODS_UPDATE_INFO
} from '@/constants/goods-detail'

const INITIAL_STATE = {
  detail: {}
}
export default function goodsDetail (state = INITIAL_STATE, action) {
  switch (action.type) {
    // 淘宝客获取商品详情(简洁版)
    case TBK_GOODS_GETINFO:
      return tbkGoodsGetInfo(state, action)
    // 淘宝客商品链接转换
    case TBK_GOODS_CONVERT:
      return tbkGoodsConver(state, action)
    // 淘宝客淘口令
    case TBK_GOODS_TPWD_CREATE:
      return tbkGoodsTpwdCreate(state, action)
    case TBK_GOODS_UPDATE_INFO:
      return {
        ...state,
        detail: {...state.detail, ...action.payload}
      }
     default:
       return state
  }
}

const tbkGoodsGetInfo = (state, action) => {
  return {
    ...state,
    detail: action.payload
  }
}


const tbkGoodsConver = (state, action) => {
  return {
    ...state,
    detail: {...state.detail, goodsClickUrl: action.payload}
  }
}

const tbkGoodsTpwdCreate = (state, action) => { 
  return {
    ...state,
    detail: {...state.detail, goodsUrlWord: action.payload}
  }
}