import { ComponentClass } from "react";
import Taro, { Component } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import {ButtonItem} from '@/components'
import {AtButton, AtIcon} from 'taro-ui'
import './index.scss'
import { postcss } from '@/utils/style'
import utils from "@/utils/utils";
import SuperBridge from "@/utils/super-bridge";

const defaultProps = {
  onSearch: (val) => { }
}
const initialState = { inputValue: '' }
type IProps = {
  onSearch: (val: string) => any
}
type IState = Readonly <typeof initialState>

class Gallery extends Component {
  static options = {
    addGlobalClass: true
  }
  readonly props: Readonly<IProps> = defaultProps
  readonly state: IState = initialState
  static defaultProps = defaultProps
  // 利用 externalClasses 定义段定义若干个外部样式类 这个特性从小程序基础库版本 1.9.90 开始支持
  static externalClasses = ['submit-order-search-bar-class']

  handleClick = (e) => {
    console.log(e) // formid
    const { inputValue } = this.state
    if (!inputValue && utils.trim(inputValue) === '') SuperBridge.toast({ title: '请输入内容哦~' })
    else this.props.onSearch(inputValue)
  }

  onInputHandle = (e) => {
    this.setState({inputValue: e.detail.value})
  }
  clearHandle = () => {
    this.setState({inputValue: ''})
  }
  render () {
    const { } = this.props
    const { inputValue } = this.state
    return (
      <View className={'submit-order-search-bar-class submit-order-search-bar'}>
        <View className={'submit-order-search-bar__search'}>
          <Input
            className={'submit-order-search-bar__search-input'}
            placeholderClass={'submit-order-search-bar__search-input--placeholder'}
            type='number'
            focus
            value={inputValue}
            placeholder={'请输入淘宝订单号'}
            onInput={this.onInputHandle}
          />
          {!!inputValue && (
              <View className='submit-order-search-bar__search-clear' onClick={this.clearHandle}>
                <ButtonItem type='normal'>
                  <View className='icon'>
                    <View className='iconfont iconfont-close'></View>
                  </View>
                </ButtonItem>
              </View>
            )
          }
        </View>
        <View className={'submit-order-search-bar__btn'}>
          <ButtonItem
            text={'查询'}
            compStyle={postcss({
              height: '100%',
            })}
            textStyle= {postcss({
              color: '#fea174'
            })}
            onClick={this.handleClick}
            >查询</ButtonItem>
        </View>
      </View>
    )
  }
}
export default Gallery as ComponentClass<IProps, IState>
