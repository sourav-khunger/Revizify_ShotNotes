import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  mainVw: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 10,
    justifyContent: 'center',
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
  },
  saveVw: {
    width: 30,
    height: 30,
    marginLeft: '1%',
    marginRight: '1%',
  },

  // *********************** Text **************************

  questionText: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },

  // ******************* Image ********************************

  saveImg: {
    width: 30,
    height: 30,
    // marginLeft: '5%',
    marginRight: '2%',
    resizeMode: 'contain',
  },
  saveImg1: {
    width: 30,
    height: 30,
    marginLeft: '1%',
    marginRight: '1%',
    resizeMode: 'contain',
    // backgroundColor: 'pink',
  },

  editBtn: {
    width: '12%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
