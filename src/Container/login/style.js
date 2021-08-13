import {StyleSheet} from 'react-native';

import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F2E9',
  },
  subcontainer: {
    height: '100%',
    width: '90%',
    alignItems: 'center',
    marginLeft: '5%',
    marginRight: '5%',
  },
  socialVw: {
    flexDirection: 'row',
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTopVw: {
    padding: 15,
  },
  termsVw: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  //********************************* Image ******************************
  img: {
    height: 150,
    width: 150,
    // marginTop: 20,
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
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
  },
  logTx: {
    width: '100%',
    fontSize: 20,
    color: Colors.White,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  scLogTx: {
    width: '60%',
    fontSize: 20,
    color: Colors.White,
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: '20%',
  },
  forgetTx: {
    color: '#fff',
    width: '100%',
    fontSize: 20,
    textAlign: 'right',
    paddingRight: '5%',
    marginTop: 5,
  },

  googleImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    // alignSelf: 'flex-end',
  },

  loginBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: Colors.mainColor,
  },
  scLoginBtn: {
    height: 50,
    // justifyContent: 'center',
    alignItems: 'center',
    justifyContent:"center",
    borderRadius: 10,
    marginTop: 15,
    backgroundColor: Colors.mainColor,
    flexDirection: 'row',
  },
  googleBtn: {
    width: 44,
    height: 44,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginLeft: 20,
    marginRight: 20,
  },
});
