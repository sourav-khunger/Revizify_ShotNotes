/* eslint-disable prettier/prettier */
import React from 'react';

import {
  BackHandler,
  View,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Video from 'react-native-video';

import AsyncStorage from '@react-native-community/async-storage';

import Videos from '../../Resources/Videos';
import {style} from './style';

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.firstTimeLoaded = true;
  }
  componentDidMount = async () => {
    this.props.navigation.addListener('blur', (event) => {
    });

    this.props.navigation.addListener('focus', (event) => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        return true;
      });

      if (!this.firstTimeLoaded) {
        BackHandler.exitApp();
      }

      this.firstTimeLoaded = false;
    });
    const value = await AsyncStorage.getItem('loginData');
    console.log('value', value);
    if (value != null && value != '' && value != undefined) {
      setTimeout(() => {
        AsyncStorage.setItem('isFirst','true')
        this.props.navigation.navigate('Home');
      }, 2000);
    } else {
      setTimeout(() => {
        AsyncStorage.getItem('isWelcome').then((res) => {


          if (res == 'true') {
            this.props.navigation.navigate('Welcome');
          }
          else {
            this.props.navigation.navigate('LearnNewThing');
          }
        });

      }, 2000);
    }
  };
  render() {
    return (
      <View style={style.container}>
      
      <SwiperFlatList
          style={style.wrapper}>
          <View style={style.subContainer}>
          <View style={style.slide1}>
        <Video source={Videos.SplashVideo}
       ref={(ref) => {
         this.player = ref
       }}
       resizeMode={'contain'}                                      // Store reference
       onBuffer={this.onBuffer}                // Callback when remote video is buffering
       onError={this.videoError}               // Callback when video cannot be loaded
       style={style.backgroundVideo} />
       </View>
       </View>
       </SwiperFlatList>

      </View>
    );
  }
}
