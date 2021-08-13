/* eslint-disable prettier/prettier */
import {
  Dimensions,
  StyleSheet,
} from 'react-native';

import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.drkWhite,
  },
  subContainer: {
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
  },

  wrapper: {
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  },
  slide1: {
    width: '80%',
    height: '80%',
    margin: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:Colors.drkWhite
  },

  //********************************* Image ******************************
  img: {
    height: 100,
    width: 100,
  },

  backgroundVideo: {
    width: '100%',
    height: '100%',
  },
});
