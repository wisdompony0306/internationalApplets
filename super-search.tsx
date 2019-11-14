import { 
  GET_RECOMMEND_GOODS_LIST
} from '@/constants/super-search'

const INITIAL_STATE = {
  // 好物推荐 - 商品列表
  list: []
}
export default function goodsList (state = INITIAL_STATE, action) {
  switch (action.type) {
    // 好物推荐 - 商品列表
    case GET_RECOMMEND_GOODS_LIST:
      return get_recommend_goods_list(state, action)
    default:
      return state
  }
}
// 获取 好物推荐 - 商品列表
const get_recommend_goods_list = (state, action) => {
  const {list, pageNo} = action.payload
  if (pageNo === 1) return {
    ...state,
    list
  }
  return {
    ...state,
    list: state.list.concat(list)
  }
}

