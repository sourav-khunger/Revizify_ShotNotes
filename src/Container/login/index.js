/* eslint-disable eqeqeq */
/* eslint-disable semi */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';

import {appleAuth} from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-community/async-storage';

import CustomTextInput from '../../Component/CustomTextInput';
import {
  facebookLogin,
  googleLogin,
} from '../../Constants/SocialLogin';
import api from '../../Resources/APIs';
import Colors from '../../Resources/Colors';
import Images from '../../Resources/Images';
import {style} from './style';

const axios = require('axios');
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      deviceId: '',
      isLoading: false,
    };
    this.inputRef = {};
    this.current = true;
  }
  componentDidMount = () => {
    this.props.navigation.addListener('blur', (event) => {
      this.current = false;
    });
    this.props.navigation.addListener('focus', (event) => {
      this.current = true;
    });
    let deviceId = DeviceInfo.getUniqueId();
    this.setState({ ...this.state, deviceId: deviceId });
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

  login = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email == '') {
      Toast.show('Please enter the email');
    } else if (reg.test(this.state.email) === false) {
      Toast.show('Please enter the vaild email');
    } else if (this.state.password == '') {
      Toast.show('Please enter the password');
    } else {
      this.setState({ ...this.state, isLoading: true })
      Keyboard.dismiss();
      axios.post(api.LOGIN, {
        email: this.state.email,
        password: this.state.password,
        device_id: this.state.deviceId,
        push_token: 'true',
        user_type : 'simple',
      }).then((res) => {
        if (res.data.success == 1) {
          AsyncStorage.setItem(
            'loginData',
            JSON.stringify(res.data),
          );
          this.setState({ ...this.state, email: '', password: '', isLoading: false });
         this.props.navigation.reset({
              index: 0,
              routes: [{name: 'Home',params: {isFirst:true}}],
            });
        }
        else {
          this.setState({ ...this.state, isLoading: false });
          Toast.show(JSON.stringify(res.data.message));
        }
      }
      ).catch((error) => {
        this.setState({ ...this.state, isLoading: false });
        console.log('res>>>>>', JSON.stringify(error));
      }
      );
      // this.props.navigation.navigate('Home');
    }
  };

  googleLogin = async () => {
    googleLogin()
      .then((res) => {
        this.setState({...this.state,isLoading:true})
        // this.props.navigation.navigate('Home');
        axios.post(api.LOGIN, {
          id: res.user.id,
          name: res.user.name,
          email: res.user.email,
          profile_photo: res.user.photo,
          device_id: this.state.deviceId,
          push_token: 'df',
          user_type : 'google',
        }).then((res) => {
          if (res.data.success == 1) {
            this.setState({...this.state,isLoading:false})
            AsyncStorage.setItem(
              'loginData',
              JSON.stringify(res.data),
            );
            this.props.navigation.reset({
              index: 0,
              routes: [{ name: 'Home',params: {isFirst:true} }],
            });
            Toast.show(JSON.stringify(res.data.message));
          }
          else {
            this.setState({...this.state,isLoading:false})
            console.log('data>>>',JSON.stringify(res.data));
            Toast.show(JSON.stringify(res.data.message));
          }

      })
      })
      .catch((error) => {
        this.setState({...this.state,isLoading:false})
        console.log('signup error>>>>>>>>', JSON.stringify(error));
        Toast.show(JSON.stringify(error), Toast.SHORT);
      });
  };

  fdLogin = () => {
    facebookLogin()
      .then((res) => {
        this.setState({...this.state,isLoading:true})
        return {
          email: res.email,
          name: res.name,
          token: res.id,
          image: res.picture.data.url,
          provider: 'Facebook',
          providerId: res.id,
          role: 'user',
          fcmToken: this.state.fcmToken,
        };
      })
      .then((data) => {
        console.log('Logindata>>>>>>>>>>>>>>', JSON.stringify(data));
         axios.post(api.SIGNIN, {
          id: data.providerId,
          name: data.name,
          email: data.email,
          profile_photo: data.image,
          device_id: this.state.deviceId,
          push_token: 'df',
          user_type : 'facebook',
        }).then((res) => {
          if (res.data.success == 1) {
            this.setState({...this.state,isLoading:false})
            console.log('response>>>>>>>', JSON.stringify(res.data));
            AsyncStorage.setItem(
              'loginData',
              JSON.stringify(res.data),
            );
            Toast.show(JSON.stringify(res.data.message));
            this.props.navigation.reset({
              index: 0,
              routes: [{ name: 'Home',params: {isFirst:true} }],
            });
          }
          else {
            this.setState({...this.state,isLoading:false})
            console.log('response111>>>>>>>', JSON.stringify(res));
            Toast.show(JSON.stringify(res.data.message));
          }
        });
      })
      .catch((error) => {
        this.setState({...this.state,isLoading:false})
        console.log('error>>>>>>>>>>>>>>', JSON.stringify(error));
        Toast.show(JSON.stringify(error), Toast.SHORT);
      });
  };

  appleLogin = async () => {
    try {
      // AppleAuthRequestOperation.LOGOUT;
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      if (credentialState === appleAuth.State.AUTHORIZED) {
        let givenName =
          appleAuthRequestResponse.fullName?.givenName != null
            ? appleAuthRequestResponse.fullName?.givenName
            : '';
        let familyName =
          appleAuthRequestResponse.fullName?.familyName != null
            ? appleAuthRequestResponse.fullName?.familyName
            : '';
        let email =
          appleAuthRequestResponse.email != null
            ? appleAuthRequestResponse.email
            : '';
        this.setState({ ...this.state,name: givenName + ' ' + familyName,isLoading:true });
        let params = {
          name: givenName + ' ' + familyName,
          email: email,
          token: appleAuthRequestResponse.user,
          image: '',
          role: 'user',
          provider: 'Apple',
          providerId: appleAuthRequestResponse.user,
        };
        axios.post(api.SIGNIN, {
          id: params.providerId,
          name: params.name,
          email: params.email,
          profile_photo: params.image,
          device_id: this.state.deviceId,
          push_token: 'df',
          user_type : 'apple',
        }).then((res) => {
          if (res.data.success == 1) {
            this.setState({...this.state,isLoading:false})
            AsyncStorage.setItem(
              'loginData',
              JSON.stringify(res.data),
            );
            console.log('response>>>>>>>', JSON.stringify(res.data));
            this.props.navigation.reset({
              index: 0,
              routes: [{ name: 'Home',params: {isFirst:true} }],
            });
            Toast.show(JSON.stringify(res.data.message));
          }
          else {
            this.setState({...this.state,isLoading:false})
            console.log('response111>>>>>>>', JSON.stringify(res));
            Toast.show(JSON.stringify(res.data.message));
          }
        });
        // this.props.navigation.navigate('HomeStack');
        // console.log('Apple login data>>>>>', params);
      }
    } catch (error) {
      this.setState({...this.state,isLoading:false})
      console.log('Apple loginResponse error', error);
    }
  };
  render() {
    return (
      <View style={style.container}>
      <View style={style.emptyTopVw} />
      {/* <View style={{height:Dimensions.get('window').height-30}}> */}
        <ScrollView>
        
          <View style={style.subcontainer}>
          
          <View style={{ alignItems: 'center',
     justifyContent:'center',height:Dimensions.get('window').height-30,
    width: '100%',}}>
            <Image source={Images.SPLASH_ICON} style={style.img} />
            <Text style={style.loginTx}>Login</Text>
            <CustomTextInput
              isImage={true}
              image={Images.email}
              placeholder="Email"
              placeholderTextColor={Colors.Black}
              keyboardType={'email-address'}
              value={this.state.email}
              onchangeText={(text) => this.setState({ email: text })}
              height={40}
              onkeyPress={(text)=>{ }}
              onSubmitEditing={(text)=>{ }}
              inputRefs={(input) => {
            this.setInputRef(input);
          }}
            />
            <CustomTextInput
              isImage={true}
              image={Images.password}
              placeholder="Password"
              placeholderTextColor={Colors.Black}
              value={this.state.password}
              onchangeText={(text) => this.setState({ password: text })}
              height={40}
              keyboardType={'default'}
              secureTextEntry={true}
              onkeyPress={(text)=>{ }}
              onSubmitEditing={(text)=>{ }}
              inputRefs={(input) => {
            this.setInputRef(input);
          }}
            />
            <Text onPress={() => this.props.navigation.navigate('ForgetPassword')} style={[style.forgetTx,{color: Colors.mainColor}]}>{'Forgot password?'}</Text>


            <TouchableOpacity style={[style.loginBtn, { width: '100%' }]} onPress={() => this.login()}>
              <Text style={style.logTx} >
                {'Login'}
              </Text>
            </TouchableOpacity>

            <Text style={{fontSize:20,alignSelf:"center"}}>--------------------or--------------------</Text>

            <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between",marginTop:-11}}>
            <TouchableOpacity onPress={() => this.googleLogin()} style={[style.scLoginBtn, { width: '40%' }]}>
            <View style={{width:'20%',justifyContent:'center',alignItems:'center'}}>
            <Image style={style.googleImg} source={Images.google} />
            </View>
              {/* <Text style={style.scLogTx}>
                {'Login with Google'}
              </Text> */}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.fdLogin()} style={[style.scLoginBtn, { width: '40%' }]}>
            <View style={{width:'20%',justifyContent:'center',alignItems:'center'}}>
            <Image style={style.googleImg} source={Images.facebook} />
            </View>
              {/* <Text style={style.scLogTx} >
                {'Login with Facebook'}
              </Text> */}
            </TouchableOpacity>
            

            {Platform.OS == 'ios' ? (
            <TouchableOpacity onPress={() => this.appleLogin()} style={[style.scLoginBtn, { width: '40%' }]}>
            <View style={{width:'20%',justifyContent:'center',alignItems:'center'}}>
            <Image style={style.googleImg} source={Images.apple} />
            </View>
              <Text style={style.scLogTx}>
                {'Login with Apple'}
              </Text>
            </TouchableOpacity>) : null}
            </View>

            <Text style={[style.logTx, { color: Colors.Black, marginTop: 25, marginBottom: 10 }]}>
              {'New User?' } <Text
              style={[style.logTx, { color: Colors.mainColor }]}
              onPress={() => this.props.navigation.navigate('Signup')}>
              {'Sign up'}
            </Text>
            </Text>
            </View>
            <View style={style.termsVw}><Text onPress={()=>this.props.navigation.navigate('Termss',{isLogin: false})}>{'Terms and conditions'}</Text><Text onPress={()=>this.props.navigation.navigate('PrivatePolicys',{isLogin: false})}>{'Privacy Policy'}</Text></View>
          </View>
        </ScrollView>
        {/* </View> */}
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
