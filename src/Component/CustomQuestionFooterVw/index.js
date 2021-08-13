/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
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

export default class CustomQuestionFooterVw extends React.Component {
  render() {
    return (
      <View style={style.bottomVw}>
        {this.props.isSave ?
        <Text
          onPress={() => this.props.onPress()}
          style={[style.showTx1 ]}>
          {' Show Answer'}
        </Text> : <View style={{justifyContent: 'space-between',width: '100%',alignItems: 'center', flexDirection: 'row'}}>
        <View style={style.leftImgVw} />

        <View style ={{width: '50%',alignItems: 'center', justifyContent: 'center'}}>

        <Text
          onPress={() => this.props.onPress()}
          style={[style.showTx]}>
          {'Show Answer'}
        </Text>
        </View>
        <View style={style.leftImgVw}>
        <TouchableOpacity
            disabled={this.props.disabled}
            onPress={() => this.props.saveBookMark()}>
            <Image style={[style.bottomImg]} source={this.props.saveImage} />
          </TouchableOpacity>
          </View>
          </View>}
      </View>
    );
  }
}
