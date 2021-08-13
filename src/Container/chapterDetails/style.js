import {StyleSheet} from 'react-native';

import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.drkWhite,
  },
  detailsheading: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    marginRight: '3%',
  },
  emptyTopVw: {
    backgroundColor: Colors.headerColor,
    padding: 15,
  },
  subContainer: {
    width: '94%',
    marginLeft: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    // elevation: 1,
    marginBottom: 20,
    // marginLeft: '3%',
    marginRight: '3%',
    borderRadius: 10,
    borderWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
  },
  //********************* Text ************************ */

  totalTx: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  nameTx: {
    width: '54%',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: '3%',
  },
  txCourse: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  floatBtn: {
    position: 'absolute',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: Colors.mainColor,
    borderRadius: 10,
  },
  floatImg: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});
