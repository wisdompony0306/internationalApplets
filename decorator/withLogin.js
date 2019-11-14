import { connect } from '@tarojs/redux'
import SuperBridge from '@/superBridge'
import {dispatchLogin} from '@/actions/global'
const LIFE_CYCLE_MAP = ['willMount', 'didMount', 'didShow'];

/**
 *
 * 登录鉴权
 *
 * @param {string} [lifecycle] 需要等待的鉴权完再执行的生命周期 willMount didMount didShow
 * @returns 包装后的Component
 *
 */
function withLogin(lifecycle = 'willMount') {
  // 异常规避提醒
  if (LIFE_CYCLE_MAP.indexOf(lifecycle) < 0) {
    console.warn(
      `传入的生命周期不存在, 鉴权判断异常 ===========> $_{lifecycle}`
    );
    return Component => Component;
  }
  
  return function withLoginComponent(Component) {
    @connect(state => ({
      userInfo: state.globalData.userInfo
    }), {dispatchLogin})
    class WithLogin extends Component {
      constructor(props) {
        super(props);
      }
      $_autoLogin = async () => {
        const {dispatchLogin, userInfo} = this.props
        // ...这里是登录逻辑
        if (!userInfo && process.env.TARO_ENV === 'weapp') {
          const { code, errMsg } = await SuperBridge.login()
          dispatchLogin({code})
        }
        return true
      }
      async componentWillMount() {
        if (super.componentWillMount) {
          if (lifecycle === LIFE_CYCLE_MAP[0]) {
            const res = await this.$_autoLogin();
            if (!res) return;
          }

          super.componentWillMount();
        }
      }

      async componentDidMount() {
        if (super.componentDidMount) {
          if (lifecycle === LIFE_CYCLE_MAP[1]) {
            const res = await this.$_autoLogin();
            if (!res) return;
          }

          super.componentDidMount();
        }
      }

      async componentDidShow() {
        if (super.componentDidShow) {
          if (lifecycle === LIFE_CYCLE_MAP[2]) {
            const res = await this.$_autoLogin();
            if (!res) return;
          }

          super.componentDidShow();
        }
      }
    }
    return WithLogin
  }
}

export default withLogin;