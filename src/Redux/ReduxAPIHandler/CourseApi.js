/* eslint-disable eqeqeq */
import RequestManager from '../../ApiManger';
import api from '../../Resources/APIs';

export async function myCourseApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.getRequest(api.MY_COURSE, header)
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

export async function allCourseApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.getRequest(api.ALL_COURSE, header)
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
// purchased Course
export async function purchasedCourseApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.getRequest(api.PURCHASED_COURSE, header)
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

// update Course
export async function paymentCourseApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.SAVE_PAYMENT,
      {
        course_id: data.course_id,
        payment_id: data.paymentId,
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

// explore Course
export async function exploreCourseApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.getRequest(api.EXPLORE, header)
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

// Remove Course

export async function deleteCourseApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(api.REMOVE_COURSE, data.data, header)
      .then(async (response) => {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
        reject(error.message);
      });
  });
}
