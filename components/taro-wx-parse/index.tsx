import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import WxParse from './wxParse/wxParse'
import './index.scss'

type IProps = {
  html:string
}
type IState = {}
class TaroWxParse extends Component {
  props: Readonly<IProps> = {html: ''}

  componentWillMount() {
    const { html } = this.props
    const article = html
    WxParse.wxParse('article', 'html', article, this.$scope, 5)
  }

  render () {
    return (
      <View className='taro-wx-parse'>
        <import src='./wxParse/wxParse.wxml' />
        <template is='wxParse' data='{{wxParseData:article.nodes}}'/>
      </View>
    )
  }
}
export default TaroWxParse as ComponentClass<IProps, IState>
