/* eslint-disable no-shadow */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';

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
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';

import {appleAuth} from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-community/async-storage';

import CustomTextInput from '../../Component/CustomTextInput';
import {internetcheck} from '../../Constants/InternetCheck';
import {
  facebookLogin,
  googleLogin,
} from '../../Constants/SocialLogin';
import {SignupUser} from '../../Redux/ReduxAPIHandler/LoginApi';
import api from '../../Resources/APIs';
import Colors from '../../Resources/Colors';
import Images from '../../Resources/Images';
import {style} from './style';

const axios = require('axios');

let header = {
  'Content-Type': 'application/json',
};
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      number: '',
      password: '',
      checkVal: false,
      deviceId: '',
      isInternet: false,
      isLoading: false,
      isTc: false,
    };
    this.inputRef = {};
    this.current = true;
  }

  componentDidMount = () => {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
    this.props.navigation.addListener('blur', (event) => {
      this.current=false;
      internetcheck()
        .then((res) => {
          console.log('internet check', res);
          this.setState({isInternet: res});
        })
        .catch((error) => {
          this.setState({isInternet: error});
          Toast.show('Internet not Working');
        });
      this.isCurrentView = false;
    });
    this.props.navigation.addListener('focus', (event) => {
      this.current =true;
      internetcheck()
        .then((res) => {
          console.log('internet check', res);
          this.setState({isInternet: res});
        })
        .catch((error) => {
          this.setState({isInternet: error});
          Toast.show('Internet not Working');
        });
      // this.setState({isLoading: false, email: '', password: ''});
      this.isCurrentView = true;
    });
    let deviceId = DeviceInfo.getUniqueId();
    this.setState({...this.state, deviceId: deviceId});
  };
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

  signup = async () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.name == '') {
      Toast.show('Please enter the name');
    } else if (this.state.email == '') {
      Toast.show('Please enter the email');
    } else if (reg.test(this.state.email) === false) {
      Toast.show('Please enter the vaild email');
    } else if (this.state.number == '') {
      Toast.show('Please enter a mobile number');
    } else if (this.state.number.length > 0 && this.state.number.length < 10) {
      Toast.show('Please enter a valid mobile number');
    } else if (this.state.password == '') {
      Toast.show('Please enter the password');
    } 
    else {
      this.setState({...this.state, isLoading: true});
      // try {
      Keyboard.dismiss();
      axios
        .post(api.SIGNIN, {
          name: this.state.name,
          email: this.state.email,
          phone_number: this.state.number,
          password: this.state.password,
          device_id: this.state.deviceId,
          push_token: 'true',
          user_type: 'simple',
        })
        .then((res) => {
          if (res.data.success == 1) {
            AsyncStorage.setItem('loginData', JSON.stringify(res.data));
            this.setState({
              ...this.state,
              email: '',
              password: '',
              name: '',
              number: '',
              isLoading: false,
            });
            this.props.navigation.reset({
              index: 0,
              routes: [{name: 'Home',params: {isFirst:true}}],
            });
          } else {
            this.setState({...this.state, isLoading: false});
            Toast.show(JSON.stringify(res.data.message));
          }
        })
        .catch((error) => {
          this.setState({...this.state, isLoading: false});
          console.log('error>>>>>', JSON.stringify(error.message));
        });
    }
  };

  googleLogin = async () => {
    googleLogin()
      .then((res) => {
        axios
          .post(api.SIGNIN, {
            id: res.user.id,
            name: res.user.name,
            email: res.user.email,
            profile_photo: res.user.photo,
            device_id: this.state.deviceId,
            push_token: 'df',
            user_type: 'google',
          })
          .then((res) => {
            if (res.data.success == 1) {
              AsyncStorage.setItem('loginData', JSON.stringify(res.data));
              this.props.navigation.reset({
                index: 0,
                routes: [{name: 'Home',params: {isFirst:true}}],
              });
              Toast.show(JSON.stringify(res.data.message));
            } else {
              Toast.show(JSON.stringify(res.data.message));
            }
          });
      })
      .catch((error) => {
        console.log('signup error>>>>>>>>', JSON.stringify(error));
        Toast.show(JSON.stringify(error), Toast.SHORT);
      });
  };

  facebookSignIn = () => {
    facebookLogin()
      .then((res) => {
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
        axios
          .post(api.SIGNIN, {
            id: data.providerId,
            name: data.name,
            email: data.email,
            profile_photo: data.image,
            device_id: this.state.deviceId,
            push_token: 'df',
            user_type: 'facebook',
          })
          .then((res) => {
            if (res.data.success == 1) {
              AsyncStorage.setItem('loginData', JSON.stringify(res.data));
              Toast.show(JSON.stringify(res.data.message));
              this.props.navigation.reset({
                index: 0,
                routes: [{name: 'Home',params: {isFirst:true}}],
              });
            } else {
              Toast.show(JSON.stringify(res.data.message));
            }
          });
      })
      .catch((error) => {
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
        this.setState({name: givenName + ' ' + familyName});
        let params = {
          name: givenName + ' ' + familyName,
          email: email,
          token: appleAuthRequestResponse.user,
          image: '',
          role: 'user',
          provider: 'Apple',
          providerId: appleAuthRequestResponse.user,
        };
        axios
          .post(api.SIGNIN, {
            id: params.providerId,
            name: params.name,
            email: params.email,
            profile_photo: params.image,
            device_id: this.state.deviceId,
            push_token: 'df',
            user_type: 'apple',
          })
          .then((res) => {
            if (res.data.success == 1) {
              AsyncStorage.setItem('loginData', JSON.stringify(res.data));
              this.props.navigation.reset({
                index: 0,
                routes: [{name: 'Home',params: {isFirst:true}}],
              });
              Toast.show(JSON.stringify(res.data.message));
            } else {
              Toast.show(JSON.stringify(res.data.message));
            }
          });
      }
    } catch (error) {
      console.log('Apple loginResponse error', error);
    }
  };
  render() {
    return (
      <View style={style.container}>
        <ScrollView>
          <View style={style.subcontainer}>
            <View style={style.emptyTopVw} />
            <Image source={Images.SPLASH_ICON} style={style.img} />
            <Text style={style.loginTx}>SIGN UP</Text>

            <CustomTextInput
              isImage={true}
              image={Images.user}
              placeholder="Name"
              placeholderTextColor={Colors.Black}
              keyboardType={'email-address'}
              value={this.state.name}
              onchangeText={(text) =>
                this.setState({...this.state, name: text})
              }
              height={40}
              onkeyPress={(text) => console.log('here>>', text.nativeEvent)}
              onSubmitEditing={(text) =>
                console.log('here11>>', text.nativeEvent)
              }
              inputRefs={(input) => {
            this.setInputRef(input);
          }}
            />
            <CustomTextInput
              isImage={true}
              image={Images.email}
              placeholder="Email"
              placeholderTextColor={Colors.Black}
              keyboardType={'email-address'}
              value={this.state.email}
              onchangeText={(text) =>
                this.setState({...this.state, email: text})
              }
              height={40}
              onkeyPress={(text) => {}}
              onSubmitEditing={(text) =>
                {}
              }
              inputRefs={(input) => {
            this.setInputRef(input);
          }}
            />
            <CustomTextInput
              isImage={true}
              image={Images.phone}
              placeholder="Mobile number"
              placeholderTextColor={Colors.Black}
              keyboardType={'phone-pad'}
              value={this.state.number}
              onchangeText={(text) =>
                this.setState({...this.state, number: text})
              }
              height={40}
              onkeyPress={(text) => {}}
              onSubmitEditing={(text) =>{}
              }
              inputRefs={(input) => {
            this.setInputRef(input);
          }}
            />
            <CustomTextInput
              isImage={true}
              image={Images.password}
              placeholder="Password"
              placeholderTextColor={'black'}
              value={this.state.password}
              onchangeText={(text) =>
                this.setState({...this.state, password: text})
              }
              height={40}
              keyboardType={'default'}
              secureTextEntry={true}
              onkeyPress={(text) => {}}
              onSubmitEditing={(text) =>{}
              }
              inputRefs={(input) => {
            this.setInputRef(input);
          }}
            />

            {/* <View style={style.checkboxContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                }}>
                {
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        ...this.state,
                        checkVal: !this.state.checkVal,
                      })
                    }
                    style={[style.checkBoxView, {borderWidth: 1}]}>
                    {this.state.checkVal ? (
                      <Image
                        source={require('./Assets/check.png')}
                        style={style.checkImg}
                      />
                    ) : null}
                  </TouchableOpacity>
                }
                <Text style={style.agreeMsg}>
                  {'I read & agree to '}
                  <Text onPress={()=>this.setState({...this.state,isTc:true})} style={style.agreeLink}>{'Terms & Conditions.'}</Text>
                </Text>
              </View>
            </View> */}

            <TouchableOpacity
              style={[style.loginBtn, {width: '100%'}]}
              onPress={() => this.signup()}>
              <Text style={style.logTx}>{'Signup'}</Text>
            </TouchableOpacity>

            <Text style={{fontSize:20,alignSelf:"center"}}>--------------------or--------------------</Text>

            <View style={{width:"100%",alignItems:"center",justifyContent:"space-between",flexDirection:"row",marginTop:-11}}>
            <TouchableOpacity
              onPress={() => this.googleLogin()}
              style={[style.scLoginBtn, {width: '40%'}]}>
              <View
                style={{
                  width: '20%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image style={style.googleImg} source={Images.google} />
              </View>
              {/* <Text style={style.scLogTx}>{'Login with Google'}</Text> */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.facebookSignIn()}
              style={[style.scLoginBtn, {width: '40%'}]}>
              <View
                style={{
                  width: '20%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image style={style.googleImg} source={Images.facebook} />
              </View>
              {/* <Text style={style.scLogTx}>{'Login with Facebook'}</Text> */}
            </TouchableOpacity>
            
            {Platform.OS == 'ios' ? (
              <TouchableOpacity
                onPress={() => this.appleLogin()}
                style={[style.scLoginBtn, {width: '40%'}]}>
                <View
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image style={style.googleImg} source={Images.apple} />
                </View>
                <Text style={style.scLogTx}>{'Login with Apple'}</Text>
              </TouchableOpacity>
            ) : null}
            </View>
            <View style={{marginBottom:50}}>
            <Text
              style={[
                style.logTx,
                {
                  color: Colors.Black,
                  marginTop: 30,
                  marginBottom: 40,
                  flexDirection: 'row',
                },
              ]}>
              {'Already have an account? '}
              <Text
                style={[style.logTx1, {color: Colors.mainColor}]}
                onPress={() => this.props.navigation.navigate('Login')}>
                {'Login'}
              </Text>
            </Text>
            </View>
            <View style={style.termsVw}><Text onPress={()=>this.props.navigation.navigate('Termss',{isLogin: false})}>{'Terms and conditions'}</Text><Text onPress={()=>this.props.navigation.navigate('PrivatePolicys',{isLogin: false})}>{'Privacy Policy'}</Text></View>
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
        
      </View>
    );
  }
}
function mapStateToProps(state) {
  console.log('signupResponse>>>>', state);
  return {
    signupResponse: state.LoginReducer.loginInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signupData: (data) => dispatch(SignupUser(data)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
