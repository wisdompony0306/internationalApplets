import { 
  SEARCH_GOODS_LIST
} from '@/constants/goods-list'

const INITIAL_STATE = {
  // 商品搜索 - 超级搜索(通用物料搜索API（导购）) 商品列表
  list: []
}
export default function goodsList (state = INITIAL_STATE, action) {
  switch (action.type) {
    // 商品搜索 - 超级搜索(通用物料搜索API（导购）)
    case SEARCH_GOODS_LIST:
      return search_goods_list(state, action)
    default:
      return state
  }
}

const search_goods_list = (state, action) => {
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

