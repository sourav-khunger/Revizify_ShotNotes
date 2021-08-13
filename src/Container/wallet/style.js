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
  detailsVw: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  circleVw: {
    height: 20,
    width: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },
  selectView: {
    width: '90%',
    flexDirection: 'row',
    padding: 5,
  },
  nameTx: {
    width: '70%',
    height: '100%',
    fontSize: 18,
    fontWeight: 'bold',
  },
  namesTx: {
    width: '28%',
    height: '100%',
    fontSize: 16,
    marginLeft: '2%',
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
  amountTx: {
    padding: 5,
    fontSize: 18,
  },
  otherTx: {
    fontSize: 16,
  },
  giveTx: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountVw: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    borderWidth: 1,
    borderRadius: 10,
  },
  txInVw: {
    margin: 5,
    height: 40,
    width: 200,
    borderWidth: 1,
  },
  amountTxIn: {
    width: '100%',
    height: '100%',
  },
  errMsg: {
    color: 'red',
    fontSize: 16,
    marginLeft: 5,
    width: '95%',
  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MsgTx: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: '10%',
  },
});
