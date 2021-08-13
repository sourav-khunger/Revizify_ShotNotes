/* eslint-disable no-unused-vars */
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: '7%',
    borderRadius: 20,
    height: '86%',
    width: '100%',
    paddingLeft: 50,
    backgroundColor: 'red',
  },
  secondContainer: {
    borderRadius: 20,
    height: '91%',
    width: '100%',
    backgroundColor: '#2B2639',
    paddingTop: 10,
  },
  commonBtn: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 5,
    height: 25,
    minWidth: 50,
    alignItems: 'center',
    paddingLeft: 25,
  },
  crossBtnView: {
    backgroundColor: '#262C38',
    alignSelf: 'center',
    padding: 12,
    borderRadius: 50,
    marginTop: 5,
  },
  commonTxt: {
    color: '#FFFFFF',
    fontSize: 15,
    paddingLeft: 10,
  },
  commonImgCross: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  sideMenuVw: {
    width: '80%',
    height: '80%',
    backgroundColor: '#40E0D0',
  },
});
