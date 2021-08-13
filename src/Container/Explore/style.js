import {StyleSheet} from 'react-native';

import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems:'center',
    // justifyContent:'center'
    backgroundColor: Colors.drkWhite,
  },
  coursesVw: {
    width: '100%',
    // height:'15%',
    // 
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
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'lightgray',
  },
  isEmptyView: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 20,
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
});
