/* eslint-disable no-sequences */
/* eslint-disable prettier/prettier */
import React from 'react';

import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {style} from './style';

export default class CustomHeader extends React.Component {
  render() {
    return (
      <View style={style.mainVw}>
        <TouchableOpacity
          style={style.menuBtn}
          onPress={() => this.props.leftBtn()}>
          <Image source={this.props.image} style={style.menuImg} />
        </TouchableOpacity>
        <Text numberOfLines={1} style={style.headerNameTx}>{this.props.title}</Text>
        <TouchableOpacity
          style={style.searchbtn}
          onPress={() => this.props.searchItem()}>
          <Image source={this.props.rightImage} style={style.searchImg} />
        </TouchableOpacity>
      </View>
    );
  }
}
