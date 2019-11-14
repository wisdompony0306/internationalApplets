import { connect } from '@tarojs/redux'
import Utils from '@/utils/utils'
import * as actions from '@/actions/global' 
const LIFE_CYCLE_MAP = ['willMount', 'didMount', 'didShow'];

/**
 * 公共地址参数 及分享参数获取
 * @returns 包装后的Component
 */
function withParams(lifecycle = 'willMount') {
  // 异常规避提醒
  if (LIFE_CYCLE_MAP.indexOf(lifecycle) < 0) {
    console.warn(
      `传入的生命周期不存在, 鉴权判断异常 ===========> $_{lifecycle}`
    );
    return Component => Component;
  }
  return function withParamsComponent(Component) {
    @(connect as any)(({globalData}) => ({
      userInfo: globalData.userInfo
    }), {...actions})
    class withParams extends Component {
      constructor(props) {
        super(props);
      }
      
      async componentWillMount() {
        const {scene, ...params} = this.$router.params
        let _params: any = params
        // 通过扫码进入_
        if (scene) _params = Utils.stringToParams(scene)
        if (_params.suid) {
          _params.shareTkUserId = _params.suid
          delete _params.suid
        }
        if (_params.gid) {
          _params.goodsId = _params.gid
          delete _params.gid
        }
        this.props.dispatchUpdateParams(_params)
        console.log(scene)
        console.log(params)
        if (super.componentWillMount) {
          super.componentWillMount();
        }
      }
    }
    return withParams
  }
}

export default withParams;


