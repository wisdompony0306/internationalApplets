import {
  // 添加搜索记录
  ADD_SEARCH_HISTORY,
  // 清空搜索记录
  CLEAR_SEARCH_HISTORY,
  // 用户登录
  USER_LOGIN,
  // 获取用户信息
  UPDATE_USER_INFO,
  // 更新url参数/scene参数
  UPDATE_PARAMS
} from '@/constants/global'
import { createAction } from '@/utils/redux'
import {API_USER_LOGIN, API_UPDATE_USER_INFO} from '@/constants/api'

// 添加历史搜索记录
export const dispatchAddSearchHistory = (payload) => {
  return {
    type: ADD_SEARCH_HISTORY,
    payload
  }
}
// 清空历史搜索记录
export const dispatchClearSearchHistory = (payload) => {
  return {
    type: CLEAR_SEARCH_HISTORY,
    payload
  }
}

// 用户登录 login
export const dispatchLogin = (payload) => {
  return createAction({
    url: API_USER_LOGIN,
    type: USER_LOGIN,
    method: 'post',
    payload,
    fetchOptions: {
      showError: false,
      showLoading: false
    }
  })
}

// 更新用户信息
export const dispatchUpdateUserInfo = (payload) => {
  return createAction({
    url: API_UPDATE_USER_INFO,
    type: UPDATE_USER_INFO,
    method: 'post',
    payload,
    fetchOptions: {
      showError: false
    }
  })
}
export const dispatchUpdateParams = (payload) => {
  return {
    type: UPDATE_PARAMS,
    payload
  }
}
// 异步的action
// export function asyncAdd () {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(add())
//     }, 2000)
//   }
// }
