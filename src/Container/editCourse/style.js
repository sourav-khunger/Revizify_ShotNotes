/* eslint-disable prettier/prettier */
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
  emptyVw: {
    width: '100%',
    backgroundColor: 'black',
  },
  emptyTopVw: {
    width:'100%',
    backgroundColor: Colors.headerColor,
    padding: 15,
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
    flexDirection: 'row',
    width: '80%',
  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseTypeVw: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '10%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  accountVw:{
    width:'100%',
    flexDirection:'row',

  },
  popupView1: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  settingVw:{
    width: '80%',
    flexDirection: 'row',
    marginLeft: '10%',
    marginRight: '10%',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginTop: 20,
  },
  // ***************** Text **********************
  courseAccountTx: {
    width: '100%',

    marginTop: '5%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  prTx: {
    fontSize:25,
    textAlign:'center',
    fontWeight:'bold',
    marginRight:40,
  },
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
  accountTx:{
    fontSize:18,
    width:'100%',
    textAlign:'center',
    fontWeight:'bold',
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
  accountBtn:{
    width:'50%',
    justifyContent:'center',
    alignItems:'center',
    height:40,
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
    borderWidth:5,
    borderColor:'#9FA19C'
  },
  flashBtn:{
    width:'100%',
    height:50,
    position:'absolute',
    top:0,
    // right:30
    backgroundColor:'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fleshIcon:{
    height: 30,
    width: '100%',
    resizeMode: 'contain',
    tintColor:'white'
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

});
