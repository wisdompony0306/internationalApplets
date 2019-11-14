import Taro, { Component } from '@tarojs/taro'
import { Button, Text, Form } from '@tarojs/components'
import { postcss } from '@/utils/style'
import classNames from 'classnames'
import './index.scss'

export default class ButtonItem extends Component {
  static defaultProps = {
    compStyle: '',
    textStyle: '',
    plain: false,
    loading: false,
    disabled: false,
    onClick: () => {}
  }

  getCls = (base) => {
    const { type, plain, disabled } = this.props
    let _type = type
    if (!['primary', 'normal'].includes(type)) _type = ''
    return classNames(
      base,
      `${base}--${type}`,
      plain && `${base}--plain`,
      disabled && `${base}--disabled`
    )
  }

  formSubmit(e) {
    this.props.onClick()
  }

  render () {
    const { compStyle, textStyle, loading, disabled, text, onClick } = this.props
    return (
      <Form
        report-submit
        onSubmit={this.formSubmit}
      >
        <Button
          className={this.getCls('comp-button')}
          style={postcss(compStyle)}
          loading={loading}
          disabled={disabled}
          formType={'submit'}
        >
          {
            text ? (<Text className={this.getCls('comp-button__txt')} style={textStyle}>{text}</Text>) 
            : (this.props.children)
          }
          
        </Button>
      </Form>
    )
  }
}

