/* eslint-disable no-alert */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
import React, {Component} from 'react';

import {
  ActivityIndicator,
  Image,
  Keyboard,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';
import {RNCamera} from 'react-native-camera';
import DocumentPicker from 'react-native-document-picker';
// import {launchCamera} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';

/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-community/async-storage';

import CustomCardButton from '../../Component/CustomCardButton';
import CustomCardHeader from '../../Component/CustomCardHeader';
import CustomCardImageview from '../../Component/CustomCardImageView';
import CustomCardInput from '../../Component/CustomCardInput';
import CustomHeader from '../../Component/CustomHeader';
import CustomPdfCard from '../../Component/CustomPdfCard';
import api from '../../Resources/APIs';
import Colors from '../../Resources/Colors';
import Images from '../../Resources/Images';
import {style} from './style';

const axios = require('axios');
const audioRecorderPlayer = new AudioRecorderPlayer();
var successCall = (fileName, size, path, message) => {
  // Do your work
  console.log(
    message,
    '<<<<<<>>>>>>>',
    fileName,
    '<<<<<<>>>>>>>',
    size,
    '<<<<<<>>>>>>>',
    path,
  );
};

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      audio: {},
      isRecording: false,
      imageData: [],
      documentData: [],
      audioData: [],
      videoData: [],
      imageDataAns: [],
      documentDataAns: [],
      audioDataAns: [],
      videoDataAns: [],
      isAnswer: false,
      data: [],
      isLoading: false,
      isStop: false,
      isPlay: false,
      filename: '',
      isCamera: false,
      isFlash: false,
      isFront: false,
    };
    this.sheetRef = '';
    this.refSheet = '';
    this.inputRef = {};
    this.current = true;
  }

  uploadImage = () => {
    this.sheetRef.show();
  };

  getImage = () => {
    this.refSheet.show();
  };

  componentDidMount = () => {
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
  };
  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  keyboardDidHide = () => {
    if (this.current) {
      if (this.inputRef.isFocused) {
        this.inputRef.blur();
        return true;
      }
      return false;
    }
  };

  getuser = () => {
    AsyncStorage.getItem('loginData')
      .then((res) => {
        this.setState({...this.state, data: JSON.parse(res)});
      })
      .catch((error) => {
        console.log('LoginData Error>>>', JSON.stringify(error));
      });
  };

  // ************************** Fetch Image, Audio, Document *******************************

  takeImage = async (data) => {
    try {
      if (data == 0) {
        try {
          const res = await DocumentPicker.pickMultiple({
            type: [DocumentPicker.types.images],
          });
          console.log(res);
          if (this.state.isAnswer) {
            if (this.state.imageDataAns.length == 0) {
              this.setState({...this.state, imageDataAns: res});
            } else {
              let data = this.state.imageDataAns;
              res.forEach((element, i) => {
                data.push(element);
              });
              this.setState({...this.state, imageDataAns: data});
            }
          } else {
            if (this.state.imageData.length == 0) {
              this.setState({...this.state, imageData: res});
            } else {
              let data = this.state.imageData;
              res.forEach((element, i) => {
                data.push(element);
              });
              this.setState({...this.state, imageData: data});
            }
          }
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
          } else {
            throw err;
          }
        }
      } else if (data == 1) {
        try {
          const res = await DocumentPicker.pickMultiple({
            type: [DocumentPicker.types.pdf],
          });
          if (this.state.isAnswer) {
            if (this.state.documentDataAns.length == 0) {
              this.setState({...this.state, documentDataAns: res});
            } else {
              let data = this.state.documentDataAns;
              res.forEach((element, i) => {
                data.push(element);
              });
              this.setState({...this.state, documentDataAns: data});
            }
          } else {
            if (this.state.documentData.length == 0) {
              this.setState({...this.state, documentData: res});
            } else {
              let data = this.state.documentData;
              res.forEach((element, i) => {
                data.push(element);
              });
              this.setState({...this.state, documentData: data});
            }
          }
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
          } else {
            throw err;
          }
        }
      } else if (data == 2) {
        try {
          const res = await DocumentPicker.pickMultiple({
            type: [DocumentPicker.types.audio],
          });
          if (this.state.isAnswer) {
            if (this.state.audioDataAns.length == 0) {
              this.setState({...this.state, audioDataAns: res});
            } else {
              let data = this.state.audioDataAns;
              res.forEach((element, i) => {
                data.push(element);
              });
              this.setState({...this.state, audioDataAns: data});
            }
          } else {
            if (this.state.audioData.length == 0) {
              this.setState({...this.state, audioData: res});
            } else {
              let data = this.state.audioData;
              res.forEach((element, i) => {
                data.push(element);
              });
              this.setState({...this.state, audioData: data});
            }
          }
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
          } else {
            throw err;
          }
        }
      } else if (data == 3) {
        this.setState({...this.state, isRecording: true});
      } else if (data == 7) {
        try {
          this.setState({...this.state, isCamera: true});
        } catch (error) {
          console.log('Error>>>>', error);
        }
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  getRandomString(length) {
    var randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length),
      );
    }
    return result;
  }

  // ************************** Start Audio Recording *******************************

  recording = async () => {
    let name = await this.getRandomString(6);
    const path = Platform.select({
      ios: name + '.m4a',
      android: 'sdcard/' + name + '.mp4', // should give extra dir name in android. Won't grant permission to the first level of dir.
    });
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    console.log('audioSet', audioSet);
    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
    audioRecorderPlayer.addRecordBackListener((e) => {
      this.setState({
        recordSecs: e.current_position,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
      });
    });
    this.setState({...this.state, filename: uri});
    console.log(`uri: ${uri}`);
  };

  // ************************** Stop Audio Recording *******************************

  onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    // let recordData = [];
    let data = {
      fileCopy: result,
      name: this.state.filename.slice(15, 30),
      size: 18000,
      uri: result,
      type: 'audio/mpeg',
    };
    if (this.state.isAnswer) {
      this.setState({...this.state, audio: data, isStop: true});
    } else {
      this.setState({...this.state, audio: data, isStop: true});
    }

    // this.setState({ ...this.state, isRecording: false });
  };

  StopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    // let recordData = [];
    if (this.state.recordSecs == 0) {
      if (this.state.isAnswer) {
        this.setState({
          ...this.state,
          isStop: false,
          isRecording: false,
          recordTime: '00:00:00',
          playTime: '00:00:00',
        });
      } else {
        this.setState({
          ...this.state,
          isStop: false,
          isRecording: false,
          recordTime: '00:00:00',
          playTime: '00:00:00',
        });
      }
    } else {
      let data = {
        fileCopy: result,
        name: this.state.filename.slice(15, 30),
        size: 18000,
        uri: result,
        type: 'audio/mpeg',
      };

      if (this.state.isAnswer) {
        this.setState({
          ...this.state,
          audio: data,
          isRecording: false,
          isStop: false,
          recordTime: '00:00:00',
          playTime: '00:00:00',
        });
      } else {
        this.setState({
          ...this.state,
          audio: data,
          isRecording: false,
          isStop: false,
          recordTime: '00:00:00',
          playTime: '00:00:00',
        });
      }
    }

    // this.setState({ ...this.state, isRecording: false });
  };

  // ************************** Delete Images *******************************

  deleteImg = (item) => {
    let index = this.state.imageData.splice(item, 1);
    this.setState({...this.state, imageData: this.state.imageData});
  };

  deleteAnsImg = (item) => {
    let index = this.state.imageDataAns.splice(item, 1);
    this.setState({...this.state, imageDataAns: this.state.imageDataAns});
  };

  // ************************** Delete Document *******************************

  deleteDocument = (item) => {
    let index = this.state.documentData.splice(item, 1);
    this.setState({...this.state, documentData: this.state.documentData});
  };

  deleteAnsDocument = (item) => {
    let index = this.state.documentDataAns.splice(item, 1);
    this.setState({...this.state, documentDataAns: this.state.documentDataAns});
  };

  // ************************** Delete Audio *******************************
  deleteAudio = (item) => {
    let index = this.state.audioData.splice(item, 1);
    this.setState({...this.state, audioData: this.state.audioData});
  };

  deleteAnsAudio = (item) => {
    let index = this.state.audioDataAns.splice(item, 1);
    this.setState({...this.state, audioDataAns: this.state.audioDataAns});
  };
  deleteAnsVideo = (item) => {
    let index = this.state.videoDataAns.splice(item, 1);
    this.setState({...this.state, videoDataAns: this.state.videoDataAns});
  };
  deleteVideo = (item) => {
    let index = this.state.videoData.splice(item, 1);
    this.setState({...this.state, videoData: this.state.videoData});
  };

  // ************************** Save Card *******************************
  saveData = async () => {
    if (this.state.question.trim() == '') {
      Toast.show('Please enter the question');
    } else if (this.state.answer.trim() == '') {
      Toast.show('Please enter the answer');
    } else {
      this.setState({...this.state, isLoading: true});
      try {
        let data = new FormData();
        let dataSize = 0;
        this.state.imageData.forEach((element, i) => {
          const newFile = {
            uri: element.uri,
            name: element.name,
            type: element.type,
          };
          dataSize = element.size == undefined ? 0 : element.size;
          data.append('question_image[]', newFile);
        });

        this.state.audioData.forEach((element, i) => {
          const newFile = {
            uri: element.uri,
            name: element.name,
            type: element.type,
          };
          dataSize = element.size == undefined ? 0 : element.size;
          data.append('question_audio[]', newFile);
        });

        this.state.documentData.forEach((element, i) => {
          const newFile = {
            uri: element.uri,
            name: element.name,
            type: element.type,
          };
          dataSize = element.size == undefined ? 0 : element.size;
          data.append('question_pdf[]', newFile);
        });
        this.state.videoData.forEach((element, i) => {
          const newFile = {
            uri: element.uri,
            name: element.name,
            type: element.type,
          };
          dataSize = element.size == undefined ? 0 : element.size;
          data.append('question_video[]', newFile);
        });

        this.state.imageDataAns.forEach((element, i) => {
          const newFile = {
            uri: element.uri,
            name: element.name,
            type: element.type,
          };
          dataSize = element.size == undefined ? 0 : element.size;
          data.append('answer_image[]', newFile);
        });

        this.state.audioDataAns.forEach((element, i) => {
          const newFile = {
            uri: element.uri,
            name: element.name,
            type: element.type,
          };
          dataSize = element.size == undefined ? 0 : element.size;
          data.append('answer_audio[]', newFile);
        });

        this.state.documentDataAns.forEach((element, i) => {
          const newFile = {
            uri: element.uri,
            name: element.name,
            type: element.type,
          };
          dataSize = element.size == undefined ? 0 : element.size;
          data.append('answer_pdf[]', newFile);
        });
        this.state.videoDataAns.forEach((element, i) => {
          const newFile = {
            uri: element.uri,
            name: element.name,
            type: element.type,
          };
          dataSize = dataSize + element.size == undefined ? 0 : element.size;
          data.append('answer_video[]', newFile);
        });

        data.append('course_id', this.props.route.params.item.course_id);
        data.append('chapter_id', this.props.route.params.item.chapter_id);
        data.append('card_question', this.state.question.replace("'", ''));
        data.append('card_answer', this.state.answer.replace("'", ''));

        let dshf = dataSize * 1e-6;
        console.log('DataSize>>>', dshf);
        //  if(dataSize<8000000) {

        axios
          .post(api.CREATE_CARD, data, {
            headers: {
              Authorization: 'Bearer ' + this.state.data.jwt,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            this.setState({...this.state, isLoading: false});
            console.log('res', JSON.stringify(res));
            if (res.data.success == 0) {
              // Toast.show(
              //   res.message == undefined ? res.data.message : res.message,
              // );
            } else {
              this.setState({
                ...this.state,
                question: '',
                answer: '',
                imageData: [],
                imageDataAns: [],
                documentData: [],
                documentDataAns: [],
                audioData: [],
                audioDataAns: [],
              });
              Toast.show(res.data.message);
              console.log('res', res.data);
              this.props.navigation.goBack();
            }
          })
          .catch((error) => {
            this.setState({...this.state, isLoading: false});
            console.log('res>>>>>', JSON.stringify(error));
          });
        // }
        // else{
        //   Toast.show(
        //       'File size very large please remove some file'
        //     );
        //     this.setState({...this.state, isLoading: false});
        // }
      } catch (error) {
        this.setState({...this.state, isLoading: false});
        console.log('error', error);
      }
    }
  };
  play = async () => {
    this.setState({...this.state, isPlay: true});
    let uri = this.state.filename;
    const msg = await audioRecorderPlayer.startPlayer(uri);

    audioRecorderPlayer.setVolume(1.0);

    console.log(msg);

    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        console.log('finished');

        audioRecorderPlayer.stopPlayer();
      }
      this.setState({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.current_position)),

        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
    });
  };
  onSave = () => {
    let recordData = [];
    recordData.push(this.state.audio);
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();

    if (this.state.isAnswer) {
      if (this.state.audioDataAns.length == 0) {
        this.setState({
          ...this.state,
          isRecording: false,
          isStop: false,
          isPlay: false,
          recordTime: '00:00:00',
          playTime: '00:00:00',
          audioDataAns: recordData,
        });
      } else {
        let data = this.state.audioDataAns;
        recordData.forEach((element, i) => {
          data.push(element);
        });
        this.setState({
          ...this.state,
          isRecording: false,
          isStop: false,
          isPlay: false,
          recordTime: '00:00:00',
          playTime: '00:00:00',
          audioDataAns: data,
        });
      }
    } else {
      if (this.state.audioData.length == 0) {
        this.setState({
          ...this.state,
          isRecording: false,
          isStop: false,
          isPlay: false,
          recordTime: '00:00:00',
          playTime: '00:00:00',
          audioData: recordData,
        });
      } else {
        let data = this.state.audioData;
        recordData.forEach((element, i) => {
          data.push(element);
        });
        this.setState({
          ...this.state,
          isRecording: false,
          isStop: false,
          isPlay: false,
          recordTime: '00:00:00',
          playTime: '00:00:00',
          audioData: data,
        });
      }
    }
  };
  onDismiss = () => {
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    this.setState({
      ...this.state,
      isRecording: false,
      isStop: false,
      isPlay: false,
      recordTime: '00:00:00',
      playTime: '00:00:00',
    });
  };

  recordingAgain = () => {
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    this.setState({
      ...this.state,
      isStop: false,
      isPlay: false,
      recordTime: '00:00:00',
      playTime: '00:00:00',
    });
  };

  uploadVideo = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.video],
      });
      // for (const data1 of res) {
      //   if (data1.size * 1e-6 > 10){
      //     alert(
      //       'The Video Size is greater than 10Mb'
      //     );
      //   }
      //   else {
      if (this.state.isAnswer) {
        if (this.state.videoDataAns.length == 0) {
          let data = [];
          res.forEach((element, i) => {
            if (element.size * 1e-6 > 10) {
              alert('The Video Size is greater than 10Mb');
            } else {
              data.push(element);
            }
          });
          this.setState({...this.state, videoDataAns: data});
        } else {
          let data = this.state.videoDataAns;
          res.forEach((element, i) => {
            if (element.size * 1e-6 > 10) {
              alert('The Video Size is greater than 10Mb');
            } else {
              data.push(element);
            }
          });
          this.setState({...this.state, videoDataAns: data});
        }
      } else {
        if (this.state.videoData.length == 0) {
          let data = [];
          res.forEach((element, i) => {
            if (element.size * 1e-6 > 10) {
              alert('The Video Size is greater than 10Mb');
            } else {
              data.push(element);
            }
          });
          this.setState({...this.state, videoData: data});
          // console.log('data1234511>>>', JSON.stringify(videoData));
          // console.log('data123456711>>>', JSON.stringify(res));
        } else {
          let data = this.state.videoData;
          res.forEach((element, i) => {
            if (element.size * 1e-6 > 10) {
              alert('The Video Size is greater than 10Mb');
            } else {
              data.push(element);
            }
          });
          // console.log('data12345>>>', JSON.stringify(data));
          // console.log('data1234567>>>', JSON.stringify(res));
          this.setState({...this.state, videoData: data});
        }
      }
      // }
      // }
    } catch (error) {
      // console.error(error)
    }
  };

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: false};
      const datas = await this.camera.takePictureAsync(options);
      let imagedata = {
        fileCopy: datas.uri,
        name: datas.uri.slice(15, 30),
        size: 6731195,
        uri: datas.uri,
        type: 'image/jpeg',
      };
      if (this.state.isAnswer) {
        if (this.state.imageDataAns.length == 0) {
          let cameraImage = [];

          cameraImage.push(imagedata);
          this.setState({
            ...this.state,
            imageDataAns: cameraImage,
            isCamera: false,
          });
        } else {
          let data = this.state.imageDataAns;

          data.push(imagedata);

          this.setState({...this.state, imageDataAns: data, isCamera: false});
        }
      } else {
        if (this.state.imageData.length == 0) {
          let cameraImage = [];

          cameraImage.push(imagedata);
          this.setState({
            ...this.state,
            imageData: cameraImage,
            isCamera: false,
          });
        } else {
          let data = this.state.imageData;
          data.push(imagedata);

          this.setState({...this.state, imageData: data, isCamera: false});
        }
      }
      // console.log('>>>>data', data);
    }
  };
  setInputRef = (data) => {
    this.inputRef = data;
  };

  render() {
    return (
      <View style={style.container}>
        <View style={style.emptyTopVw} />
        <CustomHeader
          title={'New Card'}
          image={Images.leftArrow}
          leftBtn={() => this.props.navigation.goBack()}
          searchItem={() => {}}
        />
        <ActionSheet
          ref={(o) => (this.sheetRef = o)}
          title={'Select Media'}
          options={['Add audio clip', 'Record audio', 'cancel']}
          cancelButtonIndex={2}
          onPress={(index) =>
            index == 2
              ? {}
              : this.takeImage(index == 0 ? 2 : index == 1 ? 3 : 5)
          }
        />
        <ActionSheet
          ref={(o) => (this.refSheet = o)}
          title={'Select Image'}
          options={['Take photo', 'Choose from gallery', 'cancel']}
          cancelButtonIndex={2}
          onPress={(index) =>
            index == 2
              ? {}
              : this.takeImage(index == 0 ? 7 : index == 1 ? 0 : 5)
          }
        />
        <ScrollView style={style.fullVw}>
          {/* **************************** QUESTION View **************************** */}
          <View style={style.borderVw}>
            <CustomCardHeader title={'Question'} />
            <CustomCardInput
              placeholder={'Add text here.'}
              onChangeText={(text) =>
                this.setState({...this.state, question: text})
              }
              value={this.state.question}
              isQuestion={true}
              // ref={this.inputRef}
              inputRefs={(input) => {
                this.setInputRef(input);
              }}
            />

            {/* ************************** GET IMAGE VIEW ******************************* */}
            <CustomCardButton
              text={'Add Image'}
              top={20}
              onPress={() => {
                this.setState({...this.state, isAnswer: false});
                this.getImage();
              }}
            />
            <CustomCardImageview
              isEdit={false}
              imageData={this.state.imageData}
              deleteItem={(data) => this.deleteImg(data)}
            />

            {/* ************************** GET DOCUMENT VIEW ******************************* */}
            <CustomCardButton
              text={'Add Pdf'}
              top={10}
              onPress={() => {
                this.setState({...this.state, isAnswer: false});
                this.takeImage(1);
              }}
            />

            {this.state.documentData.length == 0
              ? null
              : this.state.documentData.map((item, index) => (
                  <CustomPdfCard
                    name={item.name}
                    index={index}
                    isImg={Images.pdf}
                    deleteDocument={(data) => this.deleteDocument(data)}
                  />
                ))}

            {/* ************************** GET Audio VIEW ******************************* */}
            <CustomCardButton
              text={'Audio'}
              top={10}
              onPress={() => {
                this.setState({...this.state, isAnswer: false});
                this.uploadImage();
              }}
            />
            {this.state.audioData == undefined ||
            this.state.audioData.length == undefined ||
            this.state.audioData.length == 0
              ? null
              : this.state.audioData.map((item, index) => (
                  <CustomPdfCard
                    name={item.name}
                    index={index}
                    isImg={Images.audio}
                    deleteDocument={(data) => this.deleteAudio(data)}
                  />
                ))}

            {/* ************************** GET Video VIEW ******************************* */}
            <CustomCardButton
              text={'Add Video(10mb max)'}
              top={10}
              onPress={() => {
                this.setState({...this.state, isAnswer: false});
                this.uploadVideo();
              }}
            />
            {this.state.videoData == undefined ||
            this.state.videoData.length == undefined ||
            this.state.videoData.length == 0
              ? null
              : this.state.videoData.map((item, index) => (
                  <CustomPdfCard
                    name={item.name}
                    index={index}
                    isImg={Images.play}
                    deleteDocument={(data) => this.deleteVideo(data)}
                  />
                ))}
            <View style={{padding: 10}} />
          </View>

          {/* **************************** Answer View **************************** */}

          <View style={style.borderVw}>
            <CustomCardHeader title={'Answer'} />

            <CustomCardInput
              placeholder={'Add text here.'}
              onChangeText={(text) =>
                this.setState({...this.state, answer: text})
              }
              inputRefs={(input) => {
                this.setInputRef(input);
              }}
              value={this.state.answer}
              isQuestion={true}
            />

            {/* ************************** GET IMAGE VIEW ******************************* */}
            <CustomCardButton
              text={'Add Image'}
              top={20}
              onPress={() => {
                this.setState({...this.state, isAnswer: true});
                this.getImage();
              }}
            />
            <CustomCardImageview
              isEdit={false}
              imageData={this.state.imageDataAns}
              deleteItem={(data) => this.deleteAnsImg(data)}
            />

            {/* ************************** GET DOCUMENT VIEW ******************************* */}
            <CustomCardButton
              text={'Add Pdf'}
              top={10}
              onPress={() => {
                this.setState({...this.state, isAnswer: true});
                this.takeImage(1);
              }}
            />

            {this.state.documentDataAns.length == 0
              ? null
              : this.state.documentDataAns.map((item, index) => (
                  <CustomPdfCard
                    name={item.name}
                    index={index}
                    isImg={Images.pdf}
                    deleteDocument={(data) => this.deleteAnsDocument(data)}
                  />
                ))}

            {/* ************************** GET Audio VIEW ******************************* */}
            <CustomCardButton
              text={'Audio'}
              top={10}
              onPress={() => {
                this.setState({...this.state, isAnswer: true});
                this.uploadImage();
              }}
            />
            {this.state.audioDataAns == undefined ||
            this.state.audioDataAns.length == undefined ||
            this.state.audioDataAns.length == 0
              ? null
              : this.state.audioDataAns.map((item, index) => (
                  <CustomPdfCard
                    name={item.name}
                    index={index}
                    isImg={Images.audio}
                    deleteDocument={(data) => this.deleteAnsAudio(data)}
                  />
                ))}

            {/* ************************** GET Video VIEW ******************************* */}
            <CustomCardButton
              text={'Add Video(10mb max)'}
              top={10}
              onPress={() => {
                this.setState({...this.state, isAnswer: true});
                this.uploadVideo();
              }}
            />
            {this.state.videoDataAns == undefined ||
            this.state.videoDataAns.length == undefined ||
            this.state.videoDataAns.length == 0
              ? null
              : this.state.videoDataAns.map((item, index) => (
                  <CustomPdfCard
                    name={item.name}
                    index={index}
                    isImg={Images.play}
                    deleteDocument={(data) => this.deleteAnsVideo(data)}
                  />
                ))}
            <View style={{padding: 10}} />
          </View>
          <Text style={style.onlyTx}>
            {/* {'Only ‘text’ can be edited after saving.'} */}
          </Text>
          <TouchableOpacity
            style={style.saveBtn}
            onPress={() => this.saveData()}>
            <Text style={style.saveTx}>SAVE</Text>
          </TouchableOpacity>
          <View style={{padding: 10}} />
        </ScrollView>

        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.isRecording}>
          <View style={style.popupView}>
            <View style={style.vwPopup}>
              <Text style={style.ammoutTx}>
                {this.state.isStop
                  ? this.state.playTime + ' / ' + this.state.recordTime
                  : this.state.recordTime}
              </Text>

              {this.state.isStop ? (
                this.state.isPlay ? (
                  <View style={style.btnVw}>
                    <TouchableOpacity
                      onPress={() => {
                        this.recordingAgain();
                      }}
                      style={[
                        style.buyBtn,
                        {marginLeft: '5%', backgroundColor: Colors.mainColor},
                      ]}>
                      <Text style={style.startTx}>Record again</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.onSave()}
                      style={[style.buyBtn, {marginRight: '5%'}]}>
                      <Text style={style.startTx}>SAVE</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={style.btnVw}>
                    <TouchableOpacity
                      onPress={() => {
                        this.play();
                      }}
                      style={[
                        style.buyBtn,
                        {marginLeft: '5%', backgroundColor: Colors.mainColor},
                      ]}>
                      <Text style={style.startTx}>Play</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.onSave()}
                      style={[style.buyBtn, {marginRight: '5%'}]}>
                      <Text style={style.startTx}>SAVE</Text>
                    </TouchableOpacity>
                  </View>
                )
              ) : (
                <View style={style.btnVw}>
                  <TouchableOpacity
                    onPress={() => {
                      this.recording();
                    }}
                    style={[
                      style.buyBtn,
                      {marginLeft: '5%', backgroundColor: Colors.mainColor},
                    ]}>
                    <Text style={style.startTx}>Start Recording</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.onStopRecord()}
                    style={[style.buyBtn, {marginRight: '5%'}]}>
                    <Text style={style.startTx}>Stop Recording</Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                style={style.cancelBtn}
                onPress={() => this.StopRecord()}>
                <Image
                  style={style.attachmentImg}
                  source={require('../answer/Assets/cancel.png')}
                />
              </TouchableOpacity>
            </View>
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
            <Text style={{fontsize: 16, color: '#ffffff', fontWeight: 'bold'}}>
              {'Preparing the card'}
            </Text>
          </View>
        </Modal>

        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.isCamera}
          onRequestClose={() =>
            this.setState({...this.state, isCamera: false})
          }>
          <View style={style.popupView1}>
            <RNCamera
              ref={(ref) => {
                this.camera = ref;
              }}
              style={style.preview}
              type={
                this.state.isFront
                  ? RNCamera.Constants.Type.front
                  : RNCamera.Constants.Type.back
              }
              flashMode={
                this.state.isFlash
                  ? RNCamera.Constants.FlashMode.on
                  : RNCamera.Constants.FlashMode.off
              }
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              onGoogleVisionBarcodesDetected={({barcodes}) => {
                // console.log(barcodes);
              }}
            />
            <View
              style={{
                flex: 0,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: 'black',
              }}>
              <TouchableOpacity
                onPress={this.takePicture.bind(this)}
                style={style.capture}
              />
            </View>
            <TouchableOpacity
              style={style.flashBtn}
              onPress={() =>
                this.setState({...this.state, isFlash: !this.state.isFlash})
              }>
              <Image
                source={this.state.isFlash ? Images.flash : Images.flash_off}
                style={style.fleshIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.recycleBtn}
              onPress={() =>
                this.setState({...this.state, isFront: !this.state.isFront})
              }>
              <Image
                source={require('./assets/recycle.png')}
                style={style.fleshIcon}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

export default AddCard;
