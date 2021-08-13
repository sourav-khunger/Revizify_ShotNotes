import {StyleSheet} from 'react-native';

import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.drkWhite,
  },
  mainVw: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    alignItems: 'center',
  },
  emptyTopVw: {
    backgroundColor: Colors.headerColor,
    padding: 15,
    width: '100%',
  },
  detailsVw: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupView1: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },

  subContainer: {
    width: '90%',
    height: 250,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  ratingUsVw: {
    width: '100%',
    flexDirection: 'row',
    // padding:10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputVw: {
    width: '100%',
    alignItems: 'center',
  },
  searchVW: {
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
  searchInputVW: {
    width: '96%',
    height: '96%',
    margin: '2%',
    borderWidth: 1,
    // borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'lightgray',
  },

  // ****************************** Image *******************************

  profileImg: {
    width: 100,
    height: 100,
    //   resizeMode:'contain',
    borderRadius: 100,
    marginTop: 50,
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

  // ****************************** Text *******************************

  nameTx: {
    width: '35%',
    height: '100%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  nameTx1: {
    width: '33%',
    height: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    // backgroundColor: 'yellow',
  },
  namesTx: {
    width: '63%',
    height: '100%',
    fontSize: 16,
    marginLeft: '2%',
  },
  allfeedbackTx: {
    width: '100%',
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  giveTx: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  mainfeedbackTx: {
    width: '100%',
    padding: 5,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  ratingTx: {
    width: '35%',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: '5%',
  },
  allTx: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginRight: '5%',
    textDecorationLine: 'underline',
    color: Colors.headerColor,
  },
  noCourseTx: {
    fontWeight: 'bold',
  },
  // ****************************** Button *******************************
  giveBtn: {
    backgroundColor: Colors.mainColor,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 20,
    borderRadius: 5,
  },

  ratingsVw: {
    width: '50%',
    marginLeft: '10%',
    // backgroundcolor:'pink'
  },

  submitBtn: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 30,
    backgroundColor: Colors.mainColor,
  },
  ratingVw: {
    width: '40%',
    // height:'100%',
    marginRight: '27%',
    // backgroundColor: 'red',
  },
});
