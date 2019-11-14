import SuperBridge from '@/utils/super-bridge'
import {API_GOODS_ADD_CLICK_RECORD} from '@/constants/api'
/**
 * 添加商品浏览记录
 * @param param0 
 */
export const addGoodsClickRecord = ({goodsId, shareTkUserId = null, goodsType = 1}) => {
  SuperBridge.post({
    url: API_GOODS_ADD_CLICK_RECORD,
    data: {
      goodsId,
      shareTkUserId,
      goodsType
    },
    _options: {
      showLoading: false,
      showError: false
    }
  })
}