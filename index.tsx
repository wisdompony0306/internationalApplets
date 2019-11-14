import { combineReducers } from 'redux'
import home from './home'
import goodsList from './goods-list'
import goodsDetail from './goods-detail'
import globalData from './global'
import superSearch from './super-search'
export default combineReducers({
  globalData,
  home,
  goodsList,
  goodsDetail,
  superSearch
})
