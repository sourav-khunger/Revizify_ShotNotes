import {StyleSheet} from 'react-native';

import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.drkWhite,
  },
  emptyTopVw: {
    width: '100%',
    backgroundColor: Colors.headerColor,
    padding: 15,
  },
  aboutTx: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    padding: 5,
    // fontFamily: font.Chunk,
    fontSize: 18,
    marginTop: '5%',
  },
});
