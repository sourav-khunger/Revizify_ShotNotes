import {StyleSheet} from 'react-native';

import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.drkWhite,
  },
  emptyTopVw: {
    backgroundColor: Colors.headerColor,
    padding: 15,
  },
  tcTx: {
    width: '90%',
    marginTop: 10,
    marginLeft: '5%',
    fontSize: 17,
    // fontFamily: font.Chunk,
  },
  tcTxs: {
    width: '90%',
    marginTop: 5,
    marginLeft: '5%',
    fontSize: 17,
    // fontFamily: font.Chunk,
  },
  termsTx: {
    width: '100%',
    marginTop: '5%',
    marginLeft: '5%',
    fontSize: 22,
    color: Colors.mainColor,
  },
  popupView: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  headingTXX: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },

  cancelBtn: {
    width: '10%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 20,
  },
  cancelImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: 'white',
  },
});
