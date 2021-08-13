/* eslint-disable radix */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
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
import ImageZoom from 'react-native-image-pan-zoom';
import Pdf from 'react-native-pdf';
import WebView from 'react-native-webview';

import CustomCardHeader from '../../Component/CustomCardHeader';
import Images from '../../Resources/Images';
import {style} from './style';

var Sound = require('react-native-sound');
var duration = 0;
var playSeconds = 0;
// Enable playback in silence mode
Sound.setCategory('Playback');
class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      answerData: {},
      isPdf: false,
      isImage: false,
      imageUri: '',
      pdfUrl: '',
      pdfName: '',
      audioName: '',
      isAudio: false,
      audioUri: '',
      playState: 'paused', //playing, paused
      playSeconds: 0,
      duration: 0,
      isVideo: false,
      videoUri: '',
      isAudioShow: false,
    };
    this.sliderEditing = false;
  }

 componentWillUnmount = () => {
    if (this.sound) {
      this.sound.release();
      this.sound = null;
    }
    if (this.timeout) {
      clearInterval(this.timeout);
    }
  };

  playAudio = async () => {
    this.play();
    this.timeout = setInterval(() => {
      if (
        this.sound &&
        this.sound.isLoaded() &&
        this.state.playState == 'playing' &&
        !this.sliderEditing
      ) {
        this.sound.getCurrentTime((seconds, isPlaying) => {
          this.setState(state =>({playSeconds: seconds}));
          // playSeconds= seconds;
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
      this.setState({playSeconds: value});
      // playSeconds=value;
    }
  };

  play = async () => {
    // if (this.sound) {
    //     this.sound.play(this.playComplete);
    //     this.setState({ playState: 'playing' });
    // } else {
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
          duration: this.sound.getDuration()
        });
        this.sound.play(this.playComplete);
      }
    });
    // }
  };
  playComplete = (success) => {
    if (this.sound) {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        // Alert.alert('Notice', 'audio file error. (Error code : 2)');
      }
      this.setState({playState: 'paused', playSeconds: 0});

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
        } else if (nextSecs > this.state.duration) {
          nextSecs = this.state.duration;
        }
        this.sound.setCurrentTime(nextSecs);
        this.setState({playSeconds: nextSecs});
        //  playSeconds= nextSecs
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
      const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    const durationString = this.getAudioTimeString(this.state.duration);
    return (
      <View style={style.container}>
        <View style={{width: Dimensions.get('window').width}}>
          <View style={[style.upperVw, {marginTop: 20}]}>
            <CustomCardHeader title={'Answer/Back side'} />
            <ScrollView>
              <Text style={style.questionTx}>
                {this.props.data.card_answer}
              </Text>

              {this.state.isAudioShow
                ? this.props.changeData === false
                  ? this.setState({...this.state, isAudioShow: false}, () =>
                      this.pause(),
                    )
                  : null
                : null}

              {/* ***************************  Image View  *************************** */}
              {this.props.data.card_answer_image == undefined ||
              this.props.data.card_answer.length == 0 ? null : (
                <View style={style.queImageVw}>
                  <FlatList
                    horizontal={false}
                    numColumns={3}
                    data={this.props.data.card_answer_image}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        style={style.ImgBtn}
                        onPress={() =>
                          this.setState({
                            ...this.state,
                            isImage: true,
                            imageUri: item.card_answer_image_url,
                          })
                        }>
                        <FastImage
                          style={style.imgQuestion}
                          source={{uri: item.card_answer_image_url}}
                        />
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
              {/* ***************************  PDF View  *************************** */}
              {this.props.data.card_answer_pdf == undefined ||
              this.props.data.card_answer.length == 0 ? null : (
                <View style={style.queImageVw}>
                  <FlatList
                    data={this.props.data.card_answer_pdf}
                    horizontal={false}
                    numColumns={3}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            ...this.state,
                            isPdf: true,
                            pdfUrl: item.card_answer_pdf_url,
                            pdfName: item.card_answer_pdf_name,
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
                        <Text numberOfLines={2} style={style.nameTx}>
                          {item.card_answer_pdf_name == ''
                            ? 'XYZ'
                            : item.card_answer_pdf_name}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
              {/* ***************************  AUDIO View  *************************** */}
              {this.props.data.card_answer_audio == undefined ||
              this.props.data.card_answer_audio.length == 0 ? null : (
                <View style={style.queImageVw}>
                  <FlatList
                    data={this.props.data.card_answer_audio}
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
                              audioUri: item.card_answer_audio_url,
                              audioName: item.card_answer_audio_name,
                              isaudioLoading: true,
                            },
                            () => this.playAudio(),
                          );
                          // this.playAudio({uri:item.card_answer_audio_url,name:item.card_answer_audio_name})
                        }}>
                        <FastImage
                          source={Images.audio}
                          style={style.pdfImg}
                          resizeMode={'contain'}
                        />
                        <Text numberOfLines={2} style={style.nameTx}>
                          {item.card_answer_audio_name == ''
                            ? 'XYZ'
                            : item.card_answer_audio_name}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
              {/* ***************************  Video View  *************************** */}
              {this.props.data.card_answer_video == undefined ||
              this.props.data.card_answer_video.length == 0 ? null : (
                <View style={style.queImageVw}>
                  <FlatList
                    data={this.props.data.card_answer_video}
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
                          this.setState({
                            ...this.state,
                            isVideo: true,
                            videoUri: item.card_answer_video_url,
                          })
                        }>
                        <FastImage
                          source={Images.play}
                          style={style.pdfImg}
                          resizeMode={'contain'}
                        />
                        <Text numberOfLines={2} style={style.nameTx}>
                          {item.card_answer_video_name == ''
                            ? 'XYZ'
                            : item.card_answer_video_name}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </ScrollView>
          </View>
        </View>
        {/* <View style={{ height: 100 }} />
                <View style={style.footerVw}>
                <CustomAnswerFooterVw
                    onPress={() => 
                      this.props.onpress()}
                    saveImage={this.props.savaImg}
                    disabled={false}
                    saveBookMark={() => this.props.saveMark()}
                    isSave={this.props.saveData}
                  />
                  </View> */}
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
            this.setState({...this.state, isPdf: false, pdfUrl: ''})
          }
          visible={this.state.isPdf}>
          <View style={style.popupView}>
            <View style={{width: '90%', height: '90%', marginTop: -25}}>
              <Text style={style.pdfNameTx}>{this.state.pdfName}</Text>
              <Pdf
                source={{uri: this.state.pdfUrl}}
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
                this.setState({...this.state, isPdf: false, pdfUrl: ''});
              }}
              style={style.cancelBtn}>
              <Image
                style={style.cancelImg}
                source={require('./Assets/cancel.png')}
              />
            </TouchableOpacity>
          </View>
        </Modal>
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
                source={require('./Assets/cancel.png')}
              />
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() =>
            this.setState({...this.state, isImage: false, imageUri: ''})
          }
          visible={this.state.isImage}>
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
                this.setState({...this.state, isImage: false, imageUri: ''});
              }}
              style={style.cancelBtn}>
              <Image
                style={style.cancelImg}
                source={require('./Assets/cancel.png')}
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
                  {currentTimeString}
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
                  {durationString}
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
              bottom: this.props.isAudioView ? 70 : 100,
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
                this.setState({...this.state, isAudioShow: false, playSeconds: 0});
                
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

export default Answer;
