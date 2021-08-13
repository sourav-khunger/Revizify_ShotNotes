import {StyleSheet} from 'react-native';

import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.drkWhite,
  },
  mainScroll: {
    width: '80%',
    flex: 1,
  },
  vwMain: {
    height: 120,
    marginTop: 10,
    overflow: 'scroll',
  },
  borderVw: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: '4%',
    overflow: 'hidden',
  },
  mainVw: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullVw: {
    // flex: 1,
    width: '90%',
  },
  emptyTopVw: {
    width: '100%',
    backgroundColor: Colors.headerColor,
    padding: 15,
  },
  upperVw: {
    width: '100%',
    height: 800,
    borderWidth: 1,
    alignItems: 'center',
  },
  questionVw: {
    width: '100%',
  },
  emptyVw: {
    width: '110%',
    backgroundColor: 'black',
  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupView1: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  vwPopup: {
    width: '80%',
    paddingTop: 50,
    paddingBottom: 50,
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderRadius: 30,
  },
  btnVw: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '15%',
  },
  inputVw: {
    width: '90%',
    height: '20%',
    borderWidth: 1,
    marginTop: 10,
  },
  subHeader: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    backgroundColor: 'lightgray',
    flexDirection: 'row',
  },
  addImageVw: {
    justifyContent: 'center',
  },
  textVw: {
    width: '80%',
    padding: 5,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  saveBtn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
    marginTop: '5%',
    marginBottom: '5%',
    borderRadius: 10,
  },

  // ******************* Button **********************

  attachmentBtn: {
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  buyBtn: {
    width: '40%',
    height: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtn: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 20,
    top: 20,
    // backgroundColor: 'black',
    // borderRadius: 30,
  },
  addBtn: {
    width: '50%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
  },
  attachBtn: {
    width: 15,
    height: 15,
    position: 'absolute',
    top: 3,
    right: 3,
    borderRadius: 15,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAttach: {
    width: 15,
    height: 15,
    // position: 'absolute',
    // top: 3,
    // right: 3,
    borderRadius: 15,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
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

  // ******************** Image **************************

  attachmentImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    tintColor: 'black',
  },
  attachImg: {
    height: '60%',
    width: '60%',
    resizeMode: 'contain',
    tintColor: 'black',
  },
  addImg: {
    height: 50,
    width: 50,
    resizeMode: 'cover',
  },
  pdfImg: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  headerImg: {
    height: '100%',
    width: '10%',
    resizeMode: 'contain',
  },
  fleshIcon: {
    height: 30,
    width: '100%',
    resizeMode: 'contain',
    tintColor: 'white',
  },

  // ********************** Text ******************************

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
  startTx: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  nameTx: {
    width: '76%',
  },
  headerTitleTx: {
    width: '80%',
    textAlign: 'center',
  },
  saveTx: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
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
});
