/* eslint-disable eqeqeq */
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

export default class CustomPdfCard extends React.Component {
    render() {
        return (
            <View
                style={[
                    style.textVw,
                    {
                        marginBottom: 4,
                        marginTop: this.props.index == 0 ? 10 : 4,
                    },
                ]}>
                <Image source={this.props.isImg } style={style.pdfImg} />
                <Text numberOfLines={1} style={style.nameTx}>
                    {this.props.name
                    }
                </Text>

                <TouchableOpacity
                    style={style.btnAttach}
                    onPress={() => this.props.deleteDocument(this.props.index)}>
                    <Image
                        style={style.attachImg}
                        source={require('../../Container/answer/Assets/cancel.png')}
                    />
                </TouchableOpacity>
                
            </View>

        );
    }
}
