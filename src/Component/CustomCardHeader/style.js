/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  subHeader: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
  headerImg: {
    height: '100%',
    width: '10%',
    resizeMode: 'contain',
  },
  headerTitleTx: {
    width: '80%',
    textAlign: 'center',
  },
});
