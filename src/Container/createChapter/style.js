/* eslint-disable eqeqeq */
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
  coursesVw: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  coursdataVw: {
    width: '50%',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vwCourse: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '96%',
    marginLeft: '2%',
    marginRight: '2%',
    padding: 5,
    marginBottom: 5,
  },
  emptyVw: {
    padding: 1,
    backgroundColor: 'black',
    marginTop: 1,
  },
  emptyTopVw: {
    backgroundColor: Colors.headerColor,
    padding: 15,
  },
  infoVW: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: Colors.headerColor,
    paddingBottom:'3%',
    paddingLeft:'5%',
    paddingRight:'5%',
    paddingTop:'3%',
    marginTop: '2%',
    opacity: 0.9,
  },
 popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardVw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    //  margin: '2%',
    paddingBottom:'2%',
    paddingLeft:'5%',
    paddingRight:'6%',
    paddingTop:'2%',
    backgroundColor: Colors.headerColor
  },

  //********************************* Image ******************************
  img: {
    height: 100,
    width: 100,
  },

  //*********************Text ***************************************

  numberTx: {
    fontSize: 18,
    color: Colors.Black,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  txCourse: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  byTx: {
    backgroundColor: Colors.headerColor,
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.White,
    paddingLeft: '30%',
    paddingRight: '10%',
    marginTop: '-1%',
    width:'100%',
    
    // textAlign:'center'
  },
  infoTx: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.White,
  },
  chaptersTx: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardTx:{
    fontSize:16,
    color:'white'
  },

  //********************* Button ***************************************

  //****************** Header View ********************* */
  mainVw: {
    width: '100%',
    height: 60,
    //justifyContent:'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft:'5%',
    paddingRight:'5%',
    backgroundColor: Colors.headerColor,
    marginTop: Platform.OS == 'ios' ? 30 : 0,
  },
  menuImgVw: {
    width: '5%',
    height: '100%',
  },
  courseImgVw: {
    width: 55,
    height: 50,
    marginLeft: '5%',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseImg1: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 50,
    backgroundColor:'white'
  },
  menuImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  courseImg: {
    width: '20%',
    height: '60%',
    resizeMode: 'contain',
    marginLeft: '2%',
  },
  headerNameTx: {
    fontWeight: 'bold',
    color: Colors.White,
    marginLeft: '3%',
    fontSize: 16,
    width: '42%',
    // textAlign: 'center',
  },
  newCardTx: {
    width: '35%',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.White,
  },

  floatBtn: {
    position: 'absolute',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: Colors.mainColor,
    borderRadius: 10,
  },
  floatImg: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});
