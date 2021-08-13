/* eslint-disable prettier/prettier */
import React from 'react';

import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';

import {appleAuth} from '@invertase/react-native-apple-authentication';

import {
  facebookLogin,
  googleLogin,
} from '../../Constants/SocialLogin';
import Images from '../../Resources/Images';
import {style} from './style';

export default class Welcome extends React.Component {
  googleLogin = async () => {
    googleLogin()
      .then((res) => {
        console.log('signup', JSON.stringify(res));
      })
      .catch((error) => {
        console.log('signup error>>>>>>>>', JSON.stringify(error));
        Toast.show(JSON.stringify(error), Toast.SHORT);
      });
  };

  fdLogin = () => {
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
        console.log('Logindata>>>>>>>>>>>>>>', JSON.stringify(data));
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

        console.log('Apple login data>>>>>', params);
      }
    } catch (error) {
      console.log('Apple loginResponse error', error);
    }
  };
  render() {
    return (
      <View style={style.container}>
        <View style={style.subcontainer}>
          <View style={style.logoVw}>
            <Image source={Images.SPLASH_ICON} style={style.img} />
            <View style={style.shotVw}>
              <Text style={style.textTx}>{'Revizify'}</Text>
            </View>
          </View>
          <View style={style.btnVw}>
            <TouchableOpacity
              style={style.loginBtn}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={style.loginTx}>{'Log in'}</Text>
              <Image source={Images.rightArrow} style={style.arrowImg} />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.loginBtn}
              onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={style.loginTx}>{'Sign Up'}</Text>
              <Image source={Images.rightArrow} style={style.arrowImg} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
