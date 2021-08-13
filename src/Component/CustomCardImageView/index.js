/* eslint-disable space-infix-ops */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-sequences */
/* eslint-disable prettier/prettier */
import React from 'react';

import {
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import {style} from './style';

FastImage;

export default class CustomCardImageview extends React.Component {
  render() {
    return (
      <View
        style={[
          style.addImageVw,
          {
            overflow: 'hidden',
          },
        ]}>
        {this.props.imageData.length == 0 ? null : (
          <FlatList
            data={this.props.imageData}
            horizontal={false}
            numColumns={3}
            renderItem={({item, index}) => (
              <View
                style={{
                  borderWidth: 1,
                  width: '28%',
                  marginLeft: '5%',
                  height: 120,
                  marginTop: 10,
                }}>
                <FastImage
                  style={style.addImg}
                  source={{
                    uri:
                      item.uri == undefined
                        ? item.card_question_image_url == undefined
                          ? item.card_answer_image_url
                          : item.card_question_image_url
                        : item.uri,
                  }}
                />
                <TouchableOpacity
                  style={style.attachBtn}
                  onPress={() => {this.props.isEdit? this.props.deleteItem(item) : this.props.deleteItem(index)}}>
                  <FastImage
                    style={style.attachImg}
                    source={require('../../Container/answer/Assets/cancel.png')}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    );
  }
}
