import {StyleSheet} from 'react-native';

import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    // height: 900,
    borderBottomColor: Colors.drkWhite,
  },
  coursesVw: {
    width: '100%',
    // height:'15%',
    // backgroundColor:'#7FB3D5',
    borderBottomColor: Colors.drkWhite,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -1,
  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupView11: {
    // flex: 1,
    // // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  emptyTopVw: {
    backgroundColor: Colors.headerColor,
    padding: 15,
  },
  coursdataVw: {
    width: '33.33333333%',
    padding: '3%',
    height: 60,
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
    width: '100%',
    marginTop: 1,
  },
  searchVW: {
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
  searchInputVW: {
    width: '94%',
    height: '96%',
    margin: '3%',
    borderWidth: 1,
    // borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'lightgray',
  },
  isEmptyView: {
    width: '100%',
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  workVw: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: Colors.drkWhite,
    borderRadius: 10,
  },

  //********************************* Image ******************************
  img: {
    height: 100,
    width: 100,
  },
  searchImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  searchInout: {
    width: '80%',
    height: '100%',
    fontSize: 15,
    marginLeft: 5,
  },

  //*********************Text ***************************************

  numberTx: {
    fontSize: 18,
    color: Colors.Black,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  deleteTx: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  txCourse: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.White,
  },
  noTx: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tcTx: {
    width: '90%',
    marginTop: 10,
    marginLeft: '5%',
    fontSize: 17,
    // fontFamily: font.Chunk,
  },
  headerTx: {
    width: '90%',
    // marginTop: 20,
    fontSize: 20,
    marginLeft: '5%',
    fontWeight: 'bold',
  },
  //********************* Button ***************************************
  floatBtn: {
    position: 'absolute',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: Colors.mainColor,
    borderRadius: 10,
    flexDirection: 'row',
    width: 120,
    height: 50,
  },
  floatImg: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  seImg: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
    marginRight: 5,
  },
  cancelBtn1: {
    width: '10%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 20,
  },
  cancelBtn11: {
    width: '10%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  cancelImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});
