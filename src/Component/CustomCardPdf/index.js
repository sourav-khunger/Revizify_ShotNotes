/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-sequences */
/* eslint-disable prettier/prettier */
import React from 'react';

import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {style} from './style';

export default class CustomCardPdf extends React.Component {
  render() {
    return (
      <View style={style.vwMain}>
                <ScrollView style={style.mainScroll} >
                  <View
                    style={style.mainVw}>
                    {this.props.documentData.map((item, index) => (
                      <View
                        style={[
                          style.textVw,
                          {
                            marginBottom: 4,
                            marginTop: index == 0 ? 10 : 4,
                          },
                        ]}>
                        <Image source={this.props.isImg} style={style.pdfImg} />
                        <Text numberOfLines={1} style={style.nameTx}>
                          {this.props.documentData.length - 1 == index
                            ? item.name
                            : item.name + ', '}
                        </Text>
                        <TouchableOpacity
                          style={style.btnAttach}
                          onPress={() => this.props.deleteDocument(index)}>
                          <Image
                            style={style.attachImg}
                            source={require('../../Container/answer/Assets/cancel.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
    );
  }
}
