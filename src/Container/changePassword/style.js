import {StyleSheet} from 'react-native';

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
    backgroundColor: Colors.headerColor,
    padding: 15,
  },

  //********************************* Image ******************************
  img: {
    height: 150,
    width: 150,
    marginTop: 50,
    marginBottom: 50,
  },

  //******************************** Text *******************************

  loginTx: {
    width: '100%',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    color: Colors.headerColor,
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
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  loginBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: '40%',
    backgroundColor: Colors.mainColor,
  },
  backBtn: {
    position: 'absolute',
    top: 30,
    height: '8%',
    width: '100%',
    backgroundColor: Colors.headerColor,
  },
});
