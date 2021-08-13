/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import {
  ActivityIndicator,
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
import FastImage from 'react-native-fast-image';
import FlipComponent from 'react-native-flip-component';
import ImageZoom from 'react-native-image-pan-zoom';
import Pdf from 'react-native-pdf';
import SimpleToast from 'react-native-simple-toast';
import SwiperFlatList from 'react-native-swiper-flatlist';
import WebView from 'react-native-webview';

import AsyncStorage from '@react-native-community/async-storage';

import CustomAnswerFooterVw from '../../Component/CustomAnswerFooterVw';
import CustomCardHeader from '../../Component/CustomCardHeader';
import CustomHeader from '../../Component/CustomHeader';
import CustomQuestionFooterVw from '../../Component/CustomQuestionFooterVw';
import {
  bookMarkApi,
  revisionApi,
  updateRevisionApi,
} from '../../Redux/ReduxAPIHandler/CardApi';
import Images from '../../Resources/Images';
import Answer from '../answer';
import {style} from './style';

var Sound = require('react-native-sound');
var duration = 0;
var playSeconds = 0;
// Enable playback in silence mode
Sound.setCategory('Playback');

class Revision extends Component {
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
      imageUri: '',
      isQImage: false,
      isAudio: false,
      audioUri: '',
      playState: 'paused', //playing, paused
      playSeconds: 0,
      duration: 0,
      isVideo: false,
      videoUri: '',
      isAudioShow: false,
      audioName: '',
      isFirst: false,
    };
    this.sliderEditing = false;
    this.myRef = React.createRef();
    this.flatListRef = React.createRef();
  }
  componentDidMount = () => {
    this.setState({...this.state, isLoading: true});
    this.getuser();
    this.props.navigation.addListener('blur', (event) => {});
    this.props.navigation.addListener('focus', (event) => {
      this.getuser();
    });

    this.setState({...this.state,isFirst: this.props.route.params.isFirst});
  };
  getuser = () => {
    AsyncStorage.getItem('loginData')
      .then((res) => {
        this.setState({...this.state, data: JSON.parse(res)});
        this.getAllQuestion();
      })
      .catch((error) => {
        console.log('LoginData Error>>>', JSON.stringify(error));
        this.setState({...this.state, isLoading: false});
      });
  };
  // ****************************** getAllQuestion ******************************

  getAllQuestion = async () => {
    this.setState({...this.state, isLoading: true});
    try {
      let allCard = await revisionApi({
        token: this.state.data.jwt,
        id: this.props.route.params.data.chapter_id,
        type: this.props.route.params.type,
      });
      if (allCard.success == 1) {
        let dataAll= allCard.data == undefined ? [] : allCard.data;
        let highestToLowest = dataAll.sort((a, b) => a.card_id - b.card_id);
        this.setState({
          ...this.state,
          allCardData: highestToLowest == undefined ? [] : highestToLowest,
          isLoading: false,
        },()=>this.setData());
        // this.myRef.scrollToIndex({animated: true,
        //   index:this.props.route.params.cIndex})
      } else {
        this.setState({
          ...this.state,
          allMyData: allCard.data,
          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({...this.setState, isLoading: false});
      console.log('error>>>', error);
    }
  };

  setData =()=>{
    this.setState({...this.state, isCardIds: this.state.allCardData.length == 0 ? 0 : this.state.allCardData[0].card_id})
  }

  updateQuestionStatus = async () => {
    try {
      let updateResponse = await updateRevisionApi({
        token: this.state.data.jwt,
        card_id: this.state.allCardData[this.state.isIndex].card_id,
        type: this.props.route.params.type,
      });
      if (updateResponse.success == 1) {
        SimpleToast.show(updateResponse.message);
        let newData = this.state.allCardData;
        newData.splice(Number(this.state.isIndex), 1);
        // this.setState({ ...this.state, allCardData: newData, isFlipped: false, isAnswer: false });

        if (this.state.allCardData.length == 0) {
          this.setState({
            ...this.state,
            allCardData: newData,
            isFlipped: false,
            isAnswer: false,
          });
          this.props.navigation.goBack();
        } else {
          if (this.state.allCardData.length == Number(this.state.isIndex)) {
            this.myRef.scrollToIndex({
              animated: true,
              index: 0,
            });
            let updatedList = newData.map((itemss) => {
              if (itemss.card_id == newData[this.state.isIndex].card_id) {
                return {
                  ...itemss,
                  isAnswer: false,
                };
              }
              return itemss
            });
            this.setState({
              ...this.state,
              isFlipped: false,
              isAnswer: false,
              allCardData: updatedList,
              isCardIds: newData[this.state.isIndex].card_id,
            });
          } else {
            let updatedList = newData.map((itemss) => {
              if (itemss.card_id == newData[this.state.isIndex].card_id) {
                return {
                  ...itemss,
                  isAnswer: false,
                };
              }
              return itemss
            });

            this.setState({
              ...this.state,
              isFlipped: false,
              isAnswer: false,
              allCardData: updatedList,
              isCardIds: newData[this.state.isIndex].card_id,
            });
          }
        }
      } else {
        SimpleToast.show(updateResponse.message);
      }
    } catch (error) {
      console.log('error>>>', JSON.stringify(error));
    }
  };

  cancelQuestion = () => {
    if (this.state.allCardData.length == this.state.isIndex + 1) {
      this.props.navigation.goBack();
      this.setState({...this.state, isFlipped: false, isAnswer: false});
    } else {
      this.myRef.scrollToIndex({
        animated: true,
        index: this.state.isIndex + 1,
      });
      this.setState({...this.state, isFlipped: false, isAnswer: false});
    }
  };

  componentWillUnmount() {
    // this.setState({ ...this.state, isAudio: false, audioUri: '' })
    if (this.sound) {
      this.sound.release();
      this.sound = null;
    }
    if (this.timeout) {
      clearInterval(this.timeout);
    }
  }

  playAudio = async (data) => {
    this.play()

    this.timeout = setInterval(() => {
      if (
        this.sound &&
        this.sound.isLoaded() &&
        this.state.playState == 'playing' &&
        !this.sliderEditing
      ) {
        this.sound.getCurrentTime((seconds, isPlaying) => {
          this.setState(state =>({playSeconds: seconds}));
        });
      }
    }, 800);
  };

  onSliderEditStart = () => {
    this.sliderEditing = true;
  };
  onSliderEditEnd = () => {
    this.sliderEditing = false;
  };
  onSliderEditing = (value) => {
    if (this.sound) {
      this.sound.setCurrentTime(value);
    playSeconds= value;
    }
  };

  play = async () => {
    if (this.sound) {
      this.sound.play(this.playComplete);
      this.setState({playState: 'playing'});
    } else {
      const filepath = this.state.audioUri;
      console.log('[Play]', filepath);

      this.sound = new Sound(filepath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          // Alert.alert('Notice', 'audio file error. (Error code : 1)');
          this.setState({playState: 'paused'});
        } else {
          this.setState({
            playState: 'playing',
            
          });
          duration= this.sound.getDuration()
          this.sound.play(this.playComplete);
        }
      });
    }
  };
  playComplete = (success) => {
    if (this.sound) {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        // Alert.alert('Notice', 'audio file error. (Error code : 2)');
      }
      this.setState({playState: 'paused', });
      playSeconds= 0
      this.sound.setCurrentTime(0);
    }
  };

  pause = () => {
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
        } else if (nextSecs > duration) {
          nextSecs = duration;
        }
        this.sound.setCurrentTime(nextSecs);
       playSeconds= nextSecs
      });
    }
  };

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

  bookmarkSaveData = async (data) => {
    try {
      let sbookmark = await bookMarkApi({
        token: this.state.data.jwt,
        card_id: data.card_id,
        status: data.bookmark_status == 'true' ? 'false' : 'true',
      });
      // this.updateAllQuestion();
      let updatedList = this.state.allCardData.map((itemss) => {
              if (itemss.card_id == data.card_id) {
                return {
                  ...itemss,
                  bookmark_status: data.bookmark_status == 'true' ? 'false' : 'true',
                };
              }
              return itemss
      });
      this.setState({...this.state,allCardData: updatedList})

      console.log('sbookmark>>>', sbookmark);
    } catch (error) {
      console.log('error>>', JSON.stringify(error));
    }
  };

  updateAllQuestion = async () => {
    try {
      let allCard = await revisionApi({
        token: this.state.data.jwt,
        id: this.props.route.params.data.chapter_id,
        type: this.props.route.params.type,
      });
      if (allCard.success == 1) {
        this.setState({
          ...this.state,
          allCardData: allCard.data == undefined ? [] : allCard.data,
          isLoading: false,
        });
        console.log('data>>', allCard.data);
        this.myRef.scrollToIndex({
          animated: true,
          index: this.state.isIndex,
        });
      } else {
        this.setState({
          ...this.state,
          allMyData: allCard.data,
          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({...this.setState, isLoading: false});
      console.log('error>>>', error);
    }
  };

  render() {
    return (
      <View style={style.container}>
        <View style={style.emptyTopVw} />
        <CustomHeader
          title={this.props.route.params.cName}
          image={Images.leftArrow}
          leftBtn={() => this.props.navigation.goBack()}
          searchItem={() => {}}
        />
        {this.state.allCardData.length != 0 ? (
          <SwiperFlatList
            ref={(ref) => {
              this.myRef = ref;
            }}
            onChangeIndex={(index, prevIndex) => {
              // console.log('Index>>>', index)
              // console.log('this.state.allCardData[index].card_id>>>', this.state.allCardData[index], this.state.allCardData[index].card_id, this.state.allCardData)
              this.pause();
               let updatedList = this.state.allCardData.map((itemss) => {
              if (itemss.card_id == this.state.allCardData[index.index].card_id) {
                return {
                  ...itemss,
                  isAnswer: false,
                };
              }
              if(this.state.allCardData.length != index.index + 1) {
              if (itemss.card_id == this.state.allCardData[index.index + 1].card_id == undefined ? this.state.allCardData[index.index].card_id : this.state.allCardData[index.index + 1].card_id) {
                return {
                  ...itemss,
                  isAnswer: false,
                };
              }
              }
              if (itemss.card_id == this.state.allCardData[index.index - 1].card_id == undefined ? this.state.allCardData[index.index].card_id : this.state.allCardData[index.index - 1].card_id ) {
                return {
                  ...itemss,
                  isAnswer: false,
                };
              }
              return itemss;
            });
              this.setState({
                allCardData: updatedList,
                isIndex: index.index,
                isFlipped: false,
                isAnswer: false,
                isAudioShow: false,
                isCardIds: this.state.allCardData[index.index].card_id,
                isFirst: false,
              });
            }}>
            {this.state.allCardData.map((item, index) => (
              <View style={style.mainVw}>
                <FlipComponent
                  isFlipped={!this.state.isFirst ? item.isAnswer : false}
                  frontView={
                    <View style={style.containerq}>
                      <View style={[style.containerq]}>
                        <View style={[style.upperVw, {marginTop: 20}]}>
                          <CustomCardHeader title={'Question/Front side'} />
                          <ScrollView>
                            <Text
                              // onPress={() => this.props.textVw()}
                              style={style.questionTx}>
                              {item.card_question}
                            </Text>

                            {/* ***************************  Image View  *************************** */}
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
                            {/* ***************************  PDF View  *************************** */}
                            {item.card_question_pdf == undefined ||
                            item.card_question.length == 0 ? null : (
                              <View style={style.queImageVw}>
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
                                          pdfName: item.card_question_pdf_name,
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
                                        resizeMode= {'contain'}
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
                            {/* ***************************  AUDIO View  *************************** */}
                            {item.card_question_audio == undefined ||
                            item.card_question_audio.length == 0 ? null : (
                              <View style={style.queImageVw}>
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
                                      onPress={() =>
                                      { this.setState({...this.state,
                                              isAudio: true,
                                              audioUri:
                                                item.card_question_audio_url,
                                              audioName:
                                                item.card_question_audio_name,
                                              isaudioLoading: true},()=>this.playAudio())                                     }
                                      }>
                                      <FastImage
                                        source={Images.audio}
                                        style={style.pdfImg}
                                        resizeMode= {'contain'}
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
                            {/* ***************************  Video View  *************************** */}
                            {item.card_question_video == undefined ||
                            item.card_question_video.length == 0 ? null : (
                              <View style={style.queImageVw}>
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
                                        resizeMode= {'contain'}
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
                      <View style={{height: 100}} />
                    </View>
                  }
                  backView={
                    <Answer
                      data={item}
                      changeData={this.state.isFlipped}
                      isAudioView={true}
                    />
                  }
                />
                <View style={style.footerVw}>
                  {item.card_id == this.state.isCardIds ?   this.state.isAnswer ? (
                    <CustomAnswerFooterVw
                      onPress={() => {
                        let updatedList = this.state.allCardData.map((itemss) => {
                        if (itemss.card_id == this.state.isCardIds) {
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
                          isAnswer: false,
                          isFlipped: false,
                          isCardIds: item.card_id,
                          isFirst: false,
                        });
                      }}
                      rightClick={() => this.updateQuestionStatus()}
                      cancel={() => this.cancelQuestion()}
                      isRight={true}
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
                        let updatedList = this.state.allCardData.map((itemss) => {
                        if (itemss.card_id == this.state.isCardIds) {
                          return {
                            ...itemss,
                            isAnswer: true,
                          };
                        }
                        return itemss;
                      });
                        this.pause();
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
                  ): (
                    <CustomQuestionFooterVw
                      onPress={() => {
                        let updatedList = this.state.allCardData.map((itemss) => {
                        if (itemss.card_id == this.state.isCardIds) {
                          return {
                            ...itemss,
                            isAnswer: true,
                          };
                        }
                        return itemss;
                      });
                        this.pause();
                        this.setState({
                          ...this.state,
                          allCardData: updatedList,
                          isAnswer: true,
                          isFlipped: true,
                          isAudioShow: false,
                          isCardIds: item.card_id,
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
            ))}
          </SwiperFlatList>
        ) : (
          <View
            style={{
              width: '100%',
              height: '89%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {console.log('this.props.route.params.isComplete>>>', this.props.route.params)}
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                width: '90%',
                textAlign: 'center',
              }}>
              {this.state.isLoading ? null : this.props.route.params.isComplete
                ? this.props.route.params.index == 4
                  ? 'Revision of this course as per ‘the forgetting curve’ completed. Kindly reset all decks to start revision again.'
                  : 'All cards in this deck completed'
                : 'No cards in this deck '}
            </Text>
          </View>
        )}

        {/* {this.state.allCardData.length != 0 ?
        <View style={style.footerVw}>
          {this.state.isAnswer ? (
            <CustomAnswerFooterVw
              onPress={() => {
                this.setState({ ...this.state, isAnswer: false,isFlipped: false});
              }}
              rightClick={()=>this.updateQuestionStatus()}
              cancel={()=>this.cancelQuestion()}
              isRight={true}
            />
          ) : (
            <CustomQuestionFooterVw
              onPress={() => {
                this.setState({ ...this.state, isAnswer: true,isFlipped:true });
              }}
            />
          )}
        </View>
: null} */}
        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() =>
            this.setState({...this.state, isVideo: false, videoUri: ''})
          }
          visible={this.state.isVideo}>
          <View style={style.popupView}>
            <View style={{width: '90%', height: '90%'}}>
              <WebView source={{uri: this.state.videoUri}} />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.setState({...this.state, isVideo: false, videoUri: ''});
              }}
              style={style.cancelBtn}>
              <Image
                style={style.cancelImg}
                source={require('../FlipCard/Assets/cancel.png')}
              />
            </TouchableOpacity>
          </View>
        </Modal>
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
                onLoadComplete={(numberOfPages, filePath) => {
                  console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                  console.log(`current page: ${page}`);
                }}
                onError={(error) => {
                  console.log(error);
                }}
                onPressLink={(uri) => {
                  console.log(`Link presse: ${uri}`);
                }}
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
                source={require('../FlipCard/Assets/cancel.png')}
              />
            </TouchableOpacity>
          </View>
        </Modal>
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
                source={require('../FlipCard/Assets/cancel.png')}
              />
            </TouchableOpacity>
          </View>
        </Modal>
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
          <View style={style.popupView}>
            <View style={style.audioVw}>
              <Image
                source={require('../allCard/Assets/ui_speaker.png')}
                style={style.spImg}
              />
              <View style={style.btnView}>
                <TouchableOpacity
                  onPress={this.jumpPrev15Seconds}
                  style={style.jumpBtn}>
                  <Image
                    source={require('../allCard/Assets/ui_playjumpleft.png')}
                    style={style.jumpImg}
                  />
                  <Text style={style.jumpTx}>15</Text>
                </TouchableOpacity>
                {this.state.playState == 'playing' && (
                  <TouchableOpacity onPress={this.pause} style={style.pusBtn}>
                    <Image
                      source={require('../allCard/Assets/ui_pause.png')}
                      style={style.jumpImg}
                    />
                  </TouchableOpacity>
                )}
                {this.state.playState == 'paused' && (
                  <TouchableOpacity onPress={this.play} style={style.pusBtn}>
                    <Image
                      source={require('../allCard/Assets/ui_play.png')}
                      style={style.jumpImg}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={this.jumpNext15Seconds}
                  style={style.jumpBtn}>
                  <Image
                    source={require('../allCard/Assets/ui_playjumpright.png')}
                    style={style.jumpImg}
                  />
                  <Text style={style.jumpTx}>15</Text>
                </TouchableOpacity>
              </View>
              <View style={style.slideVw}>
                <Text style={style.secondTx}>
                  {this.getAudioTimeString(this.state.playSeconds)}
                </Text>
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
                <Text style={style.secondTx}>
                  {this.getAudioTimeString(this.state.duration)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    ...this.state,
                    isAudio: false,
                    audioUri: '',
                    isAudioShow:
                      this.state.playState === 'paused' ? false : true,
                    playSeconds: this.state.playState === 'paused' ? 0 : this.state.playSeconds,
                  });
                }}
                style={style.cancelBtn}>
                <Image
                  style={style.cancelImg}
                  source={require('../FlipCard/Assets/cancel.png')}
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
                this.state.playState === 'paused' ? this.play() : this.pause();
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
                this.pause();
                this.setState({...this.state, isAudioShow: false, playSeconds:0});
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
                source={require('../FlipCard/Assets/cancel.png')}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}

export default Revision;
