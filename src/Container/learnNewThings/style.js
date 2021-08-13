/* eslint-disable prettier/prettier */
import {
  Dimensions,
  StyleSheet,
} from 'react-native';

import Colors from '../../Resources/Colors';

const { width } = Dimensions.get('window');
export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.drkWhite,
  },
  subContainer:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
  },

  wrapper: {
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  },
  slide1: {
    width: '80%',
    height: '80%',
    margin: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:Colors.drkWhite,
  },
  slide2: {
    // flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#FA8072',
    backgroundColor: Colors.White,
  },
  text: {
    color: Colors.Black,
    fontSize: 50,
    fontWeight: 'bold',
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
  },
  text1: {
    color: Colors.Black,
    fontSize: 22,
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 10,
    // fontWeight: 'bold'
  },
  skipTx: {
    position: 'absolute',
    // top: -25,
    top: 40,
    right: '5%',
    fontSize: 22,
    height: 40,
    width: 70,
    textAlign: 'center',
    // backgroundColor: 'red',
    fontWeight: 'bold',
  },
  //   ****************************** Image *****************************
  avImg: {
    height: 320,
    width: '90%',
    resizeMode: 'contain',
    //   marginBottom:50,
    //   backgroundColor:'red'
  },
  backgroundVideo: {
    height:'100%',
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:Colors.drkWhite,
  },
});
