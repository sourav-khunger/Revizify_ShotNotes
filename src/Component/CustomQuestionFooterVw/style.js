/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  bottomVw: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    
  },
 leftImgVw: {
    width: '20%',
    height: '60%',
    marginLeft: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.drkWhite,
  },
 bottomImg: {
    width: 50,
    height: 60,
    resizeMode: 'contain',
  },
  
  showTx: {
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth:2,
    borderRadius:10,
    paddingLeft: 12,
    paddingBottom: 10,
    paddingRight:10,
    paddingTop: 10,
    borderColor:Colors.mainColor,
    backgroundColor: Colors.drkWhite,
    

  },
  showTx1: {
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth:2,
    borderRadius:10,
    paddingLeft: 12,
    paddingBottom: 10,
    paddingRight:10,
    paddingTop: 10,
    borderColor:Colors.mainColor,
    backgroundColor: Colors.drkWhite,
  }
 
});
