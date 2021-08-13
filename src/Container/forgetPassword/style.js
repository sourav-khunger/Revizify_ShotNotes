/* eslint-disable prettier/prettier */
import {
  Platform,
  StyleSheet,
} from 'react-native';

import Colors from '../../Resources/Colors';

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
  emptyTopVw: {
    padding: 15,
    backgroundColor:Colors.headerColor,
  },
  mainVw: {
    width: '100%',
    height: 50,
    // justifyContent:'center',
    marginTop: Platform.OS === 'ios' ? '10%' : 0,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor:Colors.headerColor
  },

  //********************************* Image ******************************
  img: {
    height: 150,
    width: 150,
    marginTop: 50,
    marginBottom: 30,
  },

  //******************************** Text *******************************

  loginTx: {
    width: '100%',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    color: '#fff',
  },
  orTx: {
    width: '100%',
    fontSize: 18,
    textAlign: 'center',
    // marginBottom: 10,
    color: '#fff',
  },
  logTx: {
    width: '100%',
    fontSize: 25,
    color: Colors.White,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  verificationTx: {
    width: '100%',
    textAlign: 'center',
    // marginLeft: '3%',
    // marginRight: '3%',
    marginTop: 4,
    fontSize: 14,
    color: 'white',
    marginBottom: '10%',
  },
  backImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  headerNameTx: {
    fontWeight: 'bold',
    color: Colors.White,
    fontSize: 20,
    width: '70%',
    marginRight: '15%',
    textAlign: 'center',
  },

  loginBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: '60%',
    backgroundColor: Colors.mainColor,
  },
  backBtn: {
    height: '100%',
    width: '10%',
    marginLeft: '5%',
  },
});
