import {StyleSheet} from 'react-native';

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
  emptyTopVw: {
    width: '100%',
    backgroundColor: Colors.headerColor,
    padding: 15,
  },
  emptyVw: {
    padding: 1,
    backgroundColor: 'black',
    marginTop: 1,
  },
  infoVW: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: Colors.headerColor,
    paddingTop: '3%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '3%',
    marginTop: '2%',
    opacity: 0.9,
  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chapterVw: {
    marginBottom: '5%',
    marginLeft: '5%',
    marginTop: '3%',
    marginRight: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vwPopup: {
    width: '80%',
    paddingTop: 50,
    paddingBottom: 50,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderRadius: 30,
  },
  btnVw: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  cardVw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    //  margin: '2%',
    paddingTop: '2%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '5%',
    backgroundColor: Colors.headerColor,
  },

  //********************************* Image ******************************
  img: {
    height: 100,
    width: 100,
  },
  editImg: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
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
    marginTop: -14,
    paddingRight: '10%',
    width: '100%',
  },
  infoTx: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.White,
  },
  chaptersTx: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  titlePopupTx: {
    width: '80%',
    // textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

  ammoutTx: {
    paddingLeft: 5,
    paddingRight: 5,
    // width: '80%',
    fontSize: 15,
    marginTop: 15,
    fontWeight: 'bold',
    color: Colors.White,
    backgroundColor: Colors.headerColor,
  },
  cardTx: {
    fontSize: 16,
    color: 'white',
  },

  //********************* Button ***************************************
  floatBtn: {
    position: 'absolute',
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#40E0D0',
    borderRadius: 40,
  },
  floatImg: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  buyBtn: {
    width: 80,
    height: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBtn: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  //****************** Header View ********************* */

  mainVw: {
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '5%',
    height: '10%',
    //justifyContent:'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.headerColor,
  },
  menuImgVw: {
    width: '5%',
    height: '100%',
  },
  courseImgVw: {
    width: 50,
    height: 50,
    marginLeft: '5%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  courseImg1: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 50,
    backgroundColor: 'white',
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
    marginLeft: '3.5%',
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
});
