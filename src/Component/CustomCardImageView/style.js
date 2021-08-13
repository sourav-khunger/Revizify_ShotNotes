/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  addImageVw: {
    justifyContent: 'center',
    width:'98%'
  },
  addImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
 attachBtn: {
    width: 15,
    height: 15,
    position: 'absolute',
    top: 3,
    right: 3,
    borderRadius: 15,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachImg: {
    height: '60%',
    width: '60%',
    resizeMode: 'contain',
    tintColor: 'black',
  },
});
