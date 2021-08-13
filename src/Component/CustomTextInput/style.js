import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  mainVw: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    // borderColor: 'white',
    width: '100%',
    borderRadius: 5,
    marginTop: 10,
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },

  image: {
    marginLeft: 24,
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  imgIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginLeft: 10,
    tintColor: 'black',
  },
  textINP: {
    marginLeft: 12,
    color: 'black',
    // height: '100%',
    fontSize: 18,
    includeFontPadding: false,
    paddingVertical: 7,
  },
});
