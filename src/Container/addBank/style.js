import {StyleSheet} from 'react-native';

import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.drkWhite,
  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtn: {
    height: 50,
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 50,
    backgroundColor: Colors.mainColor,
    // position: 'absolute',
    // bottom: 20,
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
