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
  headingTXX: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});
