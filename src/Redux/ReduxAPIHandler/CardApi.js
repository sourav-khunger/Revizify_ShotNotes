/* eslint-disable eqeqeq */
import RequestManager from '../../ApiManger';
import api from '../../Resources/APIs';

export async function updateUserImage(token, params) {
  return await new Promise(async function (resolve) {
    await RequestManager.uploadImage(api.CREATE_CARD, token, params)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (e) {
        // Alert.alert(e.error);
      });
    resolve;
  });
}

// ADD All Card
export async function allCardApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.GET_ALL_CARD,
      {
        chapter_id: data.id,
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

// GET Card
export async function getCardApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.GET_CARD,
      {
        card_id: data.id,
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

// New Deck data

export async function newDeckApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.GET_REMANING,
      {
        chapter_id: data.id,
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

// update Deck response

export async function updateDeckApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.MOVE_CARDS,
      {
        card_id: data.card_id,
        chapter_id: data.id,
        course_id: data.course_id,
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

// Count deck api

export async function countDeckApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.COUNT_DECK,
      {
        chapter_id: data.id,
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

// Revision Data Api

export async function revisionApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.GET_REVISION,
      {
        chapter_id: data.id,
        revision_type: data.type,
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

// Update Revision response

export async function updateRevisionApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.UPDATE_REVISION,
      {
        card_id: data.card_id,
        revision_type: data.type,
      },
      header,
    )
      .then(async (response) => {
        resolve(response);
        console.log('response>>>>', response);
      })
      .catch(function (error) {
        console.log('error', error);
        reject(error.message);
      });
  });
}

// SAVE BOOKMARK

export async function bookMarkApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.SAVE_BOOKMARK,
      {
        card_id: data.card_id,
        bookmark_status: data.status,
      },
      header,
    )
      .then(async (response) => {
        resolve(response);
        console.log('response>>>>', response);
      })
      .catch(function (error) {
        console.log('error', error);
        reject(error.message);
      });
  });
}

// Reset Revision Data Api

export async function resetRevisionApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.RESET_REVISION,
      {
        chapter_id: data.id,
        user_id: data.userId,
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

export async function cardGetApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.GET_CARD_DATA,
      {
        card_id: data.id,
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

export async function deleteCardApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.DELETE_CARD,
      {
        user_id: data.user_id,
        card_id: data.card_id,
        data_type: 'card',
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
export async function deleteCardDataApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(api.DELETE_CARD, data.data, header)
      .then(async (response) => {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
        reject(error.message);
      });
  });
}
