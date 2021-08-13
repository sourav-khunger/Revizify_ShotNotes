import {StyleSheet} from 'react-native';

import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.drkWhite,
  },
  loginBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 50,
    backgroundColor: Colors.mainColor,
    position: 'absolute',
    bottom: 20,
  },
  emptyTopVw: {
    width: '100%',
    backgroundColor: Colors.headerColor,
    padding: 15,
  },
  logTx: {
    width: '100%',
    fontSize: 25,
    color: Colors.White,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
