/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  bottomVw: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  leftImgVw: {
    width: '20%',
    marginLeft:'5%',
    height: '60%',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftImgVw1: {
    width: '15%',
    marginLeft:'4%',
     marginRight: '1%',
    height: 60,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomImg1: {
    width: 40,
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 60,
    tintColor:Colors.drkWhite
  },
  bottomImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    // borderRadius: 60,
    
  },
  saveImg: {
    width: 50,
    height: 60,
    resizeMode: 'contain',
  },
});
