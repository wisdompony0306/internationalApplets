import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {AtTabs} from 'taro-ui'
import './index.scss'

type PageOwnProps = {
  materialType?:string,
  materialId?: number,
  onChange: (obj:any) => void
}
type PageState = {
  tabIndex: number,
  tabList: any[]
}
const materialIdObj = {
  // 好券直播
  hqzb: [
    {
      title: '综合',
      value: 3756
    },
    {
      title: '女装',
      value: 3767
    },
    {
      title: '家居家装',
      value: 3758
    },
    {
      title: '数码家电',
      value: 3759
    },
    {
      title: '鞋包配饰',
      value: 3762
    },
    {
      title: '美妆个护',
      value: 3763
    },
    {
      title: '男装',
      value: 3764
    },
    {
      title: '内衣',
      value: 3765
    },
    {
      title: '母婴',
      value: 3760
    },
    {
      title: '食品',
      value: 3761
    },
    {
      title: '运动户外',
      value: 3766
    }
  ],
  // 大额券
  deq: [
    {
      title: '综合',
      value: 9660
    },
    {
      title: '女装',
      value: 9658
    },
    {
      title: '家居家装',
      value: 9655
    },
    {
      title: '数码家电',
      value: 9656
    },
    {
      title: '鞋包配饰',
      value: 9648
    },
    {
      title: '美妆个护',
      value: 9653
    },
    {
      title: '男装',
      value: 9654
    },
    {
      title: '内衣',
      value: 9652
    },
    {
      title: '母婴',
      value: 9650
    },
    {
      title: '食品',
      value: 9649
    },
    {
      title: '运动户外',
      value: 9651
    }
  ],
  // 品牌券
  ppq: [
    {
      title: '综合',
      value: 3786
    },
    {
      title: '女装',
      value: 3788
    },
    {
      title: '家居家装',
      value: 3792
    },
    {
      title: '数码家电',
      value: 3793
    },
    {
      title: '鞋包配饰',
      value: 3796
    },
    {
      title: '美妆个护',
      value: 3794
    },
    {
      title: '男装',
      value: 3790
    },
    {
      title: '内衣',
      value: 3787
    },
    {
      title: '母婴',
      value: 3789
    },
    {
      title: '食品',
      value: 3791
    },
    {
      title: '运动户外',
      value: 3795
    }
  ],
  // 高拥榜
  gyb: [
    {
      title: '综合',
      value: 13366
    },
    {
      title: '女装',
      value: 13367
    },
    {
      title: '家居家装',
      value: 13368
    },
    {
      title: '数码家电',
      value: 13369
    },
    {
      title: '鞋包配饰',
      value: 13370
    },
    {
      title: '美妆个护',
      value: 13371
    },
    {
      title: '男装',
      value: 13372
    },
    {
      title: '内衣',
      value: 13373
    },
    {
      title: '母婴',
      value: 13374
    },
    {
      title: '食品',
      value: 13375
    },
    {
      title: '运动户外',
      value: 13376
    }
  ],
  // 母婴市场
  my: [
    {
      title: '备孕',
      value: 4040
    },
    {
      title: '0-6个月',
      value: 4041
    },
    {
      title: '7-12个月',
      value: 4042
    },
    {
      title: '1-3岁',
      value: 4043
    },
    {
      title: '4-6岁',
      value: 4044
    },
    {
      title: '7-12岁',
      value: 4045
    }
  ]
}
class SwiperBanner extends Component {
  static options = {
    addGlobalClass: true
  }
  readonly props: Readonly<PageOwnProps> = {
    materialId: undefined,
    onChange: () => {}
  }
  readonly state: Readonly<PageState> = {
    tabIndex: 0,
    tabList: []
  }
  // defaultProps 可以被定义为组件类的一个属性，用以为类设置默认的属性。这对于未定义（undefined）的属性来说有用，而对于设为空（null）的属性并没用。
  static defaultProps = {
    onChange: () => {}
  }
  // 利用 externalClasses 定义段定义若干个外部样式类 这个特性从小程序基础库版本 1.9.90 开始支持
  static externalClasses = ['sub-material-tool-class']

  componentWillMount () {
    const {materialId, materialType} = this.props
    const tabList = (materialType && materialIdObj[materialType]) || []
    this.setState({tabList})
  }

  // 切换
  handleTabItemClick = (tabIndex) => {
    console.log(tabIndex)
    this.setState({tabIndex})
    this.props.onChange({materialId: this.state.tabList[tabIndex].value})
  }
  render () {
    const {tabList} = this.state
    return (
      <View className='sub-material-tool-class sub-material-tool'>
       <AtTabs 
        current={this.state.tabIndex}
        tabList={tabList}
        onClick={this.handleTabItemClick.bind(this)}
        scroll
      />
      </View>
    )
  }
}
export default SwiperBanner as ComponentClass<PageOwnProps, PageState>
