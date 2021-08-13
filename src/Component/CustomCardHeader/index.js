/* eslint-disable no-sequences */
/* eslint-disable prettier/prettier */
import React from 'react';

import {
  Image,
  Text,
  View,
} from 'react-native';

import Images from '../../Resources/Images';
import {style} from './style';

export default class CustomCardHeader extends React.Component {
  render() {
    return (
      <View style={style.subHeader}>
              <Image source={Images.rightImg} style={style.headerImg} />
              <Text style={style.headerTitleTx}>{this.props.title}</Text>
            </View>
    );
  }
}
