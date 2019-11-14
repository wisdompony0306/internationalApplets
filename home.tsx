import {
  // 获取好券直播商品列表
  GET_GOODS_COUPON_LIVE,
  // 聚划算拼团
  GET_GOODS_PIN_LIST
} from '@/constants/home'

const INITIAL_STATE = {
  // 好券直播
  gclList: [],
  // 聚划算拼团
  pinList: []
}
export default function home (state = INITIAL_STATE, action) {
  switch (action.type) {
    // 获取好券直播商品列表
    case GET_GOODS_COUPON_LIVE:
      return get_goods_coupon_live(state, action)
    // 聚划算拼团
    case GET_GOODS_PIN_LIST:
      return get_goods_pin_list(state,action)
    default:
      return state
  }
}

// 获取 好券直播 商品列表
const get_goods_coupon_live = (state, action) => {
  const {list, pageNo} = action.payload
  if (pageNo === 1) return {
    ...state,
    gclList: list
  }
  return {
    ...state,
    gclList: state.gclList.concat(list)
  }
}
// 获取 聚划算拼团 商品列表
const get_goods_pin_list = (state, action) => {
  const {list} = action.payload
  let _list:object[][] = []
  let _supList:object[] = []
  list.map((item, index) => {
    _supList.push(item)
    if ((index + 1) % 3 === 0) {
      _list.push(_supList)
      _supList = []
    }
  })
  return {
    ...state,
    pinList: _list
  }
}