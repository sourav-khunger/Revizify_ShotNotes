/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
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
import Toast from 'react-native-simple-toast';

import AsyncStorage from '@react-native-community/async-storage';

import CustomCardButton from '../../Component/CustomCardButton';
import CustomCardHeader from '../../Component/CustomCardHeader';
import CustomCardImageview from '../../Component/CustomCardImageView';
import CustomCardInput from '../../Component/CustomCardInput';
import CustomHeader from '../../Component/CustomHeader';
import CustomPdfCard from '../../Component/CustomPdfCard';
import {internetcheck} from '../../Constants/InternetCheck';
import {
  cardGetApi,
  deleteCardDataApi,
} from '../../Redux/ReduxAPIHandler/CardApi';
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

class EditCard extends Component {
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
      imageData: [],
      documentData: [],
      audioData: [],
      videoData: [],
      imageDataAns: [],
      documentDataAns: [],
      audioDataAns: [],
      videoDataAns: [],
      imageDatas: [],
      documentDatas: [],
      audioDatas: [],
      videoDatas: [],
      imageDataAnss: [],
      documentDataAnss: [],
      audioDataAnss: [],
      videoDataAnss: [],
      isAnswer: false,
      data: [],
      isLoading: false,
      isStop: false,
      isPlay: false,
      filename: '',
      isCamera: false,
      isFlash: false,
      isFront: false,
      isRecording: false,
    };
    this.inputRef = {};
    this.current = true;
    this.sheetRef = '';
    this.refSheet = '';
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
    });
    this.getuser();
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
        this.getCardData();
      })
      .catch((error) => {
        console.log('LoginData Error>>>', JSON.stringify(error));
      });
  };

  getCardData = async () => {
    try {
      let data = await cardGetApi({
        token: this.state.data.jwt,
        id: this.props.route.params.cardId,
      });
      this.setState({
        ...this.state,
        question: data.data.card_question,
        answer: data.data.card_answer,
        imageDatas: data.data.card_question_image,
        imageDataAnss: data.data.card_answer_image,
        audioDatas: data.data.card_question_audio,
        audioDataAnss: data.data.card_answer_audio,
        documentDatas: data.data.card_question_pdf,
        documentDataAnss: data.data.card_answer_pdf,
        videoDatas: data.data.card_question_video,
        videoDataAnss: data.data.card_answer_video,
      });
      // console.log('getCardData>>>>>', JSON.stringify(data));
    } catch (error) {
      console.log('error', error);
    }
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
              let ansImg = this.state.imageDataAnss;
              let ImgAns = [];
              res.forEach((element, i) => {
                let data = {
                  id: 100000001 + i,
                  card_answer_image_name: element.name,
                  card_answer_image_url: element.uri,
                  type: element.type,
                  size: element.size == undefined ? 1000 : element.size,
                };
                ansImg.push(data);
                ImgAns.push(data);
              });

              console.log(JSON.stringify(res));
              this.setState({
                ...this.state,
                imageDataAns: ImgAns,
                imageDataAnss: ansImg,
              });
            } else {
              let data = this.state.imageDataAns;
              let ansImg = this.state.imageDataAnss;
              res.forEach((element, i) => {
                let dataImg = {
                  id: 100000100 + this.state.imageDataAnss.length + i,
                  card_answer_image_name: element.name,
                  card_answer_image_url: element.uri,
                  type: element.type,
                  size: element.size == undefined ? 1000 : element.size,
                };
                data.push(dataImg);
                ansImg.push(dataImg);
              });
              this.setState({
                ...this.state,
                imageDataAns: data,
                imageDataAnss: ansImg,
              });
            }
          } else {
            if (this.state.imageData.length == 0) {
              let ansImg = this.state.imageDatas;
              let ImgAns = [];
              res.forEach((element, i) => {
                let data = {
                  id: 100000001 + i,
                  card_question_image_name: element.name,
                  card_question_image_url: element.uri,
                  type: element.type,
                  size: element.size == undefined ? 1000 : element.size,
                };
                ansImg.push(data);
                ImgAns.push(data);
              });
              this.setState({
                ...this.state,
                imageData: ImgAns,
                imageDatas: ansImg,
              });
            } else {
              let data = this.state.imageData;
              let ansImg = this.state.imageDatas;
              res.forEach((element, i) => {
                let dataImg = {
                  id: 100000100 + this.state.imageDatas.length + i,
                  card_question_image_name: element.name,
                  card_question_image_url: element.uri,
                  type: element.type,
                  size: element.size == undefined ? 1000 : element.size,
                };
                data.push(dataImg);
                ansImg.push(dataImg);
              });
              this.setState({
                ...this.state,
                imageData: data,
                imageDatas: ansImg,
              });
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
              let ansPdf = this.state.documentDataAnss;
              let pdfAns = [];
              res.forEach((element, i) => {
                let data = {
                  id: 100000001 + i,
                  card_answer_pdf_name: element.name,
                  card_answer_pdf_url: element.uri,
                  type: element.type,
                  size: element.size == undefined ? 1000 : element.size,
                };
                ansPdf.push(data);
                pdfAns.push(data);
              });
              this.setState({
                ...this.state,
                documentDataAns: pdfAns,
                documentDataAnss: ansPdf,
              });
            } else {
              let data = this.state.documentDataAns;
              let ansPdf = this.state.documentDataAnss;
              res.forEach((element, i) => {
                let datapdf = {
                  id: 100000100 + this.state.documentDataAnss.length + i,
                  card_answer_pdf_name: element.name,
                  card_answer_pdf_url: element.uri,
                  type: element.type,
                  size: element.size == undefined ? 1000 : element.size,
                };
                data.push(datapdf);
                ansPdf.push(datapdf);
              });
              this.setState({
                ...this.state,
                documentDataAns: data,
                documentDataAnss: ansPdf,
              });
            }
          } else {
            if (this.state.documentData.length == 0) {
              let ansPdf = this.state.documentDatas;
              let pdfAns = [];
              res.forEach((element, i) => {
                let data = {
                  id: 100000001 + i,
                  card_question_pdf_name: element.name,
                  card_question_pdf_url: element.uri,
                  type: element.type,
                  size: element.size == undefined ? 1000 : element.size,
                };
                ansPdf.push(data);
                pdfAns.push(data);
              });
              this.setState({
                ...this.state,
                documentData: pdfAns,
                documentDatas: ansPdf,
              });
            } else {
              let data = this.state.documentData;
              let ansPdf = this.state.documentDatas;
              res.forEach((element, i) => {
                let datapdf = {
                  id: 100000100 + this.state.documentDatas.length + i,
                  card_question_pdf_name: element.name,
                  card_question_pdf_url: element.uri,
                  type: element.type,
                  size: element.size == undefined ? 1000 : element.size,
                };
                data.push(datapdf);
                ansPdf.push(datapdf);
              });
              this.setState({
                ...this.state,
                documentData: data,
                documentDatas: ansPdf,
              });
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
              let ansAudio = this.state.audioDataAnss;
              let audioAns = [];
              res.forEach((element, i) => {
                let data = {
                  id: 100000001 + i,
                  card_answer_audio_name: element.name,
                  card_answer_audio_url: element.uri,
                  type: element.type,
                  size: element.size == undefined ? 1000 : element.size,
                };
                ansAudio.push(data);
                audioAns.push(data);
              });
              this.setState({
                ...this.state,
                audioDataAns: audioAns,
                audioDataAnss: ansAudio,
              });
            } else {
              let data = this.state.audioDataAns;
              let ansAudio = this.state.audioDataAnss;
              res.forEach((element, i) => {
                let datapdf = {
                  id: 100000100 + this.state.audioDataAnss.length + i,
                  card_answer_audio_name: element.name,
                  card_answer_audio_url: element.uri,
                  type: element.type,
                  size: element.size == undefined ? 1000 : element.size,
                };
                data.push(datapdf);
                ansAudio.push(datapdf);
              });
              this.setState({
                ...this.state,
                audioDataAns: data,
                audioDataAnss: ansAudio,
              });
            }
          } else {
            if (this.state.audioData.length == 0) {
              let ansAudio = this.state.audioDatas;
              let audioAns = [];
              res.forEach((element, i) => {
                let data = {
                  id: 100000001 + i,
                  card_question_audio_name: element.name,
                  card_question_audio_url: element.uri,
                  type: element.type,
                  size: element.size == undefined ? 1000 : element.size,
                };
                ansAudio.push(data);
                audioAns.push(data);
              });
              this.setState({
                ...this.state,
                audioData: audioAns,
                audioDatas: ansAudio,
              });
            } else {
              let data = this.state.audioData;
              let ansAudio = this.state.audioDatas;
              res.forEach((element, i) => {
                let datapdf = {
                  id: 100000100 + this.state.audioDatas.length + i,
                  card_question_audio_name: element.name,
                  card_question_audio_url: element.uri,
                  type: element.type,
                  size: element.size == undefined ? 1000 : element.size,
                };
                data.push(datapdf);
                ansAudio.push(datapdf);
              });
              this.setState({
                ...this.state,
                audioData: data,
                audioDatas: ansAudio,
              });
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

  // ************************** Start Audio Recording *******************************

  // ************************** Save Card *******************************
  saveData = async () => {
    if (this.state.question == '') {
      Toast.show('Please enter the question');
    } else if (this.state.answer == '') {
      Toast.show('Please enter the answer');
    } else {
      this.setState({...this.state, isLoading: true});
      try {
        let data = new FormData();
        data.append('user_id', this.state.data.id);
        data.append('card_id', this.props.route.params.cardId);
        data.append('chapter_id', this.props.route.params.chapter_id);
        data.append('card_question', this.state.question.replace("'", ''));
        data.append('card_answer', this.state.answer.replace("'", ''));

        let dataSize = 0;
        this.state.imageData.forEach((element, i) => {
          const newFile = {
            uri: element.card_question_image_url,
            name: element.card_question_image_name,
            type: 'image/jpeg',
          };
          dataSize = element.size == undefined ? 0 : element.size;
          data.append('question_image[]', newFile);
        });

        this.state.audioData.forEach((element, i) => {
          const newFile = {
            uri: element.card_question_audio_url,
            name: element.card_question_audio_name,
            type: 'audio/mpeg',
          };
          dataSize = element.size == undefined ? 0 : element.size;
          data.append('question_audio[]', newFile);
        });

        this.state.documentData.forEach((element, i) => {
          const newFile = {
            uri: element.card_question_pdf_url,
            name: element.card_question_pdf_name,
            type: element.type,
          };
          dataSize = element.size == undefined ? 0 : element.size;
          data.append('question_pdf[]', newFile);
        });
        this.state.videoData.forEach((element, i) => {
          const newFile = {
            uri: element.card_question_video_url,
            name: element.card_question_video_name,
            type: element.type,
          };
          dataSize = element.size == undefined ? 0 : element.size;
          data.append('question_video[]', newFile);
        });

        this.state.imageDataAns.forEach((element, i) => {
          const newFile = {
            uri: element.card_answer_image_url,
            name: element.card_answer_image_name,
            type: 'image/jpeg',
          };
          dataSize = element.size == undefined ? 0 : element.size;
          data.append('answer_image[]', newFile);
        });

        this.state.audioDataAns.forEach((element, i) => {
          const newFile = {
            uri: element.card_answer_audio_url,
            name: element.card_answer_audio_name,
            type: 'audio/mpeg',
          };
          dataSize = element.size == undefined ? 0 : element.size;
          data.append('answer_audio[]', newFile);
        });

        this.state.documentDataAns.forEach((element, i) => {
          const newFile = {
            uri: element.card_answer_pdf_url,
            name: element.card_answer_pdf_name,
            type: element.type,
          };
          dataSize = element.size == undefined ? 0 : element.size;
          data.append('answer_pdf[]', newFile);
        });
        this.state.videoDataAns.forEach((element, i) => {
          const newFile = {
            uri: element.card_answer_video_url,
            name: element.card_answer_video_name,
            type: element.type,
          };
          dataSize = dataSize + element.size == undefined ? 0 : element.size;
          data.append('answer_video[]', newFile);
        });

        console.log('data>>>>', JSON.stringify(data));
        console.log('token>>>>', this.state.data.jwt);
        console.log('uri>>>>', api.UPDATE_CARD);

        internetcheck()
          .then(async (res) => {
            if (res) {
              axios
                .post(api.UPDATE_CARD, data, {
                  headers: {
                    Authorization: 'Bearer ' + this.state.data.jwt,
                    'Content-Type': 'multipart/form-data',
                  },
                })
                .then((resdata) => {
                  this.setState({...this.state, isLoading: false});
                  if (resdata.data.success == 0) {
                    Toast.show(resdata.data.message);
                  } else {
                    Toast.show('Card update successfully');

                    this.props.navigation.navigate('AllCard');
                  }
                })
                .catch((error) => {
                  this.setState({...this.state, isLoading: false});
                  console.log('error>>>>>', JSON.stringify(error));
                });
              // }
              // else {
              //   Toast.show(
              //         'File size very large please remove some file'
              //       );
              //       this.setState({...this.state, isLoading: false});
              // }
            } else {
              this.setState({...this.state, isLoading: false});
            }
          })
          .catch((error) => {
            this.setState({...this.state, isLoading: false});
            console.log('error', error);
          });
      } catch (error) {
        this.setState({...this.state, isLoading: false});
        console.log('error', error);
      }
    }
  };

  deleteImg = async ({data, type}) => {
    try {
      if (type == 'Answer') {
        if (data.card_answer_image_id == undefined) {
          let DataDelete = this.state.imageDataAns;
          let DataDeletes = this.state.imageDataAnss;
          let isIds = DataDeletes.findIndex((element) =>
            element.card_answer_image_id == undefined
              ? element.id
              : element.card_answer_image_id == data.id,
          );
          let isId = DataDelete.findIndex((element) => element.id == data.id);
          DataDeletes.splice(isIds, 1);
          DataDelete.splice(isId, 1);
          this.setState({
            ...this.state,
            imageDataAns: DataDelete,
            imageDataAnss: DataDeletes,
          });
        } else {
          let deleteImage = await deleteCardDataApi({
            token: this.state.data.jwt,
            data: {
              user_id: this.state.data.id,
              card_answer_image_id: data.card_answer_image_id,
              data_type: 'answer_image',
            },
          });
          let DataDeletes = this.state.imageDataAnss;
          let isIds = DataDeletes.findIndex((element) =>
            element.card_answer_image_id == undefined
              ? element.id
              : element.card_answer_image_id == data.card_answer_image_id,
          );
          DataDeletes.splice(isIds, 1);
          this.setState({...this.state, imageDataAnss: DataDeletes});

          // console.log('deleteImage', deleteImage);
        }
      } else {
        if (data.card_question_image_id == undefined) {
          let DataDelete = this.state.imageData;
          let DataDeletes = this.state.imageDatas;
          let isIds = DataDeletes.findIndex((element) =>
            element.card_question_image_id == undefined
              ? element.id
              : element.card_question_image_id == data.id,
          );
          let isId = DataDelete.findIndex((element) => element.id == data.id);
          DataDeletes.splice(isIds, 1);
          DataDelete.splice(isId, 1);
          this.setState({
            ...this.state,
            imageData: DataDelete,
            imageDatas: DataDeletes,
          });
        } else {
          let deleteImage = await deleteCardDataApi({
            token: this.state.data.jwt,
            data: {
              user_id: this.state.data.id,
              card_question_image_id: data.card_question_image_id,
              data_type: 'question_image',
            },
          });
          let DataDeletes = this.state.imageDatas;
          let isIds = DataDeletes.findIndex((element) =>
            element.card_question_image_id == undefined
              ? element.id
              : element.card_question_image_id == data.card_question_image_id,
          );
          DataDeletes.splice(isIds, 1);
          this.setState({...this.state, imageDatas: DataDeletes});

          // console.log('deleteImage', deleteImage);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  deletePdf = async ({data, type}) => {
    try {
      if (type == 'Answer') {
        if (data.card_answer_pdf_id == undefined) {
          let DataDelete = this.state.documentDataAns;
          let DataDeletes = this.state.documentDataAnss;
          let isIds = DataDeletes.findIndex((element) =>
            element.card_answer_pdf_id == undefined
              ? element.id
              : element.card_answer_pdf_id == data.id,
          );
          let isId = DataDelete.findIndex((element) => element.id == data.id);
          DataDeletes.splice(isIds, 1);
          DataDelete.splice(isId, 1);
          this.setState({
            ...this.state,
            documentDataAns: DataDelete,
            documentDataAnss: DataDeletes,
          });
        } else {
          let deletepdfData = await deleteCardDataApi({
            token: this.state.data.jwt,
            data: {
              user_id: this.state.data.id,
              card_answer_pdf_id: data.card_answer_pdf_id,
              data_type: 'answer_pdf',
            },
          });
          let DataDeletes = this.state.documentDataAnss;
          let isIds = DataDeletes.findIndex((element) =>
            element.card_answer_pdf_id == undefined
              ? element.id
              : element.card_answer_pdf_id == data.card_answer_pdf_id,
          );
          DataDeletes.splice(isIds, 1);
          this.setState({...this.state, documentDataAnss: DataDeletes});

          // console.log('deletepdfData', deletepdfData);
        }
      } else {
        if (data.card_question_pdf_id == undefined) {
          let DataDelete = this.state.documentData;
          let DataDeletes = this.state.documentDatas;
          let isIds = DataDeletes.findIndex((element) =>
            element.card_question_pdf_id == undefined
              ? element.id
              : element.card_question_pdf_id == data.id,
          );
          let isId = DataDelete.findIndex((element) => element.id == data.id);
          DataDeletes.splice(isIds, 1);
          DataDelete.splice(isId, 1);
          this.setState({
            ...this.state,
            documentData: DataDelete,
            documentDatas: DataDeletes,
          });
        } else {
          let deletepdfData = await deleteCardDataApi({
            token: this.state.data.jwt,
            data: {
              user_id: this.state.data.id,
              card_question_pdf_id: data.card_question_pdf_id,
              data_type: 'question_pdf',
            },
          });

          let DataDeletes = this.state.documentDatas;
          let isIds = DataDeletes.findIndex((element) =>
            element.card_question_pdf_id == undefined
              ? element.id
              : element.card_question_pdf_id == data.card_question_pdf_id,
          );
          DataDeletes.splice(isIds, 1);
          this.setState({...this.state, documentDatas: DataDeletes});

          // console.log('deletepdfData', deletepdfData);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  deleteAudio = async ({data, type}) => {
    try {
      if (type == 'Answer') {
        if (data.card_answer_audio_id == undefined) {
          let DataDelete = this.state.audioDataAns;
          let DataDeletes = this.state.audioDataAnss;
          let isIds = DataDeletes.findIndex((element) =>
            element.card_answer_audio_id == undefined
              ? element.id
              : element.card_answer_audio_id == data.id,
          );
          let isId = DataDelete.findIndex((element) => element.id == data.id);
          DataDeletes.splice(isIds, 1);
          DataDelete.splice(isId, 1);
          this.setState({
            ...this.state,
            audioDataAns: DataDelete,
            audioDataAnss: DataDeletes,
          });
        } else {
          let deleteAudioData = await deleteCardDataApi({
            token: this.state.data.jwt,
            data: {
              user_id: this.state.data.id,
              card_answer_audio_id: data.card_answer_audio_id,
              data_type: 'answer_audio',
            },
          });

          let DataDeletes = this.state.audioDataAnss;
          let isIds = DataDeletes.findIndex((element) =>
            element.card_answer_audio_id == undefined
              ? element.id
              : element.card_answer_audio_id == data.card_answer_audio_id,
          );
          DataDeletes.splice(isIds, 1);
          this.setState({...this.state, audioDataAnss: DataDeletes});

          //console.log('deletepdfData', deleteAudioData);
        }
      } else {
        if (data.card_question_audio_id == undefined) {
          let DataDelete = this.state.audioData;
          let DataDeletes = this.state.audioDatas;
          let isIds = DataDeletes.findIndex((element) =>
            element.card_question_audio_id == undefined
              ? element.id
              : element.card_question_audio_id == data.id,
          );
          let isId = DataDelete.findIndex((element) => element.id == data.id);
          DataDeletes.splice(isIds, 1);
          DataDelete.splice(isId, 1);
          this.setState({
            ...this.state,
            audioData: DataDelete,
            audioDatas: DataDeletes,
          });
        } else {
          let deleteAudioData = await deleteCardDataApi({
            token: this.state.data.jwt,
            data: {
              user_id: this.state.data.id,
              card_question_audio_id: data.card_question_audio_id,
              data_type: 'question_audio',
            },
          });

          let DataDeletes = this.state.audioDatas;
          let isIds = DataDeletes.findIndex((element) =>
            element.card_question_audio_id == undefined
              ? element.id
              : element.card_question_audio_id == data.card_question_audio_id,
          );
          DataDeletes.splice(isIds, 1);
          this.setState({...this.state, audioDatas: DataDeletes});

          console.log('deletepdfData', deleteAudioData);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  deleteVideo = async ({data, type}) => {
    try {
      if (type == 'Answer') {
        if (data.card_answer_video_id == undefined) {
          let DataDelete = this.state.videoDataAns;
          let DataDeletes = this.state.videoDataAnss;
          let isIds = DataDeletes.findIndex((element) =>
            element.card_answer_video_id == undefined
              ? element.id
              : element.card_answer_video_id == data.id,
          );
          let isId = DataDelete.findIndex((element) => element.id == data.id);
          DataDeletes.splice(isIds, 1);
          DataDelete.splice(isId, 1);
          this.setState({
            ...this.state,
            videoDataAns: DataDelete,
            videoDataAnss: DataDeletes,
          });
        } else {
          let deleteVideoData = await deleteCardDataApi({
            token: this.state.data.jwt,
            data: {
              user_id: this.state.data.id,
              card_answer_video_id: data.card_answer_video_id,
              data_type: 'answer_video',
            },
          });
          let DataDeletes = this.state.videoDataAnss;
          let isIds = DataDeletes.findIndex((element) =>
            element.card_answer_video_id == undefined
              ? element.id
              : element.card_answer_video_id == data.card_answer_video_id,
          );
          DataDeletes.splice(isIds, 1);
          this.setState({...this.state, videoDataAnss: DataDeletes});
          //console.log('deletepdfData', deleteVideoData);
        }
      } else {
        if (data.card_question_video_id == undefined) {
          let DataDelete = this.state.videoData;
          let DataDeletes = this.state.videoDatas;
          let isIds = DataDeletes.findIndex((element) =>
            element.card_question_video_id == undefined
              ? element.id
              : element.card_question_video_id == data.id,
          );
          let isId = DataDelete.findIndex((element) => element.id == data.id);
          DataDeletes.splice(isIds, 1);
          DataDelete.splice(isId, 1);
          this.setState({
            ...this.state,
            videoData: DataDelete,
            videoDatas: DataDeletes,
          });
        } else {
          let deleteVideoData = await deleteCardDataApi({
            token: this.state.data.jwt,
            data: {
              user_id: this.state.data.id,
              card_question_video_id: data.card_question_video_id,
              data_type: 'question_video',
            },
          });
          let DataDeletes = this.state.videoDatas;
          let isIds = DataDeletes.findIndex((element) =>
            element.card_question_video_id == undefined
              ? element.id
              : element.card_question_video_id == data.card_question_video_id,
          );
          DataDeletes.splice(isIds, 1);
          this.setState({...this.state, videoDatas: DataDeletes});

          // console.log('deletepdfData', deleteVideoData);
        }
      }
    } catch (error) {
      console.log('error', error);
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
        let ansAudio = this.state.audioDataAnss;
        let audioAns = [];
        recordData.forEach((element, i) => {
          let data = {
            id: 100000001 + i,
            card_answer_audio_name: element.name,
            card_answer_audio_url: element.uri,
            type: element.type,
            size: element.size == undefined ? 1000 : element.size,
          };
          ansAudio.push(data);
          audioAns.push(data);
        });
        this.setState({
          ...this.state,
          isRecording: false,
          isStop: false,
          isPlay: false,
          recordTime: '00:00:00',
          playTime: '00:00:00',
          audioDataAns: audioAns,
          audioDataAnss: ansAudio,
        });
      } else {
        let data = this.state.audioDataAns;
        let ansAudio = this.state.audioDataAnss;
        recordData.forEach((element, i) => {
          let datapdf = {
            id: 100000100 + this.state.audioDataAnss.length + i,
            card_answer_audio_name: element.name,
            card_answer_audio_url: element.uri,
            type: element.type,
            size: element.size == undefined ? 1000 : element.size,
          };
          data.push(datapdf);
          ansAudio.push(datapdf);
        });

        this.setState({
          ...this.state,
          isRecording: false,
          isStop: false,
          isPlay: false,
          recordTime: '00:00:00',
          playTime: '00:00:00',
          audioDataAns: data,
          audioDataAnss: ansAudio,
        });
      }
    } else {
      if (this.state.audioData.length == 0) {
        let ansAudio = this.state.audioDatas;
        let audioAns = [];
        recordData.forEach((element, i) => {
          let data = {
            id: 100000001 + i,
            card_question_audio_name: element.name,
            card_question_audio_url: element.uri,
            type: element.type,
            size: element.size == undefined ? 1000 : element.size,
          };
          ansAudio.push(data);
          audioAns.push(data);
        });
        this.setState({
          ...this.state,
          isRecording: false,
          isStop: false,
          isPlay: false,
          recordTime: '00:00:00',
          playTime: '00:00:00',
          audioData: audioAns,
          audioDatas: ansAudio,
        });
      } else {
        let data = this.state.audioData;
        let ansAudio = this.state.audioDatas;
        recordData.forEach((element, i) => {
          let datapdf = {
            id: 100000100 + this.state.audioDatas.length + i,
            card_question_audio_name: element.name,
            card_question_audio_url: element.uri,
            type: element.type,
            size: element.size == undefined ? 1000 : element.size,
          };
          data.push(datapdf);
          ansAudio.push(datapdf);
        });
        this.setState({
          ...this.state,
          isRecording: false,
          isStop: false,
          isPlay: false,
          recordTime: '00:00:00',
          playTime: '00:00:00',
          audioData: data,
          audioDatas: ansAudio,
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
      // for (const data of res) {
      //   if(data.size*1e-6>10){
      //     alert(
      //       ("The Video Size is greater than 10Mb")
      //     );
      //   }
      //   else{
      if (this.state.isAnswer) {
        if (this.state.videoDataAns.length == 0) {
          let ansVideo = this.state.videoDataAnss;
          let videoAns = [];
          res.forEach((element, i) => {
            if (element.size * 1e-6 > 10) {
              alert('The Video Size is greater than 10Mb');
            } else {
              let data = {
                id: 100000001 + i,
                card_answer_video_name: element.name,
                card_answer_video_url: element.uri,
                type: element.type,
                size: element.size == undefined ? 1000 : element.size,
              };
              videoAns.push(data);
              ansVideo.push(data);
            }
          });
          this.setState({
            ...this.state,
            videoDataAns: videoAns,
            videoDataAnss: ansVideo,
          });
        } else {
          let data = this.state.videoDataAns;
          let ansVideo = this.state.videoDataAnss;
          res.forEach((element, i) => {
            if (element.size * 1e-6 > 10) {
              alert('The Video Size is greater than 10Mb');
            } else {
            let datapdf = {
              id: 100000100 + this.state.videoDataAnss.length + i,
              card_answer_video_name: element.name,
              card_answer_video_url: element.uri,
              type: element.type,
              size: element.size == undefined ? 1000 : element.size,
            };
            data.push(datapdf);
            ansVideo.push(datapdf);
            }
          });
          this.setState({
            ...this.state,
            videoDataAns: data,
            videoDataAnss: ansVideo,
          });
        }
      } else {
        if (this.state.videoData.length == 0) {
          let ansVideo = this.state.videoDatas;
          let videoAns = [];
          for (let i = 0; i < res.length; i++) {
            if (res[i].size * 1e-6 > 10) {
              alert('The Video Size is greater than 10Mb');
            } else {
            let data = {
              id: 1000000001 + i,
              card_question_video_name: res[i].name,
              card_question_video_url: res[i].uri,
              type: res[0].type,
              size: res[i].size == undefined ? 1000 : res[i].size,
            };
            videoAns.push(data);
            ansVideo.push(data);
            }
          }
          this.setState({
            ...this.state,
            videoData: videoAns,
            videoDatas: ansVideo,
          });
        } else {
          let data = this.state.videoData;
          let ansVideo = this.state.videoDatas;
          res.forEach((element, i) => {
            if (element.size * 1e-6 > 10) {
              alert('The Video Size is greater than 10Mb');
            } else {
            let datapdf = {
              id: 100000100 + this.state.videoDatas.length + i,
              card_question_video_name: element.name,
              card_question_video_url: element.uri,
              type: element.type,
              // check size video
              size: element.size == undefined ? 1000 : element.size,
            };
            data.push(datapdf);
            ansVideo.push(datapdf);
            }
          });
          this.setState({...this.state, videoData: data, videoDatas: ansVideo});
        }
        //   }

        // }
      }
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
          let ansImg = this.state.imageDataAnss;
          let data = {
            id: 1000000001 + this.state.imageDataAnss.length,
            card_answer_image_name: imagedata.name,
            card_answer_image_url: imagedata.uri,
            size: imagedata.size,
          };
          ansImg.push(data);

          cameraImage.push(data);
          this.setState({
            ...this.state,
            imageDataAns: cameraImage,
            imageDataAnss: ansImg,
            isCamera: false,
          });
        } else {
          let data = this.state.imageDataAns;
          let ansImg = this.state.imageDataAnss;
          let dataAns = {
            id: 100000001 + this.state.imageDataAnss.length,
            card_answer_image_name: imagedata.name,
            card_answer_image_url: imagedata.uri,
            size: imagedata.size,
          };
          ansImg.push(dataAns);

          data.push(dataAns);

          this.setState({
            ...this.state,
            imageDataAns: data,
            imageDataAnss: ansImg,
            isCamera: false,
          });
        }
      } else {
        if (this.state.imageData.length == 0) {
          let cameraImage = [];
          let ansImg = this.state.imageDatas;
          let data = {
            id: 1000000001 + this.state.imageDatas.length,
            card_question_image_name: imagedata.name,
            card_question_image_url: imagedata.uri,
            size: imagedata.size,
          };
          ansImg.push(data);

          cameraImage.push(data);
          this.setState({
            ...this.state,
            imageData: cameraImage,
            imageDatas: ansImg,
            isCamera: false,
          });
        } else {
          let data = this.state.imageData;
          let ansImg = this.state.imageDatas;
          let dataQ = {
            id: 1000000001 + this.state.imageDatas.length,
            card_question_image_name: imagedata.name,
            card_question_image_url: imagedata.uri,
            size: imagedata.size,
          };
          ansImg.push(dataQ);
          data.push(dataQ);

          this.setState({
            ...this.state,
            imageData: data,
            imageDatas: ansImg,
            isCamera: false,
          });
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
          title={'Edit Card'}
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
              placeholder={'add text here'}
              onChangeText={(text) =>
                this.setState({...this.state, question: text})
              }
              value={this.state.question}
              isQuestion={true}
              inputRefs={(input) => {
                this.setInputRef(input);
              }}
            />

            {/* ************************** GET IMAGE VIEW ******************************* */}
            <CustomCardButton
              isDisabled={false}
              text={'Add Image'}
              top={20}
              onPress={() => {
                this.setState({...this.state, isAnswer: false});
                this.getImage();
              }}
            />
            <CustomCardImageview
              isEdit={true}
              imageData={this.state.imageDatas}
              deleteItem={(data) =>
                this.deleteImg({data: data, type: 'Question'})
              }
            />

            {/* ************************** GET DOCUMENT VIEW ******************************* */}
            <CustomCardButton
              isDisabled={false}
              text={'Add Pdf'}
              top={10}
              onPress={() => {
                this.setState({...this.state, isAnswer: false});
                this.takeImage(1);
              }}
            />

            {this.state.documentDatas.length == 0
              ? null
              : this.state.documentDatas.map((item, index) => (
                  <CustomPdfCard
                    name={
                      item.name == undefined
                        ? item.card_question_pdf_name
                        : item.name
                    }
                    index={index}
                    isImg={Images.pdf}
                    deleteDocument={() =>
                      this.deletePdf({data: item, type: 'Question'})
                    }
                    isEdit={true}
                  />
                ))}

            {/* ************************** GET Audio VIEW ******************************* */}
            <CustomCardButton
              isDisabled={false}
              text={'Add Audio'}
              top={10}
              onPress={() => {
                this.setState({...this.state, isAnswer: false});
                this.uploadImage();
              }}
            />
            {this.state.audioDatas == undefined ||
            this.state.audioDatas.length == undefined ||
            this.state.audioDatas.length == 0
              ? null
              : this.state.audioDatas.map((item, index) => (
                  <CustomPdfCard
                    name={
                      item.name == undefined
                        ? item.card_question_audio_name
                        : item.name
                    }
                    index={index}
                    isImg={Images.audio}
                    deleteDocument={(data) =>
                      this.deleteAudio({data: item, type: 'Question'})
                    }
                    isEdit={true}
                  />
                ))}

            {/* ************************** GET Video VIEW ******************************* */}
            <CustomCardButton
              isDisabled={false}
              text={'Add Video(10mb max)'}
              top={10}
              onPress={() => {
                this.setState({...this.state, isAnswer: false});
                this.uploadVideo();
              }}
            />
            {this.state.videoDatas == undefined ||
            this.state.videoDatas.length == undefined ||
            this.state.videoDatas.length == 0
              ? null
              : this.state.videoDatas.map((item, index) => (
                  <CustomPdfCard
                    name={
                      item.name == undefined
                        ? item.card_question_video_name
                        : item.name
                    }
                    index={index}
                    isImg={Images.play}
                    deleteDocument={(data) =>
                      this.deleteVideo({data: item, type: 'Question'})
                    }
                    isEdit={true}
                  />
                ))}
            <View style={{padding: 10}} />
          </View>

          {/* **************************** Answer View **************************** */}

          <View style={style.borderVw}>
            <CustomCardHeader title={'Answer'} />
            <CustomCardInput
              placeholder={'add text here'}
              onChangeText={(text) =>
                this.setState({...this.state, answer: text})
              }
              value={this.state.answer}
              isQuestion={true}
              inputRefs={(input) => {
                this.setInputRef(input);
              }}
            />

            {/* ************************** GET IMAGE VIEW ******************************* */}
            <CustomCardButton
              text={'Add Image'}
              isDisabled={false}
              top={20}
              onPress={() => {
                this.setState({...this.state, isAnswer: true});
                this.getImage();
              }}
            />
            <CustomCardImageview
              isEdit={true}
              imageData={this.state.imageDataAnss}
              deleteItem={(data) =>
                this.deleteImg({data: data, type: 'Answer'})
              }
            />

            {/* ************************** GET DOCUMENT VIEW ******************************* */}
            <CustomCardButton
              text={'Add Pdf'}
              isDisabled={false}
              top={10}
              onPress={() => {
                this.setState({...this.state, isAnswer: true});
                this.takeImage(1);
              }}
            />

            {this.state.documentDataAnss.length == 0
              ? null
              : this.state.documentDataAnss.map((item, index) => (
                  <CustomPdfCard
                    name={
                      item.name == undefined
                        ? item.card_answer_pdf_name
                        : item.name
                    }
                    index={index}
                    isImg={Images.pdf}
                    deleteDocument={(data) =>
                      this.deletePdf({data: item, type: 'Answer'})
                    }
                    isEdit={true}
                  />
                ))}

            {/* ************************** GET Audio VIEW ******************************* */}
            <CustomCardButton
              text={'Add Audio'}
              top={10}
              isDisabled={false}
              onPress={() => {
                this.setState({...this.state, isAnswer: true});
                this.uploadImage();
              }}
            />
            {this.state.audioDataAnss == undefined ||
            this.state.audioDataAnss.length == undefined ||
            this.state.audioDataAnss.length == 0
              ? null
              : this.state.audioDataAnss.map((item, index) => (
                  <CustomPdfCard
                    name={
                      item.name == undefined
                        ? item.card_answer_audio_name
                        : item.name
                    }
                    index={index}
                    isImg={Images.audio}
                    deleteDocument={(data) =>
                      this.deleteAudio({data: item, type: 'Answer'})
                    }
                    isEdit={true}
                  />
                ))}

            {/* ************************** GET Video VIEW ******************************* */}
            <CustomCardButton
              text={'Add Video(10mb max)'}
              isDisabled={false}
              top={10}
              onPress={() => {
                this.setState({...this.state, isAnswer: true});
                this.uploadVideo();
              }}
            />
            {this.state.videoDataAnss == undefined ||
            this.state.videoDataAnss.length == undefined ||
            this.state.videoDataAnss.length == 0
              ? null
              : this.state.videoDataAnss.map((item, index) => (
                  <CustomPdfCard
                    name={
                      item.name == undefined
                        ? item.card_answer_video_name
                        : item.name
                    }
                    index={index}
                    isImg={Images.play}
                    deleteDocument={(data) =>
                      this.deleteVideo({data: item, type: 'Answer'})
                    }
                    isEdit={true}
                  />
                ))}
            <View style={{padding: 10}} />
          </View>

          <TouchableOpacity
            style={style.saveBtn}
            onPress={() => this.saveData()}>
            <Text style={style.saveTx}>Update</Text>
          </TouchableOpacity>
          <View style={{padding: 10}} />
        </ScrollView>

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
                source={require('../addCard/assets/recycle.png')}
                style={style.fleshIcon}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

export default EditCard;
