import {StyleSheet} from 'react-native';

import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems:'center',
    // justifyContent:'center',
    backgroundColor: Colors.drkWhite,
  },
  coursesVw: {
    width: '100%',
    // height:'15%',
    // backgroundColor:'#7FB3D5',
    flexDirection: 'row',
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
  coursdataVw: {
    width: '50%',
    padding: '3%',
    // height:'100%',
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
    backgroundColor: Colors.headerColor,
    padding: 15,
  },
  emptyVw: {
    padding: 1,
    backgroundColor: 'black',
    width: '100%',
    marginTop: 1,
  },
  isEmptyView: {
    width: '100%',
    height: '84%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.drkWhite,
  },
  searchVW: {
    width: '100%',
    height: 50,
    marginBottom: 20,
  },
  searchInputVW: {
    width: '96%',
    height: '96%',
    margin: '2%',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'lightgray',
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
    fontSize: 18,
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
  },
  floatImg: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});
