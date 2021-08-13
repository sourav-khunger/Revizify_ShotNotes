import {StyleSheet} from 'react-native';

import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.drkWhite,
  },
  searchVW: {
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
  emptyTopVw: {
    width: '100%',
    backgroundColor: Colors.headerColor,
    padding: 15,
  },
  searchInputVW: {
    width: '96%',
    height: '96%',
    margin: '2%',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'lightgray',
  },
  isEmptyView: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  allVw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: '5%',
    marginBottom: 20,
  },

  // ************************ Image ************************

  searchImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },

  // *********************** Search Input *************************
  searchInout: {
    width: '80%',
    height: '100%',
    fontSize: 15,
    marginLeft: 5,
  },

  // ************************ Delete Text *************************

  deleteTx: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  noTx: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  allTx: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: Colors.headerColor,
    marginLeft: 10,
    marginRight: 10,
  },
});
