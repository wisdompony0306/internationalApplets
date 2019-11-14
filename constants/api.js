/**
 * NOTE HOST、HOST_M 是在 config 中通过 defineConstants 配置的
 * 只所以不在代码中直接引用，是因为 eslint 会报 no-undef 的错误，因此用如下方式处理
 */
/* eslint-disable */
export const host = HOST
export const hostM = HOST_M
/* eslint-enable */

//                             用户模块                             
export const API_USER_LOGIN = `${host}/account/services/login`
export const API_UPDATE_USER_INFO = `${host}/account/services/saveUserInfo`


/**记录商品搜索记录 */
export const API_GOODS_ADD_SEARCH_RECORD = `${host}/goods/services/addSearchRecord`
/**记录商品浏览记录 */
export const API_GOODS_ADD_CLICK_RECORD = `${host}/goods/services/addClickRecord`
/**获取用户分享二维码 */
export const API_GOODS_WX_QRCODE_POSTER = `${host}/wxQrcode/services/getQrcodePoster`



// ------------------------ 淘宝模块 ------------------------                        
/**淘口令转链 */
export const API_GOODS_TPWD_CONVERT = `${host}/tbk/goods/services/tpwdConvert`
/**淘宝额物料下行 - 导购 */
export const API_DG_OPTIMUS_MATERIAL = `${host}/tbk/goods/services/dgOptimusMaterial`
/**通用物料搜索API（导购） */
export const API_DG_MATERIAL_OPTIONAL = `${host}/tbk/goods/services/dgMaterialOptional`
/**好券清单API */
export const API_TBK_GOODS_GET_COUPON = `${host}/tbk/goods/services/getGoodsCoupon`
/**商品详情 */
export const API_TBK_GOODS_GETINFO = `${host}/tbk/goods/services/info`
/**淘宝客商品链接转换 */
export const API_TBK_GOODS_CONVERT = `${host}/tbk/goods/services/convert`
/**创建淘宝客淘口令 */
export const API_TBK_GOODS_TKWD_CREATE = `${host}/tbk/goods/services/tpwdCreate`

/** 订单绑定 */
export const API_TBK_ORDER_BIND = `${host}//order/services/orderBind`






// 暂是未使用的api
export const API_USER = `${host}/xhr/user/getDetail.json`
export const API_CHECK_LOGIN = `${host}/xhr/u/checkLogin.json`
