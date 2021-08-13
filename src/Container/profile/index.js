import React, {Component} from 'react';

import {
  ActivityIndicator,
  Image,
  Keyboard,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import {RNCamera} from 'react-native-camera';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';

/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-community/async-storage';

import CustomHeader from '../../Component/CustomHeader';
import CustomInputView from '../../Component/CustomInputView';
import {updateData} from '../../Navigation/Drawer';
import {
  userData,
  userUpdataData,
  userUpdateImageData,
} from '../../Redux/ReduxAPIHandler/userApi';
import Images from '../../Resources/Images';
import {style} from './style';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      number: '',
      imagedata: '',
      imageBase:'',
      bio: '',
      data: {},
      isCamera: false,
      isFlash: false,
      isLoading: false,
      isFront: false,
    };
    this.inputRef = {};
    this.sheetRef = '';
    this.current = true;
  }

  uploadImage = () => {
    this.sheetRef.show();
  };

  takeImage = (isCame) => {
    if (isCame) {
      this.setState({...this.state,isCamera:true});
    } else {
      launchImageLibrary(
        {
          mediaType: 'photo',
          includeBase64: true,
          maxHeight: 200,
          maxWidth: 200,
        },
        (res) => {
          this.updateImage(res.base64);
        },
      );
    }
  };

  

  save = () => {
    if (this.state.name == '') {
      Toast.show('Please enter the name');
    } else if (this.state.email == '') {
      Toast.show('Please enter the email');
    } else if (this.state.number == '') {
      Toast.show('Please enter the phone number');
    } else {
      // updateData();
      // this.props.navigation.navigate('HomeStack');
      this.updataUserDetails();
    }
  };

  updataUserDetails=async()=>{
    this.setState({...this.state,isLoading:true});
    try {
        let UserDetails = await userUpdataData({token:this.state.data.jwt,id:this.state.data.id,name:this.state.name,phone_number:this.state.number,bio:this.state.bio,email:this.state.email});
        if (UserDetails.success == 1){
          this.setState({...this.state,isLoading:false});
          Toast.show(UserDetails.message);

          updateData();
      // this.props.navigation.navigate('HomeStack');
        }
        else {
          this.setState({...this.state,isLoading:false});
          Toast.show(UserDetails.message);
        }
        // console.log('UserDetails>>>>>', UserDetails)
      }
      catch (error){
        this.setState({...this.state,isLoading:false});
        console.log('error>>>',error);
      }
  }


  componentDidMount=()=>{
    this.props.navigation.addListener('blur', (event) => {
      this.current=false;
    });
    this.props.navigation.addListener('focus', (event) => {
      this.current=true;
      this.getuserApi();
    });
    AsyncStorage.getItem('loginData')
      .then((res) => {
        this.setState({ ...this.state, data: JSON.parse(res) });

        this.getuserApi();
      })
      .catch((error) => {
        console.log('LoginData>>>', JSON.stringify(error));
        this.setState({ ...this.state, isLoading: false });
      });
      this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  keyboardDidHide = () => {
    if(this.current){
      
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

  getuserApi= async ()=>{

    let usData = await userData({ token: this.state.data.jwt, id: this.state.data.id });
    console.log('usData',usData);
            this.setState({ ...this.state,  name: usData.name, email: usData.email, number:usData.phone_number,bio:usData.bio == undefined ? '' : usData.bio,imagedata:usData.profile_photo == undefined  ? '' : usData.profile_photo });


  }


  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const datas = await this.camera.takePictureAsync(options);
      this.setState({...this.state,isCamera:false});
      this.updateImage(datas.base64);
    }
  };
  updateImage= async(data)=>{
    try {

      this.setState({ ...this.state, isLoading: true })
      let updateImg = await userUpdateImageData({id:this.state.data.id,token:this.state.data.jwt,profile_photo:data});
      if(updateImg.success==1){
        this.setState({...this.state,imagedata:updateImg.url,isCamera:false});
        this.setState({...this.state,isLoading:false});
        
      }
      else{
        Toast.show('Please enter the name');
      }
      
    }
    catch (error){
      console.log('error>>>',error);
    }
  }
  render() {

    console.log(this.state.imagedata)
    return (
      <View style={style.container}>
        {/* ******************* Header ******************* */}
        <View style={style.emptyTopVw} />
        <CustomHeader
          title={'PROFILE'}
          image={Images.menuIcon}
          leftBtn={() => this.props.navigation.openDrawer()}
          searchItem={() => { }}
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

        <ScrollView style={{ width: '100%' }}>
          <View style={{ alignItems: 'center' }}>
            <View style={style.imgVw}>
              <View style={style.profileImgVW}>
                <Image
                  style={style.profileImg}
                  source={
                    this.state.imagedata == ''
                      ? Images.neet
                      : { uri: this.state.imagedata }
                  }
                />
                <TouchableOpacity
                  style={style.editBtn}
                  onPress={() => this.uploadImage()}>
                  <Image style={style.editImg} source={Images.edit_icon} />
                </TouchableOpacity>
              </View>

            </View>
            <CustomInputView
              title={'Name'}
              placeholder={'Enter the name'}
              value={this.state.name}
              onChangeText={(text) =>
                this.setState({ ...this.state, name: text })
              }
              maxLength={40}
              keyboardType={'default'}
              inputRefs={(input) => {
            this.setInputRef(input);
          }}

            />

            <View style={[style.emptyVw, { padding: 0.5, marginTop: '3%' }]} />

            <CustomInputView
              title={'Email'}
              placeholder={'Enter the email'}
              value={this.state.email}
              onChangeText={(text) =>
                this.setState({ ...this.state, email: text })
              }
              maxLength={40}
              keyboardType={'email-address'}
              inputRefs={(input) => {
            this.setInputRef(input);
          }}
            />
            <View style={[style.emptyVw, { padding: 0.5, marginTop: '3%' }]} />
            <CustomInputView
              title={'Phone number'}
              placeholder={'Enter the phone number'}
              value={this.state.number}
              onChangeText={(text) =>
                this.setState({ ...this.state, number: text })
              }
              maxLength={10}
              keyboardType={'number-pad'}
              inputRefs={(input) => {
            this.setInputRef(input);
          }}
            />

            <View style={[style.emptyVw, { padding: 0.5, marginTop: '3%' }]} />
            <CustomInputView
              title={'Bio'}
              placeholder={'Enter the bio'}
              value={this.state.bio}
              onChangeText={(text) =>
                this.setState({ ...this.state, bio: text })
              }
              maxLength={120}
              keyboardType={'default'}
              inputRefs={(input) => {
            this.setInputRef(input);
          }}
            />


            <TouchableOpacity
              style={[style.loginBtn, { width: '80%', marginBottom: 20 }]}
              onPress={() => this.save()}>
              <Text style={style.logTx}>{'SAVE'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={this.state.isCamera}
          onRequestClose={() => this.setState({ ...this.state, isCamera: false })}>
          <View style={style.popupView1}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={style.preview}
              type={this.state.isFront ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
              flashMode={this.state.isFlash ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
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
              onGoogleVisionBarcodesDetected={({ barcodes }) => {
                // console.log(barcodes);
              }}
            />
            <View style={{ flex: 0, width: '100%', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'black' }}>
              <TouchableOpacity onPress={this.takePicture.bind(this)} style={style.capture} />

            </View>
            <TouchableOpacity style={style.flashBtn} onPress={()=>this.setState({...this.state,isFlash:!this.state.isFlash})}>
            <Image source={this.state.isFlash ? Images.flash : Images.flash_off} style={style.fleshIcon}/>
            </TouchableOpacity>
            <TouchableOpacity style={style.recycleBtn} onPress={()=>this.setState({...this.state,isFront:!this.state.isFront})}>
            <Image source={require('../addCard/assets/recycle.png')} style={style.fleshIcon}/>
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
      </View>
    );
  }
}

export default Profile;
