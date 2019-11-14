import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import GoodsItem from './../goods-item'
import './index.scss'

type IProps = {
  list: Goods[],
  type?:string
}
type IState = {}
class DGoodsList extends Component {
  props: Readonly<IProps> = {list: [], type: 'default'}

  getCls = (base) => {
    const { type } = this.props
    return classNames(
      base,
      `${base}--${type}`
    )
  }
  render () {
    const { list, type } = this.props
    return (
      <View className={this.getCls('goods-list')}>
        {list.map((goods, index) => (
          <View
            key={goods.goodsId}
            className={classNames(
              'goods-list__item',
              {'goods-list__item--left': (index) % 2 === 0},
              {'goods-list__item--right': (index + 1) % 2 === 0}
            )}
          >
            <GoodsItem key={goods.goodsId} type={type} goods={goods}/>
          </View>
        ))}
      </View>
    )
  }
}
export default DGoodsList as ComponentClass<IProps, IState>
