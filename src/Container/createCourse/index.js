/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import {
  ActivityIndicator,
  BackHandler,
  Image,
  Keyboard,
  Modal,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import {RNCamera} from 'react-native-camera';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import ToggleSwitch from 'toggle-switch-react-native';

/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-community/async-storage';

import CustomHeader from '../../Component/CustomHeader';
import CustomInputView from '../../Component/CustomInputView';
import api from '../../Resources/APIs';
import Images from '../../Resources/Images';
import {style} from './style';

const axios = require('axios');

class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: '',
      aboutCourse: '',
      domain: '',
      price: '',
      imagedata: '',
      data: '',
      imageBase: '',
      isLoading: false,
      isAccount: true,
      isCamera: false,
      isFlash: false,
      isFront: false,

      isActive: false,
    };
    this.sheetRef = '';
    this.inputRef = {};
    this.current = true;
  }

  componentDidMount = () => {
    this.props.navigation.addListener('blur', (event) => {
      this.current = false;
    });
    this.props.navigation.addListener('focus', (event) => {
      this.current = true;
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.handleBackButtonClick,
      );
    });
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
    this.getData();
  };

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  handleBackButtonClick() {
    if (this.currentScreen) {
      // this.props.
      this.props.navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
    }
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
  setInputRef = (data) => {
    this.inputRef = data;
  };

  getData = () => {
    AsyncStorage.getItem('loginData')
      .then((res) => {
        this.setState({...this.state, data: JSON.parse(res)});
      })
      .catch((error) => {
        console.log('LoginData>>>', JSON.stringify(error));
      });
  };

  uploadImage = () => {
    this.sheetRef.show();
  };
  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const datas = await this.camera.takePictureAsync(options);
      // this.updateImage(datas.base64)
      this.setState({
        ...this.state,
        imagedata: datas.uri,
        imageBase: datas.base64,
        isCamera: false,
      });
    }
  };

  proceed = () => {
    this.setState({...this.state, isCamera: true});
  };

  takeImage = async (isCamera) => {
    if (isCamera) {
      if (Platform.OS === 'android') {
        // Calling the permission function
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Revizify App Camera Permission',
            message: 'Revizify App needs access to your camera',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted
          this.proceed();
        } else {
          // Permission Denied
          alert('CAMERA Permission Denied');
        }
      } else {
        this.proceed();
      }
    } else {
      launchImageLibrary(
        {
          mediaType: 'photo',
          includeBase64: true,
          maxHeight: 200,
          maxWidth: 200,
        },
        (res) => {
          // console.log('Result>>>>', res);
          this.setState({
            ...this.state,
            imagedata: res.uri,
            imageBase: res.base64,
          });
        },
      );
    }
  };

  save = () => {
    if (this.state.courseName == '') {
      Toast.show('Please enter course name');
    }  else if (!this.state.isAccount) {
      if (this.state.price == '') {
        Toast.show('Please enter amount');
      } else {
        this.setState({...this.state, isLoading: true});
        axios
          .post(
            api.CREATE_COURSE,
            {
              id: this.state.data.id,
              course_name: this.state.courseName.replace("'", ''),
              course_desc: this.state.aboutCourse.replace("'", ''),
              domain_sector: this.state.domain.replace("'", ''),
              course_img: this.state.imageBase,
              course_status: this.state.isActive ? 'private' : 'public',
              course_price: Number(this.state.price),
            },
            {
              headers: {
                Authorization: 'Bearer ' + this.state.data.jwt,
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            },
          )
          .then((res) => {
            if (res.data.success === 1) {
              console.warn(res.data)
              this.setState({
                ...this.state,
                isLoading: false,
                courseName: '',
                aboutCourse: '',
                imagedata: '',
                price: '',
              });
              this.props.navigation.navigate('CreateChapter', {
                item: res.data.course_id,
                isCreated: true,
              });
            } else {
              this.setState({...this.state, isLoading: false});
              Toast.show(res.data.message);
            }
          })
          .catch((error) => {
            this.setState({...this.state, isLoading: false});
            console.log('error>>', JSON.stringify(error));
          });
      }
    } else {
      this.setState({...this.state, isLoading: true});
      axios
        .post(
          api.CREATE_COURSE,
          {
            id: this.state.data.id,
            course_name: this.state.courseName,
            course_desc: this.state.aboutCourse,
            domain_sector: this.state.domain,
            course_img: this.state.imageBase,
            course_type: this.state.isAccount ? 'free' : 'paid',
            course_price: Number(this.state.price),
            course_status: this.state.isActive ? 'private' : 'public',
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.state.data.jwt,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        )
        .then((res) => {
          // console.log('res>>', JSON.stringify(res.data));
          if (res.data.success === 1) {
            this.setState({
              ...this.state,
              isLoading: false,
              courseName: '',
              aboutCourse: '',
              imagedata: '',
              price: '',
            });

            this.props.navigation.navigate('CreateChapter', {
              item: res.data.course_id,
              isOpen: false,
              isCreated: true,
            });
          } else {
            this.setState({...this.state, isLoading: false});
            Toast.show(res.data.message);
          }
        })
        .catch((error) => {
          this.setState({...this.state, isLoading: false});
          console.log('error>>', JSON.stringify(error));
        });
    }
  };

  render() {
    return (
      <View style={style.container}>
        {/* ******************* Header ******************* */}
        <View style={style.emptyTopVw} />
        <CustomHeader
          title={'CREATE COURSE'}
          image={Images.leftArrow}
          leftBtn={() => this.props.navigation.goBack()}
          searchItem={() => {}}
        />

        <ActionSheet
          ref={(o) => (this.sheetRef = o)}
          title={'Select Image'}
          options={['Take Photo', 'Choose from Library', 'cancel']}
          cancelButtonIndex={2}
          onPress={(index) =>
            index == 2 ? {} : this.takeImage(index == 0 ? true : false)
          }
        />

        <ScrollView style={{width: '100%'}}>
          <View style={{alignItems: 'center'}}>
            <CustomInputView
              title={'Course name'}
              placeholder={'Enter course name'}
              maxLength={30}
              value={this.state.courseName}
              onChangeText={(text) =>
                this.setState({...this.state, courseName: text})
              }
              inputRefs={(input) => {
                this.setInputRef(input);
              }}
            />

            <View style={[style.emptyVw, {padding: 0.5, marginTop: '5%'}]} />

            <CustomInputView
              title={'About this course'}
              placeholder={'Enter course details'}
              value={this.state.aboutCourse}
              onChangeText={(text) =>
                this.setState({...this.state, aboutCourse: text})
              }
              inputRefs={(input) => {
                this.setInputRef(input);
              }}
            />

            <View style={[style.emptyVw, {padding: 0.5, marginTop: '5%'}]} />
            <CustomInputView
              title={'Domain/sector'}
              placeholder={'Enter course domain'}
              value={this.state.domain}
              onChangeText={(text) =>
                this.setState({...this.state, domain: text})
              }
              inputRefs={(input) => {
                this.setInputRef(input);
              }}
            />
            <View style={[style.emptyVw, {padding: 0.5, marginTop: '5%'}]} />

            <View style={style.imgVw}>
              <View style={style.profileImgVW}>
                <Image
                  style={style.profileImg}
                  source={
                    this.state.imagedata == ''
                      ? Images.neet
                      : {uri: this.state.imagedata}
                  }
                />
                <TouchableOpacity
                  style={style.editBtn}
                  onPress={() => this.uploadImage()}>
                  <Image style={style.editImg} source={Images.edit_icon} />
                </TouchableOpacity>
              </View>

              <Text style={style.courseTx}>{'Upload Image'}</Text>
            </View>


            {/* <View style={style.courseTypeVw}>
              <View style={style.accountVw}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({...this.state, isAccount: true});
                  }}
                  style={[
                    style.accountBtn,
                    {
                      backgroundColor: this.state.isAccount
                        ? Colors.headerColor
                        : null,
                      borderWidth: 1,
                    },
                  ]}>
                  <Text
                    style={[
                      style.accountTx,
                      {
                        color: this.state.isAccount
                          ? Colors.White
                          : Colors.Black,
                      },
                    ]}>
                    FREE
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({...this.state, isAccount: false});
                  }}
                  style={[
                    style.accountBtn,
                    {
                      backgroundColor: !this.state.isAccount
                        ? Colors.headerColor
                        : null,
                      borderWidth: 1,
                    },
                  ]}>
                  <Text
                    style={[
                      style.accountTx,
                      {
                        color: !this.state.isAccount
                          ? Colors.White
                          : Colors.Black,
                      },
                    ]}>
                    PAID
                  </Text>
                </TouchableOpacity>
              </View>
            </View> */}

            {/* {!this.state.isAccount ? (
              <CustomInputView
                title={'Price (in INR)'}
                placeholder={'Enter price'}
                value={this.state.price}
                onChangeText={(text) =>
                  this.setState({...this.state, price: text})
                }
                inputRefs={(input) => {
                  this.setInputRef(input);
                }}
              />
            ) : null} */}


            {/* <SwitchSelector
              initial={0}
              onPress={(value) => this.setState({isActive: value})}
              // textColor={'#7a44cf'} //'#7a44cf'
              selectedColor={'#ffffff'}
              buttonColor={this.state.isActive ? Colors.headerColor : 'gray'}
              borderColor={'#000000'}
              hasPadding
              options={[
                {label: 'on', value: true},
                {label: 'off', value: false},
              ]}
              initial={1}
              label={true}
            /> */}
            <View style={style.settingVw}>
                  <Text style={style.prTx}>{'Private mode'}</Text>
                  <ToggleSwitch
                    onColor={'#00234B'}
                    offColor={'gray'}
                    size={'large'}
                    isOn={this.state.isActive}
                    onToggle={(text) => {
                      this.setState({
                        isActive: text,
                      });
                    }}
                  />
                </View>
                {this.state.isActive ?
                <Text style={style.desTx}>
              {
                'Private courses cannot be searched or Downloaded by others.'
              }
            </Text> : null
                }

            <TouchableOpacity
              style={[style.loginBtn, {width: '80%', marginBottom: 20}]}
              onPress={() => this.save()}>
              <Text style={style.logTx}>{'SAVE'}</Text>
            </TouchableOpacity>
          </View>
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

export default CreateCourse;
