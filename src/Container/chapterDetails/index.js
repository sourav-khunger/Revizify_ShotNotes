/* eslint-disable radix */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import React from 'react';

/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';

import AsyncStorage from '@react-native-community/async-storage';

import CustomHeader from '../../Component/CustomHeader';
import {
  allCardApi,
  countDeckApi,
  resetRevisionApi,
} from '../../Redux/ReduxAPIHandler/CardApi';
import Images from '../../Resources/Images';
import {style} from './style';

export default class ChapterDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chapterData: [],
      allData: [],
      isLoading: false,
      data: [],
      AllRevisionData: {},
    };
  }

  componentDidMount = () => {
  //  console.log('LoginData>>>', JSON.stringify(this.props.route.params.item.chapter_name));
    this.getuser();
    this.props.navigation.addListener('blur', (event) => {
    });
    this.props.navigation.addListener('focus', (event) => {
      this.getuser();

    });
  }
  getuser = () => {
    AsyncStorage.getItem('loginData')
      .then((res) => {
        this.setState({ ...this.state, data: JSON.parse(res) });
        
        this.getAllQuestion();
        this.getDeckData();
      })
      .catch((error) => {
        console.log('LoginData Error>>>', JSON.stringify(error));
      });
  }
  // ****************************** getAllQuestion ******************************


  getAllQuestion = async () => {
    try {

      let allCard = await allCardApi({ token: this.state.data.jwt, id: this.props.route.params.item.chapter_id });
      if (allCard.success == 1) {
        this.setState({ ...this.state, allData: allCard.data == undefined ? [] : allCard.data, isLoading: false });
      }
      else {
        this.setState({ ...this.state, allData: allCard.data == undefined ? [] : allCard.data, allMyData: allCard.data == undefined ? [] : allCard.data, isLoading: false });
      }

    }
    catch (error) {
      this.setState({ ...this.setState, isLoading: false });
      console.log('error>>>', error);
    }
  }


  // ************************ GET ALL REVISION DATA API ************************

  getDeckData = async () => {
    try {
      
      let deckData = await countDeckApi({ token: this.state.data.jwt, id: this.props.route.params.item.chapter_id });
      console.log('deckData>>>>>>', deckData);
      this.setState({ ...this.state, AllRevisionData: deckData });
    }
    catch (error) {
      console.log('deckDataerror>>>>>>', error);
    }
  }

  emptyData=(data)=>{
    Alert.alert(
      data == 0 ? 'No card created by creator for this chapter' : 'No cards in this deck',
      '',
      [
        {
          text: 'Ok',
          onPress: () => {},
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
  }


  renderDeckView(item, total, progress, index, tt) {
    const percentage = tt == 0 ? 0 : (progress / tt) * 100;


    return (
      <TouchableOpacity style={style.subContainer} onPress={() =>{
        total == 0 ? this.emptyData(tt) :
         this.handleTap({index:index,isEmpty: parseInt(percentage)=== 0 ? true : false, isComplete: tt === total ? true : false});}}>
        <Text style={style.nameTx}>{item}</Text>
        <View style={style.detailsheading}>
          <Text style={style.totalTx}>{progress + '/' + total}</Text>
          <Text style={style.totalTx}>{parseInt(percentage) + '%'}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  handleTap = (index) => {
    switch (index.index) {
      case 0:
        this.props.navigation.navigate('NewDeck', { data: this.props.route.params.item, empty:index.isEmpty,index:index.index, cName: this.props.route.params.item.chapter_name,isFirst: true, });
        break;

      case 1:
        this.props.navigation.navigate('Revision', { data: this.props.route.params.item, type: 'first_revision', empty:index.isEmpty, index:index.index,isComplete:index.isComplete , cName: this.props.route.params.item.chapter_name, isFirst: true,});
        break;
      case 2:
        this.props.navigation.navigate('Revision', { data: this.props.route.params.item, type: 'second_revision', empty:index.isEmpty, index:index.index, isComplete:index.isComplete , cName: this.props.route.params.item.chapter_name, isFirst: true,});
        break;
      case 3:
        this.props.navigation.navigate('Revision', { data: this.props.route.params.item, type: 'third_revision', empty:index.isEmpty, index:index.index, isComplete:index.isComplete, cName: this.props.route.params.item.chapter_name, isFirst: true, });
        break;
      case 4:
        this.props.navigation.navigate('Revision', { data: this.props.route.params.item, type: 'fourth_revision',empty:index.isEmpty, index:index.index, isComplete:index.isComplete , cName: this.props.route.params.item.chapter_name, isFirst: true});
        break;

      default:
        break;
    }
  }

  resetRevision = async () => {
    Alert.alert(
      'Do you want to reset all decks?',
      '',
      [
        {
          text: 'NO',
          onPress: () => { },
        },
        {
          text: 'YES',
          onPress: () => this.revisionReset(),
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );

  }
  revisionReset = async () => {
    try {
      let revisionData = await resetRevisionApi({ token: this.state.data.jwt, id: this.props.route.params.item.chapter_id, userId: this.state.data.id });
      if (revisionData.success == 1) {
        SimpleToast.show(revisionData.message);
        this.getAllQuestion();
        this.getDeckData();
      }
      console.log('revisionData', revisionData);

    }
    catch (error) {
      console.log('deckDataerror>>>>>>', error);
    }
  }
  render() {
    const newDeckR = this.state.AllRevisionData.deck == undefined ? 0 : this.state.AllRevisionData.deck.revised_cards;
    const newDeckT = this.state.AllRevisionData.deck == undefined ? 0 : this.state.AllRevisionData.deck.total_cards;
    const firstRevisionR = this.state.AllRevisionData.first_revision == undefined ? 0 : this.state.AllRevisionData.first_revision.revised_cards;
    const firstRevisionT = this.state.AllRevisionData.first_revision == undefined ? 0 : this.state.AllRevisionData.first_revision.total_cards;
    const secondRevisionR = this.state.AllRevisionData.second_revision == undefined ? 0 : this.state.AllRevisionData.second_revision.revised_cards;
    const secondRevisionT = this.state.AllRevisionData.second_revision == undefined ? 0 : this.state.AllRevisionData.second_revision.total_cards;
    const thridRevisionR = this.state.AllRevisionData.third_revision == undefined ? 0 : this.state.AllRevisionData.third_revision.revised_cards;
    const thridRevisionT = this.state.AllRevisionData.third_revision == undefined ? 0 : this.state.AllRevisionData.third_revision.total_cards;
    const fourthRevisionR = this.state.AllRevisionData.fourth_revision == undefined ? 0 : this.state.AllRevisionData.fourth_revision.revised_cards;
    const fourthRevisionT = this.state.AllRevisionData.fourth_revision == undefined ? 0 : this.state.AllRevisionData.fourth_revision.total_cards;



    return (
      <View style={style.container}>
        <View style={style.emptyTopVw} />
        {/* ******************* Header ******************* */}
        <CustomHeader
          title={'Chapter: ' + this.props.route.params.item.chapter_name}
          image={Images.leftArrow}
          leftBtn={() => this.props.navigation.goBack()}
          searchItem={() => { }}
        />

        <View style={[style.detailsheading, { marginBottom: 10 }]}>
          <Text style={style.totalTx}>{'Total'}</Text>
          <Text style={style.totalTx}>{'Progress'}</Text>
        </View>

        <View>

          {this.renderDeckView('New Deck', newDeckT, newDeckR, 0, newDeckT)}
          {this.renderDeckView('1st Revision', firstRevisionT, firstRevisionR, 1, newDeckT)}
          {this.renderDeckView('2nd Revision', secondRevisionT, secondRevisionR, 2, newDeckT)}
          {this.renderDeckView('3rd Revision', thridRevisionT, thridRevisionR, 3, newDeckT)}
          {this.renderDeckView('4th Revision', fourthRevisionT, fourthRevisionR, 4, newDeckT)}
        </View>

        <TouchableOpacity style={[style.subContainer, { justifyContent: 'space-between' }]} onPress={() => { this.state.allData.length == 0 ? this.emptyData(0) : this.props.navigation.navigate('AllCard', { item: this.props.route.params.item, editCard: this.props.route.params.dataAdd, isOpen: false })}}>
          <Text style={[style.totalTx, { marginLeft: '3%' }]}>
            {'View all cards'}
          </Text>
          <Text style={[style.totalTx, { marginRight: '3%' }]}>
            {this.state.allData.length == 0 ? '0' : this.state.allData.length}
          </Text>
        </TouchableOpacity>
        {newDeckR != 0 ? <TouchableOpacity style={[style.subContainer, { justifyContent: 'center' }]} onPress={() => this.resetRevision()}>
          <Text style={[style.totalTx, { marginLeft: '3%' }]}>
            {'Reset All Revision'}
          </Text>
        </TouchableOpacity> : null}


        {/* ******************* Floating button  *******************   */}
        {this.props.route.params.dataAdd ? <TouchableOpacity
          style={style.floatBtn}
          onPress={() => this.props.navigation.navigate('AddCard', { item: this.props.route.params.item })}>
          <Text style={[style.txCourse]}>+ Add new card</Text>
        </TouchableOpacity> : null}

      </View>
    );
  }
}
