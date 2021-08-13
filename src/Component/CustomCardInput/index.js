/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-sequences */
/* eslint-disable prettier/prettier */
import React from 'react';

import {
  TextInput,
  View,
} from 'react-native';

import {style} from './style';

export default class CustomCardInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFocused: false },
    this.inputRef = React.createRef();
  }
  handleInputFocus = () => this.setState({ isFocused: true })

   handleInputBlur = () => this.setState({ isFocused: false })
  render() {
    return (
      <View style={[style.inputVw, {}]}>
        <TextInput
          placeholder={this.props.placeholder}
          style={style.questionVw}
          multiline={true}
          onChangeText={(text) => this.props.onChangeText(text)}
          value={this.props.value}
          ref={this.props.inputRefs}
          blurOnSubmit={false}
          onEndEditing={(key)=>{console.log('here')}}
          autoFocus={false}
        />
      </View>
    );
  }
}
