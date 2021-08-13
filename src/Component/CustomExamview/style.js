import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  mainVw: {
    width: '94%',
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,

    marginBottom: 20,
    marginLeft: '3%',
    marginRight: '3%',
    borderRadius: 15,
    borderWidth: 2,
    flexDirection: 'row',
    paddingTop:2
  },
  subMainVw: {
    width: '100%',
  },
  mainSbVw: {
    width: '85%',
  },
  courseVw: {
    flexDirection: 'row',
    
    width: '96%',
    marginLeft: '2%',
    marginRight: '2%',
  },
  cardVw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '94%',
    margin: '1%',
    marginLeft: '4%',
  },

  emptyVw: {
    padding: 1,
    backgroundColor: 'black',
    width: '106%',
    marginTop: 1,
  },
  courseImgVw: {
    height: 40,
    width: 40,
    borderRadius: 40,
    marginTop: 5,
  },

  //******************* Image ********************* */

  courseImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 40,
  },
  sellerImg: {
    height: 40,
    width: 40,
    resizeMode: 'cover',
    position: 'absolute',
    top: 5,
    right: 4,
  },

  //******************** Text ************************ */

  nameTx: {
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cardTx: {
    fontSize: 15,
  },
  ratingTx: {
    fontSize: 15,
    width: '95%',
    textAlign: 'right',
    marginRight: '5%',
  },
  byTx: {
    fontSize: 16,
    // fontWeight: 'bold',
    fontStyle:'italic',
    paddingLeft: 50,
    marginLeft: '2%',
    marginRight: '2%',
    width: '96%',
  },
  editBtn: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  downloadVw: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadVws: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
