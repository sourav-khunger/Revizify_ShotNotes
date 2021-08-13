/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  container: {
    width: '94%',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    // elevation: 1,
    marginBottom: 20,
    marginLeft: '3%',
    marginRight: '3%',
    // borderRadius: 20,
    borderWidth: 1,
    // flexDirection:'row'
  },
  
  ratingsVw:{
    width:'30%',
    // backgroundcolor:'pink'

  },
  courseRatingVw:{
      width:'100%',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      padding:5
  },

  // ************************* Text *****************************

  courseTx:{
      width:'70%',
      fontSize:20,
      fontWeight: 'bold'
  },
  feedTx:{
      width:'100%',
      padding:10,
      fontSize:16
  }
 
});
