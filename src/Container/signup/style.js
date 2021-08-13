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
  socialVw: {
    flexDirection: 'row',
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTopVw: {
    padding: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 15,
    width: '98%',
  },
  agreeVW: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tcView: {
    width: '90%',
    height: '90%',
    backgroundColor: Colors.drkWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //********************************* Image ******************************
  img: {
    height: 150,
    width: 150,
    marginTop: 20,
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
    textAlign: 'center',
    fontWeight: 'bold',
    // fontSize: 25,
    color: Colors.White,
  },
  logTx1: {
    fontSize: 20,
    // textAlign: 'center',
    fontWeight: 'bold',
    // fontSize: 25,
    color: Colors.White,
  },
  tcTx: {
    width: '90%',
    marginTop: 10,
    marginLeft: '5%',
    fontSize: 18,
    // fontFamily: font.Chunk,
  },
  tcTxs: {
    width: '90%',
    marginTop: 5,
    marginLeft: '5%',
    fontSize: 18,
    // fontFamily: font.Chunk,
  },
  termsTx: {
    width: '100%',
    marginTop: '5%',
    marginLeft: '5%',
    fontSize: 22,
    color: Colors.mainColor,
  },
  agreeMsg: {
    fontSize: 15,
    color: Colors.Black,
  },
  agreeLink: {
    fontSize: 15,
    color: Colors.mainColor,
  },

  googleImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  checkImg: {
    width: 8,
    height: 8,
    resizeMode: 'contain',
    tintColor: Colors.Black,
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
  scLogTx: {
    width: '60%',
    fontSize: 20,
    color: Colors.White,
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: '20%',
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
  checkBoxView: {
    borderColor: Colors.Black,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    marginRight: 10,
    height: 15,
    width: 15,
  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsVw: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  agreeBtn: {
    marginLeft: '10%',
    marginRight: '10%',
    height: 50,
    width: '30%',
    backgroundColor: Colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
