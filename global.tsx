import { 
  ADD_SEARCH_HISTORY,
  CLEAR_SEARCH_HISTORY,
  USER_LOGIN,
  UPDATE_USER_INFO,
  UPDATE_PARAMS
} from '@/constants/global'
import Taro from '@tarojs/taro'
import SuperBridge from '@/utils/super-bridge'
const COMMON = 'coupon@wxd9704e466db93481!'

const SEARCHHISTORY = `${COMMON}search_history`
const INITIAL_STATE = {
  // 用户信息
  userInfo: null,
  // 搜索记录
  searchHistory: SuperBridge.getStorageSync({ key: SEARCHHISTORY }) || [],
  // url参数/scene参数
  params: {}
} as {userInfo: any, searchHistory: string[], params: any}

export default function globalReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    // 添加搜索记录
    case ADD_SEARCH_HISTORY:
      return add_search_history(state, action)
    // 清空搜索记录
    case CLEAR_SEARCH_HISTORY:
      return clear_search_history(state)
    // 用户登录
    case USER_LOGIN:
      return user_login(state, action)
    case UPDATE_USER_INFO:
      return update_user_info(state, action)
    // 更新url/scene参数
    case UPDATE_PARAMS:
      return {...state, params: action.payload}
    default:
       return state
  }
}
// 添加搜索记录
const add_search_history = (state, action) => {
  let _list = state.searchHistory
  if (_list.includes(action.payload)) {
    _list.splice(_list.indexOf(action.payload), 1);
  } else if (_list.length > 10) _list.pop()
  _list.unshift(action.payload)
  SuperBridge.setStorage({ key: SEARCHHISTORY, data: _list })
  return {
    ...state,
    searchHistory: [..._list]
  }
}
// 清空搜索记录
const clear_search_history = (state) => {
  Taro.removeStorage({key: SEARCHHISTORY})
  Taro.showToast({title: '清除成功'})
  return {
    ...state,
    searchHistory: []
  }
}
// 用户登录
const user_login = (state, action) => {
  return {
    ...state,
    userInfo: action.payload.userView
  }
}
// 更新用户信息
const update_user_info = (state, action) => {
  return {
    ...state,
    userInfo: action.payload
  }
}