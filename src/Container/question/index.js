/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-did-mount-set-state */
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
import ImageZoom from 'react-native-image-pan-zoom';
import Pdf from 'react-native-pdf';
import {WebView} from 'react-native-webview';

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-community/async-storage';

import CustomCardHeader from '../../Component/CustomCardHeader';
import {allCardApi} from '../../Redux/ReduxAPIHandler/CardApi';
import Images from '../../Resources/Images';
import {style} from './style';

var Sound = require('react-native-sound');

var SCREEN_WIDTH = Dimensions.get('window').width

// Enable playback in silence mode
Sound.setCategory('Playback');

class Question extends Component {
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
      isColor: false,
      audioUri: '',
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

    };
    this.spinValue = new Animated.Value(0);
    this.sliderEditing = false;
    this.myRef = React.createRef();
    this.flatListRef = React.createRef();
    this._carousel = React.createRef();



  }
  componentDidMount = () => {
    // setTimeout(() => { this._carousel.snapToItem(5,false); },500);
    // this.setState({ index: this.props.route.params.cIndex, isColor: !this.state.isColor });
    this.getuser();
    // this.props.navigation.addListener('blur', (event) => { });
    // this.props.navigation.addListener('focus', (event) => {
    //   this.getuser();
    // });
  };








  getuser = () => {
    AsyncStorage.getItem('loginData')
      .then((res) => {
        this.setState({ ...this.state, data: JSON.parse(res) });
        // this.getAllQuestion();
      })
      .catch((error) => {
        console.log('LoginData Error>>>', JSON.stringify(error));
      });
  };
  // ****************************** getAllQuestion ******************************

  getAllQuestion = async () => {
    this.setState({ ...this.setState, isLoading: true });
    try {
      let allCard = await allCardApi({
        token: this.state.data.jwt,
        id: this.props.route.params.id,
      });
      if (allCard.success == 1) {

        this.setState({
          ...this.state,
          allCardData: allCard.data,
          //  isLoading: false,
        });
        this.showLoader();
        // this.toggleSubview()



        // console.log('here data>>>>', this.props.route.params.cIndex);
      } else {
        this.setState({
          ...this.state,
          allData: allCard.data,
          allMyData: allCard.data,
          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({ ...this.setState, isLoading: false });
      console.log('error>>>', error);
    }
  };

  showLoader=()=>{
    setTimeout(() => {
      this.setState({ ...this.setState, isLoading: false });
    },100);
  }
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
          isLoading: false,
        });
        // this._carousel.onSnapToItem(this.state.index)
        // this.myRef.scrollToIndex({
        //   animated: true,
        //   index: this.state.isIndex,
        // });
      } else {
        this.setState({
          ...this.state,
          allData: allCard.data,
          allMyData: allCard.data,
          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({ ...this.setState, isLoading: false });
      console.log('error>>>', error);
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
    this.setState({ ...this.state, isAudio: true, audioUri: data }, () =>
      this.play(),
    );

    this.timeout = setInterval(() => {
      if (
        this.sound &&
        this.sound.isLoaded() &&
        this.state.playState == 'playing' &&
        !this.sliderEditing
      ) {
        this.sound.getCurrentTime((seconds, isPlaying) => {
          this.setState({ playSeconds: seconds });
        });
      }
    }, 100);
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
      this.setState({ playSeconds: value });
    }
  };

  play = async () => {
    if (this.sound) {
      this.sound.play(this.playComplete);
      this.setState({ playState: 'playing' });
    } else {
      const filepath = this.state.audioUri;
      console.log('[Play]', filepath);

      this.sound = new Sound(filepath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          // Alert.alert('Notice', 'audio file error. (Error code : 1)');
          this.setState({ playState: 'paused' });
        } else {
          this.setState({
            playState: 'playing',
            duration: this.sound.getDuration(),
          });
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
      this.setState({ playState: 'paused', playSeconds: 0 });
      this.sound.setCurrentTime(0);
    }
  };

  pause = () => {
    if (this.sound) {
      this.sound.pause();
    }

    this.setState({ playState: 'paused' });
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
          nextSecs = this.state.duration;
        }
        this.sound.setCurrentTime(nextSecs);
        this.setState({ playSeconds: nextSecs });
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

    render() {
        return (
            <View style={style.containerQ}>
                    <View style={[style.containerQ]}>
                      <View style={[style.upperVw, { marginTop: '4%' }]}>

                        <CustomCardHeader title={'Question (' + (Number(this.props.index) + 1) + ')'} />
                        <ScrollView>
                          <Text
                            // onPress={() => this.props.textVw()}
                            style={style.questionTx}>
                            {this.props.data.card_question}
                          </Text>


                          {this.props.data.card_question_image == undefined ||
                            this.props.data.card_question.length == 0 ? null : (
                            <View style={style.queImageVw}>
                              <FlatList
                                data={this.props.data.card_question_image}
                                horizontal={false}
                                numColumns={3}
                                renderItem={({ item }) => (
                                  <TouchableOpacity
                                    style={style.ImgBtn}
                                    onPress={() =>
                                      this.setState({
                                        ...this.state,
                                        isQImage: true,
                                        imageUri: item.card_question_image_url,
                                      })
                                    }>
                                    <Image
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

                          {this.props.data.card_question_pdf == undefined ||
                            this.props.data.card_question.length == 0 ? null : (
                            <View style={style.queImageVw}>
                              <FlatList
                                data={this.props.data.card_question_pdf}
                                horizontal={false}
                                numColumns={3}
                                renderItem={({ item, index }) => (
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
                                    <Image
                                      source={Images.pdf}
                                      style={style.pdfImg}
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

                          {this.props.data.card_question_audio == undefined ||
                            this.props.data.card_question_audio.length == 0 ? null : (
                            <View style={style.queImageVw}>
                              <FlatList
                                data={this.props.data.card_question_audio}
                                horizontal={false}
                                numColumns={3}
                                renderItem={({ item, index }) => (
                                  <TouchableOpacity
                                    style={[
                                      style.textVw,
                                      {
                                        marginBottom: 4,
                                        marginTop: 4,
                                      },
                                    ]}
                                    onPress={() =>
                                      this.playAudio(
                                        item.card_question_audio_url,
                                      )
                                    }>
                                    <Image
                                      source={Images.audio}
                                      style={style.pdfImg}
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

                          {this.props.data.card_question_video == undefined ||
                            this.props.data.card_question_video.length == 0 ? null : (
                            <View style={style.queImageVw}>
                              <FlatList
                                data={this.props.data.card_question_video}
                                horizontal={false}
                                numColumns={3}
                                renderItem={({ item, index }) => (
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
                                        videoUri: item.card_question_video_url,
                                      });
                                    }}>
                                    <Image
                                      source={Images.play}
                                      style={style.pdfImg}
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
                    <View style={{ height: 100 }} />

                {/* ***************************  Video Modal  *************************** */}
        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => this.setState({ ...this.state, isVideo: false })}
          visible={this.state.isVideo}>
          <View style={style.popupView}>
            <View
              style={{ width: '90%', height: '90%', justifyContent: 'center' }}>
              <WebView source={{ uri: this.state.videoUri }} />
            </View>
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
            this.setState({ ...this.state, isQPdf: false, qPdfUrl: '' })
          }
          visible={this.state.isQPdf}>
          <View style={style.popupView}>
            <View style={{ width: '90%', height: '90%' }}>
              <Text style={style.pdfNameTx}>{this.state.pdfName}</Text>
              <Pdf
                source={{ uri: this.state.qPdfUrl }}
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
          </View>
        </Modal>

        {/* ***************************  Image Modal  *************************** */}
        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() =>
            this.setState({ ...this.state, isQImage: false, imageUri: '' })
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
                source={{ uri: this.state.imageUri }}
              />
            </ImageZoom>
          </View>
        </Modal>

        {/* ***************************  Audio Modal  *************************** */}
        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() =>
            this.setState({ ...this.state, isAudio: false, audioUri: '' })
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
                  marginHorizontal: Platform.select({ ios: 5 }),
                }}
              />
              <Text style={style.secondTx}>
                {this.getAudioTimeString(this.state.duration)}
              </Text>
            </View>
          </View>
          </View>
        </Modal>
            </View>
        );
    }
}

export default Question;
