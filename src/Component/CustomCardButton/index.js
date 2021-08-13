/* eslint-disable no-sequences */
/* eslint-disable prettier/prettier */
import React from 'react';

import {
  Text,
  TouchableOpacity,
} from 'react-native';

import {style} from './style';

export default class CustomCardButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
      disabled={this.props.isDisabled}
              style={[style.addBtn, { marginTop: this.props.top }]}
              onPress={() => this.props.onPress()}>
              <Text>{this.props.text}</Text>
            </TouchableOpacity>
    );
  }
}
