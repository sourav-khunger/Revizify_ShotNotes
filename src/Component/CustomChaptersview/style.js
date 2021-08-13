/* eslint-disable prettier/prettier */
import {
  Platform,
  StyleSheet,
} from 'react-native';

export const style = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    marginBottom: 20,
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 15,
    borderWidth: 1,
  },
  subContainer:{
    width: '100%',
    alignItems: 'center',
     flexDirection:'row',
  },
  mainVw: {
    width: '85%',
    paddingTop: '2%',
    paddingBottom: '2%',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? '1%' : '1%',
    flexDirection: 'row',
  },
  mainsubVw:{
    width: '100%',
    paddingTop: '2%',
    paddingBottom: '2%',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? '1%' : '1%',
    flexDirection: 'row',
  },
  menuVw: {
    height: '100%',
    marginLeft: '1%',
    flexDirection: 'row',
  },
  menuImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  headerNameTx: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerNameTx1: {
    width:'70%',
    fontWeight: 'bold',
    fontSize: 20,
  },
  editBtn: {
    width:'15%',
    justifyContent:'center',
    alignItems:'center',
  },
  editImg: {
    height:30,
    width:30,
    resizeMode: 'contain',
  },
  desTx: {
    width:'90%',
    padding:2,
    fontSize:14,
    marginLeft:'5%',
  },
  desVw:{
    width:'95%',
    flexDirection:'row',
    marginBottom:10,
  },
  moreTx:{
    fontSize:16,
    fontWeight:'bold',
  },
});
