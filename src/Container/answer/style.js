/* eslint-disable prettier/prettier */
import {
  Dimensions,
  StyleSheet,
} from 'react-native';

import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    backgroundColor: Colors.drkWhite,
  },
  questionVw: {
    width: '80%',
    flexDirection: 'row',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 10,
  },
  footerVw: {
    width: '100%',
     height:120,
    position: 'absolute',
    bottom:-35,
    // backgroundColor:'red'
  },
  leftImgVw: {
    width: 60,
    height: '60%',
    borderRadius: 80,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5%',
  },
  bottomVw: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    justifyContent: 'space-between',
    // borderTopWidth: 1,
    backgroundColor: 'white',
  },
  emptyTopVw: {
    backgroundColor: Colors.headerColor,
    padding: 15,
  },
  bottomImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  queImageVw: {
    width: '92%',
    marginBottom: 20,
    marginRight:'4%',
    marginLeft:'4%',
  },
  upperVw: {
    width: '90%',
    height: Dimensions.get('window').height-200,
    marginLeft: '5%',
    marginRight: '5%',
    // backgroundColor:'red',
    borderWidth: 1,
    borderRadius:10,
    //  alignItems: 'center',
  },
  subHeader: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    backgroundColor: 'lightgray',
    flexDirection: 'row',
  },
  textVw: {
    width: '28%',
    height: 100,
    marginRight: '5%',

    alignItems: 'center',

  },
  popupView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    height: 1,
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
  },
  audioVw: {
    height:'50%',
    width:'90%',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  slideVw: {
    marginVertical: 15,
    marginHorizontal: 15,
    flexDirection: 'row',
  },

  // **********************  Text  *************************

  queTx: {
    width: '100%',
    backgroundColor: Colors.headerColor,
    height: 30,
    paddingLeft: '5%',
    color: Colors.White,
    fontSize: 20,
    fontWeight: 'bold',
  },
  questionTx: {
    width: '92%',
    padding: 5,
    paddingLeft: 10,
    margin: '4%',
    fontWeight: 'bold',
    borderWidth: 1,
    fontSize: 18,
    borderRadius:10,
    textAlignVertical: 'center',
    
  },
  optionTx: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  showTx: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitleTx: {
    width: '76%',
    textAlign: 'center',
  },
  imageTx: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: '5%',
    marginBottom: '2%',
    textDecorationLine: 'underline',
  },
  pdfImg: {
    height: '60%',
    width: '100%',
    resizeMode: 'contain',
  },
  nameTx: {
    width: '92%',
    textAlign: 'center',
    marginTop: 5,
  },
  pdfNameTx: {
    width: '100%',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
    color: 'white',
    backgroundColor: Colors.headerColor,
  },
  jumpTx: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 1,
    color: 'white',
    fontSize: 12,
  },
  secondTx: {
    color: 'white',
    alignSelf: 'center',
  },

  // ****************** Image *****************

  imgQuestion: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius:10,
  },
  headerImg: {
    height: '100%',
    width: '10%',
    marginLeft: '2%',
    resizeMode: 'contain',
  },
  spImg: {
    width: 150,
    height: 150,
    marginBottom: 15,
    alignSelf: 'center',
  },
  jumpImg: {
    width: 30,
    height: 30,
  },
  cancelImg: {
    height:20,
    width:20,
    resizeMode:'contain',
    tintColor:'white',
    },

  // **********************  Button  *************************

  ImgBtn: {
    height: 150,
    width: '28%',
    marginTop:20,
    marginLeft:'5%',
    borderRadius:10,
  },
  pdf: {
    width: '100%',
    height: '100%',
  },
  imageVw: {
    width: 400,
    height: 600,
    resizeMode: 'contain',
  },
  jumpBtn: {
    justifyContent: 'center',
  },
  pusBtn: {
    marginHorizontal: 20,
  },
  cancelBtn:{
    width:'10%',
    height:40,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:20,
    right:20,
  },
});
