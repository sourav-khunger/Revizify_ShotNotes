/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  vwMain: {
    height: 120,
    marginTop: 10,
    overflow: 'scroll',
  },
  mainScroll: {
    width: '86%',
    flex: 1,
  },
  mainVw: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textVw: {
    width: '100%',
    padding: 5,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  pdfImg: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
   nameTx: {
    width: '76%',
  },
  btnAttach: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachImg: {
    height: '60%',
    width: '60%',
    resizeMode: 'contain',
    tintColor: 'black',
  },
 
});
