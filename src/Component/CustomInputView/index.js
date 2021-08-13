/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  Text,
  TextInput,
  View,
} from 'react-native';

import {style} from './style';

class CustomInputView extends Component {
  render() {
    return (
      <View style={style.container}>
        <Text style={style.courseTx}> {this.props.title} </Text>
        <View style={style.vwInput}>
          <TextInput
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChangeText={(text) => this.props.onChangeText(text)}
            style={style.inputVw}
            keyboardType={this.props.keyboardType}
            maxLength={this.props.maxLength}
            ref={this.props.inputRefs}
          />
          <View style={[style.emptyVw, {padding: 1}]} />
        </View>
      </View>
    );
  }
}

export default CustomInputView;
