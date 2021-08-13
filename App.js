/* eslint-disable prettier/prettier */
import React from 'react';

import {
  PermissionsAndroid,
  Platform,
  StatusBar,
} from 'react-native';
import {
  checkMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
// import * as ScreenshotDetector from 'react-native-screenshot-detector';
import {Provider} from 'react-redux';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';

import {AppContainer} from './src/Navigation/AppContainer';
import LoginReducer from './src/Redux/Reducer/LoginReducer';
import rootSaga from './src/Redux/Saga/Saga';

const sagaMiddleWare = createSagaMiddleware();
const rootReducer = combineReducers({
  LoginReducer,
});
const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);
export default class App extends React.Component {
  componentDidMount = () => {
    // this.eventEmitter = ScreenshotDetector.subscribe(() => {
    // });
    this.configureGoogleLogin();
    this.permission();
  };
  configureGoogleLogin() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.profile'], // what API you want to access on behalf of the user, default is email and profile
      androidClientId:
        '818241587877-j6eilt1cfvu4ts42kqqpb9tg6mscvu9l.apps.googleusercontent.com',
      offlineAccess: false,
      forceConsentPrompt: true,
      iosClientId:
        '818241587877-7044l0d2ac86ki51tfl74sd9n29oo2fl.apps.googleusercontent.com',
    });
  }
  googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo>>>>>', userInfo);
      // this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.log('userInfoerror>>>>>', JSON.stringify(error));
        // some other error happened
      }
    }
  };
  permission = async () => {
    if (Platform.OS == 'ios') {
      checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MEDIA_LIBRARY]).then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      });
    }
    else {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Permissions for write access',
              message: 'Give permission to your storage to write a file',
              buttonPositive: 'ok',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the storage');
          } else {
            console.log('permission denied');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
              title: 'Permissions for write access',
              message: 'Give permission to your microphone',
              buttonPositive: 'ok',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the microphone');
          } else {
            console.log('permission denied');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Permissions for write access',
              message: 'Give permission to your camera',
              buttonPositive: 'ok',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
          } else {
            console.log('permission denied');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }
    }
  }
  componentWillUnmount() {
    // ScreenshotDetector.unsubscribe(this.eventEmitter);
  }

  render() {
    return (
      <Provider store={store}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <AppContainer />
      </Provider>
    );
  }
}
