/* eslint-disable eqeqeq */
import RequestManager from '../../ApiManger';
import api from '../../Resources/APIs';

export async function userData(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.GET_USERDATA,
      {
        user_id: data.id,
      },
      header,
    )
      .then(async (response) => {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
        reject(error.message);
      });
  });
}

export async function walletDataApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.getRequest(api.GET_WALLET, header)
      .then(async (response) => {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
        reject(error.message);
      });
  });
}

export async function requestWallatApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.REQUEST_WALLET,
      {
        requested_amount: data.amount,
      },
      header,
    )
      .then(async (response) => {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
        reject(error.message);
      });
  });
}

export async function userUpdataData(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.UPDATE_USER,
      {
        id: data.id,
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
        bio: data.bio,
      },
      header,
    )
      .then(async (response) => {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
        reject(error.message);
      });
  });
}

export async function userUpdateImageData(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.UPDATE_IMAGE,
      {
        id: data.id,
        profile_photo: data.profile_photo,
      },
      header,
    )
      .then(async (response) => {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
        reject(error.message);
      });
  });
}

export async function accountInfoUpdate(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.ACCOUNT_UPDATE,
      {
        account_holder_name: data.name,
        account_number: data.account_number,
        bank_name: data.bank_name,
        ifsc_code: data.ifsc,
      },
      header,
    )
      .then(async (response) => {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
        reject(error.message);
      });
  });
}

export async function accountInfoSave(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.ACCOUNT_SAVE,
      {
        account_holder_name: data.name,
        account_number: data.account_number,
        bank_name: data.bank_name,
        ifsc_code: data.ifsc,
      },
      header,
    )
      .then(async (response) => {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
        reject(error.message);
      });
  });
}

export async function accountInfo(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.getRequest(api.ACCOUNT_INFO, header)
      .then(async (response) => {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
        reject(error.message);
      });
  });
}
