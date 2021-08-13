/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-return-assign */
/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
import React, {Component} from 'react';

import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Platform,
  ScrollView,
  Slider,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import FastImage from 'react-native-fast-image';
import FlipComponent from 'react-native-flip-component';
import ImageZoom from 'react-native-image-pan-zoom';
import Pdf from 'react-native-pdf';
import Carousel from 'react-native-snap-carousel';
import {WebView} from 'react-native-webview';

import AsyncStorage from '@react-native-community/async-storage';

// SoundPlayer
import CustomAnswerFooterVw from '../../Component/CustomAnswerFooterVw';
import CustomCardHeader from '../../Component/CustomCardHeader';
import CustomHeader from '../../Component/CustomHeader';
import CustomQuestionFooterVw from '../../Component/CustomQuestionFooterVw';
import {
  allCardApi,
  bookMarkApi,
} from '../../Redux/ReduxAPIHandler/CardApi';
import Images from '../../Resources/Images';
import Answer from '../answer';
import {style} from './style';

const audioRecorderPlayer = new AudioRecorderPlayer();
var Sound = require('react-native-sound');
var SCREEN_WIDTH = Dimensions.get('window').width;

// Enable playback in silence mode
Sound.setCategory('Playback');
var duration = 0;
var playSeconds = 0;
let fliped = false;
class FlipCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnswer: false,
      allCardData: [],
      isFlipped: false,
      isIndex: 0,
      data: [],
      isLoading: false,
      questionData: {},
      isQPdf: false,
      qPdfUrl: '',
      pdfName: '',
      audioName: '',
      imageUri: '',
      isQImage: false,
      isAudio: false,
      isColor: false,
      isFirst: false,
      audioUri: '',
      isCardIds: 111,
      playState: 'paused', //playing, paused
      playSeconds: 0,
      duration: 0,
      isCardId: 5555555555555,
      isBookmark: '',
      isVideo: false,
      videoUri: '',
      index: 0,
      backgroundColor: 'transparent',
      opacity: new Animated.Value(0),
      isAudioShow: false,
      isaudioLoading: false,
    };
    this.spinValue = new Animated.Value(0);
    this.sliderEditing = false;
    this.myRef = React.createRef();
    this.flatListRef = React.createRef();
    this._carousel = React.createRef();

  }
  componentDidMount = () => {
    this.setState({
      index: this.props.route.params.cIndex,
      isFirst: this.props.route.params.isFirst,
      isColor: !this.state.isColor,
      isCardIds: this.props.route.params.cardId,
    });
    this.getuser();
    this.props.navigation.addListener('blur', (event) => {});
    this.props.navigation.addListener('focus', (event) => {
      this.getuser();
    });

  };

  getuser = () => {
    // console.log('badfhjdhjf',JSON.stringify(this.props.route.params.cName))
    AsyncStorage.getItem('loginData')
      .then((res) => {
        this.setState({...this.state, data: JSON.parse(res)});
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
        id: this.props.route.params.id,
      });
      if (allCard.success == 1) {
        let highestToLowest = allCard.data.sort(
          (a, b) => a.card_id - b.card_id,
        );
        this.setState({
          ...this.state,
          allCardData: highestToLowest,
          isCardId: highestToLowest[0].card_id,
        },()=>this.showLoader());
        
      } else {
        this.setState({
          ...this.state,
          allData: allCard.data,
          allMyData: allCard.data,
          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({...this.setState, isLoading: false});
      console.log('error>>>', error);
    }
  };

  showLoader = () => {
    let updatedList = this.state.allCardData.map((itemss) => {
                if (itemss.card_id == this.state.allCardData[this.props.route.params.cIndex].card_id) {
                  return {
                    ...itemss,
                    isAnswer: false,
                  };
                }
                if (this.props.route.params.cIndex == 0 ){
                  if (itemss.card_id == this.state.allCardData[this.props.route.params.cIndex+1].card_id) {
                  return {
                    ...itemss,
                    isAnswer: false,
                  };
                  }
                }
                else if (this.props.route.params.cIndex + 1 != this.state.allCardData.length) {
                  if (this.state.allCardData.length > 1 && this.state.allCardData.length > 3 ) {

                    if (itemss.card_id == this.state.allCardData[this.props.route.params.cIndex + 1].card_id) {
                  return {
                    ...itemss,
                    isAnswer: false,
                  };
                }
                if (itemss.card_id == this.state.allCardData[this.props.route.params.cIndex -1].card_id) {
                  return {
                    ...itemss,
                    isAnswer: false,
                  };
                }

                  }
                }
                else {
                  if (itemss.card_id == this.state.allCardData[this.props.route.params.cIndex-1].card_id) {
                  return {
                    ...itemss,
                    isAnswer: false,
                  };
                }
                }
                return itemss
    })
    setTimeout(() => {
      this.setState({...this.setState,  allCardData: updatedList,isLoading: false});
    }, 300);
    // this.setISFirst();
  };


  // setISFirst =()=> {
  //   // setTimeout(() => {
  //   //   this.setState({...this.setState, isFirst: false,,});
  //   // }, 1000);
    
  // }
  updateAllQuestion = async () => {
    try {
      let allCard = await allCardApi({
        token: this.state.data.jwt,
        id: this.props.route.params.id,
      });
      if (allCard.success == 1) {
        this.setState({
          ...this.state,
          allCardData: allCard.data,
          isCardId: allCard.data[0].card_id,
          isLoading: false,
        });
      } else {
        this.setState({
          ...this.state,
          allData: allCard.data,
          allMyData: allCard.data,
          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({...this.setState, isLoading: false});
      console.log('error>>>', error);
    }
  };
  playAudio = async (data) => {
    this.plays();
    this.timeout = setInterval(() => {
      if (
        this.sound &&
        this.sound.isLoaded() &&
        this.state.playState == 'playing' &&
        !this.sliderEditing
      ) {
        this.sound.getCurrentTime((seconds, isPlaying) => {
          this.setState(state =>({playSeconds: seconds}));
          // this.setState({playSeconds : seconds})
        //  playSeconds = seconds
        });
      }
    }, 600);
  };

  componentWillUnmount() {
    if (this.sound) {
      this.sound.release();
      this.sound = null;
    }
    if (this.timeout) {
      clearInterval(this.timeout);
    }
  }

  getAudioTimeString(seconds) {
    const h = parseInt(seconds / (60 * 60));
    const m = parseInt((seconds % (60 * 60)) / 60);
    const s = parseInt(seconds % 60);

    return (
      (h < 10 ? '0' + h : h) +
      ':' +
      (m < 10 ? '0' + m : m) +
      ':' +
      (s < 10 ? '0' + s : s)
    );
  }

  stops = async () => {};
  bookmarkSaveData = async (data) => {
    try {
      let sbookmark = await bookMarkApi({
        token: this.state.data.jwt,
        card_id: data.card_id,
        status: data.bookmark_status == 'true' ? 'false' : 'true',
      });
      let updatedList = this.state.allCardData.map((itemss) => {
        if (itemss.card_id == data.card_id) {
          return {
            ...itemss,
            bookmark_status: data.bookmark_status == 'true' ? 'false' : 'true',
          };
        }
        return itemss;
      });
      this.setState({...this.state, allCardData: updatedList});
      // this.updateAllQuestion();
    } catch (error) {
      console.log('error>>', JSON.stringify(error));
    }
  };

  onSliderEditStart = () => {
    this.sliderEditing = true;
  };
  onSliderEditEnd = () => {
    this.sliderEditing = false;
  };
  onSliderEditing = async (value) => {
    if (this.sound) {
      this.sound.setCurrentTime(value);
      // playSeconds = value;
        this.setState({...this.state,playSeconds : value})
    }
  };

  plays = async () => {
    
      this.setState({...this.state, playState: 'playing'});
      let uri = this.state.audioUri;
      console.log('[Play]', uri);
      this.sound = new Sound(uri, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          this.setState({playState: 'paused'});
        } else {
          this.setState({
            playState: 'playing',
            duration: this.sound.getDuration(),
          });
          this.sound.play(this.playComplete);
        }
      });
  };

  playComplete = (success) => {
    if (this.sound) {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        // Alert.alert('Notice', 'audio file error. (Error code : 2)');
        this.sound.release();
      }
      this.setState({playState: 'paused',playSeconds : 0});
      // playSeconds = 0
      this.sound.setCurrentTime(0);
    }
  };

  pauses = async () => {
    if (this.sound) {
      this.sound.pause();
    }
    this.setState({playState: 'paused'});
  };

  jumpPrev15Seconds = () => {
    this.jumpSeconds(-15);
  };
  jumpNext15Seconds = () => {
    this.jumpSeconds(15);
  };
  jumpSeconds = (secsDelta) => {
    if (this.sound) {
      this.sound.getCurrentTime((secs, isPlaying) => {
        let nextSecs = secs + secsDelta;
        if (nextSecs < 0) {
          nextSecs = 0;
        } else if (nextSecs > this.state.duration) {
          this.setState({...this.state, nextSecs: this.state.duration});
          nextSecs = this.state.duration;
        }
        this.sound.setCurrentTime(nextSecs);
        this.setState({playSeconds : nextSecs});
      });
    }
  };


  render() {
    const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    const durationString = this.getAudioTimeString(this.state.duration);
    return (
      <View style={style.container}>
        <View style={style.emptyTopVw} />
        <CustomHeader
          title={this.props.route.params.cName}
          image={Images.leftArrow}
          leftBtn={() => {
            this.props.navigation.goBack();
          }}
          searchItem={() => {}}
        />
        {this.state.isLoading ? (
          <View />
        ) : (
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            data={this.state.allCardData}
            initialNumToRender={100}
            lockScrollTimeoutDuration={20000}
            removeClippedSubviews={false}
            onSnapToItem={(index) => {
              fliped = false;
              // this.pause();
              let updatedList = this.state.allCardData.map((itemss) => {
                if (itemss.card_id == this.state.allCardData[index].card_id) {
                  return {
                    ...itemss,
                    isAnswer: false,
                  };
                }
                if (this.state.allCardData.length != index + 1) {
                  if (
                    (itemss.card_id ==
                      this.state.allCardData[index + 1].card_id) ==
                    undefined
                      ? this.state.allCardData[index].card_id
                      : this.state.allCardData[index + 1].card_id
                  ) {
                    return {
                      ...itemss,
                      isAnswer: false,
                    };
                  }
                }
                if (
                  (itemss.card_id ==
                    this.state.allCardData[index - 1].card_id) ==
                  undefined
                    ? this.state.allCardData[index].card_id
                    : this.state.allCardData[index - 1].card_id
                ) {
                  return {
                    ...itemss,
                    isAnswer: false,
                  };
                }
                return itemss;
              });

              this.setState({
                ...this.state,
                allCardData: updatedList,
                isFlipped: false,
                isAnswer: false,
                isAudioShow: false,
                isCardIds: this.state.allCardData[index].card_id,
                isFirst: false,
              });
            }}
            firstItem={this.state.index}
            renderItem={({item, index}) => (
              <View style={[style.mainVw]}>
                <FlipComponent
                  isFlipped={!this.state.isFirst ? item.isAnswer : false}
                  frontView={
                    <View style={[style.containerq, {height: '100%'}]}>
                      {!this.state.isFirst ? (
                        <View style={[style.containerq]}>
                          <View style={[style.upperVw, {marginTop:20}]}>
                            <CustomCardHeader title={'Question/Front side'} />
                            <ScrollView>
                              <Text
                                // onPress={() => this.props.textVw()}
                                style={style.questionTx}>
                                {item.card_question}
                              </Text>

                              {item.card_question_image == undefined ||
                              item.card_question.length == 0 ? null : (
                                <View style={style.queImageVw}>
                                  <FlatList
                                    data={item.card_question_image}
                                    horizontal={false}
                                    numColumns={3}
                                    renderItem={({item}) => (
                                      <TouchableOpacity
                                        style={style.ImgBtn}
                                        onPress={() =>
                                          this.setState({
                                            ...this.state,
                                            isQImage: true,
                                            imageUri:
                                              item.card_question_image_url,
                                          })
                                        }>
                                        <FastImage
                                          style={style.imgQuestion}
                                          source={{
                                            uri: item.card_question_image_url,
                                          }}
                                        />
                                      </TouchableOpacity>
                                    )}
                                  />
                                </View>
                              )}

                              {item.card_question_pdf == undefined ||
                              item.card_question.length == 0 ? null : (
                                <View style={style.queImageVw2}>
                                  <FlatList
                                    data={item.card_question_pdf}
                                    horizontal={false}
                                    numColumns={3}
                                    renderItem={({item, index}) => (
                                      <TouchableOpacity
                                        onPress={() =>
                                          this.setState({
                                            ...this.state,
                                            isQPdf: true,
                                            qPdfUrl: item.card_question_pdf_url,
                                            pdfName:
                                              item.card_question_pdf_name,
                                          })
                                        }
                                        style={[
                                          style.textVw,
                                          {
                                            marginBottom: 4,
                                            marginTop: 4,
                                          },
                                        ]}>
                                        <FastImage
                                          source={Images.pdf}
                                          style={style.pdfImg}
                                          resizeMode={'contain'}
                                        />
                                        <Text
                                          numberOfLines={2}
                                          style={style.nameTx}>
                                          {item.card_question_pdf_name == ''
                                            ? 'XYZ'
                                            : item.card_question_pdf_name}
                                        </Text>
                                      </TouchableOpacity>
                                    )}
                                  />
                                </View>
                              )}

                              {item.card_question_audio == undefined ||
                              item.card_question_audio.length == 0 ? null : (
                                <View style={style.queImageVw2}>
                                  <FlatList
                                    data={item.card_question_audio}
                                    horizontal={false}
                                    numColumns={3}
                                    renderItem={({item, index}) => (
                                      <TouchableOpacity
                                        style={[
                                          style.textVw,
                                          {
                                            marginBottom: 4,
                                            marginTop: 4,
                                          },
                                        ]}
                                        onPress={() => {
                                          
                                          this.setState(
                                            {
                                              ...this.state,
                                              isAudio: true,
                                              audioUri:
                                                item.card_question_audio_url,
                                              audioName:
                                                item.card_question_audio_name,
                                              isaudioLoading: true,
                                            },
                                            () => {
                                              this.playAudio();
                                            },
                                          );
                                        }}>
                                        <FastImage
                                          source={Images.audio}
                                          style={style.pdfImg}
                                          resizeMode={'contain'}
                                        />
                                        <Text
                                          numberOfLines={2}
                                          style={style.nameTx}>
                                          {item.card_question_audio_name == ''
                                            ? 'XYZ'
                                            : item.card_question_audio_name}
                                        </Text>
                                      </TouchableOpacity>
                                    )}
                                  />
                                </View>
                              )}

                              {item.card_question_video == undefined ||
                              item.card_question_video.length == 0 ? null : (
                                <View style={style.queImageVw2}>
                                  <FlatList
                                    data={item.card_question_video}
                                    horizontal={false}
                                    numColumns={3}
                                    renderItem={({item, index}) => (
                                      <TouchableOpacity
                                        style={[
                                          style.textVw,
                                          {
                                            marginBottom: 4,
                                            marginTop: 4,
                                          },
                                        ]}
                                        onPress={() => {
                                          this.setState({
                                            ...this.state,
                                            isVideo: true,
                                            videoUri:
                                              item.card_question_video_url,
                                          });
                                        }}>
                                        <FastImage
                                          source={Images.play}
                                          style={style.pdfImg}
                                          resizeMode={'contain'}
                                        />
                                        <Text
                                          numberOfLines={2}
                                          style={style.nameTx}>
                                          {item.card_question_video_name == ''
                                            ? 'XYZ'
                                            : item.card_question_video_name}
                                        </Text>
                                      </TouchableOpacity>
                                    )}
                                  />
                                </View>
                              )}
                            </ScrollView>
                          </View>
                        </View>
                      ) : this.state.index == index ? (
                        <View style={[style.containerq]}>
                          <View style={[style.upperVw, {marginTop: 20}]}>
                            <CustomCardHeader title={'Question/Front side'} />
                            <ScrollView>
                              <Text style={style.questionTx}>
                                {item.card_question}
                              </Text>

                              {item.card_question_image == undefined ||
                              item.card_question.length == 0 ? null : (
                                <View style={style.queImageVw}>
                                  <FlatList
                                    data={item.card_question_image}
                                    horizontal={false}
                                    numColumns={3}
                                    renderItem={({item}) => (
                                      <TouchableOpacity
                                        style={style.ImgBtn}
                                        onPress={() =>
                                          this.setState({
                                            ...this.state,
                                            isQImage: true,
                                            imageUri:
                                              item.card_question_image_url,
                                          })
                                        }>
                                        {console.log(
                                          'dhsfh',
                                          item.card_question_image_url,
                                        )}
                                        <FastImage
                                          style={style.imgQuestion}
                                          source={{
                                            uri: item.card_question_image_url,
                                          }}
                                        />
                                      </TouchableOpacity>
                                    )}
                                  />
                                </View>
                              )}

                              {item.card_question_pdf == undefined ||
                              item.card_question.length == 0 ? null : (
                                <View style={style.queImageVw2}>
                                  <FlatList
                                    data={item.card_question_pdf}
                                    horizontal={false}
                                    numColumns={3}
                                    renderItem={({item, index}) => (
                                      <TouchableOpacity
                                        onPress={() =>
                                          this.setState({
                                            ...this.state,
                                            isQPdf: true,
                                            qPdfUrl: item.card_question_pdf_url,
                                            pdfName:
                                              item.card_question_pdf_name,
                                          })
                                        }
                                        style={[
                                          style.textVw,
                                          {
                                            marginBottom: 4,
                                            marginTop: 4,
                                          },
                                        ]}>
                                        <FastImage
                                          source={Images.pdf}
                                          style={style.pdfImg}
                                          resizeMode={'contain'}
                                        />
                                        <Text
                                          numberOfLines={2}
                                          style={style.nameTx}>
                                          {item.card_question_pdf_name == ''
                                            ? 'XYZ'
                                            : item.card_question_pdf_name}
                                        </Text>
                                      </TouchableOpacity>
                                    )}
                                  />
                                </View>
                              )}

                              {item.card_question_audio == undefined ||
                              item.card_question_audio.length == 0 ? null : (
                                <View style={style.queImageVw2}>
                                  <FlatList
                                    data={item.card_question_audio}
                                    horizontal={false}
                                    numColumns={3}
                                    renderItem={({item, index}) => (
                                      <TouchableOpacity
                                        style={[
                                          style.textVw,
                                          {
                                            marginBottom: 4,
                                            marginTop: 4,
                                          },
                                        ]}
                                        onPress={() => {
                                          this.setState(
                                            {
                                              ...this.state,
                                              isAudio: true,
                                              audioUri:
                                                item.card_question_audio_url,
                                              audioName:
                                                item.card_question_audio_name,
                                              isaudioLoading: true,
                                            },
                                            () => this.playAudio(),
                                          );
                                        }}>
                                        <FastImage
                                          source={Images.audio}
                                          style={style.pdfImg}
                                          resizeMode={'contain'}
                                        />
                                        <Text
                                          numberOfLines={2}
                                          style={style.nameTx}>
                                          {item.card_question_audio_name == ''
                                            ? 'XYZ'
                                            : item.card_question_audio_name}
                                        </Text>
                                      </TouchableOpacity>
                                    )}
                                  />
                                </View>
                              )}

                              {item.card_question_video == undefined ||
                              item.card_question_video.length == 0 ? null : (
                                <View style={style.queImageVw2}>
                                  <FlatList
                                    data={item.card_question_video}
                                    horizontal={false}
                                    numColumns={3}
                                    renderItem={({item, index}) => (
                                      <TouchableOpacity
                                        style={[
                                          style.textVw,
                                          {
                                            marginBottom: 4,
                                            marginTop: 4,
                                          },
                                        ]}
                                        onPress={() => {
                                          this.setState({
                                            ...this.state,
                                            isVideo: true,
                                            videoUri:
                                              item.card_question_video_url,
                                          });
                                        }}>
                                        <FastImage
                                          source={Images.play}
                                          style={style.pdfImg}
                                          resizeMode={'contain'}
                                        />
                                        <Text
                                          numberOfLines={2}
                                          style={style.nameTx}>
                                          {item.card_question_video_name == ''
                                            ? 'XYZ'
                                            : item.card_question_video_name}
                                        </Text>
                                      </TouchableOpacity>
                                    )}
                                  />
                                </View>
                              )}
                            </ScrollView>
                          </View>
                        </View>
                      ) : null}
                      <View style={{height: 100}} />
                    </View>
                  }
                  backView={
                    <Answer
                      data={item}
                      changeData={this.state.isFlipped}
                      isAudioView={false}
                      saveData={this.props.route.params.isOpen}
                    />
                  }
                />

                <View style={style.footerVw}>
                  {item.card_id == this.state.isCardIds ? (
                    this.state.isAnswer ? (
                      <CustomAnswerFooterVw
                        onPress={() => {
                          let updatedList = this.state.allCardData.map(
                            (itemss) => {
                              if (itemss.card_id == this.state.isCardIds) {
                                return {
                                  ...itemss,
                                  isAnswer: false,
                                };
                              }
                              return itemss;
                            },
                          );

                          this.setState({
                            ...this.state,
                            allCardData: updatedList,
                            isAnswer: false,
                            isFlipped: false,
                            isAudioShow: false,
                            isCardIds: item.card_id,
                            isFirst: false,
                          });
                        }}
                        // rightClick={() => this.updateQuestionStatus()}
                        // cancel={() => this.cancelQuestion()}
                        isRight={false}
                        saveImage={
                          item.bookmark_status == 'true'
                            ? Images.save_Bookmark
                            : Images.bookmark
                        }
                        disabled={false}
                        saveBookMark={() => {
                          this.bookmarkSaveData(item);
                        }}
                      />
                    ) : (
                      <CustomQuestionFooterVw
                        onPress={() => {
                          let updatedList = this.state.allCardData.map(
                            (itemss) => {
                              if (itemss.card_id == this.state.isCardIds) {
                                return {
                                  ...itemss,
                                  isAnswer: true,
                                };
                              }
                              return itemss;
                            },
                          );
                          this.setState({
                            ...this.state,
                            allCardData: updatedList,
                            isAnswer: true,
                            isFlipped: true,
                            isAudioShow: false,
                            isCardIds: item.card_id,
                            isFirst: false,
                          });
                        }}
                        saveImage={
                          item.bookmark_status == 'true'
                            ? Images.save_Bookmark
                            : Images.bookmark
                        }
                        disabled={false}
                        saveBookMark={() => {
                          this.bookmarkSaveData(item);
                        }}
                      />
                    )
                  ) : (
                    <CustomQuestionFooterVw
                      onPress={() => {
                        let updatedList = this.state.allCardData.map(
                          (itemss) => {
                            if (itemss.card_id == this.state.isCardIds) {
                              return {
                                ...itemss,
                                isAnswer: true,
                              };
                            }
                            return itemss;
                          },
                        );
                        this.setState({
                          ...this.state,
                          allCardData: updatedList,
                          isAnswer: true,
                          isFlipped: true,
                          isAudioShow: false,
                          isCardIds: item.card_id,
                          isFirst: false,
                        });
                      }}
                      saveImage={
                        item.bookmark_status == 'true'
                          ? Images.save_Bookmark
                          : Images.bookmark
                      }
                      disabled={false}
                      saveBookMark={() => {
                        this.bookmarkSaveData(item);
                      }}
                    />
                  )}
                </View>
              </View>
            )}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
          />
        )}
        {/* ***************************  Video Modal  *************************** */}
        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => this.setState({...this.state, isVideo: false})}
          visible={this.state.isVideo}>
          <View style={style.popupView}>
            <View
              style={{width: '90%', height: '90%', justifyContent: 'center'}}>
              <WebView source={{uri: this.state.videoUri}} />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.setState({...this.state, isVideo: false});
              }}
              style={style.cancelBtn}>
              <Image
                style={style.cancelImg}
                source={require('./Assets/cancel.png')}
              />
            </TouchableOpacity>
          </View>
        </Modal>

        {/* ***************************  Loading Modal  *************************** */}
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

        {/* ***************************  Pdf Modal  *************************** */}
        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() =>
            this.setState({...this.state, isQPdf: false, qPdfUrl: ''})
          }
          visible={this.state.isQPdf}>
          <View style={style.popupView}>
            <View style={{width: '90%', height: '90%', marginTop: -25}}>
              <Text style={style.pdfNameTx}>{this.state.pdfName}</Text>
              <Pdf
                source={{uri: this.state.qPdfUrl}}
                onLoadComplete={(numberOfPages, filePath) => {}}
                onPageChanged={(page, numberOfPages) => {}}
                onError={(error) => {
                  console.log(error);
                }}
                onPressLink={(uri) => {}}
                style={style.pdf}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.setState({...this.state, isQPdf: false, qPdfUrl: ''});
              }}
              style={style.cancelBtn}>
              <Image
                style={style.cancelImg}
                source={require('./Assets/cancel.png')}
              />
            </TouchableOpacity>
          </View>
        </Modal>

        {/* ***************************  Image Modal  *************************** */}
        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() =>
            this.setState({...this.state, isQImage: false, imageUri: ''})
          }
          visible={this.state.isQImage}>
          <View style={style.popupView}>
            <ImageZoom
              cropWidth={Dimensions.get('window').width}
              cropHeight={Dimensions.get('window').height}
              imageWidth={400}
              imageHeight={600}>
              <Image
                style={style.imageVw}
                source={{uri: this.state.imageUri}}
              />
            </ImageZoom>
            <TouchableOpacity
              onPress={() => {
                this.setState({...this.state, isQImage: false, imageUri: ''});
              }}
              style={style.cancelBtn}>
              <Image
                style={style.cancelImg}
                source={require('./Assets/cancel.png')}
              />
            </TouchableOpacity>
          </View>
        </Modal>

        {/* ***************************  Audio Modal  *************************** */}
        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() =>
            this.setState({
              ...this.state,
              isAudio: false,
              audioUri: '',
              isAudioShow: this.state.playState === 'paused' ? false : true,
            })
          }
          visible={this.state.isAudio}>
          <View
            style={[style.popupView1, {backgroundColor: 'rgba(0, 0, 0, 0.8)'}]}>
            <View style={style.audioVw}>
              <Image
                source={require('../allCard/Assets/ui_speaker.png')}
                style={style.spImg}
              />
              <View style={style.btnView}>
                <TouchableOpacity
                  onPress={() => this.jumpPrev15Seconds()}
                  style={style.jumpBtn}>
                  <Image
                    source={require('../allCard/Assets/ui_playjumpleft.png')}
                    style={style.jumpImg}
                  />
                  <Text style={style.jumpTx}>15</Text>
                </TouchableOpacity>
                {/* {this.state.playState == 'playing' && (
                  
                )} */}
                {this.state.playState == 'paused' ? (
                  <TouchableOpacity
                    onPress={this.plays}
                    style={style.pusBtn}>
                    <Image
                      source={require('../allCard/Assets/ui_play.png')}
                      style={style.jumpImg}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={this.pauses}
                    style={style.pusBtn}>
                    <Image
                      source={require('../allCard/Assets/ui_pause.png')}
                      style={style.jumpImg}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => this.jumpNext15Seconds()}
                  style={style.jumpBtn}>
                  <Image
                    source={require('../allCard/Assets/ui_playjumpright.png')}
                    style={style.jumpImg}
                  />
                  <Text style={style.jumpTx}>15</Text>
                </TouchableOpacity>
              </View>
              <View style={style.slideVw}>
                <Text style={style.secondTx}>{currentTimeString}</Text>
                <Slider
                  onTouchStart={this.onSliderEditStart}
                  onTouchEnd={this.onSliderEditEnd}
                  onValueChange={this.onSliderEditing}
                  value={this.state.playSeconds}
                  maximumValue={this.state.duration}
                  maximumTrackTintColor="gray"
                  minimumTrackTintColor="white"
                  thumbTintColor="white"
                  style={{
                    flex: 1,
                    alignSelf: 'center',
                    marginHorizontal: Platform.select({ios: 5}),
                  }}
                />
                <Text style={style.secondTx}>{durationString}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    ...this.state,
                    isAudio: false,
                    audioUri: '',
                    isAudioShow:
                      this.state.playState === 'paused' ? false : true,
                    playSeconds: this.state.playState === 'paused' ?0:this.state.playSeconds,
                  });
                }}
                style={style.cancelBtn}>
                <Image
                  style={style.cancelImg}
                  source={require('./Assets/cancel.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {this.state.isAudioShow ? (
          <View
            style={{
              width: '100%',
              height: 50,
              backgroundColor: 'black',
              position: 'absolute',
              bottom: 100,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.state.playState === 'paused'
                  ? this.plays()
                  : this.pauses();
              }}
              style={{
                width: '10%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '5%',
              }}>
              <Image
                style={{
                  height: 40,
                  width: 40,
                  resizeMode: 'contain',
                  tintColor: 'white',
                }}
                source={
                  this.state.playState === 'paused'
                    ? require('../allCard/Assets/ui_play.png')
                    : require('../allCard/Assets/ui_pause.png')
                }
              />
            </TouchableOpacity>

            <Text
              style={{
                width: '70%',
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
              }}
              numberOfLines={1}>
              {this.state.audioName}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.pauses();
                this.setState({
                  ...this.state,
                  isAudioShow: false,
                  audioUri: '',
                  playSeconds:0,
                });
              }}
              style={{
                width: '10%',
                height: 40,
                marginRight: '5%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: 40,
                  width: 40,
                  resizeMode: 'contain',
                  tintColor: 'white',
                }}
                source={require('./Assets/cancel.png')}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}

export default FlipCard;
