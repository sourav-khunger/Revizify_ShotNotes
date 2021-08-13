/* eslint-disable eqeqeq */
import {put} from 'redux-saga/effects';

import RequestManager from '../../ApiManger';
import api from '../../Resources/APIs';
import {apiStart} from '../Actions/CommonActions';
import {saveLoginApi} from '../Actions/LoginActions';

//Login Api
export function* loginUser(params) {
  try {
    let header = {
      'Content-Type': 'application/json',
    };

    yield put(apiStart());
    const response = yield RequestManager.postRequest(
      api.LOGIN,
      {
        email: params.email,
        password: params.password,
        device_id: params.device_id,
        push_token: params.push_token,
      },
      header,
    );
    // const loginData = setLogData(response);
    yield put(saveLoginApi(response));
  } catch (e) {
    console.log('Login error >>>>', JSON.stringify(e));
  }
}

//Signup Api
export function* SignupUser(params) {
  console.log('heredata>>', params);
  try {
    let header = {
      'Content-Type': 'application/json',
    };

    // yield put(apiStart());
    const response = yield RequestManager.postRequest(
      api.SIGNIN,
      {
        name: params.name,
        email: params.email,
        phone_number: params.phone_number,
        password: params.password,
        device_id: params.device_id,
        push_token: params.push_token,
      },
      header,
    );
    // console.log('response>>>', response);
    // yield put(saveLoginApi(response));
  } catch (e) {
    console.log('signup error >>>>', JSON.stringify(e));
  }
}

// Social Login
export async function SocialApi(data) {
  // return await new Promise(async function (resolve, reject) {
  let header = {
    'Content-Type': 'application/json',
  };

  await RequestManager.postRequest(
    api.SIGNIN,
    {
      id: data.id,
      user_type: data.user_type,
      name: data.name,
      email: data.email,
      profile_photo: data.profile_photo,
      device_id: data.device_id,
      push_token: data.push_token,
    },
    header,
  )
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log('error', error);
      return error.message;
    });
  // });
}
// Logout api

export async function logoutApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.LOGOUT,
      {
        id: data.id,
        device_id: data.device_id,
        push_token: data.push_token,
      },
      header,
    )
      .then(async (response) => {
        // console.log('Answer123456', response)
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
        reject(error.message);
      });
  });
}
