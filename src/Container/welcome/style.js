import {StyleSheet} from 'react-native';

import Colors from '../../Resources/Colors';
import font from '../../Resources/font';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.drkWhite,
  },
  subcontainer: {
    height: '100%',
    width: '90%',
    alignItems: 'center',
    marginLeft: '5%',
    marginRight: '5%',
  },
  logoVw: {
    height: '60%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shotVw: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
  },

  btnVw: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sigVW: {
    width: '100%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },

  //********************************* Image ******************************
  img: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  arrowImg: {
    height: 15,
    width: 15,
    marginRight: 20,
  },
  textTx: {
    width: '100%',
    textAlign: 'center',
    fontSize: 40,
    // fontWeight: 'bold',
    marginTop: 20,
    fontFamily: font.Chunk,
    color: Colors.headerColor,
  },
  loginTx: {
    width: '50%',
    // textAlign:'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.White,
    marginLeft: '10%',
  },
  arrowTx: {
    width: '50%',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  remTx: {
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    marginTop: 30,
  },
  commonTx: {
    color: Colors.White,
    fontSize: 15,
  },

  //****************** Button ********************* */

  loginBtn: {
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
    // opacity:0.5,
    borderRadius: 5,
    marginTop: 5,
  },
});
