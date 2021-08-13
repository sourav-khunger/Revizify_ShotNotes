/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

import Colors from '../../Resources/Colors';
import font from '../../Resources/font';

export const style = StyleSheet.create({
  mainVw: {
    width: '100%',
    height: 50,
    // justifyContent:'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.headerColor,
  },
  menuImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  menuBtn: {
    width: '10%',
    height: '60%',
    marginLeft: '3%',
  },
  headerNameTx: {
    fontFamily:font.Chunk,
    color: Colors.White,
    marginLeft: '5%',
    fontSize: 20,
    width: '62%',
    textAlign: 'center',
    
  },
  searchbtn: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchImg: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    tintColor:'white'
  },
});
