/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-community/async-storage';

import CustomHeader from '../../Component/CustomHeader';
import CustomQuestionView from '../../Component/CustomQuestionView';
import {
  allCardApi,
  deleteCardApi,
} from '../../Redux/ReduxAPIHandler/CardApi';
import Images from '../../Resources/Images';
import {style} from './style';

class AllCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      isSearch: false,
      data: [],
      allData: [],
      allMyData: [],
      isLoading: false,
      allDataMessage: 'No card found',
      noOfLength: 0,
      noOfItem: 0,
    };
    this.inputRef = React.createRef();
    this.current = true;
  }
  componentDidMount = () => {
    // console.log('badfhjdhjf1111',JSON.stringify(this.props.route.params.item.chapter_name))
    this.props.navigation.addListener('blur', (event) => {
      this.current = false;
    });
    this.props.navigation.addListener('focus', (event) => {
      this.current = true;
      this.getuser();
    });
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
    this.getuser();
  };

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  keyboardDidHide = () => {
    if (this.current) {
      if (
        this.inputRef.current == undefined ||
        this.inputRef.current.isFocused == undefined
          ? false
          : this.inputRef.current.isFocused
      ) {
        this.inputRef.current.blur();
        return true;
      }
      return false;
    }
  };
  // ****************************** getUserData ******************************
  getuser = () => {
    AsyncStorage.getItem('loginData')
      .then((res) => {
        this.setState({...this.state, data: JSON.parse(res)});
        console.log('LoginData>>>', JSON.parse(res));
        this.getAllQuestion();
      })
      .catch((error) => {
        console.log('LoginData Error>>>', JSON.stringify(error));
      });
  };
  // ****************************** getAllQuestion ******************************

  getAllQuestion = async () => {
    this.setState({...this.setState, isLoading: true});
    try {
      let allCard = await allCardApi({
        token: this.state.data.jwt,
        id: this.props.route.params.item.chapter_id,
      });
      if (allCard.success == 1) {
        let dataAll = allCard.data == undefined ? [] : allCard.data;
        let highestToLowest = dataAll.sort((a, b) => a.card_id - b.card_id);
        let totalLength = highestToLowest.length;
        let avgLength =
          totalLength == 0 ? 0 : totalLength < 20 ? 0 : totalLength / 20;
        this.setState({
          ...this.state,
          allData: highestToLowest == undefined ? [] : highestToLowest,
          allMyData: highestToLowest == undefined ? [] : highestToLowest,
          noOfLength: parseInt(avgLength),
          isLoading: false,
        });
      } else {
        this.setState({
          ...this.state,
          allData: allCard.data == undefined ? [] : allCard.data,
          allMyData: allCard.data == undefined ? [] : allCard.data,
          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({...this.setState, isLoading: false});
      console.log('error>>>', error);
    }
  };

  // ****************************** searchData ******************************
  searchData = (text) => {
    // console.log(text)
    this.setState({searchText: text, allData: this.state.allMyData});

    // alert('here')
    if (text.length >= 1) {
      let data = this.state.allMyData.filter((item) => {
        if (item.card_question.toLowerCase().match(text.toLowerCase())) {
          return item;
        }
      });

      if (data == undefined || data.length == 0) {
        this.setState({...this.state, allData: [], searchText: text});
      } else {
        this.setState({...this.state, searchText: text, allData: data});
      }
    }
  };
  closeSearch = () => {
    if (this.state.searchText == '') {
      this.setState({
        ...this.state,
        allData: this.state.allMyData,
        searchText: '',
        isSearch: false,
      });
    } else {
      this.setState({
        ...this.state,
        allData: this.state.allMyData,
        searchText: '',
      });
    }
  };
  deleteCard = async ({index, id}) => {
    Alert.alert(
      'Are you sure to delete this card?',
      '',
      [
        {
          text: 'NO',
          onPress: () => {},
        },
        {
          text: 'YES',
          onPress: () => this.deleteCardDetails({index, id}),
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };
  deleteCardDetails = async ({index, id}) => {
    try {
      let deleteCardData = await deleteCardApi({
        token: this.state.data.jwt,
        card_id: id,
        user_id: this.state.data.id,
      });
      // console.log('delete card its', JSON.stringify(deleteCardData))
      let newData = this.state.allMyData;
      newData.splice(Number(index), 1);
      this.setState({...this.state, allData: newData});
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={style.container}>
        <View style={style.emptyTopVw} />
        <CustomHeader
          title={'CARDS'}
          image={Images.leftArrow}
          rightImage={Images.searchIcon}
          leftBtn={() => this.props.navigation.goBack()}
          searchItem={() => this.setState({isSearch: !this.state.isSearch})}
        />
        {this.state.isSearch ? (
          <View style={style.searchVW}>
            <View style={style.searchInputVW}>
              <Image
                style={[style.searchImg, {marginLeft: 10}]}
                source={require('../allCard/Assets/searchIcon.png')}
              />
              <TextInput
                onChangeText={(text) => this.searchData(text)}
                value={this.state.searchText}
                style={style.searchInout}
                placeholder={'Search question'}
                ref={this.inputRef}
              />
              <TouchableOpacity
                style={{marginRight: 10}}
                onPress={() => {
                  this.closeSearch();
                }}>
                <Image style={[style.searchImg]} source={Images.cencel} />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {this.state.allData.length == 0 ? (
          <View style={style.isEmptyView}>
            <Text style={style.noTx}>{this.state.allDataMessage} </Text>
          </View>
        ) : (
          <ScrollView>
            {this.state.allData.map((item, index) => {
              if (this.state.noOfLength == 0) {
                console.log('here')
                return (
                  <CustomQuestionView
                    onPress={() =>
                      this.props.navigation.navigate('FlipCart', {
                        id: this.props.route.params.item.chapter_id,
                        cIndex: index,
                        isFirst: true,
                        isOpen: this.props.route.params.isOpen,
                        cName: this.props.route.params.item.chapter_name,
                        cardId: item.card_id,
                      })
                    }
                    isBookmark={item.bookmark_status}
                    key={index}
                    item={item.card_question}
                    image={Images.card}
                    isEdit={this.props.route.params.editCard}
                    editCard={() =>
                      this.props.navigation.navigate('EditCard', {
                        cardId: item.card_id,
                        chapter_id: this.props.route.params.item.chapter_id,
                      })
                    }
                    deleteCard={() => {
                      this.deleteCard({index, id: item.card_id});
                    }}
                  />
                );
              } 
              else if(this.state.noOfItem != this.state.noOfLength) {
                if(this.state.noOfItem == 0){
                  if (20 > index) {

                    return (
                      <CustomQuestionView
                        onPress={() =>
                          this.props.navigation.navigate('FlipCart', {
                            id: this.props.route.params.item.chapter_id,
                            cIndex: index,
                            isFirst: true,
                            isOpen: this.props.route.params.isOpen,
                            cName: this.props.route.params.item.chapter_name,
                            cardId: item.card_id,
                          })
                        }
                        isBookmark={item.bookmark_status}
                        key={index}
                        item={item.card_question}
                        image={Images.card}
                        isEdit={this.props.route.params.editCard}
                        editCard={() =>
                          this.props.navigation.navigate('EditCard', {
                            cardId: item.card_id,
                            chapter_id: this.props.route.params.item.chapter_id,
                          })
                        }
                        deleteCard={() => {
                          this.deleteCard({index, id: item.card_id});
                        }}
                      />
                    );
                   
                  }

                }
                else {
                  if (Number(this.state.noOfItem) * 20 > index) {

                    return (
                      <CustomQuestionView
                        onPress={() =>
                          this.props.navigation.navigate('FlipCart', {
                            id: this.props.route.params.item.chapter_id,
                            cIndex: index,
                            isFirst: true,
                            isOpen: this.props.route.params.isOpen,
                            cName: this.props.route.params.item.chapter_name,
                            cardId: item.card_id,
                          })
                        }
                        isBookmark={item.bookmark_status}
                        key={index}
                        item={item.card_question}
                        image={Images.card}
                        isEdit={this.props.route.params.editCard}
                        editCard={() =>
                          this.props.navigation.navigate('EditCard', {
                            cardId: item.card_id,
                            chapter_id: this.props.route.params.item.chapter_id,
                          })
                        }
                        deleteCard={() => {
                          this.deleteCard({index, id: item.card_id});
                        }}
                      />
                    );
                   
                  }
                }
                
                }
                else {
                  console.log('here11')
                    return (
                      <CustomQuestionView
                        onPress={() =>
                          this.props.navigation.navigate('FlipCart', {
                            id: this.props.route.params.item.chapter_id,
                            cIndex: index,
                            isFirst: true,
                            isOpen: this.props.route.params.isOpen,
                            cName: this.props.route.params.item.chapter_name,
                            cardId: item.card_id,
                          })
                        }
                        isBookmark={item.bookmark_status}
                        key={index}
                        item={item.card_question}
                        image={Images.card}
                        isEdit={this.props.route.params.editCard}
                        editCard={() =>
                          this.props.navigation.navigate('EditCard', {
                            cardId: item.card_id,
                            chapter_id: this.props.route.params.item.chapter_id,
                          })
                        }
                        deleteCard={() => {
                          this.deleteCard({index, id: item.card_id});
                        }}
                      />
                    );
              }
            })}
            <View style={{padding: 5}} />

            {this.state.allData == undefined ? null : this.state.noOfLength ==
          0 ? null : (
          <View style={style.allVw}>
            {this.state.noOfLength <= 0 ? null : this.state.allData.length -
                Number(this.state.noOfItem) * 20 <
              20 ? null : (
              <Text
                style={style.allTx}
                onPress={() =>
                  this.setState({
                    ...this.state,
                    noOfItem: this.state.noOfItem == 0 ? this.state.noOfItem + 2 : this.state.noOfItem + 1,
                  })
                }>
                {'View More'}
              </Text>
            )}
            {this.state.noOfItem > 0 ? (
              <Text
                style={style.allTx}
                onPress={() =>
                  this.setState({
                    ...this.state,
                    noOfItem: this.state.noOfItem == 2 ? 0 : this.state.noOfItem - 1 ,
                  })
                }>
                {'View Less'}
              </Text>
            ) : null}
          </View>
        )}
          </ScrollView>
        )}


        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.isLoading}>
          <View style={style.popupView}>
            {this.state.isLoading ? (
              <ActivityIndicator size="large" color="#ffffff" />
            ) : null}
          </View>
        </Modal>
      </View>
    );
  }
}

export default AllCard;
