import {StyleSheet} from 'react-native';

import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.drkWhite,
  },
  inputVw: {
    width: '100%',
    height: 40,
  },
  vwInput: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
  },
  emptyTopVw: {
    backgroundColor: Colors.headerColor,
    padding: 15,
    width: '100%',
  },
  emptyVw: {
    width: '100%',
    backgroundColor: 'black',
  },
  profileImgVW: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  imgVw: {
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '5%',
    alignItems: 'center',
    width: '80%',
  },
  popupView1: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // ***************** Text **********************

  courseTx: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '5%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  desTx: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '5%',
    fontSize: 18,
  },
  logTx: {
    width: '100%',
    fontSize: 25,
    color: Colors.White,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  // *********************** Image *************************

  profileImg: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  editImg: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    resizeMode: 'contain',
  },

  // ************************ button ***************************

  editBtn: {
    backgroundColor: Colors.mainColor,
    height: 20,
    width: 20,
    borderRadius: 20,
    position: 'absolute',
    right: -8,
    bottom: 8,
  },
  loginBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 50,
    backgroundColor: Colors.mainColor,
  },

  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 50,
    color: '#000',
    padding: 10,
    margin: 40,
    borderWidth: 5,
    borderColor: '#9FA19C',
  },
  flashBtn: {
    width: '100%',
    height: 50,
    position: 'absolute',
    top: 0,
    // right:30
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recycleBtn: {
    width: 30,
    height: 50,
    position: 'absolute',
    bottom: 40,
    right: 40,

    justifyContent: 'center',
    alignItems: 'center',
  },
  fleshIcon: {
    height: 30,
    width: '100%',
    resizeMode: 'contain',
    tintColor: 'white',
  },
});