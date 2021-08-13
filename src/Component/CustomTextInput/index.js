/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  Image,
  TextInput,
  View,
} from 'react-native';

import {style} from './style';

class CustomTextInput extends Component {
  render() {
    return (
      <View style={[style.mainVw, {height: this.props.height}]}>
        {this.props.isImage ? (
          <Image style={style.imgIcon} source={this.props.image} />
        ) : null}
        <TextInput
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChangeText={(text) => this.props.onchangeText(text)}
          style={[style.textINP, {width: this.props.isImage ? '75%' : '90%'}]}
          placeholderTextColor={this.props.placeholderTextColor}
          keyboardType={this.props.keyboardType}
          secureTextEntry={this.props.secureTextEntry}
          onKeyPress={(value)=>this.props.onkeyPress(value)}
          onSubmitEditing={(value)=>this.props.onSubmitEditing(value)}
          ref={this.props.inputRefs}
          // maxLength={this.props.maxLength}
          // autoCapitalize={this.props.autoCapitalize}
        />
      </View>
    );
  }
}
export default CustomTextInput;
