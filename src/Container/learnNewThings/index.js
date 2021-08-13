/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import {
  Text,
  View,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Video from 'react-native-video';

import AsyncStorage from '@react-native-community/async-storage';

import Videos from '../../Resources/Videos';
import {style} from './style';

class LearnNewThings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  moveNext = () => {
    AsyncStorage.setItem('isWelcome', 'true');
    this.props.navigation.navigate('Welcome');
  };
  render() {
    return (
      <View style={style.container}>
        <SwiperFlatList
          showPagination={true}
          paginationActiveColor={'#0A67F5'}
          style={style.wrapper}>
          <View style={style.subContainer}>
          <View style={style.slide1}>
            <Video
              source={Videos.welcome1}
              ref={(ref) => {
                this.player = ref;
              }} // Store reference
              onBuffer={this.onBuffer} // Callback when remote video is buffering
              onError={this.videoError} // Callback when video cannot be loaded
              style={style.backgroundVideo}
              resizeMode={'contain'}
            />
            {/* <Text onPress={() => this.moveNext()} style={style.skipTx}>
              Skip
            </Text> */}
          </View>
          </View>
          <View style={style.subContainer}>
          <View style={style.slide1}>
            <Video
              source={Videos.welcome2}
              ref={(ref) => {
                this.player = ref;
              }} // Store reference
              onBuffer={this.onBuffer} // Callback when remote video is buffering
              onError={this.videoError} // Callback when video cannot be loaded
              resizeMode={'contain'}
              style={style.backgroundVideo}
            />
            {/* <Text onPress={() => this.moveNext()} style={style.skipTx}>
              Skip
            </Text> */}
          </View>
          </View>
          <View style={style.subContainer}>
          <View style={style.slide1}>
            <Video
              source={Videos.welcome3}
              ref={(ref) => {
                this.player = ref;
              }} // Store reference
              onBuffer={this.onBuffer} // Callback when remote video is buffering
              onError={this.videoError} // Callback when video cannot be loaded
              style={style.backgroundVideo}
              resizeMode={'contain'}
            />
            
          </View>
          </View>
        </SwiperFlatList>
        <Text onPress={() => this.moveNext()} style={style.skipTx}>
              Skip
            </Text>
      </View>
    );
  }
}

export default LearnNewThings;
